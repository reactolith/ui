import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import * as React from "react"
import { Form, FormItem } from "../form"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Render a <Form> with method="get" (no onSubmit → native submission path) */
function renderForm(ui: React.ReactNode) {
  return render(
    <Form method="get" data-testid="form">
      {ui}
    </Form>,
  )
}

// ---------------------------------------------------------------------------
// 1) Native <select> inside FormItem with auto-submit="onChange"
// ---------------------------------------------------------------------------

describe("auto-submit: native select (onChange)", () => {
  it("submits the form when native select changes", () => {
    const submitHandler = vi.fn((e: Event) => e.preventDefault())

    const { container } = render(
      <Form onSubmit={submitHandler as any} data-testid="form">
        <FormItem name="color" autoSubmit="onChange">
          <select name="color" data-testid="select">
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </FormItem>
      </Form>,
    )

    const select = screen.getByTestId("select")
    fireEvent.change(select, { target: { value: "blue" } })

    expect(submitHandler).toHaveBeenCalledTimes(1)
  })

  it("does NOT submit when autoSubmit is not set", () => {
    const submitHandler = vi.fn((e: Event) => e.preventDefault())

    render(
      <Form onSubmit={submitHandler as any}>
        <FormItem name="color">
          <select name="color" data-testid="select">
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </FormItem>
      </Form>,
    )

    fireEvent.change(screen.getByTestId("select"), { target: { value: "blue" } })
    expect(submitHandler).not.toHaveBeenCalled()
  })

  it("does NOT submit when autoSubmit is onBlur but change fires", () => {
    const submitHandler = vi.fn((e: Event) => e.preventDefault())

    render(
      <Form onSubmit={submitHandler as any}>
        <FormItem name="color" autoSubmit="onBlur">
          <select name="color" data-testid="select">
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </FormItem>
      </Form>,
    )

    fireEvent.change(screen.getByTestId("select"), { target: { value: "blue" } })
    expect(submitHandler).not.toHaveBeenCalled()
  })
})

// ---------------------------------------------------------------------------
// 2) Native <input> inside FormItem with auto-submit="onBlur"
// ---------------------------------------------------------------------------

describe("auto-submit: native input (onBlur)", () => {
  it("submits the form when input loses focus", () => {
    const submitHandler = vi.fn((e: Event) => e.preventDefault())

    render(
      <Form onSubmit={submitHandler as any}>
        <FormItem name="username" autoSubmit="onBlur">
          <input name="username" data-testid="input" defaultValue="test" />
        </FormItem>
      </Form>,
    )

    const input = screen.getByTestId("input")
    fireEvent.focus(input)
    fireEvent.blur(input)

    expect(submitHandler).toHaveBeenCalledTimes(1)
  })
})

// ---------------------------------------------------------------------------
// 3) React component using submitForm() via FormInteractionContext
//    (simulates what formFieldChecked / formFieldValue / selectProvider do)
// ---------------------------------------------------------------------------

import { FormInteractionContext, FormItemContext } from "../../form-context"

/** Fake React form component that calls submitForm() when its value changes */
function FakeReactSelect({ onChange }: { onChange?: () => void }) {
  const formItem = React.useContext(FormItemContext)
  const interaction = React.useContext(FormInteractionContext)

  const handleChange = () => {
    onChange?.()
    if (formItem?.autoSubmit === "onChange" && interaction) {
      interaction.submitForm()
    }
  }

  return (
    <button type="button" data-testid="fake-select" onClick={handleChange}>
      Change value
    </button>
  )
}

describe("auto-submit: React component via submitForm() context", () => {
  it("submits the form when React component calls submitForm()", () => {
    const submitHandler = vi.fn((e: Event) => e.preventDefault())

    render(
      <Form onSubmit={submitHandler as any}>
        <FormItem name="framework" autoSubmit="onChange">
          <FakeReactSelect />
        </FormItem>
      </Form>,
    )

    fireEvent.click(screen.getByTestId("fake-select"))
    expect(submitHandler).toHaveBeenCalledTimes(1)
  })

  it("does NOT submit when autoSubmit is not set on FormItem", () => {
    const submitHandler = vi.fn((e: Event) => e.preventDefault())

    render(
      <Form onSubmit={submitHandler as any}>
        <FormItem name="framework">
          <FakeReactSelect />
        </FormItem>
      </Form>,
    )

    fireEvent.click(screen.getByTestId("fake-select"))
    expect(submitHandler).not.toHaveBeenCalled()
  })
})

// ---------------------------------------------------------------------------
// 4) Native form submission (no onSubmit handler)
// ---------------------------------------------------------------------------

describe("auto-submit: native form submission (no onSubmit handler)", () => {
  it("calls requestSubmit on the form element", () => {
    const { container } = render(
      <Form method="get">
        <FormItem name="theme" autoSubmit="onChange">
          <select name="theme" data-testid="select">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </FormItem>
      </Form>,
    )

    const form = container.querySelector("form")!
    const requestSubmitSpy = vi.spyOn(form, "requestSubmit").mockImplementation(() => {})

    fireEvent.change(screen.getByTestId("select"), { target: { value: "dark" } })
    expect(requestSubmitSpy).toHaveBeenCalledTimes(1)

    requestSubmitSpy.mockRestore()
  })

  it("calls requestSubmit via submitForm() for React components", () => {
    const { container } = render(
      <Form method="get">
        <FormItem name="framework" autoSubmit="onChange">
          <FakeReactSelect />
        </FormItem>
      </Form>,
    )

    const form = container.querySelector("form")!
    const requestSubmitSpy = vi.spyOn(form, "requestSubmit").mockImplementation(() => {})

    fireEvent.click(screen.getByTestId("fake-select"))
    expect(requestSubmitSpy).toHaveBeenCalledTimes(1)

    requestSubmitSpy.mockRestore()
  })
})
