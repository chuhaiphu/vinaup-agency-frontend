'use client';

import { Paper, Stack, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { TextEditor } from '@vinaup/ui/admin';

import { PageDetailFormValues } from '../_form';
import classes from './page-content-section.module.scss';

interface PageContentSectionProps {
  form: UseFormReturnType<PageDetailFormValues>;
}

export default function PageContentSection({ form }: PageContentSectionProps) {
  return (
    <Paper p={'sm'} radius={'md'} classNames={{ root: classes.pageContentSectionRoot }}>
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
