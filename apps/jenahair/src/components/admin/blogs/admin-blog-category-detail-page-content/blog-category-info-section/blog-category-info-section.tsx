'use client';

import { ComboboxItem, Group, Paper, Select, Stack, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { TextEditor } from '@vinaup/ui/admin';
import { CopyToClipboard } from '@vinaup/ui/shared';

import { SITE_BASE_URL } from '@/constants';

import { BlogCategoryDetailFormValues } from '../_form';
import classes from './blog-category-info-section.module.scss';

interface BlogCategoryInfoSectionProps {
  form: UseFormReturnType<BlogCategoryDetailFormValues>;
  endpoint: string;
  parentOptions: ComboboxItem[];
}

export default function BlogCategoryInfoSection({
  form,
  endpoint,
  parentOptions,
}: BlogCategoryInfoSectionProps) {
  const url = `${SITE_BASE_URL}/blogs/${endpoint}`;

  return (
    <Paper p={'sm'} radius={'md'} classNames={{ root: classes.blogCategoryInfoSectionRoot }}>
      <Stack gap={'xs'}>
        <Text>Title</Text>
        <TextInput
          size="md"
          placeholder="A title under 100 characters"
          maxLength={100}
          {...form.getInputProps('title')}
        />
        <Group gap={'xs'} justify="space-between">
          <Text size="md">URL: jenahair.com/blogs/{endpoint}</Text>
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
        <Text>Parent Blog Category</Text>
        <Select
          size="md"
          placeholder="---"
          data={parentOptions}
          value={form.getValues().parentId}
          searchable
          nothingFoundMessage="No blog category found"
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
