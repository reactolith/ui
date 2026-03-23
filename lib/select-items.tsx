import * as React from "react"

type SelectItemsContextValue = {
  registerItem: (value: string, label: string) => void
  unregisterItem: (value: string) => void
}

const SelectItemsContext = React.createContext<SelectItemsContextValue | null>(null)

export function useSelectItemsRegister() {
  return React.useContext(SelectItemsContext)
}

export function SelectItemsProvider({
  children,
  onItemsChange,
}: {
  children: React.ReactNode
  onItemsChange: (items: Record<string, string>) => void
}) {
  const itemsRef = React.useRef<Record<string, string>>({})
  const onItemsChangeRef = React.useRef(onItemsChange)
  onItemsChangeRef.current = onItemsChange

  const contextValue = React.useMemo<SelectItemsContextValue>(
    () => ({
      registerItem(value: string, label: string) {
        if (itemsRef.current[value] !== label) {
          itemsRef.current = { ...itemsRef.current, [value]: label }
          onItemsChangeRef.current(itemsRef.current)
        }
      },
      unregisterItem(value: string) {
        if (value in itemsRef.current) {
          const next = { ...itemsRef.current }
          delete next[value]
          itemsRef.current = next
          onItemsChangeRef.current(next)
        }
      },
    }),
    []
  )

  return (
    <SelectItemsContext.Provider value={contextValue}>
      {children}
    </SelectItemsContext.Provider>
  )
}
