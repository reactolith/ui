/**
 * Slash command menu for notion-like block insertion.
 *
 * Works by observing the editor state (not intercepting DOM events).
 * When the user types "/" the menu opens. Characters after "/" filter
 * the list. Arrow keys navigate, Enter selects, Escape closes.
 */

import * as React from "react"
import {
  useEditorRef,
  useEditorMounted,
  useEditorSelector,
} from "platejs/react"
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
// Helper: extract slash query from editor state
// ---------------------------------------------------------------------------

function getSlashQuery(editor: ReturnType<typeof useEditorRef>): string | null {
  try {
    const { selection } = editor
    if (!selection) return null

    // Only works with collapsed selection (cursor, not range)
    if (
      selection.anchor.path.join(",") !== selection.focus.path.join(",") ||
      selection.anchor.offset !== selection.focus.offset
    ) {
      return null
    }

    // Get the text node at the cursor position
    const point = selection.anchor
    const node = editor.api.node(point.path)
    if (!node) return null

    const [textNode] = node
    if (typeof (textNode as Record<string, unknown>).text !== "string") return null

    const text = (textNode as Record<string, unknown>).text as string
    const beforeCursor = text.slice(0, point.offset)

    // Find the last "/" in the text before cursor
    const slashIndex = beforeCursor.lastIndexOf("/")
    if (slashIndex === -1) return null

    // "/" must be at start of text or preceded by whitespace
    if (slashIndex > 0 && beforeCursor[slashIndex - 1] !== " " && beforeCursor[slashIndex - 1] !== "\n") {
      return null
    }

    return beforeCursor.slice(slashIndex + 1)
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// SlashMenu component
// ---------------------------------------------------------------------------

export interface SlashMenuProps {
  className?: string
}

export function SlashMenu({ className }: SlashMenuProps) {
  const editor = useEditorRef()
  const mounted = useEditorMounted()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState<{ x: number; y: number } | null>(null)

  // Read the slash query from editor state reactively
  // Guard with mounted check to avoid accessing editor before DOM is ready
  const slashQuery = useEditorSelector(
    () => (mounted ? getSlashQuery(editor) : null),
    [editor, mounted],
  )

  const open = slashQuery !== null
  const search = slashQuery ?? ""

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

  // Update position when menu opens
  React.useEffect(() => {
    if (!open) {
      setPosition(null)
      return
    }
    // Get cursor position from DOM selection
    const domSel = window.getSelection()
    if (domSel && domSel.rangeCount > 0) {
      const range = domSel.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      setPosition({ x: rect.left, y: rect.bottom })
    }
  }, [open])

  // Reset selected index when filter changes
  React.useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  // Handle keyboard navigation when menu is open
  React.useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        // Close by deleting the "/" trigger
        closeMenu()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, filteredItems.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === "Enter") {
        if (filteredItems[selectedIndex]) {
          e.preventDefault()
          executeItem(filteredItems[selectedIndex])
        }
      }
    }

    // Use capture phase to intercept before Slate
    document.addEventListener("keydown", handleKeyDown, true)
    return () => document.removeEventListener("keydown", handleKeyDown, true)
  }, [open, filteredItems, selectedIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  // Close on click outside
  React.useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        // Don't close - let the editor handle the click naturally
        // The slash query will become null when cursor moves
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  const closeMenu = React.useCallback(() => {
    // Delete "/" + search text by using deleteBackward for each character
    const charsToDelete = 1 + search.length // "/" + search
    for (let i = 0; i < charsToDelete; i++) {
      editor.tf.deleteBackward("character")
    }
  }, [editor, search])

  const executeItem = React.useCallback(
    (item: SlashMenuItem) => {
      // Delete "/" + search text, then execute the action
      const charsToDelete = 1 + search.length
      for (let i = 0; i < charsToDelete; i++) {
        editor.tf.deleteBackward("character")
      }
      // Use setTimeout to let Slate settle before applying the transform
      setTimeout(() => {
        item.action(editor)
        // Refocus the editor
        editor.tf.focus()
      }, 0)
    },
    [editor, search],
  )

  if (!open || filteredItems.length === 0 || !position) return null

  return (
    <div
      ref={menuRef}
      className={cn(
        "fixed z-50 w-64 rounded-lg border border-border bg-popover p-1 shadow-lg",
        "animate-in fade-in-0 zoom-in-95",
        className,
      )}
      style={{
        top: position.y + 4,
        left: position.x,
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
