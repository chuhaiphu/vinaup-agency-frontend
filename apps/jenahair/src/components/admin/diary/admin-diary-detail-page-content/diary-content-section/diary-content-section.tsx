'use client';

import { Paper, Stack, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { TextEditor } from '@vinaup/ui/admin';

import { DiaryDetailFormValues } from '../_form';
import classes from './diary-content-section.module.scss';

interface DiaryContentSectionProps {
  form: UseFormReturnType<DiaryDetailFormValues>;
}

export default function DiaryContentSection({ form }: DiaryContentSectionProps) {
  return (
    <Paper p={'sm'} radius={'md'} classNames={{ root: classes.diaryContentSectionRoot }}>
      <Stack gap={'xs'}>
        <Text>Content</Text>
        <TextEditor
          content={form.getValues().content}
          onChange={(newContent) => {
            form.setFieldValue('content', newContent);
          }}
        />
      </Stack>
    </Paper>
  );
}
