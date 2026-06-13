'use client';

import { Paper, Stack, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { TextEditor } from '@vinaup/ui/admin';

import { BlogDetailFormValues } from '../_form';
import classes from './blog-content-section.module.scss';

interface BlogContentSectionProps {
  form: UseFormReturnType<BlogDetailFormValues>;
}

export default function BlogContentSection({ form }: BlogContentSectionProps) {
  return (
    <Paper p={'sm'} radius={'md'} classNames={{ root: classes.blogContentSectionRoot }}>
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
