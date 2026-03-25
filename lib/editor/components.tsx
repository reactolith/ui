/**
 * Plate node components for rendering editor elements.
 *
 * These components define how each node type (element/leaf) is rendered
 * in the editor. Plugins with simple HTML mappings (bold→strong, h1→h1, etc.)
 * use their built-in `render.as` and don't need explicit components here.
 *
 * This file covers the more complex plugins that need custom rendering:
 * link, list, table, code-block, callout, toggle, image.
 */

import * as React from "react"
import { PlateElement, PlateLeaf, type PlateElementProps } from "platejs/react"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Link
// ---------------------------------------------------------------------------

export function LinkElement({
  children,
  className,
  element,
  ...props
}: PlateElementProps) {
  return (
    <PlateElement
      as="a"
      className={cn("text-primary underline decoration-primary underline-offset-4 font-medium", className)}
      {...props}
      // @ts-expect-error - element has url property from LinkPlugin
      href={element.url as string}
      target="_blank"
      rel="noopener noreferrer"
      element={element}
    >
      {children}
    </PlateElement>
  )
}

// ---------------------------------------------------------------------------
// List
// ---------------------------------------------------------------------------

export function ListElement({
  children,
  className,
  element,
  ...props
}: PlateElementProps) {
  // Plate list plugin uses a unified "list" type with a `listType` property
  const Tag = (element as Record<string, unknown>).listType === "ol" ? "ol" : "ul"

  return (
    <PlateElement
      as={Tag}
      className={cn(
        Tag === "ol" ? "list-decimal" : "list-disc",
        "my-2 ml-6",
        className,
      )}
      element={element}
      {...props}
    >
      {children}
    </PlateElement>
  )
}

// ---------------------------------------------------------------------------
// Table
// ---------------------------------------------------------------------------

export function TableElement({
  children,
  className,
  ...props
}: PlateElementProps) {
  return (
    <PlateElement
      as="table"
      className={cn(
        "my-4 w-full border-collapse border border-border",
        className,
      )}
      {...props}
    >
      <tbody>{children}</tbody>
    </PlateElement>
  )
}

export function TableRowElement({
  children,
  className,
  ...props
}: PlateElementProps) {
  return (
    <PlateElement as="tr" className={cn("border-b border-border", className)} {...props}>
      {children}
    </PlateElement>
  )
}

export function TableCellElement({
  children,
  className,
  ...props
}: PlateElementProps) {
  return (
    <PlateElement
      as="td"
      className={cn("border border-border p-2 text-left align-top", className)}
      {...props}
    >
      {children}
    </PlateElement>
  )
}

export function TableCellHeaderElement({
  children,
  className,
  ...props
}: PlateElementProps) {
  return (
    <PlateElement
      as="th"
      className={cn(
        "border border-border bg-muted p-2 text-left font-bold align-top",
        className,
      )}
      {...props}
    >
      {children}
    </PlateElement>
  )
}

// ---------------------------------------------------------------------------
// Code Block
// ---------------------------------------------------------------------------

export function CodeLineElement({
  children,
  className,
  ...props
}: PlateElementProps) {
  return (
    <PlateElement as="div" className={cn("px-4 py-0.5", className)} {...props}>
      {children}
    </PlateElement>
  )
}

export function CodeSyntaxLeaf({
  children,
  className,
  leaf,
  ...props
}: React.ComponentProps<typeof PlateLeaf>) {
  return (
    <PlateLeaf
      className={cn("text-muted-foreground", className)}
      leaf={leaf}
      {...props}
    >
      {children}
    </PlateLeaf>
  )
}

// ---------------------------------------------------------------------------
// Image
// ---------------------------------------------------------------------------

export function ImageElement({
  children,
  className,
  element,
  ...props
}: PlateElementProps) {
  const { url, caption, width } = element as Record<string, unknown>

  return (
    <PlateElement className={cn("my-4", className)} element={element} {...props}>
      <figure>
        <img
          src={url as string}
          alt={(caption as string) ?? ""}
          style={{ width: width ? `${width}px` : undefined, maxWidth: "100%" }}
          className="rounded-md"
        />
        {typeof caption === "string" && caption && (
          <figcaption className="mt-1 text-center text-sm text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>
      {children}
    </PlateElement>
  )
}

// ---------------------------------------------------------------------------
// Callout
// ---------------------------------------------------------------------------

export function CalloutElement({
  children,
  className,
  element,
  ...props
}: PlateElementProps) {
  const variant = (element as Record<string, unknown>).variant as string | undefined
  return (
    <PlateElement
      className={cn(
        "my-2 rounded-lg border p-4",
        variant === "warning" && "border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20",
        variant === "error" && "border-red-500/50 bg-red-50 dark:bg-red-950/20",
        variant === "success" && "border-green-500/50 bg-green-50 dark:bg-green-950/20",
        !variant && "border-blue-500/50 bg-blue-50 dark:bg-blue-950/20",
        className,
      )}
      element={element}
      {...props}
    >
      {children}
    </PlateElement>
  )
}

// ---------------------------------------------------------------------------
// Toggle (collapsible)
// ---------------------------------------------------------------------------

export function ToggleElement({
  children,
  className,
  element,
  ...props
}: PlateElementProps) {
  const [open, setOpen] = React.useState(true)

  return (
    <PlateElement className={cn("my-2", className)} element={element} {...props}>
      <details open={open} onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}>
        <summary className="cursor-pointer select-none font-medium">
          {/* First child is the summary text */}
        </summary>
        {children}
      </details>
    </PlateElement>
  )
}

// ---------------------------------------------------------------------------
// Horizontal Rule (void element — must not render children into DOM)
// ---------------------------------------------------------------------------

export function HorizontalRuleElement({
  children,
  className,
  ...props
}: PlateElementProps) {
  return (
    <PlateElement className={cn("my-4", className)} {...props}>
      <hr className="border-t border-border" contentEditable={false} />
      {children}
    </PlateElement>
  )
}

// ---------------------------------------------------------------------------
// Component map for override.components
// ---------------------------------------------------------------------------

export function getEditorComponents(): Record<string, React.FC<PlateElementProps>> {
  return {
    a: LinkElement,
    list: ListElement,
    table: TableElement,
    tr: TableRowElement,
    td: TableCellElement,
    th: TableCellHeaderElement,
    code_line: CodeLineElement,
    img: ImageElement,
    hr: HorizontalRuleElement,
    callout: CalloutElement,
    toggle: ToggleElement,
  }
}
