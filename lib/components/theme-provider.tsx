import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

export type UiTheme = "dark" | "light" | "system"

export type UiThemeProviderProps = {
  children: React.ReactNode
  /** Initial theme when nothing in storage (defaults to "system") */
  defaultTheme?: UiTheme
  /** LocalStorage key used to persist the user's choice */
  storageKey?: string
}

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

const ThemeCtx = createContext<UiThemeProviderState | undefined>(undefined)

const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

const UiThemeProvider: React.FC<UiThemeProviderProps> = ({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}) => {
  const initialMode = useMemo<UiTheme>(() => {
    if (typeof window === "undefined") return defaultTheme
    const stored = window.localStorage.getItem(storageKey) as UiTheme | null
    return stored ?? defaultTheme
  }, [defaultTheme, storageKey])

  const [mode, setMode] = useState<UiTheme>(initialMode)
  const [resolved, setResolved] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") {
      return initialMode === "dark" ||
        (initialMode === "system" && defaultTheme === "dark")
        ? "dark"
        : "light"
    }
    return initialMode === "system" ? getSystemTheme() : initialMode
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(resolved)
  }, [resolved])

  useEffect(() => {
    setResolved(mode === "system" ? getSystemTheme() : mode)
  }, [mode])

  useEffect(() => {
    if (mode !== "system") return

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => setResolved(media.matches ? "dark" : "light")

    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [mode])

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) return
      const next = (e.newValue as UiTheme | null) ?? defaultTheme
      setMode(next)
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [storageKey, defaultTheme])

  const setTheme = (theme: UiTheme) => {
    try {
      window.localStorage.setItem(storageKey, theme)
    } catch {
      // ignore quota/SSR errors; still update state
    }
    setMode(theme)
  }

  return (
    <ThemeCtx.Provider value={{ mode, resolved, setMode, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export default UiThemeProvider

export function useTheme(): UiThemeProviderState {
  const ctx = useContext(ThemeCtx)
  if (!ctx) throw new Error("useTheme must be used within <ui-theme-provider>")
  return ctx
}
