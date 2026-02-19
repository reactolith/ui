import * as React from "react"
import { SelectItem } from "@/components/ui/select"
import { useSelectItemsRegister } from "@/registry/default/lib/select-items"

const UiSelectItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof SelectItem>
>(({ value, children, ...props }, ref) => {
  const register = useSelectItemsRegister()

  React.useEffect(() => {
    if (register && value != null) {
      const label =
        typeof children === "string"
          ? children
          : typeof children === "number"
            ? String(children)
            : String(value)
      register.registerItem(String(value), label)
      return () => register.unregisterItem(String(value))
    }
  }, [register, value, children])

  return (
    <SelectItem ref={ref} value={value} {...props}>
      {children}
    </SelectItem>
  )
})

UiSelectItem.displayName = "UiSelectItem"
export default UiSelectItem
