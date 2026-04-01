"use client"

import * as React from "react"
import { Slider as BaseSlider } from "@/components/ui/slider"
import {
  FormItemContext,
  FormInteractionContext,
  FormSubmittingContext,
} from "../form-context"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Normalise a single number or number[] into a number[] */
function toArray(v: number | number[] | undefined): number[] | undefined {
  if (v === undefined) return undefined
  return Array.isArray(v) ? v : [v]
}

// ---------------------------------------------------------------------------
// FormSlider
// ---------------------------------------------------------------------------

interface SliderProps {
  /** Controlled value — single number or array. */
  value?: number | number[]
  /** Default (uncontrolled) value — single number or array. */
  defaultValue?: number | number[]
  /** Callback fired on every value change (during drag). */
  onValueChange?: (value: number[], thumb: number) => void
  /** Callback fired when the user finishes a drag / commits a value. */
  onValueCommitted?: (value: number[], thumb: number) => void
  min?: number
  max?: number
  step?: number
  /**
   * Name for hidden form input(s). For a single-thumb slider this renders one
   * hidden `<input>`. For a range slider (2 thumbs) it renders two hidden
   * inputs named `{name}[from]` and `{name}[to]` (Symfony-compatible).
   */
  name?: string
  /** Explicit name for the "from" hidden input (range slider). Overrides `{name}[from]`. */
  nameFrom?: string
  /** Explicit name for the "to" hidden input (range slider). Overrides `{name}[to]`. */
  nameTo?: string
  disabled?: boolean
  className?: string
}

function Slider({
  value: valueProp,
  defaultValue: defaultValueProp,
  onValueChange: userOnValueChange,
  onValueCommitted: userOnValueCommitted,
  min = 0,
  max = 100,
  step,
  name,
  nameFrom,
  nameTo,
  disabled: disabledProp = false,
  className,
  ...props
}: SliderProps) {
  const formItem = React.useContext(FormItemContext)
  const interaction = React.useContext(FormInteractionContext)
  const submitting = React.useContext(FormSubmittingContext)

  const controlledValue = toArray(valueProp)
  const rawDefault = toArray(defaultValueProp)

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = React.useState<number[]>(
    () => rawDefault ?? [min],
  )

  const currentValue = controlledValue ?? internalValue

  // Reset internal state when defaultValue changes (server sends new HTML)
  const defaultKey = rawDefault?.join(",") ?? ""
  React.useEffect(() => {
    if (controlledValue === undefined && rawDefault !== undefined) {
      setInternalValue(rawDefault)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultKey])

  const isRange = currentValue.length >= 2
  const disabled = disabledProp || submitting || false

  // --- Callbacks -----------------------------------------------------------

  const containerRef = React.useRef<HTMLDivElement>(null)

  const onValueChange = React.useCallback(
    (value: number[], thumb: number) => {
      setInternalValue(value)
      userOnValueChange?.(value, thumb)
    },
    [userOnValueChange],
  )

  const onValueCommitted = React.useCallback(
    (value: number[], thumb: number) => {
      userOnValueCommitted?.(value, thumb)
      formItem?.touchErrors()

      // Auto-submit on "onChange" triggers when the user finishes dragging
      if (formItem?.autoSubmit === "onChange" && interaction) {
        interaction.submitForm()
      }
    },
    [userOnValueCommitted, formItem, interaction],
  )

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      // Only trigger if focus leaves the entire slider container
      if (containerRef.current?.contains(e.relatedTarget as Node)) return

      if (formItem?.autoSubmit === "onBlur" && interaction) {
        interaction.submitForm()
      }
    },
    [formItem, interaction],
  )

  // --- Hidden inputs -------------------------------------------------------

  const hiddenInputs = React.useMemo(() => {
    const hasName = name || nameFrom || nameTo
    if (!hasName) return null

    if (isRange) {
      const fromName = nameFrom || (name ? `${name}[from]` : "")
      const toName = nameTo || (name ? `${name}[to]` : "")
      return (
        <>
          {fromName && (
            <input type="hidden" name={fromName} value={String(currentValue[0])} />
          )}
          {toName && (
            <input type="hidden" name={toName} value={String(currentValue[1])} />
          )}
        </>
      )
    }

    return name ? (
      <input type="hidden" name={name} value={String(currentValue[0])} />
    ) : null
  }, [name, nameFrom, nameTo, isRange, currentValue])

  // --- Render --------------------------------------------------------------

  return (
    <div ref={containerRef} onBlur={handleBlur} data-slot="form-slider">
      <BaseSlider
        value={controlledValue}
        defaultValue={rawDefault}
        onValueChange={onValueChange}
        onValueCommitted={onValueCommitted}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        aria-invalid={formItem?.invalid || undefined}
        className={className}
        {...props}
      />
      {hiddenInputs}
    </div>
  )
}

export default Slider
export { Slider }
