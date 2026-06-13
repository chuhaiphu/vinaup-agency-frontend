'use client';

import { ActionIcon, Button, Group, Paper, Select, Stack, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { FaCaretDown } from 'react-icons/fa6';
import { GrTrash } from 'react-icons/gr';

import { MenuDetailFormValues } from '../_form';
import classes from './menu-config-section.module.scss';

interface MenuConfigSectionProps {
  form: UseFormReturnType<MenuDetailFormValues>;
  availableSortOrders: number[];
  isSaving: boolean;
  onSave: () => void;
  onExit: () => void;
  onDeleteClick: () => void;
}

export default function MenuConfigSection({
  form,
  availableSortOrders,
  isSaving,
  onSave,
  onExit,
  onDeleteClick,
}: MenuConfigSectionProps) {
  return (
    <Paper pt={0} p={'xs'} radius={'md'} classNames={{ root: classes.menuConfigSectionRoot }}>
      <Stack gap={'0'}>
        <Group justify="space-between" wrap="nowrap">
          <Text size="lg">Index</Text>
          <Select
            w={'5rem'}
            classNames={{
              root: classes.selectRoot,
              section: classes.selectSection,
              input: classes.selectInput,
              option: classes.selectOption,
            }}
            size="md"
            data={availableSortOrders.map((order) => ({
              value: order.toString(),
              label: order.toString(),
            }))}
            value={form.getValues().sortOrder.toString()}
            variant="unstyled"
            rightSection={<FaCaretDown color="var(--vinaup-blue-link)" size={24} />}
            onChange={(value) => form.setFieldValue('sortOrder', value ? parseInt(value) : 0)}
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
            <Button loading={isSaving} onClick={onSave} variant="filled" color="teal" size="xs">
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
