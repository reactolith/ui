'use client';

import { CaptionPlugin } from '@platejs/caption/react';
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
} from '@platejs/media/react';
import { KEYS } from 'platejs';

import { AudioElement } from '@/components/plate/ui/media-audio-node';
import { FileElement } from '@/components/plate/ui/media-file-node';
import { ImageElement } from '@/components/plate/ui/media-image-node';
import { MediaPreviewDialog } from '@/components/plate/ui/media-preview-dialog';

export const MediaKit = [
  ImagePlugin.configure({
    options: { disableUploadInsert: true },
    render: { afterEditable: MediaPreviewDialog, node: ImageElement },
  }),
  AudioPlugin.withComponent(AudioElement),
  FilePlugin.withComponent(FileElement),
  CaptionPlugin.configure({
    options: {
      query: {
        allow: [KEYS.img, KEYS.audio, KEYS.file],
      },
    },
  }),
];
