import * as React from "react"
import { Select } from "@/components/ui/select"
import { SelectItemsProvider } from "@/registry/default/lib/select-items"

const UiSelect = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Select>
>(({ children, ...props }, ref) => {
  const [items, setItems] = React.useState<Record<string, string> | undefined>(undefined)

  const handleItemsChange = React.useCallback((next: Record<string, string>) => {
    setItems(Object.keys(next).length > 0 ? next : undefined)
  }, [])

  return (
    <SelectItemsProvider onItemsChange={handleItemsChange}>
      <Select ref={ref} items={items} {...props}>
        {children}
      </Select>
    </SelectItemsProvider>
  )
})

UiSelect.displayName = "UiSelect"
export default UiSelect
