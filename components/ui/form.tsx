"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { FieldError } from "@/components/ui/field"

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

// ---------------------------------------------------------------------------
// Contexts
// ---------------------------------------------------------------------------

type FormErrorsContextValue = {
  errors: FormError[]
  getErrors: (name: string, includeTouched?: boolean) => FormError[]
  getAllErrors: (includeTouched?: boolean) => FormError[]
  touchErrors: (name: string) => void
}

type FormInteractionContextValue = {
  triggerFormChange: (target: HTMLElement) => void
  triggerFormBlur: (target: HTMLElement) => void
}

type FormItemContextValue = {
  name: string
  invalid: boolean
  touchErrors: () => void
}

const FormSubmittingContext = React.createContext(false)
const FormErrorsContext = React.createContext<FormErrorsContextValue | null>(null)
const FormInteractionContext = React.createContext<FormInteractionContextValue | null>(null)
const FormItemContext = React.createContext<FormItemContextValue | null>(null)

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

function useFormSubmitting() {
  return React.useContext(FormSubmittingContext)
}

function useFormErrors() {
  const ctx = React.useContext(FormErrorsContext)
  if (!ctx) throw new Error("useFormErrors must be used within <Form>")
  return ctx
}

function useFormInteraction() {
  const ctx = React.useContext(FormInteractionContext)
  if (!ctx) throw new Error("useFormInteraction must be used within <Form>")
  return ctx
}

function useFormItem() {
  return React.useContext(FormItemContext)
}

// ---------------------------------------------------------------------------
// Form
// ---------------------------------------------------------------------------

function Form({
  errors: propErrors,
  errorsTitle,
  onSubmit: userOnSubmit,
  className,
  children,
  ...props
}: React.ComponentProps<"form"> & {
  errors?: FormError[]
  errorsTitle?: string
}) {
  const errors = propErrors || []
  const formRef = React.useRef<HTMLFormElement>(null)
  const [touchedMap, setTouchedMap] = React.useState<Record<string, boolean>>({})
  const [submitting, setSubmitting] = React.useState(false)

  const getErrors = React.useCallback(
    (name: string, includeTouched = false) =>
      errors.filter((e) => {
        const key = e.id ?? e.name
        const touched = key ? (touchedMap[key] ?? e.touched) : false
        return key === name && (!touched || includeTouched)
      }),
    [errors, touchedMap],
  )

  const getAllErrors = React.useCallback(
    (includeTouched = false) =>
      errors.filter((e) => {
        const key = e.id ?? e.name
        const touched = key ? (touchedMap[key] ?? e.touched) : false
        return !touched || includeTouched
      }),
    [errors, touchedMap],
  )

  const touchErrors = React.useCallback(
    (name: string) => {
      setTouchedMap((prev) => {
        const next = { ...prev }
        errors.forEach((e) => {
          const key = e.id ?? e.name
          if (key === name) next[key] = true
        })
        return next
      })
    },
    [errors],
  )

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement> | SubmitEvent) => {
      if (submitting) return
      event.preventDefault()
      setSubmitting(true)
      try {
        const nativeEvent =
          "nativeEvent" in event ? event.nativeEvent : event
        await (userOnSubmit as any)?.(nativeEvent)
      } finally {
        setTouchedMap({})
        setSubmitting(false)
      }
    },
    [submitting, userOnSubmit],
  )

  const autoSubmit = React.useCallback(
    (target: HTMLElement, triggerType: string) => {
      const submitElement = target.hasAttribute("data-auto-submit")
        ? target
        : target.closest("[data-auto-submit]")
      if (
        !submitElement ||
        submitElement.getAttribute("data-auto-submit") !== triggerType
      )
        return

      const form = formRef.current
      if (!form) return

      const submitEvent = new SubmitEvent("submit", {
        submitter: submitElement as HTMLElement,
      })
      Object.defineProperty(submitEvent, "target", {
        writable: false,
        value: form,
      })
      handleSubmit(submitEvent)
    },
    [handleSubmit],
  )

  const handleFormChange: React.FormEventHandler<HTMLFormElement> =
    React.useCallback(
      (event) => autoSubmit(event.target as HTMLElement, "onChange"),
      [autoSubmit],
    )

  const handleFormBlur: React.FocusEventHandler<HTMLFormElement> =
    React.useCallback(
      (event) => autoSubmit(event.target as HTMLElement, "onBlur"),
      [autoSubmit],
    )

  const errorsCtx = React.useMemo<FormErrorsContextValue>(
    () => ({ errors, getErrors, getAllErrors, touchErrors }),
    [errors, getErrors, getAllErrors, touchErrors],
  )

  const interactionCtx = React.useMemo<FormInteractionContextValue>(
    () => ({
      triggerFormChange: (target) => autoSubmit(target, "onChange"),
      triggerFormBlur: (target) => autoSubmit(target, "onBlur"),
    }),
    [autoSubmit],
  )

  const allErrors = getAllErrors()

  const formatError = (e: FormError): string => {
    const prefix = e.label || e.name ? `${e.label || e.name}: ` : ""
    return `${prefix}${e.message}`
  }

  return (
    <FormInteractionContext.Provider value={interactionCtx}>
      <FormErrorsContext.Provider value={errorsCtx}>
        <FormSubmittingContext.Provider value={submitting}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            onChange={handleFormChange}
            onBlur={handleFormBlur}
            className={cn(className)}
            {...props}
          >
            {allErrors.length > 0 && (
              <Alert variant="destructive">
                {errorsTitle && <AlertTitle>{errorsTitle}</AlertTitle>}
                <AlertDescription>
                  <ul className="list-inside list-disc text-sm">
                    {allErrors.map((e) => (
                      <li key={e.id ?? e.name ?? e.label ?? e.message}>
                        {e.id ? (
                          <a href={`#${e.id}`}>{formatError(e)}</a>
                        ) : (
                          <span>{formatError(e)}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
            {children}
          </form>
        </FormSubmittingContext.Provider>
      </FormErrorsContext.Provider>
    </FormInteractionContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// FormItem
// ---------------------------------------------------------------------------

function FormItem({
  name,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { name: string }) {
  const errorsCtx = React.useContext(FormErrorsContext)
  const errors = errorsCtx ? errorsCtx.getErrors(name) : []
  const invalid = errors.length > 0

  const ctx = React.useMemo<FormItemContextValue>(
    () => ({
      name,
      invalid,
      touchErrors: () => errorsCtx?.touchErrors(name),
    }),
    [name, invalid, errorsCtx],
  )

  const handleChange = React.useCallback(() => {
    errorsCtx?.touchErrors(name)
  }, [errorsCtx, name])

  return (
    <FormItemContext.Provider value={ctx}>
      <div
        data-slot="form-item"
        data-invalid={invalid || undefined}
        className={cn(className)}
        onChange={handleChange}
        {...props}
      >
        {children}
        {invalid && (
          <FieldError errors={errors.map((e) => ({ message: e.message }))} />
        )}
      </div>
    </FormItemContext.Provider>
  )
}

export {
  Form,
  FormItem,
  FormSubmittingContext,
  FormItemContext,
  useFormSubmitting,
  useFormErrors,
  useFormInteraction,
  useFormItem,
}
