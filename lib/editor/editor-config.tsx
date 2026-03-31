import { createContext, useContext } from "react"

/** Editor restriction config passed via context to UI components (slash menu, toolbars). */
export interface EditorConfig {
  /** Allowed block type KEYS. null = all allowed. */
  allowedBlocks: Set<string> | null
  /** Allowed mark type KEYS. null = all allowed. */
  allowedMarks: Set<string> | null
}

const defaultConfig: EditorConfig = {
  allowedBlocks: null,
  allowedMarks: null,
}

export const EditorConfigContext = createContext<EditorConfig>(defaultConfig)

export function useEditorConfig() {
  return useContext(EditorConfigContext)
}

/** Check if a key is allowed by a restriction set. null = unrestricted. */
export function isAllowed(set: Set<string> | null, key: string): boolean {
  return set === null || set.has(key)
}
