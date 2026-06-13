'use client';

import { Paper, Select, Stack, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { MenuDetailFormValues } from '../_form';
import classes from './menu-info-section.module.scss';

interface MenuInfoSectionProps {
  form: UseFormReturnType<MenuDetailFormValues>;
  parentOptions: { value: string; label: string }[];
}

export default function MenuInfoSection({ form, parentOptions }: MenuInfoSectionProps) {
  return (
    <Paper p={'sm'} radius={'md'} classNames={{ root: classes.menuInfoSectionRoot }}>
      <Stack gap={'xs'}>
        <Text>Title</Text>
        <TextInput
          size="md"
          placeholder="A title under 100 characters"
          maxLength={100}
          {...form.getInputProps('title')}
        />
      </Stack>

      <Stack gap={'xs'} mt={'md'}>
        <Text>Parent Menu</Text>
        <Select
          size="md"
          placeholder="---"
          data={parentOptions}
          value={form.getValues().parentId}
          searchable
          nothingFoundMessage="No menu found"
          onChange={(value) => form.setFieldValue('parentId', value)}
        />
      </Stack>

      <Stack gap={'xs'} mt={'md'}>
        <Text>Custom URL</Text>
        <TextInput size="md" placeholder="Enter custom URL" {...form.getInputProps('customUrl')} />
      </Stack>
    </Paper>
  );
}
