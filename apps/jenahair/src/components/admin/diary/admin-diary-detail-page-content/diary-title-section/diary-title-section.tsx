'use client';

import { Group, Paper, Stack, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { CopyToClipboard } from '@vinaup/ui/shared';

import { SITE_BASE_URL } from '@/constants';

import { DiaryDetailFormValues } from '../_form';
import classes from './diary-title-section.module.scss';

interface DiaryTitleSectionProps {
  form: UseFormReturnType<DiaryDetailFormValues>;
  endpoint: string;
}

export default function DiaryTitleSection({ form, endpoint }: DiaryTitleSectionProps) {
  const url = `${SITE_BASE_URL}/nhat-ky/${endpoint}`;

  return (
    <Paper p={'sm'} radius={'md'} classNames={{ root: classes.diaryTitleSectionRoot }}>
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
    </Paper>
  );
}
