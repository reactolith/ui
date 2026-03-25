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
import type { EditorProps } from "@/lib/editor/types"
import { useEditorFormSync } from "@/lib/editor/use-editor-form"
import { EditorKit } from "@/components/plate/editor/editor-kit"
import { Editor, EditorContainer } from "@/components/plate/ui/editor"
import { cn } from "@/lib/utils"

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
    value: value as string | undefined,
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
  )
}
