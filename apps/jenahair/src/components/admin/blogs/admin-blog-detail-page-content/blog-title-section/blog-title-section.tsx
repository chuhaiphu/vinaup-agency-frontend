'use client';

import { Group, Paper, Stack, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { CopyToClipboard } from '@vinaup/ui/shared';

import { SITE_BASE_URL } from '@/constants';

import { BlogDetailFormValues } from '../_form';
import classes from './blog-title-section.module.scss';

interface BlogTitleSectionProps {
  form: UseFormReturnType<BlogDetailFormValues>;
  endpoint: string;
}

export default function BlogTitleSection({ form, endpoint }: BlogTitleSectionProps) {
  const url = `${SITE_BASE_URL}/blogs/${endpoint}`;

  return (
    <Paper p={'sm'} radius={'md'} classNames={{ root: classes.blogTitleSectionRoot }}>
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
    </Paper>
  );
}
