'use client';

import { Button, Group, Paper, Stack, Text } from '@mantine/core';

import { DynamicSectionUIResponse } from '@/interfaces/dynamic-section-ui-interfaces';

import classes from './section-ui-list-view.module.scss';

interface SectionUIListViewProps {
  items: DynamicSectionUIResponse[];
  onSelect: (item: DynamicSectionUIResponse) => void;
  onCreateNew: () => void;
}

export default function SectionUIListView({ items, onSelect, onCreateNew }: SectionUIListViewProps) {
  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Text fw={500}>Existing Items ({items.length})</Text>
        <Button size="sm" onClick={onCreateNew}>
          + Create New
        </Button>
      </Group>

      {items.length === 0 ? (
        <Paper p="sm" withBorder bg="gray.0">
          <Text size="sm" c="dimmed" ta="center">
            No items yet. Click &quot;Create New&quot; to add one.
          </Text>
        </Paper>
      ) : (
        <Stack gap="xs">
          {items.map((item) => (
            <Paper
              key={item.id}
              p="sm"
              withBorder
              className={classes.listItem}
              onClick={() => onSelect(item)}
            >
              <Group justify="space-between">
                <Stack gap={2}>
                  <Text fw={500}>Position: {item.position}</Text>
                  <Text size="xs" c="dimmed">
                    Template: {item.sectionUICredentials?.code || 'None'}
                  </Text>
                </Stack>
                <Button size="xs" variant="light">
                  Edit
                </Button>
              </Group>
            </Paper>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
