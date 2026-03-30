"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { FieldError } from "@/components/ui/field"
import {
  type FormError,
  type FormErrorsContextValue,
  type FormInteractionContextValue,
  type FormItemContextValue,
  FormSubmittingContext,
  FormErrorsContext,
  FormInteractionContext,
  FormItemContext,
} from "../form-context"

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
  const errors: FormError[] = typeof propErrors === "string" ? JSON.parse(propErrors) : (propErrors ?? [])
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
      // When no custom handler is provided, allow native form submission
      if (!userOnSubmit) return
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
      // Check the target element itself, then walk up to find data-auto-submit.
      // Note: custom elements (ui-select etc.) are rendered as React components and
      // their attributes are not present in the DOM — put data-auto-submit on the
      // <form> element itself to trigger submission on any field change.
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

      if (!userOnSubmit) {
        // No custom handler: trigger native form submission
        form.requestSubmit()
        return
      }

      const submitEvent = new SubmitEvent("submit", {
        submitter: submitElement as HTMLElement,
      })
      Object.defineProperty(submitEvent, "target", {
        writable: false,
        value: form,
      })
      handleSubmit(submitEvent)
    },
    [handleSubmit, userOnSubmit],
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

  const submitForm = React.useCallback(() => {
    const form = formRef.current
    if (!form) return
    if (!userOnSubmit) {
      form.requestSubmit()
      return
    }
    const submitEvent = new SubmitEvent("submit", { submitter: form })
    Object.defineProperty(submitEvent, "target", {
      writable: false,
      value: form,
    })
    handleSubmit(submitEvent)
  }, [handleSubmit, userOnSubmit])

  const interactionCtx = React.useMemo<FormInteractionContextValue>(
    () => ({
      triggerFormChange: (target) => autoSubmit(target, "onChange"),
      triggerFormBlur: (target) => autoSubmit(target, "onBlur"),
      submitForm,
    }),
    [autoSubmit, submitForm],
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
              <Alert variant="destructive" className="mb-4">
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
  autoSubmit,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { name: string; autoSubmit?: string }) {
  const errorsCtx = React.useContext(FormErrorsContext)
  const errors = errorsCtx ? errorsCtx.getErrors(name) : []
  const invalid = errors.length > 0

  const ctx = React.useMemo<FormItemContextValue>(
    () => ({
      name,
      invalid,
      touchErrors: () => errorsCtx?.touchErrors(name),
      autoSubmit,
    }),
    [name, invalid, errorsCtx, autoSubmit],
  )

  const handleChange = React.useCallback(() => {
    errorsCtx?.touchErrors(name)
  }, [errorsCtx, name])

  return (
    <FormItemContext.Provider value={ctx}>
      <div
        data-slot="form-item"
        data-invalid={invalid || undefined}
        data-auto-submit={autoSubmit}
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

export default Form

export {
  Form,
  FormItem,
}
