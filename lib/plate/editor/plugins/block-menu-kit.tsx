'use client';

import {
  BlockMenuPlugin,
  BlockSelectionPlugin,
} from '@platejs/selection/react';
import { getPluginTypes, KEYS, type TElement } from 'platejs';

import { BlockContextMenu } from '@/lib/plate/ui/block-context-menu';
import { BlockSelection } from '@/lib/plate/ui/block-selection';

export const BlockMenuKit = [
  BlockSelectionPlugin.configure(({ editor }: { editor: any }) => ({
    options: {
      enableContextMenu: true,
      isSelectable: (element: TElement) =>
        !getPluginTypes(editor, [KEYS.codeLine, KEYS.td]).includes(
          element.type
        ),
    },
    render: {
      belowRootNodes: (props: any) => {
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
