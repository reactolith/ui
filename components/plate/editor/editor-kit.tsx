'use client';

import { TrailingBlockPlugin, type Value } from 'platejs';
import { type TPlateEditor, useEditorRef } from 'platejs/react';

import { AlignKit } from '@/components/plate/editor/plugins/align-kit';
import { AutoformatKit } from '@/components/plate/editor/plugins/autoformat-kit';
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

export const useEditor = () => useEditorRef<MyEditor>();
