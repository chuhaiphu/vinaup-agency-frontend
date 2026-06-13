'use client';

import { Button, Group, Paper, Stack, Text } from '@mantine/core';
import { use, useState } from 'react';

import { DynamicSectionUIResponse } from '@/interfaces/dynamic-section-ui-interfaces';

import classes from './admin-section-ui-detail-page-content.module.scss';
import SectionUICreateForm from './section-ui-create-form/section-ui-create-form';
import SectionUIEditForm from './section-ui-edit-form/section-ui-edit-form';
import SectionUIListView from './section-ui-list-view/section-ui-list-view';

interface AdminSectionUIDetailPageContentProps {
  existingDynamicSectionUIsPromise: Promise<DynamicSectionUIResponse[]>;
  usedPositionsPromise: Promise<number[]>;
}

export default function AdminSectionUIDetailPageContent({
  existingDynamicSectionUIsPromise,
  usedPositionsPromise,
}: AdminSectionUIDetailPageContentProps) {
  const existingDynamicSectionUIs = use(existingDynamicSectionUIsPromise);
  const usedPositions = use(usedPositionsPromise);

  // ─── The screen is a 3-mode state machine, not a single edit form ─────
  // `list` browses items; `create` is a wizard; `edit` buffers one item's fields behind a Save.
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedItem, setSelectedItem] = useState<DynamicSectionUIResponse | null>(null);

  const handleBackToList = () => {
    setSelectedItem(null);
    setMode('list');
  };

  const handleSelect = (item: DynamicSectionUIResponse) => {
    setSelectedItem(item);
    setMode('edit');
  };

  // After a create, the new row has an id — hand off to the edit form to configure it.
  const handleCreated = (item: DynamicSectionUIResponse) => {
    setSelectedItem(item);
    setMode('edit');
  };

  return (
    <div className={classes.sectionUIDetailRoot}>
      <Paper p="md" radius="md" classNames={{ root: classes.paperBlock }}>
        <Stack gap="md">
          <Group justify="space-between">
            <Text size="xl" fw={600}>
              Section UI
            </Text>
            {mode !== 'list' && (
              <Button onClick={handleBackToList} variant="outline" size="sm">
                Back
              </Button>
            )}
          </Group>

          {mode === 'list' && (
            <SectionUIListView
              items={existingDynamicSectionUIs}
              onSelect={handleSelect}
              onCreateNew={() => setMode('create')}
            />
          )}

          {mode === 'create' && (
            <SectionUICreateForm usedPositions={usedPositions} onCreated={handleCreated} />
          )}

          {mode === 'edit' && selectedItem && (
            <SectionUIEditForm
              item={selectedItem}
              usedPositions={usedPositions}
              onUpdated={setSelectedItem}
              onDeleted={handleBackToList}
            />
          )}
        </Stack>
      </Paper>
    </div>
  );
}
