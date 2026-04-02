'use client';

import { TogglePlugin } from '@platejs/toggle/react';

import { IndentKit } from '@/lib/plate/editor/plugins/indent-kit';
import { ToggleElement } from '@/lib/plate/ui/toggle-node';

export const ToggleKit = [
  ...IndentKit,
  TogglePlugin.withComponent(ToggleElement),
];
