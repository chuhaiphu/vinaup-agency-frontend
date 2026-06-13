'use client';

import { ActionIcon, Group, Paper, Select, Stack, Text, TextInput } from '@mantine/core';
import {
  VinaupPenIcon as PenIcon,
  VinaupUploadIconV2 as UploadIconV2,
} from '@vinaup/ui/cores';
import { useRef } from 'react';
import { FaCaretDown } from 'react-icons/fa6';

import UploadImageSection from '@/components/admin/media/upload-image-section/upload-image-section';

import classes from './video-section.module.scss';

interface VideoSectionProps {
  videoUrl: string;
  onVideoUrlChange: (videoUrl: string) => void;
  thumbnailUrl: string;
  onThumbnailChange: (thumbnailUrl: string) => void;
  position: string;
  onPositionChange: (position: string) => void;
  label?: string;
}

export default function VideoSection({
  videoUrl,
  onVideoUrlChange,
  thumbnailUrl,
  onThumbnailChange,
  position,
  onPositionChange,
  label = 'Video:',
}: VideoSectionProps) {
  const videoUrlInputRef = useRef<HTMLInputElement>(null);

  const handleFocusAndSelectInput = () => {
    if (videoUrlInputRef.current) {
      videoUrlInputRef.current.focus();
      videoUrlInputRef.current.select();
    }
  };

  return (
    <Paper p={'xs'} radius={'md'} mt={'sm'} classNames={{ root: classes.videoSectionRoot }}>
      <Stack gap={'2px'}>
        <Group justify="space-between" wrap="nowrap">
          <Text size="lg">{label}</Text>
          <Select
            w={'6rem'}
            size="sm"
            comboboxProps={{ withinPortal: false }}
            classNames={{
              root: classes.selectRoot,
              input: classes.selectInput,
              option: classes.selectOption,
            }}
            data={[
              { value: 'top', label: 'Top' },
              { value: 'bottom', label: 'Bottom' },
            ]}
            value={position}
            variant="unstyled"
            rightSection={<FaCaretDown color="var(--vinaup-blue-link)" size={20} />}
            onChange={(value) => {
              if (!value) return;
              onPositionChange(value);
            }}
          />
        </Group>
        <Group justify="space-between" wrap="nowrap">
          <UploadImageSection
            size="md"
            icon={<UploadIconV2 width={60} height={60} />}
            isLoading={false}
            onImageSelect={thumbnailUrl.length > 0 ? undefined : onThumbnailChange}
            onRemoveFile={thumbnailUrl.length > 0 ? () => onThumbnailChange('') : undefined}
            imageUrl={thumbnailUrl}
          />
          <Stack gap={'0'} w={'75%'}>
            <Group justify="space-between" wrap="nowrap">
              <TextInput
                ref={videoUrlInputRef}
                w={'100%'}
                classNames={{
                  input: classes.videoUrlInput,
                }}
                variant="unstyled"
                placeholder="https://www.youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => {
                  onVideoUrlChange(e.target.value);
                }}
              />
              <ActionIcon size="md" variant="transparent" onClick={handleFocusAndSelectInput}>
                <PenIcon width={24} height={24} />
              </ActionIcon>
            </Group>
            <Text size="sm" c="dimmed">
              ← Auto or Upload thumbnail
            </Text>
          </Stack>
        </Group>
      </Stack>
    </Paper>
  );
}
