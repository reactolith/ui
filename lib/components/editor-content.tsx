/**
 * Plate.js Rich Text Editor — read-only content renderer.
 *
 * Renders Plate editor content in view-only mode using PlateStatic.
 * No toolbar, no editing UI — just the rendered content.
 *
 * ## Usage (HTML attributes)
 *
 * ```html
 * <ui-editor-content value="<p>Hello world</p>" format="html"></ui-editor-content>
 * ```
 */

import * as React from "react"
import { createSlateEditor } from "platejs"
import { deserializeHtml } from "@platejs/core"
import { MarkdownPlugin } from "@platejs/markdown"
import type { Value } from "platejs"
import { SerializerKit } from "@/lib/plate/editor/editor-kit"
import { EditorStatic } from "@/lib/plate/ui/editor-static"
import { cn } from "@/lib/utils"

type EditorFormat = "html" | "json" | "markdown"

export interface EditorContentProps {
  /** Content to render (HTML string, JSON string, Markdown string, or Plate Value) */
  value?: string | Value
  /** Content format. Default: "html" */
  format?: EditorFormat
  className?: string
  /** Maximum height (CSS value, enables scroll) */
  maxHeight?: string
}

const EMPTY_VALUE = [{ type: "p", children: [{ text: "" }] }]

function parseValue(
  ed: ReturnType<typeof createSlateEditor>,
  value: string | Value | undefined,
  format: EditorFormat,
): Value {
  if (!value) return EMPTY_VALUE as unknown as Value
  if (typeof value !== "string") return value

  try {
    if (format === "json") {
      const parsed = JSON.parse(value)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
      return EMPTY_VALUE as unknown as Value
    }
    if (format === "markdown") {
      const deserialized = (ed.getApi(MarkdownPlugin) as any).markdown.deserialize(value)
      if (Array.isArray(deserialized) && deserialized.length > 0) return deserialized as Value
      return EMPTY_VALUE as unknown as Value
    }
    // "html"
    const nodes = deserializeHtml(ed, { element: value })
    if (Array.isArray(nodes) && nodes.length > 0) return nodes as unknown as Value
    return EMPTY_VALUE as unknown as Value
  } catch {
    return EMPTY_VALUE as unknown as Value
  }
}

export default function EditorContent({
  value,
  format = "html",
  className,
  maxHeight,
}: EditorContentProps) {
  const editor = React.useMemo(() => {
    const ed = createSlateEditor({ plugins: SerializerKit as any })
    ed.children = parseValue(ed, value, format) as any
    return ed
  }, [value, format])

  return (
    <div
      className={cn("overflow-hidden rounded-md border border-input shadow-xs", className)}
      style={{ maxHeight: maxHeight ?? undefined, overflowY: maxHeight ? "auto" : undefined }}
    >
      <EditorStatic editor={editor as any} className="px-3 py-2" />
    </div>
  )
}
