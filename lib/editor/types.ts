import type { Value } from "platejs"
import type { PlateEditor } from "platejs/react"

// ---------------------------------------------------------------------------
// Content format
// ---------------------------------------------------------------------------

/** Serialization format for form sync */
export type EditorFormat = "html" | "json" | "markdown"

// ---------------------------------------------------------------------------
// Toolbar presets
// ---------------------------------------------------------------------------

/** Built-in toolbar presets */
export type ToolbarPreset = "full" | "standard" | "minimal" | "none"

/** Individual toolbar features that can be toggled */
export type ToolbarFeature =
  // marks
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "code"
  | "superscript"
  | "subscript"
  | "highlight"
  // blocks
  | "heading"
  | "blockquote"
  | "code-block"
  | "callout"
  | "toggle"
  | "horizontal-rule"
  // lists
  | "bullet-list"
  | "numbered-list"
  // inline
  | "link"
  | "image"
  // table
  | "table"
  // history
  | "undo"
  | "redo"

// ---------------------------------------------------------------------------
// Plugin presets
// ---------------------------------------------------------------------------

/** Plugin preset determines which editing features are available */
export type PluginPreset = "full" | "standard" | "minimal"

// ---------------------------------------------------------------------------
// Editor component props
// ---------------------------------------------------------------------------

export interface EditorProps {
  // --- Content ---
  /** Initial content (HTML string, JSON string, or Plate Value array) */
  value?: string | Value
  /** Content format for value parsing and form sync. Default: "html" */
  format?: EditorFormat
  /** Placeholder text shown when the editor is empty */
  placeholder?: string
  /** Read-only mode */
  readOnly?: boolean

  // --- Form sync ---
  /** Hidden input name for form submission. When set, a hidden <input> syncs editor content. */
  name?: string
  /** Form ID to associate with (like native form= attribute) */
  form?: string

  // --- Toolbar ---
  /** Toolbar preset: "full" | "standard" | "minimal" | "none". Default: "standard" */
  toolbar?: ToolbarPreset
  /** Comma-separated toolbar features (overrides preset). E.g. "bold,italic,link,heading" */
  toolbarFeatures?: string

  // --- Plugins ---
  /** Plugin preset: "full" | "standard" | "minimal". Default: "standard" */
  plugins?: PluginPreset

  // --- Appearance ---
  className?: string
  /** Minimum editor height (CSS value). E.g. "200px" */
  minHeight?: string
  /** Maximum editor height (CSS value, enables scroll). E.g. "600px" */
  maxHeight?: string

  // --- Events ---
  /** Callback fired on content change (receives serialized string in configured format) */
  onChange?: (value: string) => void
  /** Callback with direct access to the Plate editor instance */
  onEditorReady?: (editor: PlateEditor) => void
}
