'use client';

import { ActionIcon, Button, Group, Paper, Select, Stack, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { FaCaretDown } from 'react-icons/fa6';
import { GrTrash } from 'react-icons/gr';

import { PAGE_TYPES } from '@/constants';

import { PageDetailFormValues } from '../_form';
import classes from './page-config-section.module.scss';

interface PageConfigSectionProps {
  form: UseFormReturnType<PageDetailFormValues>;
  isSaving: boolean;
  onSave: () => void;
  onExit: () => void;
  onDeleteClick: () => void;
}

export default function PageConfigSection({
  form,
  isSaving,
  onSave,
  onExit,
  onDeleteClick,
}: PageConfigSectionProps) {
  return (
    <Paper
      p={'xs'}
      radius={'md'}
      classNames={{
        root: classes.pageConfigSectionRoot,
      }}
    >
      <Stack gap={'0'}>
        <Group justify="space-between" wrap="nowrap">
          <Text size="lg">Status</Text>
          <Select
            classNames={{
              root: classes.selectRoot,
              input: classes.selectInput,
              section: classes.selectSection,
            }}
            size="md"
            data={[
              { value: 'public', label: 'Public' },
              { value: 'private', label: 'Private' },
            ]}
            value={form.getValues().visibility}
            variant="unstyled"
            rightSection={<FaCaretDown color="var(--vinaup-blue-link)" size={24} />}
            onChange={(value) => {
              if (!value) return;
              form.setFieldValue('visibility', value);
            }}
          />
        </Group>
        <Group justify="space-between" wrap="nowrap" mt={'0'}>
          <Text size="lg">Theme</Text>
          <Select
            classNames={{
              root: classes.selectRoot,
              input: classes.selectInput,
              section: classes.selectSection,
            }}
            size="md"
            data={PAGE_TYPES}
            value={form.getValues().type}
            variant="unstyled"
            rightSection={<FaCaretDown color="var(--vinaup-blue-link)" size={24} />}
            onChange={(value) => {
              if (!value) return;
              form.setFieldValue('type', value);
            }}
          />
        </Group>
        <Group justify="space-between" wrap="nowrap" mt={'sm'}>
          <ActionIcon
            size="lg"
            variant="subtle"
            color="var(--vinaup-blue-link)"
            onClick={onDeleteClick}
          >
            <GrTrash size={24} color="var(--vinaup-blue-link)" />
          </ActionIcon>
          <Group gap={'xs'}>
            <Button onClick={onSave} loading={isSaving} variant="filled" color="teal" size="sm">
              Save
            </Button>
            <Button onClick={onExit} variant="filled" color="blue" size="xs" bg={'#01426e'}>
              Exit
            </Button>
          </Group>
        </Group>
      </Stack>
    </Paper>
  );
}
