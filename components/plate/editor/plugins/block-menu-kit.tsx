'use client';

import {
  BlockMenuPlugin,
  BlockSelectionPlugin,
} from '@platejs/selection/react';

import { BlockContextMenu } from '@/components/plate/ui/block-context-menu';

export const BlockMenuKit = [
  BlockSelectionPlugin,
  BlockMenuPlugin.configure({
    render: { aboveEditable: BlockContextMenu },
  }),
];
