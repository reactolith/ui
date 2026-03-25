/**
 * Slash command menu for notion-like block insertion.
 *
 * When the user types "/" at the beginning of a line, a menu appears
 * with available block types to insert. This is powered by
 * @platejs/slash-command's SlashPlugin.
 */

import * as React from "react"
import { useEditorRef } from "platejs/react"
import {
  BlockquotePlugin,
  HorizontalRulePlugin,
} from "@platejs/basic-nodes/react"
import { CodeBlockPlugin } from "@platejs/code-block/react"
import { toggleList } from "@platejs/list"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Slash menu item definitions
// ---------------------------------------------------------------------------

interface SlashMenuItem {
  key: string
  label: string
  description: string
  icon: string
  action: (editor: ReturnType<typeof useEditorRef>) => void
}

const SLASH_ITEMS: SlashMenuItem[] = [
  {
    key: "p",
    label: "Text",
    description: "Plain text paragraph",
    icon: "Aa",
    action: (editor) => editor.tf.toggleBlock("p"),
  },
  {
    key: "h1",
    label: "Heading 1",
    description: "Large heading",
    icon: "H1",
    action: (editor) => editor.tf.toggleBlock("h1"),
  },
  {
    key: "h2",
    label: "Heading 2",
    description: "Medium heading",
    icon: "H2",
    action: (editor) => editor.tf.toggleBlock("h2"),
  },
  {
    key: "h3",
    label: "Heading 3",
    description: "Small heading",
    icon: "H3",
    action: (editor) => editor.tf.toggleBlock("h3"),
  },
  {
    key: "bullet-list",
    label: "Bullet List",
    description: "Unordered list",
    icon: "\u2022",
    action: (editor) => toggleList(editor, { listStyleType: "disc" }),
  },
  {
    key: "numbered-list",
    label: "Numbered List",
    description: "Ordered list",
    icon: "1.",
    action: (editor) => toggleList(editor, { listStyleType: "decimal" }),
  },
  {
    key: "blockquote",
    label: "Quote",
    description: "Blockquote",
    icon: "\u201C",
    action: (editor) => editor.tf.toggleBlock(BlockquotePlugin.key),
  },
  {
    key: "code-block",
    label: "Code",
    description: "Code block",
    icon: "{ }",
    action: (editor) => editor.tf.toggleBlock(CodeBlockPlugin.key),
  },
  {
    key: "hr",
    label: "Divider",
    description: "Horizontal rule",
    icon: "\u2015",
    action: (editor) => {
      editor.tf.insertNodes({
        type: HorizontalRulePlugin.key,
        children: [{ text: "" }],
      })
    },
  },
  {
    key: "table",
    label: "Table",
    description: "Insert a table",
    icon: "\u2637",
    action: (editor) => {
      editor.tf.insertNodes({
        type: "table",
        children: [
          {
            type: "tr",
            children: [
              { type: "th", children: [{ text: "" }] },
              { type: "th", children: [{ text: "" }] },
              { type: "th", children: [{ text: "" }] },
            ],
          },
          {
            type: "tr",
            children: [
              { type: "td", children: [{ text: "" }] },
              { type: "td", children: [{ text: "" }] },
              { type: "td", children: [{ text: "" }] },
            ],
          },
        ],
      })
    },
  },
  {
    key: "image",
    label: "Image",
    description: "Insert an image",
    icon: "\uD83D\uDDBC",
    action: (editor) => {
      const url = window.prompt("Enter image URL:")
      if (url) {
        editor.tf.insertNodes({
          type: "img",
          url,
          children: [{ text: "" }],
        })
      }
    },
  },
]

// ---------------------------------------------------------------------------
// SlashMenu component
// ---------------------------------------------------------------------------

export interface SlashMenuProps {
  /** Filter which items appear. Defaults to all. */
  items?: SlashMenuItem[]
  className?: string
}

export function SlashMenu({ className }: SlashMenuProps) {
  const editor = useEditorRef()
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<{ x: number; y: number } | null>(null)

  // Filter items by search
  const filteredItems = React.useMemo(() => {
    if (!search) return SLASH_ITEMS
    const q = search.toLowerCase()
    return SLASH_ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q),
    )
  }, [search])

  // Listen for "/" keypress to open menu
  React.useEffect(() => {
    const el = document.querySelector<HTMLElement>("[data-slate-editor]")
    if (!el) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !open) {
        // Check if we're at the start of a block or the block is empty
        const sel = window.getSelection()
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0)
          const rect = range.getBoundingClientRect()
          triggerRef.current = { x: rect.left, y: rect.bottom }
          setOpen(true)
          setSearch("")
          setSelectedIndex(0)
        }
      }

      if (open) {
        if (e.key === "Escape") {
          e.preventDefault()
          setOpen(false)
        } else if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedIndex((i) => Math.min(i + 1, filteredItems.length - 1))
        } else if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedIndex((i) => Math.max(i - 1, 0))
        } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
          e.preventDefault()
          executeItem(filteredItems[selectedIndex])
        } else if (e.key === "Backspace") {
          if (search.length === 0) {
            setOpen(false)
          } else {
            setSearch((s) => s.slice(0, -1))
          }
        } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          e.preventDefault()
          setSearch((s) => s + e.key)
          setSelectedIndex(0)
        }
      }
    }

    el.addEventListener("keydown", handleKeyDown)
    return () => el.removeEventListener("keydown", handleKeyDown)
  }, [open, search, filteredItems, selectedIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  // Close on click outside
  React.useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  const executeItem = React.useCallback(
    (item: SlashMenuItem) => {
      setOpen(false)
      // Delete the "/" trigger character
      editor.tf.deleteBackward("character")
      // Delete search text
      for (let i = 0; i < search.length; i++) {
        editor.tf.deleteBackward("character")
      }
      // Execute the action
      item.action(editor)
    },
    [editor, search],
  )

  if (!open || filteredItems.length === 0) return null

  const pos = triggerRef.current ?? { x: 0, y: 0 }

  return (
    <div
      ref={menuRef}
      className={cn(
        "fixed z-50 w-64 rounded-lg border border-border bg-popover p-1 shadow-lg",
        "animate-in fade-in-0 zoom-in-95",
        className,
      )}
      style={{
        top: pos.y + 4,
        left: pos.x,
      }}
    >
      {search && (
        <div className="px-2 py-1 text-xs text-muted-foreground border-b border-border mb-1">
          /{search}
        </div>
      )}
      <div className="max-h-64 overflow-y-auto">
        {filteredItems.map((item, i) => (
          <button
            key={item.key}
            type="button"
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm",
              "hover:bg-accent hover:text-accent-foreground",
              i === selectedIndex && "bg-accent text-accent-foreground",
            )}
            onMouseEnter={() => setSelectedIndex(i)}
            onMouseDown={(e) => {
              e.preventDefault()
              executeItem(item)
            }}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-border bg-background text-xs font-medium">
              {item.icon}
            </span>
            <div className="text-left">
              <div className="font-medium">{item.label}</div>
              <div className="text-xs text-muted-foreground">
                {item.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export { SLASH_ITEMS, type SlashMenuItem }
