import * as React from "react"
import { Combobox } from "@/components/ui/combobox"

type ComboboxItem = string | { value: string; label: string }

export const ComboboxItemsContext = React.createContext<ComboboxItem[] | null>(null)

function ComboboxWrapper({
  items,
  children,
  ...props
}: React.ComponentProps<typeof Combobox> & { items?: ComboboxItem[] }) {
  if (!items) {
    return <Combobox {...props}>{children}</Combobox>
  }

  const hasObjects = items.length > 0 && typeof items[0] === "object"

  return (
    <ComboboxItemsContext.Provider value={items}>
      <Combobox
        items={items}
        {...(hasObjects
          ? { getOptionAsString: (item: ComboboxItem) => (typeof item === "string" ? item : item.label) }
          : {})}
        {...props}
      >
        {children}
      </Combobox>
    </ComboboxItemsContext.Provider>
  )
}

export default ComboboxWrapper
