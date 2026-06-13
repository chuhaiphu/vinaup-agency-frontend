'use client';

import { Group, Paper, Select, Stack, Text } from '@mantine/core';
import { FaCaretDown } from 'react-icons/fa6';

import UploadImageSection from '@/components/admin/media/upload-image-section/upload-image-section';

import classes from './additional-images-section.module.scss';

interface AdditionalImagesSectionProps {
  imageUrls: string[];
  onChange: (imageUrls: string[]) => void;
  position: string;
  onPositionChange: (position: string) => void;
  maxCount: number;
  label?: string;
}

export default function AdditionalImagesSection({
  imageUrls,
  onChange,
  position,
  onPositionChange,
  maxCount,
  label = 'Images Describer',
}: AdditionalImagesSectionProps) {
  const handleSelectImage = (imageUrl: string) => {
    onChange([...imageUrls, imageUrl]);
  };

  const handleRemoveImage = (imageIndex: number) => {
    onChange(imageUrls.filter((_, index) => index !== imageIndex));
  };

  return (
    <Paper p={'sm'} radius={'md'} classNames={{ root: classes.additionalImagesSectionRoot }}>
      <Stack gap={'xs'}>
        <Group justify="space-between" wrap="nowrap">
          <Text>{label}</Text>
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
        <Group>
          {imageUrls.map((imgUrl, index) => (
            <UploadImageSection
              key={index}
              size="xl"
              imageUrl={imgUrl}
              isLoading={false}
              onImageSelect={handleSelectImage}
              onRemoveFile={() => handleRemoveImage(index)}
            />
          ))}
          {imageUrls.length < maxCount && (
            <UploadImageSection size="xl" isLoading={false} onImageSelect={handleSelectImage} />
          )}
        </Group>
      </Stack>
    </Paper>
  );
}
