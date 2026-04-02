'use client';

import { TrailingBlockPlugin, type Value } from 'platejs';
import { type TPlateEditor, useEditorRef } from 'platejs/react';

import { AlignKit } from '@/lib/plate/editor/plugins/align-kit';
import { AutoformatKit } from '@/lib/plate/editor/plugins/autoformat-kit';
import { BaseAlignKit } from '@/lib/plate/editor/plugins/align-base-kit';
import { BaseBasicBlocksKit } from '@/lib/plate/editor/plugins/basic-blocks-base-kit';
import { BaseBasicMarksKit } from '@/lib/plate/editor/plugins/basic-marks-base-kit';
import { BaseCalloutKit } from '@/lib/plate/editor/plugins/callout-base-kit';
import { BaseCodeBlockKit } from '@/lib/plate/editor/plugins/code-block-base-kit';
import { BaseFontKit } from '@/lib/plate/editor/plugins/font-base-kit';
import { BaseLineHeightKit } from '@/lib/plate/editor/plugins/line-height-base-kit';
import { BaseLinkKit } from '@/lib/plate/editor/plugins/link-base-kit';
import { BaseListKit } from '@/lib/plate/editor/plugins/list-base-kit';
import { BaseMediaKit } from '@/lib/plate/editor/plugins/media-base-kit';
import { BaseMentionKit } from '@/lib/plate/editor/plugins/mention-base-kit';
import { BaseTableKit } from '@/lib/plate/editor/plugins/table-base-kit';
import { BaseToggleKit } from '@/lib/plate/editor/plugins/toggle-base-kit';
import { BasicBlocksKit } from '@/lib/plate/editor/plugins/basic-blocks-kit';
import { BasicMarksKit } from '@/lib/plate/editor/plugins/basic-marks-kit';
import { BlockMenuKit } from '@/lib/plate/editor/plugins/block-menu-kit';
import { BlockPlaceholderKit } from '@/lib/plate/editor/plugins/block-placeholder-kit';
import { CalloutKit } from '@/lib/plate/editor/plugins/callout-kit';
import { CodeBlockKit } from '@/lib/plate/editor/plugins/code-block-kit';
import { DndKit } from '@/lib/plate/editor/plugins/dnd-kit';
import { ExitBreakKit } from '@/lib/plate/editor/plugins/exit-break-kit';
import { FixedToolbarKit } from '@/lib/plate/editor/plugins/fixed-toolbar-kit';
import { FloatingToolbarKit } from '@/lib/plate/editor/plugins/floating-toolbar-kit';
import { FontKit } from '@/lib/plate/editor/plugins/font-kit';
import { LineHeightKit } from '@/lib/plate/editor/plugins/line-height-kit';
import { LinkKit } from '@/lib/plate/editor/plugins/link-kit';
import { ListKit } from '@/lib/plate/editor/plugins/list-kit';
import { MarkdownKit } from '@/lib/plate/editor/plugins/markdown-kit';
import { MediaKit } from '@/lib/plate/editor/plugins/media-kit';
import { MentionKit } from '@/lib/plate/editor/plugins/mention-kit';
import { SlashKit } from '@/lib/plate/editor/plugins/slash-kit';
import { TableKit } from '@/lib/plate/editor/plugins/table-kit';
import { ToggleKit } from '@/lib/plate/editor/plugins/toggle-kit';

/**
 * Base-only plugins for static HTML serialization and read-only rendering.
 * No React hooks, no Plate context required — safe for PlateStatic.
 */
export const SerializerKit = [
  // Elements (base variants — no React hooks)
  ...BaseBasicBlocksKit,
  ...BaseCodeBlockKit,
  ...BaseTableKit,
  ...BaseToggleKit,
  ...BaseMediaKit,
  ...BaseCalloutKit,
  ...BaseLinkKit,
  ...BaseMentionKit,

  // Marks
  ...BaseBasicMarksKit,
  ...BaseFontKit,

  // Block style (BaseListKit includes BaseIndentKit)
  ...BaseListKit,
  ...BaseAlignKit,
  ...BaseLineHeightKit,

  // Parsers
  ...MarkdownKit,
];

export const EditorKit = [
  // Elements
  ...BasicBlocksKit,
  ...CodeBlockKit,
  ...TableKit,
  ...ToggleKit,
  ...MediaKit,
  ...CalloutKit,
  ...LinkKit,
  ...MentionKit,

  // Marks
  ...BasicMarksKit,
  ...FontKit,

  // Block Style
  ...ListKit,
  ...AlignKit,
  ...LineHeightKit,

  // Editing
  ...SlashKit,
  ...AutoformatKit,
  ...BlockMenuKit,
  ...DndKit,
  ...ExitBreakKit,
  TrailingBlockPlugin,

  // Parsers
  ...MarkdownKit,

  // UI
  ...BlockPlaceholderKit,
  ...FixedToolbarKit,
  ...FloatingToolbarKit,
];

export type MyEditor = TPlateEditor<Value, (typeof EditorKit)[number]>;

export const useEditor = (): MyEditor => useEditorRef<MyEditor>();
