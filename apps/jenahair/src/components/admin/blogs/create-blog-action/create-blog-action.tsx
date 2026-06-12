'use client';

import { ActionIcon, Group, UnstyledButton } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { VinaupAddNewIcon as AddNewIcon } from '@vinaup/ui/cores';
import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createBlogActionPrivate } from '@/actions/blog-actions';
import { useAuth } from '@/providers/auth-provider';
import { generateUniqueEndpoint } from '@/utils/generate-unique-endpoint';

export default function CreateBlogAction() {
  const router = useRouter();
  const userData = useAuth().getUser();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewBlog = async () => {
    setIsCreating(true);
    const newTitle = '';
    const endpoint = await generateUniqueEndpoint(newTitle, 'blog');

    const response = await createBlogActionPrivate({
      title: newTitle,
      endpoint: endpoint,
      destinations: ['Ho Chi Minh'],
      userId: userData?.id || '',
    });

    if (!response.success || !response.data) {
      notifications.show({
        title: 'Create blog failed',
        message: response.error || 'Failed to create blog',
        color: 'red',
      });
      setIsCreating(false);
      return;
    }

    const blogId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/blog/${blogId}` as Route);
  };

  return (
    <Group gap="xs">
      <UnstyledButton onClick={handleAddNewBlog} fz={'lg'}>
        Add new
      </UnstyledButton>
      <ActionIcon variant="transparent" onClick={handleAddNewBlog} loading={isCreating}>
        <AddNewIcon width={32} height={32} />
      </ActionIcon>
    </Group>
  );
}
