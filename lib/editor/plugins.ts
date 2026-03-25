import type { CorePlugin } from "@platejs/core"
import type { PluginPreset, ToolbarFeature } from "./types"

import { AutoformatPlugin } from "@platejs/autoformat"
import {
  BasicBlocksPlugin,
  BasicMarksPlugin,
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
  CodePlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  HighlightPlugin,
  HeadingPlugin,
  BlockquotePlugin,
  HorizontalRulePlugin,
} from "@platejs/basic-nodes/react"
import { CalloutPlugin } from "@platejs/callout/react"
import { CodeBlockPlugin } from "@platejs/code-block/react"
import { IndentPlugin } from "@platejs/indent/react"
import { LinkPlugin } from "@platejs/link/react"
import { ListPlugin } from "@platejs/list/react"
import { MarkdownPlugin } from "@platejs/markdown"
import { ImagePlugin } from "@platejs/media/react"
import { TablePlugin } from "@platejs/table/react"
import { TogglePlugin } from "@platejs/toggle/react"

// ---------------------------------------------------------------------------
// Autoformat rules for markdown-style shortcuts
// ---------------------------------------------------------------------------

const AUTOFORMAT_RULES = [
  // Marks
  { match: "**", mode: "mark" as const, type: BoldPlugin.key },
  { match: "*", mode: "mark" as const, type: ItalicPlugin.key },
  { match: "~~", mode: "mark" as const, type: StrikethroughPlugin.key },
  { match: "`", mode: "mark" as const, type: CodePlugin.key },
  { match: "==", mode: "mark" as const, type: HighlightPlugin.key },
  // Blocks
  { match: "# ", mode: "block" as const, type: "h1" },
  { match: "## ", mode: "block" as const, type: "h2" },
  { match: "### ", mode: "block" as const, type: "h3" },
  { match: "> ", mode: "block" as const, type: BlockquotePlugin.key },
  { match: "---", mode: "block" as const, type: HorizontalRulePlugin.key },
  { match: "```", mode: "block" as const, type: CodeBlockPlugin.key },
]

// ---------------------------------------------------------------------------
// Plugin sets by feature
// ---------------------------------------------------------------------------

/** Core marks: bold, italic, underline, strikethrough, inline code */
const BASIC_MARKS_PLUGINS = [BasicMarksPlugin]

/** Heading, blockquote, horizontal rule */
const BASIC_BLOCKS_PLUGINS = [BasicBlocksPlugin]

/** Full plugin list for the "full" preset */
function getFullPlugins(): CorePlugin[] {
  return [
    ...BASIC_MARKS_PLUGINS,
    ...BASIC_BLOCKS_PLUGINS,
    HighlightPlugin,
    SubscriptPlugin,
    SuperscriptPlugin,
    ListPlugin,
    LinkPlugin,
    ImagePlugin,
    TablePlugin,
    CodeBlockPlugin,
    CalloutPlugin,
    TogglePlugin,
    IndentPlugin,
    MarkdownPlugin,
    AutoformatPlugin.configure({ options: { rules: AUTOFORMAT_RULES } }),
  ]
}

/** Standard plugin list (most common features) */
function getStandardPlugins(): CorePlugin[] {
  return [
    ...BASIC_MARKS_PLUGINS,
    ...BASIC_BLOCKS_PLUGINS,
    HighlightPlugin,
    ListPlugin,
    LinkPlugin,
    ImagePlugin,
    TablePlugin,
    CodeBlockPlugin,
    MarkdownPlugin,
    AutoformatPlugin.configure({ options: { rules: AUTOFORMAT_RULES } }),
  ]
}

/** Minimal plugin list (basic text formatting) */
function getMinimalPlugins(): CorePlugin[] {
  return [
    ...BASIC_MARKS_PLUGINS,
    HeadingPlugin,
    ListPlugin,
    LinkPlugin,
    MarkdownPlugin,
  ]
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Plugin preset configurations */
export const PLUGIN_PRESETS: Record<PluginPreset, () => CorePlugin[]> = {
  full: getFullPlugins,
  standard: getStandardPlugins,
  minimal: getMinimalPlugins,
}

/** Get plugins for a given preset */
export function getPluginsForPreset(preset: PluginPreset): CorePlugin[] {
  return PLUGIN_PRESETS[preset]()
}

// ---------------------------------------------------------------------------
// Toolbar feature presets
// ---------------------------------------------------------------------------

export const TOOLBAR_PRESETS: Record<string, ToolbarFeature[]> = {
  minimal: ["bold", "italic", "link"],
  standard: [
    "undo",
    "redo",
    "heading",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "bullet-list",
    "numbered-list",
    "link",
    "blockquote",
    "code-block",
    "horizontal-rule",
  ],
  full: [
    "undo",
    "redo",
    "heading",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "code",
    "superscript",
    "subscript",
    "highlight",
    "bullet-list",
    "numbered-list",
    "link",
    "image",
    "table",
    "blockquote",
    "code-block",
    "callout",
    "toggle",
    "horizontal-rule",
  ],
}

/** Parse a comma-separated toolbar features string */
export function parseToolbarFeatures(features: string): ToolbarFeature[] {
  return features
    .split(",")
    .map((f) => f.trim() as ToolbarFeature)
    .filter(Boolean)
}

/** Resolve toolbar features from preset or explicit string */
export function resolveToolbarFeatures(
  toolbar?: string,
  toolbarFeatures?: string,
): ToolbarFeature[] {
  if (toolbarFeatures) return parseToolbarFeatures(toolbarFeatures)
  if (toolbar === "none") return []
  return TOOLBAR_PRESETS[toolbar ?? "standard"] ?? TOOLBAR_PRESETS.standard
}
