"use client"

import * as React from "react"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type FormError = {
  message: string
  name?: string
  id?: string
  label?: string
  touched?: boolean
}

export type FormErrorsContextValue = {
  errors: FormError[]
  getErrors: (name: string, includeTouched?: boolean) => FormError[]
  getAllErrors: (includeTouched?: boolean) => FormError[]
  touchErrors: (name: string) => void
}

export type FormInteractionContextValue = {
  triggerFormChange: (target: HTMLElement) => void
  triggerFormBlur: (target: HTMLElement) => void
  /** Submit the form directly (no DOM element needed). Used by React-based
   *  form components (checkbox, select, combobox, …) that don't fire native
   *  change/blur events. */
  submitForm: () => void
}

export type FormItemContextValue = {
  name: string
  invalid: boolean
  touchErrors: () => void
  autoSubmit?: string
}

// ---------------------------------------------------------------------------
// Contexts
// ---------------------------------------------------------------------------

export const FormSubmittingContext = React.createContext(false)
export const FormErrorsContext = React.createContext<FormErrorsContextValue | null>(null)
export const FormInteractionContext = React.createContext<FormInteractionContextValue | null>(null)
export const FormItemContext = React.createContext<FormItemContextValue | null>(null)

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export function useFormSubmitting() {
  return React.useContext(FormSubmittingContext)
}

export function useFormErrors() {
  const ctx = React.useContext(FormErrorsContext)
  if (!ctx) throw new Error("useFormErrors must be used within <Form>")
  return ctx
}

export function useFormInteraction() {
  const ctx = React.useContext(FormInteractionContext)
  if (!ctx) throw new Error("useFormInteraction must be used within <Form>")
  return ctx
}

export function useFormItem() {
  return React.useContext(FormItemContext)
}
