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

  // --- Restrictions ---
  /** Show/hide the fixed toolbar. Default: true */
  toolbar?: boolean | string
  /**
   * Comma-separated list of allowed block types. Default: all.
   * Paragraph ("p") is always included automatically.
   * Values: p, h1, h2, h3, h4, h5, h6, blockquote, hr, code-block, table,
   *         toggle, callout, list, media, link, mention
   */
  blocks?: string
  /**
   * Comma-separated list of allowed inline marks, or "false" to disable all.
   * Default: all marks.
   * Values: bold, italic, underline, strikethrough, code, highlight,
   *         subscript, superscript, kbd
   */
  marks?: string | boolean

  // --- Events (React consumers only) ---
  /** Callback fired on content change (receives serialized string in configured format) */
  onChange?: (value: string) => void
  /** Callback with direct access to the Plate editor instance */
  onEditorReady?: (editor: PlateEditor) => void
}
