import type { Value } from "platejs"
import type { PlateEditor } from "platejs/react"

// ---------------------------------------------------------------------------
// Content format
// ---------------------------------------------------------------------------

/** Serialization format for form sync */
export type EditorFormat = "html" | "json" | "markdown"

// ---------------------------------------------------------------------------
// Editor component props
// ---------------------------------------------------------------------------

/** Props for the `<ui-editor>` built-in component. */
export interface EditorProps {
  // --- Content ---
  /** Initial content (HTML string, JSON string, Markdown string, or Plate Value) */
  value?: string | Value
  /** Content format for value parsing and form sync. Default: "html" */
  format?: EditorFormat
  /** Placeholder text shown when the editor is empty */
  placeholder?: string
  /** Read-only mode */
  readOnly?: boolean

  // --- Form sync ---
  /** Hidden input name for form submission. Renders a hidden <input> that syncs editor content. */
  name?: string
  /** Form ID to associate with (like native form= attribute) */
  form?: string

  // --- Appearance ---
  className?: string
  /** Minimum editor height (CSS value) */
  minHeight?: string
  /** Maximum editor height (CSS value, enables scroll) */
  maxHeight?: string

  // --- Events (React consumers only) ---
  /** Callback fired on content change (receives serialized string in configured format) */
  onChange?: (value: string) => void
  /** Callback with direct access to the Plate editor instance */
  onEditorReady?: (editor: PlateEditor) => void
}
