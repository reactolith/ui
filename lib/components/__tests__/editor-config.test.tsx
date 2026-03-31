import { describe, it, expect } from "vitest"
import { KEYS } from "platejs"
import { parseBool, toSet, expandBlockKeys, buildPlugins } from "../editor"

// ---------------------------------------------------------------------------
// parseBool
// ---------------------------------------------------------------------------

describe("parseBool", () => {
  it("returns default when undefined", () => {
    expect(parseBool(undefined, true)).toBe(true)
    expect(parseBool(undefined, false)).toBe(false)
  })

  it("passes through boolean values", () => {
    expect(parseBool(true, false)).toBe(true)
    expect(parseBool(false, true)).toBe(false)
  })

  it('treats string "false" as false', () => {
    expect(parseBool("false", true)).toBe(false)
  })

  it('treats any other string as true', () => {
    expect(parseBool("true", false)).toBe(true)
    expect(parseBool("yes", false)).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// toSet
// ---------------------------------------------------------------------------

describe("toSet", () => {
  it("returns null for undefined", () => {
    expect(toSet(undefined)).toBeNull()
  })

  it("returns null for empty array", () => {
    expect(toSet([])).toBeNull()
  })

  it("returns Set from array", () => {
    const result = toSet(["p", "h1", "h2"])
    expect(result).toBeInstanceOf(Set)
    expect(result!.size).toBe(3)
    expect(result!.has("p")).toBe(true)
    expect(result!.has("h1")).toBe(true)
    expect(result!.has("h2")).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// expandBlockKeys
// ---------------------------------------------------------------------------

describe("expandBlockKeys", () => {
  it("always includes paragraph", () => {
    const result = expandBlockKeys(new Set(["h1"]))
    expect(result.has(KEYS.p)).toBe(true)
  })

  it("maps simple block names to KEYS", () => {
    const result = expandBlockKeys(new Set(["h1", "h2", "blockquote"]))
    expect(result.has(KEYS.h1)).toBe(true)
    expect(result.has(KEYS.h2)).toBe(true)
    expect(result.has(KEYS.blockquote)).toBe(true)
  })

  it("does not include unmapped blocks", () => {
    const result = expandBlockKeys(new Set(["h1"]))
    expect(result.has(KEYS.h2)).toBe(false)
    expect(result.has(KEYS.h3)).toBe(false)
    expect(result.has(KEYS.table)).toBe(false)
  })

  it('expands "list" to ul, ol, and listTodo KEYS', () => {
    const result = expandBlockKeys(new Set(["list"]))
    expect(result.has(KEYS.ul)).toBe(true)
    expect(result.has(KEYS.ol)).toBe(true)
    expect(result.has(KEYS.listTodo)).toBe(true)
  })

  it('maps "code-block" to KEYS.codeBlock', () => {
    const result = expandBlockKeys(new Set(["code-block"]))
    expect(result.has(KEYS.codeBlock)).toBe(true)
    // KEYS.codeBlock = "code_block", not "code-block"
    expect(result.has("code_block")).toBe(true)
  })

  it('treats "paragraph" as alias for "p"', () => {
    const result = expandBlockKeys(new Set(["paragraph"]))
    expect(result.has(KEYS.p)).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// buildPlugins
// ---------------------------------------------------------------------------

/** Extract all plugin keys from a plugins array. */
function pluginKeys(plugins: any[]): Set<string> {
  return new Set(plugins.map(p => p.key).filter(Boolean))
}

describe("buildPlugins", () => {
  it("returns full EditorKit when no restrictions are set", () => {
    const plugins = buildPlugins(null, null, null, true)
    const keys = pluginKeys(plugins)
    // Full kit includes headings, marks, toolbars, etc.
    expect(keys.has(KEYS.h1)).toBe(true)
    expect(keys.has(KEYS.h3)).toBe(true)
    expect(keys.has(KEYS.bold)).toBe(true)
    expect(keys.has("fixed-toolbar")).toBe(true)
    expect(keys.has("floating-toolbar")).toBe(true)
  })

  it("restricts to only specified blocks", () => {
    const blockNames = new Set(["h1", "h2"])
    const blockKeys = expandBlockKeys(blockNames)
    const plugins = buildPlugins(blockNames, blockKeys, null, true)
    const keys = pluginKeys(plugins)

    // Allowed
    expect(keys.has(KEYS.p)).toBe(true)
    expect(keys.has(KEYS.h1)).toBe(true)
    expect(keys.has(KEYS.h2)).toBe(true)

    // Not allowed
    expect(keys.has(KEYS.h3)).toBe(false)
    expect(keys.has(KEYS.blockquote)).toBe(false)
    expect(keys.has(KEYS.table)).toBe(false)
    expect(keys.has(KEYS.toggle)).toBe(false)
    expect(keys.has(KEYS.callout)).toBe(false)
  })

  it("disables all marks when marks=false", () => {
    const plugins = buildPlugins(null, null, false, true)
    const keys = pluginKeys(plugins)

    expect(keys.has(KEYS.bold)).toBe(false)
    expect(keys.has(KEYS.italic)).toBe(false)
    expect(keys.has(KEYS.underline)).toBe(false)
    expect(keys.has(KEYS.code)).toBe(false)
  })

  it("hides floating toolbar when marks=false", () => {
    const plugins = buildPlugins(null, null, false, true)
    const keys = pluginKeys(plugins)

    expect(keys.has("floating-toolbar")).toBe(false)
    // Fixed toolbar still shown (toolbar=true)
    expect(keys.has("fixed-toolbar")).toBe(true)
  })

  it("hides fixed toolbar when toolbar=false", () => {
    const plugins = buildPlugins(null, null, null, false)
    const keys = pluginKeys(plugins)

    expect(keys.has("fixed-toolbar")).toBe(false)
    // Floating toolbar still shown (marks are active)
    expect(keys.has("floating-toolbar")).toBe(true)
  })

  it("restricts marks to only specified ones", () => {
    const allowedMarks = new Set(["bold", "italic"])
    const plugins = buildPlugins(null, null, allowedMarks, true)
    const keys = pluginKeys(plugins)

    expect(keys.has(KEYS.bold)).toBe(true)
    expect(keys.has(KEYS.italic)).toBe(true)
    expect(keys.has(KEYS.underline)).toBe(false)
    expect(keys.has(KEYS.strikethrough)).toBe(false)
  })

  it("full restriction: blocks=[p,h1,h2], marks=false, toolbar=false", () => {
    const blockNames = new Set(["p", "h1", "h2"])
    const blockKeys = expandBlockKeys(blockNames)
    const plugins = buildPlugins(blockNames, blockKeys, false, false)
    const keys = pluginKeys(plugins)

    // Allowed blocks
    expect(keys.has(KEYS.p)).toBe(true)
    expect(keys.has(KEYS.h1)).toBe(true)
    expect(keys.has(KEYS.h2)).toBe(true)

    // No other blocks
    expect(keys.has(KEYS.h3)).toBe(false)
    expect(keys.has(KEYS.table)).toBe(false)
    expect(keys.has(KEYS.blockquote)).toBe(false)

    // No marks
    expect(keys.has(KEYS.bold)).toBe(false)
    expect(keys.has(KEYS.italic)).toBe(false)

    // No toolbars
    expect(keys.has("fixed-toolbar")).toBe(false)
    expect(keys.has("floating-toolbar")).toBe(false)

    // Core editing helpers still present
    expect(keys.has("trailingBlock")).toBe(true)
  })

  it("includes list kit when blocks contains 'list'", () => {
    const blockNames = new Set(["list"])
    const blockKeys = expandBlockKeys(blockNames)
    const plugins = buildPlugins(blockNames, blockKeys, null, true)
    const keys = pluginKeys(plugins)

    // List-related plugins should be present
    // (indent plugin is part of ListKit)
    expect(keys.has("indent")).toBe(true)
  })

  it("always includes markdown and exit-break plugins", () => {
    const blockNames = new Set(["p"])
    const blockKeys = expandBlockKeys(blockNames)
    const plugins = buildPlugins(blockNames, blockKeys, false, false)
    const keys = pluginKeys(plugins)

    expect(keys.has("markdown")).toBe(true)
    expect(keys.has("exitBreak")).toBe(true)
  })
})
