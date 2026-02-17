import * as React from "react"
import { ComboboxList, ComboboxItem } from "@/components/ui/combobox"
import { ComboboxItemsContext } from "./combobox"

function ComboboxListWrapper({
  children,
  ...props
}: React.ComponentProps<typeof ComboboxList>) {
  const items = React.useContext(ComboboxItemsContext)

  if (items) {
    return (
      <ComboboxList {...props}>
        {(item: string | { value: string; label: string }) => {
          const value = typeof item === "string" ? item : item.value
          const label = typeof item === "string" ? item : item.label
          return (
            <ComboboxItem key={value} value={item}>
              {label}
            </ComboboxItem>
          )
        }}
      </ComboboxList>
    )
  }

  return <ComboboxList {...props}>{children}</ComboboxList>
}

export default ComboboxListWrapper
