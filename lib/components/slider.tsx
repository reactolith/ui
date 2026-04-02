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

function toArray(v: number | number[] | undefined): number[] | undefined {
  if (v === undefined) return undefined
  return Array.isArray(v) ? v : [v]
}

// ---------------------------------------------------------------------------
// ValueIndicator — positioned label above the slider track
// ---------------------------------------------------------------------------

function ValueIndicator({ value, min, max }: { value: number; min: number; max: number }) {
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100
  return (
    <span
      className="absolute -translate-x-1/2 px-2 py-0.5 rounded-md bg-primary text-primary-foreground text-xs font-medium tabular-nums whitespace-nowrap"
      style={{ left: `${pct}%` }}
    >
      {value}
    </span>
  )
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
   * Name for hidden form input(s).
   * Single slider: uses Base UI's native name prop (no manual hidden input).
   * Range slider: renders hidden inputs named `{name}[from]` and `{name}[to]`.
   */
  name?: string
  /** Explicit name for the "from" hidden input (range slider). Overrides `{name}[from]`. */
  nameFrom?: string
  /** Explicit name for the "to" hidden input (range slider). Overrides `{name}[to]`. */
  nameTo?: string
  /** Show value indicators above each thumb. "always" = always visible, "hover" = only on hover/drag. */
  showValue?: boolean | "always" | "hover"
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
  showValue: showValueProp = false,
  disabled: disabledProp = false,
  className,
  is: _is,
  ...props
}: SliderProps & { is?: string }) {
  const formItem = React.useContext(FormItemContext)
  const interaction = React.useContext(FormInteractionContext)
  const submitting = React.useContext(FormSubmittingContext)

  const controlledValue = toArray(valueProp)
  const rawDefault = toArray(defaultValueProp)

  const [internalValue, setInternalValue] = React.useState<number[]>(
    () => rawDefault ?? [min],
  )

  // showValue: true/"always" → always visible, "hover" → only on hover/drag
  const showMode = showValueProp === true || showValueProp === "always" ? "always" : showValueProp === "hover" ? "hover" : null

  const currentValue = controlledValue ?? internalValue
  const isRange = currentValue.length >= 2
  const disabled = disabledProp || submitting || false

  // Key changes when server sends new HTML with different defaults → full remount.
  const defaultKey = rawDefault?.join(",") ?? ""

  // --- Callbacks -----------------------------------------------------------

  const onValueChange = React.useCallback(
    (value: number | readonly number[], event: { activeThumbIndex: number }) => {
      const arr = Array.isArray(value) ? [...value] : [value]
      setInternalValue(arr)
      userOnValueChange?.(arr, event.activeThumbIndex)
    },
    [userOnValueChange],
  )

  const onValueCommitted = React.useCallback(
    (value: number | readonly number[], _event: any) => {
      const arr = Array.isArray(value) ? [...value] : [value]
      userOnValueCommitted?.(arr, 0)
      formItem?.touchErrors()

      if (formItem?.autoSubmit === "onChange" && interaction) {
        interaction.submitForm()
      }
    },
    [userOnValueCommitted, formItem, interaction],
  )

  // --- Form inputs ---------------------------------------------------------
  // Always use <input type="hidden"> (not Base UI's native name prop which
  // renders <input type="range"> that steals focus and breaks blur handling).

  const needsRangeInputs = isRange && (name || nameFrom || nameTo)
  const needsSingleInput = !isRange && name

  // --- Render --------------------------------------------------------------

  return (
    <div key={defaultKey} data-slot="form-slider" className={showMode === "hover" ? "group/slider" : undefined}>
      {showMode && (
        <div
          className={`relative w-full h-6 mb-1 ${showMode === "hover" ? "opacity-0 group-hover/slider:opacity-100 transition-opacity" : ""}`}
          aria-hidden="true"
        >
          {currentValue.map((v, i) => (
            <ValueIndicator key={i} value={v} min={min} max={max} />
          ))}
        </div>
      )}
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
      {needsSingleInput && (
        <input type="hidden" name={name} value={String(currentValue[0])} />
      )}
      {needsRangeInputs && (
        <>
          <input type="hidden" name={nameFrom || (name ? `${name}[from]` : "")} value={String(currentValue[0])} />
          <input type="hidden" name={nameTo || (name ? `${name}[to]` : "")} value={String(currentValue[1])} />
        </>
      )}
    </div>
  )
}

export default Slider
export { Slider }
