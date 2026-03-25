/**
 * Configurable toolbar component for the Plate editor.
 *
 * Renders toolbar buttons based on the resolved toolbar features list.
 * Each button maps to an editor transform (toggleMark, toggleBlock, etc.).
 */

import * as React from "react"
import {
  useEditorRef,
  useEditorSelector,
} from "platejs/react"
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
  CodePlugin,
  SuperscriptPlugin,
  SubscriptPlugin,
  HighlightPlugin,
  BlockquotePlugin,
  HorizontalRulePlugin,
} from "@platejs/basic-nodes/react"
import { CodeBlockPlugin } from "@platejs/code-block/react"
import { LinkPlugin } from "@platejs/link/react"
import { ListPlugin } from "@platejs/list/react"
import type { ToolbarFeature } from "./types"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Toolbar button definitions
// ---------------------------------------------------------------------------

interface ToolbarButtonDef {
  feature: ToolbarFeature
  label: string
  icon: string
  group: string
  action: (editor: ReturnType<typeof useEditorRef>) => void
  isActive?: (editor: ReturnType<typeof useEditorRef>) => boolean
}

const MARK_FEATURES: ToolbarButtonDef[] = [
  {
    feature: "bold",
    label: "Bold",
    icon: "B",
    group: "marks",
    action: (editor) => editor.tf.toggleMark(BoldPlugin.key),
    isActive: (editor) => !!editor.api.hasMark(BoldPlugin.key),
  },
  {
    feature: "italic",
    label: "Italic",
    icon: "I",
    group: "marks",
    action: (editor) => editor.tf.toggleMark(ItalicPlugin.key),
    isActive: (editor) => !!editor.api.hasMark(ItalicPlugin.key),
  },
  {
    feature: "underline",
    label: "Underline",
    icon: "U",
    group: "marks",
    action: (editor) => editor.tf.toggleMark(UnderlinePlugin.key),
    isActive: (editor) => !!editor.api.hasMark(UnderlinePlugin.key),
  },
  {
    feature: "strikethrough",
    label: "Strikethrough",
    icon: "S",
    group: "marks",
    action: (editor) => editor.tf.toggleMark(StrikethroughPlugin.key),
    isActive: (editor) => !!editor.api.hasMark(StrikethroughPlugin.key),
  },
  {
    feature: "code",
    label: "Inline Code",
    icon: "<>",
    group: "marks",
    action: (editor) => editor.tf.toggleMark(CodePlugin.key),
    isActive: (editor) => !!editor.api.hasMark(CodePlugin.key),
  },
  {
    feature: "superscript",
    label: "Superscript",
    icon: "X\u00B2",
    group: "marks",
    action: (editor) => editor.tf.toggleMark(SuperscriptPlugin.key),
    isActive: (editor) => !!editor.api.hasMark(SuperscriptPlugin.key),
  },
  {
    feature: "subscript",
    label: "Subscript",
    icon: "X\u2082",
    group: "marks",
    action: (editor) => editor.tf.toggleMark(SubscriptPlugin.key),
    isActive: (editor) => !!editor.api.hasMark(SubscriptPlugin.key),
  },
  {
    feature: "highlight",
    label: "Highlight",
    icon: "\uD83D\uDD8D",
    group: "marks",
    action: (editor) => editor.tf.toggleMark(HighlightPlugin.key),
    isActive: (editor) => !!editor.api.hasMark(HighlightPlugin.key),
  },
]

const BLOCK_FEATURES: ToolbarButtonDef[] = [
  {
    feature: "heading",
    label: "Heading 1",
    icon: "H1",
    group: "blocks",
    action: (editor) => editor.tf.toggleBlock("h1"),
  },
  {
    feature: "blockquote",
    label: "Blockquote",
    icon: "\u201C",
    group: "blocks",
    action: (editor) => editor.tf.toggleBlock(BlockquotePlugin.key),
  },
  {
    feature: "code-block",
    label: "Code Block",
    icon: "{ }",
    group: "blocks",
    action: (editor) => editor.tf.toggleBlock(CodeBlockPlugin.key),
  },
  {
    feature: "horizontal-rule",
    label: "Horizontal Rule",
    icon: "\u2015",
    group: "blocks",
    action: (editor) => editor.tf.toggleBlock(HorizontalRulePlugin.key),
  },
]

const LIST_FEATURES: ToolbarButtonDef[] = [
  {
    feature: "bullet-list",
    label: "Bullet List",
    icon: "\u2022",
    group: "lists",
    action: (editor) => {
      try {
        const api = editor as unknown as { tf: { list: { toggle: (opts: { type: string }) => void } } }
        api.tf.list.toggle({ type: "ul" })
      } catch {
        editor.tf.toggleBlock("ul")
      }
    },
  },
  {
    feature: "numbered-list",
    label: "Numbered List",
    icon: "1.",
    group: "lists",
    action: (editor) => {
      try {
        const api = editor as unknown as { tf: { list: { toggle: (opts: { type: string }) => void } } }
        api.tf.list.toggle({ type: "ol" })
      } catch {
        editor.tf.toggleBlock("ol")
      }
    },
  },
]

const INLINE_FEATURES: ToolbarButtonDef[] = [
  {
    feature: "link",
    label: "Link",
    icon: "\uD83D\uDD17",
    group: "inline",
    action: (editor) => {
      const url = window.prompt("Enter URL:")
      if (url) {
        try {
          const api = editor as unknown as { tf: { link: { insert: (opts: { url: string }) => void } } }
          api.tf.link.insert({ url })
        } catch {
          editor.tf.insertNodes({
            type: LinkPlugin.key,
            url,
            children: [{ text: url }],
          })
        }
      }
    },
  },
  {
    feature: "image",
    label: "Image",
    icon: "\uD83D\uDDBC",
    group: "inline",
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
  {
    feature: "table",
    label: "Table",
    icon: "\u2637",
    group: "inline",
    action: (editor) => {
      try {
        const api = editor as unknown as { tf: { table: { insert: (opts: Record<string, unknown>) => void } } }
        api.tf.table.insert({})
      } catch {
        // Table API might not be available
      }
    },
  },
]

const HISTORY_FEATURES: ToolbarButtonDef[] = [
  {
    feature: "undo",
    label: "Undo",
    icon: "\u21B6",
    group: "history",
    action: (editor) => {
      const history = editor as unknown as { undo?: () => void }
      history.undo?.()
    },
  },
  {
    feature: "redo",
    label: "Redo",
    icon: "\u21B7",
    group: "history",
    action: (editor) => {
      const history = editor as unknown as { redo?: () => void }
      history.redo?.()
    },
  },
]

const ALL_BUTTONS: ToolbarButtonDef[] = [
  ...HISTORY_FEATURES,
  ...MARK_FEATURES,
  ...BLOCK_FEATURES,
  ...LIST_FEATURES,
  ...INLINE_FEATURES,
]

// ---------------------------------------------------------------------------
// Toolbar Button
// ---------------------------------------------------------------------------

function ToolbarButton({ def }: { def: ToolbarButtonDef }) {
  const editor = useEditorRef()
  const isActive = useEditorSelector(
    () => def.isActive?.(editor) ?? false,
    [def, editor],
  )

  return (
    <button
      type="button"
      title={def.label}
      aria-label={def.label}
      data-active={isActive || undefined}
      onMouseDown={(e) => {
        e.preventDefault()
        def.action(editor)
      }}
      className={cn(
        "inline-flex h-8 min-w-8 items-center justify-center rounded-md px-1.5 text-sm font-medium",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        "transition-colors",
        isActive && "bg-accent text-accent-foreground",
      )}
    >
      {def.icon}
    </button>
  )
}

// ---------------------------------------------------------------------------
// Toolbar Separator
// ---------------------------------------------------------------------------

function ToolbarSeparator() {
  return <div className="mx-1 h-6 w-px bg-border" />
}

// ---------------------------------------------------------------------------
// EditorToolbar
// ---------------------------------------------------------------------------

export interface EditorToolbarProps {
  features: ToolbarFeature[]
  className?: string
}

export function EditorToolbar({ features, className }: EditorToolbarProps) {
  if (features.length === 0) return null

  // Filter ALL_BUTTONS by the enabled features, preserving order from ALL_BUTTONS
  const buttons = ALL_BUTTONS.filter((btn) => features.includes(btn.feature))

  // Group buttons by their group for separator placement
  const groups: ToolbarButtonDef[][] = []
  let currentGroup: string | null = null
  let currentButtons: ToolbarButtonDef[] = []

  for (const btn of buttons) {
    if (btn.group !== currentGroup) {
      if (currentButtons.length > 0) groups.push(currentButtons)
      currentButtons = []
      currentGroup = btn.group
    }
    currentButtons.push(btn)
  }
  if (currentButtons.length > 0) groups.push(currentButtons)

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-0.5 border-b border-border bg-background px-2 py-1",
        className,
      )}
      role="toolbar"
      aria-label="Editor formatting toolbar"
    >
      {groups.map((group, i) => (
        <React.Fragment key={i}>
          {i > 0 && <ToolbarSeparator />}
          {group.map((btn) => (
            <ToolbarButton key={btn.feature} def={btn} />
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}
