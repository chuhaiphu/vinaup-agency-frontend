'use client';

import { ActionIcon, Button, Group, Paper, Select, Stack, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import dayjs from 'dayjs';
import { FaCaretDown } from 'react-icons/fa6';
import { GrTrash } from 'react-icons/gr';

import { BlogDetailFormValues } from '../_form';
import classes from './blog-config-section.module.scss';

const PIN_TO_HOME_OPTIONS = [
  { value: '-1', label: 'Off' },
  { value: '0', label: '1' },
  { value: '1', label: '2' },
  { value: '2', label: '3' },
  { value: '3', label: '4' },
  { value: '4', label: '5' },
  { value: '5', label: '6' },
  { value: '6', label: '7' },
  { value: '7', label: '8' },
  { value: '8', label: '9' },
  { value: '9', label: '10' },
];

interface BlogConfigSectionProps {
  form: UseFormReturnType<BlogDetailFormValues>;
  updatedAt: Date | string;
  isSaving: boolean;
  onSave: () => void;
  onExit: () => void;
  onDeleteClick: () => void;
}

export default function BlogConfigSection({
  form,
  updatedAt,
  isSaving,
  onSave,
  onExit,
  onDeleteClick,
}: BlogConfigSectionProps) {
  return (
    <Paper
      p={'xs'}
      radius={'md'}
      classNames={{
        root: classes.blogConfigSectionRoot,
      }}
    >
      <Stack gap={'0'}>
        <Group justify="space-between" wrap="nowrap">
          <Text size="lg">Updated at</Text>
          <Group>
            <Text size="md" fw={500} lh={'2.5rem'}>
              {dayjs(updatedAt).format('DD/MM/YYYY')}
            </Text>
            <Text size="md" fw={500} lh={'2.5rem'}>
              {dayjs(updatedAt).format('HH:mm')}
            </Text>
          </Group>
        </Group>
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
        <Group justify="space-between" wrap="nowrap">
          <Text size="lg">Pin to Home</Text>
          <Select
            scrollAreaProps={{
              scrollbarSize: 6,
              type: 'always',
            }}
            w={'5rem'}
            classNames={{
              root: classes.selectRoot,
              section: classes.selectSection,
              input: classes.selectInput,
              option: classes.selectOption,
            }}
            size="md"
            data={PIN_TO_HOME_OPTIONS}
            value={form.getValues().sortOrder.toString()}
            variant="unstyled"
            rightSection={<FaCaretDown color="var(--vinaup-blue-link)" size={24} />}
            onChange={(value) => {
              if (!value) return;
              form.setFieldValue('sortOrder', Number(value));
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
            <Button onClick={onExit} variant="filled" color="blue" size="sm" bg={'#01426e'}>
              Exit
            </Button>
          </Group>
        </Group>
      </Stack>
    </Paper>
  );
}
