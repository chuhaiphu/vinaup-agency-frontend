'use client';

import { Group, Paper, Stack, Text } from '@mantine/core';
import { VinaupUploadIconV3 as UploadIconV3 } from '@vinaup/ui/cores';

import UploadImageSection from '@/components/admin/media/upload-image-section/upload-image-section';

import classes from './feature-image-section.module.scss';

interface FeatureImageSectionProps {
  imageUrl: string;
  onChange: (imageUrl: string) => void;
  label?: string;
  hint?: string;
  hintSize?: 'sm' | 'md';
}

export default function FeatureImageSection({
  imageUrl,
  onChange,
  label = 'Feature Image:',
  hint = '(png, jpg; jpeg; Size ≤ 5Mbs)',
  hintSize = 'md',
}: FeatureImageSectionProps) {
  return (
    <Paper p={'xs'} radius={'md'} mt={'sm'} classNames={{ root: classes.featureImageSectionRoot }}>
      <Stack gap={'0'}>
        <Text size="xl">{label}</Text>
        <Group justify="center">
          <UploadImageSection
            size="2xl"
            icon={<UploadIconV3 width={200} height={200} />}
            isLoading={false}
            imageUrl={imageUrl}
            onImageSelect={imageUrl.length > 0 ? undefined : onChange}
            onRemoveFile={imageUrl.length > 0 ? () => onChange('') : undefined}
          />
        </Group>
        <Group justify="center">
          <Text size={hintSize} c="dimmed">
            {hint}
          </Text>
        </Group>
      </Stack>
    </Paper>
  );
}
