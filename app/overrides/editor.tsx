/**
 * Plate.js Rich Text Editor — override component
 *
 * Renders as `<ui-editor>` via the OverrideLoader.
 *
 * ## Usage (Symfony / HTML attributes)
 *
 * ```html
 * <!-- Standard editor with form sync -->
 * <ui-editor name="content" format="html" toolbar="standard"></ui-editor>
 *
 * <!-- Minimal editor with custom toolbar features -->
 * <ui-editor name="body" toolbar-features="bold,italic,link,heading" format="markdown"></ui-editor>
 *
 * <!-- Read-only display -->
 * <ui-editor value="<p>Hello</p>" format="html" read-only></ui-editor>
 *
 * <!-- Full-featured editor -->
 * <ui-editor name="content" toolbar="full" plugins="full" min-height="300px"></ui-editor>
 * ```
 *
 * ## Usage (React / TypeScript)
 *
 * ```tsx
 * import Editor from "@/app/overrides/editor"
 * <Editor name="content" format="json" toolbar="standard" onChange={(val) => console.log(val)} />
 * ```
 *
 * ## Extensibility
 *
 * For custom editor variants, import the building blocks from `@/lib/editor`:
 *
 * ```tsx
 * import { getPluginsForPreset, getEditorComponents, EditorToolbar, useEditorFormSync } from "@/lib/editor"
 * ```
 */

import * as React from "react"
import type { Value } from "platejs"
import { Plate, PlateContent, usePlateEditor } from "platejs/react"
import type { EditorProps, EditorFormat } from "@/lib/editor/types"
import { getPluginsForPreset, resolveToolbarFeatures } from "@/lib/editor/plugins"
import { getEditorComponents } from "@/lib/editor/components"
import { EditorToolbar } from "@/lib/editor/toolbar"
import { SlashMenu } from "@/lib/editor/slash-menu"
import { useEditorFormSync, EMPTY_VALUE } from "@/lib/editor/use-editor-form"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Parse initial value without needing the editor instance
// ---------------------------------------------------------------------------

function parseInitialValue(
  value: string | Value | undefined,
  format: EditorFormat,
): Value | string | undefined {
  if (!value) return undefined // let Plate use its default
  if (Array.isArray(value)) return value

  if (typeof value !== "string" || value.trim() === "") return undefined

  switch (format) {
    case "json":
      try {
        const parsed = JSON.parse(value)
        return Array.isArray(parsed) ? parsed : undefined
      } catch {
        return undefined
      }
    case "html":
      // Pass HTML string directly — Plate parses it via HtmlPlugin
      return value
    case "markdown":
      // Markdown needs editor API, so we'll handle it after editor creation
      return value
    default:
      return undefined
  }
}

// ---------------------------------------------------------------------------
// Main Editor component
// ---------------------------------------------------------------------------

export default function Editor({
  value,
  format = "html",
  placeholder = "Start writing...",
  readOnly = false,
  name,
  form,
  toolbar = "standard",
  toolbarFeatures,
  plugins: pluginPreset = "standard",
  className,
  minHeight = "150px",
  maxHeight,
  onChange,
  onEditorReady,
}: EditorProps) {
  const toolbarItems = resolveToolbarFeatures(toolbar, toolbarFeatures)
  const components = React.useMemo(() => getEditorComponents(), [])
  const showSlashMenu = pluginPreset !== "inline" && !readOnly

  // Parse initial value statically (without needing the editor instance)
  const initialValue = React.useMemo(
    () => parseInitialValue(value, format),
    [value, format],
  )

  const editor = usePlateEditor({
    plugins: getPluginsForPreset(pluginPreset),
    override: { components },
    value: initialValue,
  })

  // Notify parent when editor is ready
  React.useEffect(() => {
    onEditorReady?.(editor)
  }, [editor, onEditorReady])

  // Sync on every change
  const { syncContent, inputProps } = useEditorFormSync({
    editor,
    format,
    name,
    form,
    onChange,
  })

  return (
    <Plate
      editor={editor}
      onChange={() => {
        syncContent()
      }}
    >
      <div
        className={cn(
          "rounded-md border border-input bg-background text-foreground shadow-xs",
          "focus-within:ring-1 focus-within:ring-ring focus-within:border-ring",
          className,
        )}
      >
        {/* Toolbar */}
        {!readOnly && toolbarItems.length > 0 && (
          <EditorToolbar features={toolbarItems} />
        )}

        {/* Editor content area */}
        <div
          style={{
            minHeight,
            maxHeight: maxHeight ?? undefined,
            overflowY: maxHeight ? "auto" : undefined,
          }}
        >
          <PlateContent
            readOnly={readOnly}
            placeholder={placeholder}
            className={cn(
              "p-4 outline-none",
              "prose prose-sm dark:prose-invert max-w-none",
              "prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1",
              "prose-blockquote:my-2 prose-pre:my-2",
              "[&_[data-slate-placeholder]]:!opacity-30",
            )}
          />
        </div>
      </div>

      {/* Slash command menu (notion-like block insertion) */}
      {showSlashMenu && <SlashMenu />}

      {/* Hidden form input */}
      {inputProps && <input {...inputProps} />}
    </Plate>
  )
}
