import { createContext, useContext } from "react"

export type UiTheme = "dark" | "light" | "system"

export type UiThemeProviderState = {
  /** Current mode selection (system/light/dark) */
  mode: UiTheme
  /** Resolved theme actually applied to <html> (light/dark) */
  resolved: "light" | "dark"
  /**
   * Change mode at runtime WITHOUT persisting.
   * Useful for temporary previews.
   */
  setMode: (mode: UiTheme) => void
  /**
   * Persisted setter: updates state AND localStorage.
   * Use this for user selections.
   */
  setTheme: (theme: UiTheme) => void
}

export const ThemeCtx = createContext<UiThemeProviderState | undefined>(undefined)

export function useTheme(): UiThemeProviderState {
  const ctx = useContext(ThemeCtx)
  if (!ctx) throw new Error("useTheme must be used within <ui-theme-provider>")
  return ctx
}
