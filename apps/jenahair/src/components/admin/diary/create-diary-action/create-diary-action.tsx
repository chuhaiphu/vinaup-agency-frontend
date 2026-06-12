'use client';

import { ActionIcon, Group, UnstyledButton } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { VinaupAddNewIcon as AddNewIcon } from '@vinaup/ui/cores';
import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createDiaryActionPrivate } from '@/actions/diary-actions';
import { useAuth } from '@/providers/auth-provider';
import { generateUniqueEndpoint } from '@/utils/generate-unique-endpoint';

export default function CreateDiaryAction() {
  const router = useRouter();
  const userData = useAuth().getUser();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewDiary = async () => {
    setIsCreating(true);
    const newTitle = '';
    const endpoint = await generateUniqueEndpoint(newTitle, 'diary');

    const response = await createDiaryActionPrivate({
      title: newTitle,
      endpoint: endpoint,
      destinations: ['Ho Chi Minh'],
      userId: userData?.id || '',
    });

    if (!response.success || !response.data) {
      notifications.show({
        title: 'Create diary failed',
        message: response.error || 'Failed to create diary',
        color: 'red',
      });
      setIsCreating(false);
      return;
    }

    const diaryId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/diary/${diaryId}` as Route);
  };

  return (
    <Group gap="xs">
      <UnstyledButton onClick={handleAddNewDiary} fz={'lg'}>
        Add new
      </UnstyledButton>
      <ActionIcon variant="transparent" onClick={handleAddNewDiary} loading={isCreating}>
        <AddNewIcon width={32} height={32} />
      </ActionIcon>
    </Group>
  );
}
