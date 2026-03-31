/**
 * Plate.js Rich Text Editor — docs demo override.
 *
 * This file is the `<ui-editor>` override for the docs site.
 * It uses standard Plate.js kits from `components/plate/`.
 *
 * In YOUR project, you would create a similar file using whatever
 * Plate kits/components you installed via `npx shadcn@latest add @plate/...`.
 *
 * ## Usage (HTML attributes)
 *
 * ```html
 * <ui-editor name="content" format="html" placeholder="Start writing..."></ui-editor>
 *
 * <!-- Restricted editor: only headings + text, no marks, no toolbar -->
 * <ui-editor blocks="p,h1,h2" marks="false" toolbar="false"></ui-editor>
 * ```
 */

import * as React from "react"
import { Plate, usePlateEditor } from "platejs/react"
import { KEYS, TrailingBlockPlugin } from "platejs"
import { deserializeHtml } from "@platejs/core"
import { MarkdownPlugin } from "@platejs/markdown"
import {
  AutoformatPlugin,
  autoformatSmartQuotes,
  autoformatPunctuation,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatArrow,
  autoformatMath,
} from "@platejs/autoformat"
import type { EditorProps } from "@/lib/editor/types"
import { useEditorFormSync } from "@/lib/editor/use-editor-form"
import { EditorConfigContext, type EditorConfig } from "@/lib/editor/editor-config"
import { EditorKit } from "@/components/plate/editor/editor-kit"
import { Editor, EditorContainer } from "@/components/plate/ui/editor"
import { TooltipProvider } from "@/components/plate/ui/tooltip"
import { cn } from "@/lib/utils"

// Individual kits for restricted mode
import { BasicBlocksKit } from "@/components/plate/editor/plugins/basic-blocks-kit"
import { BasicMarksKit } from "@/components/plate/editor/plugins/basic-marks-kit"
import { CodeBlockKit } from "@/components/plate/editor/plugins/code-block-kit"
import { TableKit } from "@/components/plate/editor/plugins/table-kit"
import { ToggleKit } from "@/components/plate/editor/plugins/toggle-kit"
import { MediaKit } from "@/components/plate/editor/plugins/media-kit"
import { CalloutKit } from "@/components/plate/editor/plugins/callout-kit"
import { LinkKit } from "@/components/plate/editor/plugins/link-kit"
import { MentionKit } from "@/components/plate/editor/plugins/mention-kit"
import { ListKit } from "@/components/plate/editor/plugins/list-kit"
import { FontKit } from "@/components/plate/editor/plugins/font-kit"
import { AlignKit } from "@/components/plate/editor/plugins/align-kit"
import { LineHeightKit } from "@/components/plate/editor/plugins/line-height-kit"
import { SlashKit } from "@/components/plate/editor/plugins/slash-kit"
import { BlockMenuKit } from "@/components/plate/editor/plugins/block-menu-kit"
import { DndKit } from "@/components/plate/editor/plugins/dnd-kit"
import { ExitBreakKit } from "@/components/plate/editor/plugins/exit-break-kit"
import { FixedToolbarKit } from "@/components/plate/editor/plugins/fixed-toolbar-kit"
import { FloatingToolbarKit } from "@/components/plate/editor/plugins/floating-toolbar-kit"
import { BlockPlaceholderKit } from "@/components/plate/editor/plugins/block-placeholder-kit"
import { MarkdownKit } from "@/components/plate/editor/plugins/markdown-kit"
import {
  autoformatMarks as autoformatMarkRules,
  autoformatBlocks as autoformatBlockRules,
  autoformatLists as autoformatListRules,
} from "@/components/plate/editor/plugins/autoformat-kit"

const EMPTY_VALUE = [{ type: "p", children: [{ text: "" }] }]

// ---------------------------------------------------------------------------
// Config parsing
// ---------------------------------------------------------------------------

function parseBool(v: boolean | string | undefined, def: boolean): boolean {
  if (v === undefined) return def
  if (typeof v === "boolean") return v
  return v !== "false"
}

function parseSet(v: string | undefined): Set<string> | null {
  if (!v) return null
  const items = v.split(",").map(s => s.trim()).filter(Boolean)
  return items.length > 0 ? new Set(items) : null
}

/**
 * Map from user-friendly block names to KEYS values used by Plate plugins.
 * "list" expands to multiple KEYS (ul, ol, todo).
 */
const BLOCK_NAME_TO_KEYS: Record<string, string[]> = {
  "p": [KEYS.p],
  "paragraph": [KEYS.p],
  "h1": [KEYS.h1],
  "h2": [KEYS.h2],
  "h3": [KEYS.h3],
  "h4": [KEYS.h4],
  "h5": [KEYS.h5],
  "h6": [KEYS.h6],
  "blockquote": [KEYS.blockquote],
  "hr": [KEYS.hr],
  "code-block": [KEYS.codeBlock],
  "table": [KEYS.table],
  "toggle": [KEYS.toggle],
  "callout": [KEYS.callout],
  "list": [KEYS.ul, KEYS.ol, KEYS.listTodo],
  "media": [KEYS.img],
  "link": [KEYS.a],
  "mention": [KEYS.mention],
}

/** Expand user-friendly block names to Plate KEYS values. */
function expandBlockKeys(names: Set<string>): Set<string> {
  const keys = new Set<string>()
  keys.add(KEYS.p) // paragraph is always included

  for (const name of names) {
    const mapped = BLOCK_NAME_TO_KEYS[name]
    if (mapped) mapped.forEach(k => keys.add(k))
  }

  return keys
}

/** Map of feature kits keyed by user-friendly block name. */
const FEATURE_KITS: Record<string, readonly any[]> = {
  "code-block": CodeBlockKit,
  "table": TableKit,
  "toggle": ToggleKit,
  "callout": CalloutKit,
  "media": MediaKit,
  "link": LinkKit,
  "mention": MentionKit,
}

// ---------------------------------------------------------------------------
// Plugin builder
// ---------------------------------------------------------------------------

function buildPlugins(
  blockNames: Set<string> | null,
  blockKeys: Set<string> | null,
  marksParsed: Set<string> | null | false,
  showToolbar: boolean,
) {
  // No restrictions — use full EditorKit (zero overhead)
  if (!blockNames && marksParsed === null && showToolbar) {
    return EditorKit
  }

  const plugins: any[] = []
  const hasBlock = (name: string) => !blockNames || blockNames.has(name)

  // === Block elements ===

  // BasicBlocksKit (p, h1-h6, blockquote, hr) — filter by plugin key
  plugins.push(...(blockKeys
    ? BasicBlocksKit.filter(p => blockKeys.has(p.key))
    : BasicBlocksKit
  ))

  // Feature kits — include/exclude as whole units
  for (const [name, kit] of Object.entries(FEATURE_KITS)) {
    if (hasBlock(name)) plugins.push(...kit)
  }

  // List kit
  if (hasBlock("list")) plugins.push(...ListKit)

  // Alignment & line-height — always include (no-ops on unsupported types)
  plugins.push(...AlignKit, ...LineHeightKit)

  // === Marks ===

  if (marksParsed !== false) {
    if (!marksParsed) {
      // All marks
      plugins.push(...BasicMarksKit, ...FontKit)
    } else {
      // Specific marks only
      plugins.push(...BasicMarksKit.filter(p => marksParsed.has(p.key)))
    }
  }

  // === Editing helpers (always included) ===

  plugins.push(...ExitBreakKit, TrailingBlockPlugin, ...MarkdownKit, ...BlockPlaceholderKit)
  plugins.push(...BlockMenuKit, ...DndKit)

  // Slash menu — include when there are enough block types for it to be useful
  if (!blockNames || blockNames.size > 3) {
    plugins.push(...SlashKit)
  }

  // === Autoformat ===

  const autoRules: any[] = []

  // Block rules (headings, blockquote, code-block, hr)
  for (const rule of autoformatBlockRules) {
    if (!blockKeys || blockKeys.has(rule.type as string)) {
      autoRules.push(rule)
    }
  }

  // List rules
  if (hasBlock("list")) autoRules.push(...autoformatListRules)

  // Mark rules
  if (marksParsed !== false) autoRules.push(...autoformatMarkRules)

  // Text replacement rules (always)
  autoRules.push(
    ...autoformatSmartQuotes,
    ...autoformatPunctuation,
    ...autoformatLegal,
    ...autoformatLegalHtml,
    ...autoformatArrow,
    ...autoformatMath,
  )

  plugins.push(AutoformatPlugin.configure({
    options: {
      enableUndoOnDelete: true,
      rules: autoRules.map(rule => ({
        ...rule,
        query: (editor: any) => {
          try {
            return !editor.api.some({
              match: { type: editor.getType(KEYS.codeBlock) },
            })
          } catch {
            return true
          }
        },
      })),
    },
  }))

  // === Toolbars ===

  if (showToolbar) plugins.push(...FixedToolbarKit)
  if (marksParsed !== false) plugins.push(...FloatingToolbarKit)

  return plugins
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function EditorOverride({
  value,
  format = "html",
  placeholder,
  readOnly = false,
  name,
  form,
  className,
  minHeight = "200px",
  maxHeight,
  onChange,
  onEditorReady,
  toolbar: toolbarProp,
  blocks: blocksProp,
  marks: marksProp,
}: EditorProps) {
  // Parse config
  const showToolbar = parseBool(toolbarProp, true)

  const blockNames = React.useMemo(() => parseSet(blocksProp), [blocksProp])
  const blockKeys = React.useMemo(
    () => blockNames ? expandBlockKeys(blockNames) : null,
    [blockNames]
  )
  const marksParsed = React.useMemo<Set<string> | null | false>(() => {
    if (marksProp === false || marksProp === "false") return false
    if (typeof marksProp === "string") return parseSet(marksProp)
    return null
  }, [marksProp])

  // Build plugins (memoized on raw props)
  const plugins = React.useMemo(
    () => buildPlugins(blockNames, blockKeys, marksParsed, showToolbar),
    [blockNames, blockKeys, marksParsed, showToolbar]
  )

  // Context for UI components (slash menu, toolbars)
  const editorConfig = React.useMemo<EditorConfig>(
    () => ({ allowedBlocks: blockKeys, allowedMarks: marksParsed === false ? new Set<string>() : marksParsed }),
    [blockKeys, marksParsed]
  )

  const defaultPlaceholder = blockNames && blockNames.size <= 3
    ? "Start typing..."
    : "Type / for commands..."

  const editor = usePlateEditor({
    plugins,
    value: (editor) => {
      if (!value) return EMPTY_VALUE
      if (typeof value !== "string") return value as any
      try {
        if (format === "json") {
          const parsed = JSON.parse(value)
          if (Array.isArray(parsed) && parsed.length > 0) return parsed
          return EMPTY_VALUE
        }
        if (format === "markdown") {
          const deserialized = editor.getApi(MarkdownPlugin).markdown.deserialize(value)
          if (Array.isArray(deserialized) && deserialized.length > 0) return deserialized
          return EMPTY_VALUE
        }
        // "html" — explicitly deserialize via HtmlPlugin
        const nodes = deserializeHtml(editor, { element: value })
        if (Array.isArray(nodes) && nodes.length > 0) return nodes as any
        return EMPTY_VALUE
      } catch {
        return EMPTY_VALUE
      }
    },
  })

  React.useEffect(() => {
    onEditorReady?.(editor)
  }, [editor, onEditorReady])

  const { syncContent, inputProps } = useEditorFormSync({
    editor,
    format,
    name,
    form,
    onChange,
  })

  return (
    <EditorConfigContext.Provider value={editorConfig}>
      <TooltipProvider>
        <div className={cn("rounded-md border border-input shadow-xs", className)}>
          <Plate
            editor={editor}
            readOnly={readOnly}
            onChange={() => syncContent()}
          >
            <EditorContainer
              style={{ minHeight, maxHeight: maxHeight ?? undefined }}
            >
              <Editor
                placeholder={placeholder ?? defaultPlaceholder}
                variant="default"
              />
            </EditorContainer>
          </Plate>

          {inputProps && <input {...inputProps} />}
        </div>
      </TooltipProvider>
    </EditorConfigContext.Provider>
  )
}
