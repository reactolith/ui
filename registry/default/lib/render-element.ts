import { Children, isValidElement, useState, useEffect, type ReactNode, type ReactElement } from "react"

export function getSingleElement(children: ReactNode): ReactElement | null {
  const childArray = Children.toArray(children).filter(
    (child) => !(typeof child === "string" && child.trim() === "")
  )
  if (childArray.length === 1 && isValidElement(childArray[0])) {
    return childArray[0] as ReactElement
  }
  return null
}
