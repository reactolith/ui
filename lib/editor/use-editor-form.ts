/**
 * Hook for syncing Plate editor content to a hidden <input> element.
 *
 * Supports three serialization formats:
 * - "json"      — JSON.stringify of the Slate value (fastest, lossless)
 * - "markdown"  — Markdown via @platejs/markdown (requires MarkdownPlugin)
 * - "html"      — HTML via platejs/static serializeHtml (async, needs react-dom/server)
 *
 * The hidden input is rendered alongside the editor so native <form> submission
 * picks up the serialized content automatically. Debounced at 300ms.
 */

import { useCallback, useEffect, useRef, useState } from "react"
import type { Value } from "platejs"
import type { PlateEditor } from "platejs/react"
import { MarkdownPlugin } from "@platejs/markdown"
import type { EditorFormat } from "./types"

// ---------------------------------------------------------------------------
// Serialization helpers
// ---------------------------------------------------------------------------

function serializeToJson(value: Value): string {
  return JSON.stringify(value)
}

function serializeToMarkdown(editor: PlateEditor): string {
  try {
    const api = editor.getApi(MarkdownPlugin)
    return (api as unknown as { markdown: { serialize: (opts: { value: Value }) => string } }).markdown.serialize({ value: editor.children as Value })
  } catch {
    // MarkdownPlugin not configured — fall back to JSON
    return serializeToJson(editor.children as Value)
  }
}

async function serializeToHtml(editor: PlateEditor): Promise<string> {
  try {
    const { serializeHtml } = await import("platejs/static")
    return await serializeHtml(editor, {
      stripClassNames: true,
      stripDataAttributes: true,
    })
  } catch {
    // platejs/static not available — fall back to JSON
    return serializeToJson(editor.children as Value)
  }
}

// ---------------------------------------------------------------------------
// Serialize dispatch
// ---------------------------------------------------------------------------

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
// Deserialize helpers (for initial value parsing)
// ---------------------------------------------------------------------------

const EMPTY_VALUE: Value = [{ type: "p", children: [{ text: "" }] }]

export function deserializeValue(
  editor: PlateEditor,
  value: string | Value | undefined,
  format: EditorFormat,
): Value {
  if (!value) return EMPTY_VALUE

  // Already a Slate Value array
  if (Array.isArray(value)) return value

  if (typeof value !== "string") return EMPTY_VALUE
  if (value.trim() === "") return EMPTY_VALUE

  switch (format) {
    case "json":
      try {
        const parsed = JSON.parse(value)
        return Array.isArray(parsed) ? parsed : EMPTY_VALUE
      } catch {
        return EMPTY_VALUE
      }

    case "markdown":
      try {
        const mdApi = editor.getApi(MarkdownPlugin) as unknown as {
          markdown: { deserialize: (input: string) => Value }
        }
        return mdApi.markdown.deserialize(value)
      } catch {
        return EMPTY_VALUE
      }

    case "html":
      try {
        return editor.api.html.deserialize({ element: value }) as Value
      } catch {
        return EMPTY_VALUE
      }

    default:
      return EMPTY_VALUE
  }
}

// ---------------------------------------------------------------------------
// useEditorFormSync hook
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

  // Clean up timer on unmount
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

export { EMPTY_VALUE }
