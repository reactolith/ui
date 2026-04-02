/**
 * Hook for syncing Plate editor content to a hidden <input> element.
 *
 * Supports three serialization formats:
 * - "json"      — JSON.stringify of the Slate value (fastest, lossless)
 * - "markdown"  — Markdown via @platejs/markdown (requires MarkdownPlugin)
 * - "html"      — HTML via platejs/static serializeHtml (async)
 *
 * Usage in your editor override:
 *
 * ```tsx
 * const { syncContent, inputProps } = useEditorFormSync({ editor, format, name })
 *
 * <Plate editor={editor} onChange={() => syncContent()}>
 *   ...
 * </Plate>
 * {inputProps && <input {...inputProps} />}
 * ```
 */

import { useCallback, useEffect, useRef, useState } from "react"
import type { Value } from "platejs"
import { createSlateEditor } from "platejs"
import type { PlateEditor } from "platejs/react"
import { MarkdownPlugin } from "@platejs/markdown"
import type { EditorFormat } from "./types"

// ---------------------------------------------------------------------------
// Serialization
// ---------------------------------------------------------------------------

function serializeToJson(value: Value): string {
  return JSON.stringify(value)
}

function serializeToMarkdown(editor: PlateEditor): string {
  try {
    const api = editor.getApi(MarkdownPlugin)
    return (api as unknown as { markdown: { serialize: (opts: { value: Value }) => string } }).markdown.serialize({ value: editor.children as Value })
  } catch {
    return serializeToJson(editor.children as Value)
  }
}

// Lazily created static editor (no UI plugins with broken hooks).
let _staticEditor: ReturnType<typeof createSlateEditor> | null = null

async function getStaticEditor(
  value: Value,
): Promise<ReturnType<typeof createSlateEditor>> {
  if (!_staticEditor) {
    // Dynamic import to avoid circular deps and keep this module lightweight.
    const { SerializerKit } = await import(
      "@/lib/plate/editor/editor-kit"
    )
    _staticEditor = createSlateEditor({ plugins: SerializerKit as any })
  }
  _staticEditor.children = value as any
  return _staticEditor
}

async function serializeToHtml(editor: PlateEditor): Promise<string> {
  try {
    const { serializeHtml } = await import("platejs/static")
    const staticEditor = await getStaticEditor(editor.children as Value)
    return await serializeHtml(staticEditor as any, {
      stripClassNames: true,
      stripDataAttributes: true,
    })
  } catch {
    return serializeToJson(editor.children as Value)
  }
}

async function serialize(
  editor: PlateEditor,
  format: EditorFormat,
): Promise<string> {
  switch (format) {
    case "markdown":
      return serializeToMarkdown(editor)
    case "html":
      return await serializeToHtml(editor)
    case "json":
    default:
      return serializeToJson(editor.children as Value)
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export interface UseEditorFormSyncOptions {
  editor: PlateEditor
  format: EditorFormat
  name?: string
  form?: string
  onChange?: (value: string) => void
}

export function useEditorFormSync({
  editor,
  format,
  name,
  form,
  onChange,
}: UseEditorFormSyncOptions) {
  const [serialized, setSerialized] = useState("")
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const syncContent = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      const result = await serialize(editor, format)
      setSerialized(result)
      onChangeRef.current?.(result)
    }, 300)
  }, [editor, format])

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return {
    serialized,
    syncContent,
    inputProps: name
      ? {
          type: "hidden" as const,
          name,
          form,
          value: serialized,
          readOnly: true as const,
        }
      : null,
  }
}
