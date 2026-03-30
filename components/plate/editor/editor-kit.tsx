'use client';

import { TrailingBlockPlugin, type Value } from 'platejs';
import { type TPlateEditor, useEditorRef } from 'platejs/react';

import { AlignKit } from '@/components/plate/editor/plugins/align-kit';
import { AutoformatKit } from '@/components/plate/editor/plugins/autoformat-kit';
import { BaseAlignKit } from '@/components/plate/editor/plugins/align-base-kit';
import { BaseBasicBlocksKit } from '@/components/plate/editor/plugins/basic-blocks-base-kit';
import { BaseBasicMarksKit } from '@/components/plate/editor/plugins/basic-marks-base-kit';
import { BaseCalloutKit } from '@/components/plate/editor/plugins/callout-base-kit';
import { BaseCodeBlockKit } from '@/components/plate/editor/plugins/code-block-base-kit';
import { BaseFontKit } from '@/components/plate/editor/plugins/font-base-kit';
import { BaseLineHeightKit } from '@/components/plate/editor/plugins/line-height-base-kit';
import { BaseLinkKit } from '@/components/plate/editor/plugins/link-base-kit';
import { BaseListKit } from '@/components/plate/editor/plugins/list-base-kit';
import { BaseMediaKit } from '@/components/plate/editor/plugins/media-base-kit';
import { BaseMentionKit } from '@/components/plate/editor/plugins/mention-base-kit';
import { BaseTableKit } from '@/components/plate/editor/plugins/table-base-kit';
import { BaseToggleKit } from '@/components/plate/editor/plugins/toggle-base-kit';
import { BasicBlocksKit } from '@/components/plate/editor/plugins/basic-blocks-kit';
import { BasicMarksKit } from '@/components/plate/editor/plugins/basic-marks-kit';
import { BlockMenuKit } from '@/components/plate/editor/plugins/block-menu-kit';
import { BlockPlaceholderKit } from '@/components/plate/editor/plugins/block-placeholder-kit';
import { CalloutKit } from '@/components/plate/editor/plugins/callout-kit';
import { CodeBlockKit } from '@/components/plate/editor/plugins/code-block-kit';
import { DndKit } from '@/components/plate/editor/plugins/dnd-kit';
import { ExitBreakKit } from '@/components/plate/editor/plugins/exit-break-kit';
import { FixedToolbarKit } from '@/components/plate/editor/plugins/fixed-toolbar-kit';
import { FloatingToolbarKit } from '@/components/plate/editor/plugins/floating-toolbar-kit';
import { FontKit } from '@/components/plate/editor/plugins/font-kit';
import { LineHeightKit } from '@/components/plate/editor/plugins/line-height-kit';
import { LinkKit } from '@/components/plate/editor/plugins/link-kit';
import { ListKit } from '@/components/plate/editor/plugins/list-kit';
import { MarkdownKit } from '@/components/plate/editor/plugins/markdown-kit';
import { MediaKit } from '@/components/plate/editor/plugins/media-kit';
import { MentionKit } from '@/components/plate/editor/plugins/mention-kit';
import { SlashKit } from '@/components/plate/editor/plugins/slash-kit';
import { TableKit } from '@/components/plate/editor/plugins/table-kit';
import { ToggleKit } from '@/components/plate/editor/plugins/toggle-kit';

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
