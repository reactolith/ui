import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import * as React from "react"
import { Form, FormItem } from "../../components/form"
import { formField, formFieldChecked, formFieldValue } from "../behaviors"

// ---------------------------------------------------------------------------
// Minimal fake components that mimic Base UI component contracts
// ---------------------------------------------------------------------------

/** Fake Checkbox: calls onCheckedChange when clicked */
const FakeCheckbox = React.forwardRef(
  ({ onCheckedChange, ...props }: any, ref: any) => (
    <button
      ref={ref}
      type="button"
      data-testid="checkbox"
      onClick={() => onCheckedChange?.(!props.checked)}
      {...props}
    />
  ),
)

/** Fake Select: calls onValueChange when clicked */
const FakeSelect = React.forwardRef(
  ({ onValueChange, children, ...props }: any, ref: any) => (
    <div ref={ref} {...props}>
      <button
        type="button"
        data-testid="select-trigger"
        onClick={() => onValueChange?.("new-value")}
      />
      {children}
    </div>
  ),
)

/** Fake native Input */
const FakeInput = React.forwardRef(
  (props: any, ref: any) => (
    <input ref={ref} data-testid="input" {...props} />
  ),
)

// ---------------------------------------------------------------------------
// Tests for formFieldChecked behavior (Checkbox, Switch)
// ---------------------------------------------------------------------------

describe("formFieldChecked behavior", () => {
  it("triggers auto-submit on onCheckedChange when autoSubmit=onChange", () => {
    const WrappedCheckbox = formFieldChecked.hoc(FakeCheckbox)
    const submitHandler = vi.fn((e: Event) => e.preventDefault())

    render(
      <Form onSubmit={submitHandler as any}>
        <FormItem name="notify" autoSubmit="onChange">
          <WrappedCheckbox />
        </FormItem>
      </Form>,
    )

    fireEvent.click(screen.getByTestId("checkbox"))
    expect(submitHandler).toHaveBeenCalledTimes(1)
  })

  it("does NOT trigger auto-submit when autoSubmit is not set", () => {
    const WrappedCheckbox = formFieldChecked.hoc(FakeCheckbox)
    const submitHandler = vi.fn((e: Event) => e.preventDefault())

    render(
      <Form onSubmit={submitHandler as any}>
        <FormItem name="notify">
          <WrappedCheckbox />
        </FormItem>
      </Form>,
    )

    fireEvent.click(screen.getByTestId("checkbox"))
    expect(submitHandler).not.toHaveBeenCalled()
  })

  it("still calls the original onCheckedChange callback", () => {
    const WrappedCheckbox = formFieldChecked.hoc(FakeCheckbox)
    const originalHandler = vi.fn()

    render(
      <Form>
        <FormItem name="notify" autoSubmit="onChange">
          <WrappedCheckbox onCheckedChange={originalHandler} />
        </FormItem>
      </Form>,
    )

    fireEvent.click(screen.getByTestId("checkbox"))
    expect(originalHandler).toHaveBeenCalledTimes(1)
  })
})

// ---------------------------------------------------------------------------
// Tests for formFieldValue behavior (Slider, RadioGroup)
// ---------------------------------------------------------------------------

describe("formFieldValue behavior", () => {
  it("triggers auto-submit on onValueChange when autoSubmit=onChange", () => {
    const WrappedSelect = formFieldValue.hoc(FakeSelect)
    const submitHandler = vi.fn((e: Event) => e.preventDefault())

    render(
      <Form onSubmit={submitHandler as any}>
        <FormItem name="size" autoSubmit="onChange">
          <WrappedSelect />
        </FormItem>
      </Form>,
    )

    fireEvent.click(screen.getByTestId("select-trigger"))
    expect(submitHandler).toHaveBeenCalledTimes(1)
  })
})

// ---------------------------------------------------------------------------
// Tests for formField behavior (native inputs: value → defaultValue)
// ---------------------------------------------------------------------------

describe("formField behavior (native inputs)", () => {
  it("maps value to defaultValue", () => {
    const WrappedInput = formField.hoc(FakeInput)

    render(
      <Form>
        <FormItem name="username">
          <WrappedInput value="hello" />
        </FormItem>
      </Form>,
    )

    const input = screen.getByTestId("input") as HTMLInputElement
    // value prop should become defaultValue → input shows the value but is uncontrolled
    expect(input.defaultValue).toBe("hello")
    // The displayed value should be "hello"
    expect(input.value).toBe("hello")
  })

  it("does NOT override existing defaultValue with value", () => {
    const WrappedInput = formField.hoc(FakeInput)

    render(
      <Form>
        <FormItem name="username">
          <WrappedInput value="from-value" defaultValue="from-default" />
        </FormItem>
      </Form>,
    )

    const input = screen.getByTestId("input") as HTMLInputElement
    // When both value and defaultValue are set, value should pass through as-is
    expect(input.value).toBe("from-value")
  })

  it("auto-submits on native change via DOM event bubbling", () => {
    const WrappedInput = formField.hoc(FakeInput)
    const submitHandler = vi.fn((e: Event) => e.preventDefault())

    render(
      <Form onSubmit={submitHandler as any}>
        <FormItem name="username" autoSubmit="onChange">
          <WrappedInput />
        </FormItem>
      </Form>,
    )

    fireEvent.change(screen.getByTestId("input"), { target: { value: "new" } })
    expect(submitHandler).toHaveBeenCalledTimes(1)
  })
})

// ---------------------------------------------------------------------------
// Test: native form submission (no onSubmit) with requestSubmit
// ---------------------------------------------------------------------------

describe("native form submission via submitForm()", () => {
  it("calls requestSubmit when React component triggers submitForm without onSubmit", () => {
    const WrappedCheckbox = formFieldChecked.hoc(FakeCheckbox)

    const { container } = render(
      <Form method="get">
        <FormItem name="notify" autoSubmit="onChange">
          <WrappedCheckbox />
        </FormItem>
      </Form>,
    )

    const form = container.querySelector("form")!
    const spy = vi.spyOn(form, "requestSubmit").mockImplementation(() => {})

    fireEvent.click(screen.getByTestId("checkbox"))
    expect(spy).toHaveBeenCalledTimes(1)

    spy.mockRestore()
  })
})
