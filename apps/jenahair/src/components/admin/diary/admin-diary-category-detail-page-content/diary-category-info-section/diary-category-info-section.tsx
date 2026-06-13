'use client';

import { ComboboxItem, Group, Paper, Select, Stack, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { TextEditor } from '@vinaup/ui/admin';
import { CopyToClipboard } from '@vinaup/ui/shared';

import { SITE_BASE_URL } from '@/constants';

import { DiaryCategoryDetailFormValues } from '../_form';
import classes from './diary-category-info-section.module.scss';

interface DiaryCategoryInfoSectionProps {
  form: UseFormReturnType<DiaryCategoryDetailFormValues>;
  endpoint: string;
  parentOptions: ComboboxItem[];
}

export default function DiaryCategoryInfoSection({
  form,
  endpoint,
  parentOptions,
}: DiaryCategoryInfoSectionProps) {
  const url = `${SITE_BASE_URL}/nhat-ky/${endpoint}`;

  return (
    <Paper p={'sm'} radius={'md'} classNames={{ root: classes.diaryCategoryInfoSectionRoot }}>
      <Stack gap={'xs'}>
        <Text>Title</Text>
        <TextInput
          size="md"
          placeholder="A title under 100 characters"
          maxLength={100}
          {...form.getInputProps('title')}
        />
        <Group gap={'xs'} justify="space-between">
          <Text size="md">URL: jenahair.com/nhat-ky/{endpoint}</Text>
          <Group gap={'xs'}>
            <Text size="sm" className={classes.linkText} onClick={() => window.open(url, '_blank')}>
              View
            </Text>
            <CopyToClipboard
              content={url}
              notification={{
                title: 'Link copied',
                message: 'Link has been copied to clipboard',
                position: 'top-right',
                autoClose: 900,
              }}
            >
              <Text size="sm" className={classes.linkText}>
                Copy link
              </Text>
            </CopyToClipboard>
          </Group>
        </Group>
      </Stack>

      <Stack gap={'xs'} mt={'md'}>
        <Text>Parent Diary Category</Text>
        <Select
          size="md"
          placeholder="---"
          data={parentOptions}
          value={form.getValues().parentId}
          searchable
          nothingFoundMessage="No diary category found"
          onChange={(value) => {
            if (!value) return;
            form.setFieldValue('parentId', value);
          }}
        />
      </Stack>

      <Stack gap={'xs'} mt={'md'}>
        <Text>Description</Text>
        <TextEditor
          content={form.getValues().description}
          onChange={(newDescription) => {
            form.setFieldValue('description', newDescription);
          }}
        />
      </Stack>
    </Paper>
  );
}
