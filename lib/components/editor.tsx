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
 * ```
 */

import * as React from "react"
import { Plate, usePlateEditor } from "platejs/react"
import { deserializeHtml } from "@platejs/core"
import { MarkdownPlugin } from "@platejs/markdown"
import type { EditorProps } from "@/lib/editor/types"
import { useEditorFormSync } from "@/lib/editor/use-editor-form"
import { EditorKit } from "@/components/plate/editor/editor-kit"
import { Editor, EditorContainer } from "@/components/plate/ui/editor"
import { TooltipProvider } from "@/components/plate/ui/tooltip"
import { cn } from "@/lib/utils"

const EMPTY_VALUE = [{ type: "p", children: [{ text: "" }] }]

export default function EditorOverride({
  value,
  format = "html",
  placeholder = "Type / for commands...",
  readOnly = false,
  name,
  form,
  className,
  minHeight = "200px",
  maxHeight,
  onChange,
  onEditorReady,
}: EditorProps) {
  const editor = usePlateEditor({
    plugins: EditorKit,
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
              placeholder={placeholder}
              variant="default"
            />
          </EditorContainer>
        </Plate>

        {inputProps && <input {...inputProps} />}
      </div>
    </TooltipProvider>
  )
}
