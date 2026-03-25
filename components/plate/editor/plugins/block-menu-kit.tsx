'use client';

import {
  BlockMenuPlugin,
  BlockSelectionPlugin,
} from '@platejs/selection/react';
import { getPluginTypes, KEYS } from 'platejs';

import { BlockContextMenu } from '@/components/plate/ui/block-context-menu';
import { BlockSelection } from '@/components/plate/ui/block-selection';

export const BlockMenuKit = [
  BlockSelectionPlugin.configure(({ editor }) => ({
    options: {
      enableContextMenu: true,
      isSelectable: (element) =>
        !getPluginTypes(editor, [KEYS.codeLine, KEYS.td]).includes(
          element.type
        ),
    },
    render: {
      belowRootNodes: (props) => {
        if (!props.attributes.className?.includes('slate-selectable'))
          return null;

        return <BlockSelection {...(props as any)} />;
      },
    },
  })),
  BlockMenuPlugin.configure({
    render: { aboveEditable: BlockContextMenu },
  }),
];
