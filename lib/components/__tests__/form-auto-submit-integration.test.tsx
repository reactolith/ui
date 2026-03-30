/**
 * Integration test: tests the actual components as they appear on the docs page.
 * Uses real NativeSelect (not mocked) + real Form + real FormItem.
 */
import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import * as React from "react"
import { Form, FormItem } from "../form"
import { NativeSelect } from "@/components/ui/native-select"
import { formField } from "@/lib/loader/behaviors"

// ---------------------------------------------------------------------------
// Test 1: Raw NativeSelect inside Form + FormItem (no loader, no behavior)
// ---------------------------------------------------------------------------

describe("integration: NativeSelect auto-submit (raw, no behavior)", () => {
  it("auto-submits when select changes via form onChange bubbling", () => {
    const submitHandler = vi.fn((e: Event) => e.preventDefault())

    render(
      <Form onSubmit={submitHandler as any}>
        <FormItem name="theme" autoSubmit="onChange">
          <NativeSelect name="theme" data-testid="select">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </NativeSelect>
        </FormItem>
      </Form>,
    )

    // The actual <select> is nested inside NativeSelect's wrapper div
    const select = screen.getByTestId("select").querySelector("select") || screen.getByTestId("select")
    fireEvent.change(select, { target: { value: "dark" } })
    expect(submitHandler).toHaveBeenCalledTimes(1)
  })
})

// ---------------------------------------------------------------------------
// Test 2: NativeSelect with formField behavior applied (like the real loader does)
// ---------------------------------------------------------------------------

describe("integration: NativeSelect with formField behavior", () => {
  it("auto-submits when the wrapped NativeSelect changes", () => {
    const WrappedNativeSelect = formField.hoc(NativeSelect)
    const submitHandler = vi.fn((e: Event) => e.preventDefault())

    render(
      <Form onSubmit={submitHandler as any}>
        <FormItem name="theme" autoSubmit="onChange">
          <WrappedNativeSelect name="theme" data-testid="wrapped-select">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </WrappedNativeSelect>
        </FormItem>
      </Form>,
    )

    const selectEl = document.querySelector("[data-slot='native-select']") as HTMLSelectElement
    expect(selectEl).toBeTruthy()
    fireEvent.change(selectEl, { target: { value: "dark" } })
    expect(submitHandler).toHaveBeenCalledTimes(1)
  })
})

// ---------------------------------------------------------------------------
// Test 3: Native form submission (method=get, no onSubmit) — the docs scenario
// ---------------------------------------------------------------------------

describe("integration: docs scenario (method=get, no onSubmit)", () => {
  it("calls requestSubmit when native select changes", () => {
    const { container } = render(
      <Form method="get">
        <FormItem name="theme" autoSubmit="onChange">
          <NativeSelect name="theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </NativeSelect>
        </FormItem>
      </Form>,
    )

    const form = container.querySelector("form")!
    const spy = vi.spyOn(form, "requestSubmit").mockImplementation(() => {})

    const selectEl = container.querySelector("[data-slot='native-select']") as HTMLSelectElement
    expect(selectEl).toBeTruthy()
    fireEvent.change(selectEl, { target: { value: "dark" } })
    expect(spy).toHaveBeenCalledTimes(1)

    spy.mockRestore()
  })

  it("verifies data-auto-submit attribute is present on FormItem div", () => {
    const { container } = render(
      <Form method="get">
        <FormItem name="theme" autoSubmit="onChange">
          <NativeSelect name="theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </NativeSelect>
        </FormItem>
      </Form>,
    )

    const formItemDiv = container.querySelector("[data-slot='form-item']")
    expect(formItemDiv).toBeTruthy()
    expect(formItemDiv!.getAttribute("data-auto-submit")).toBe("onChange")
  })

  it("verifies closest() finds data-auto-submit from nested select", () => {
    const { container } = render(
      <Form method="get">
        <FormItem name="theme" autoSubmit="onChange">
          <NativeSelect name="theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </NativeSelect>
        </FormItem>
      </Form>,
    )

    const selectEl = container.querySelector("[data-slot='native-select']") as HTMLSelectElement
    const autoSubmitEl = selectEl.closest("[data-auto-submit]")
    expect(autoSubmitEl).toBeTruthy()
    expect(autoSubmitEl!.getAttribute("data-auto-submit")).toBe("onChange")
  })
})
