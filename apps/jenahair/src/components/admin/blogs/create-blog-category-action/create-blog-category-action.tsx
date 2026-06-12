'use client';

import { ActionIcon, Group, UnstyledButton } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { VinaupAddNewIcon as AddNewIcon } from '@vinaup/ui/cores';
import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createBlogCategoryActionPrivate } from '@/actions/blog-category-actions';
import { generateUniqueEndpoint } from '@/utils/generate-unique-endpoint';

export default function CreateBlogCategoryAction() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewBlogCategory = async () => {
    setIsCreating(true);
    const newTitle = 'New Blog Category';
    const endpoint = await generateUniqueEndpoint(newTitle, 'blog-category');

    const response = await createBlogCategoryActionPrivate({
      title: newTitle,
      endpoint: endpoint,
    });

    if (!response.success || !response.data) {
      notifications.show({
        title: 'Create blog category failed',
        message: response.error || 'Failed to create blog category',
        color: 'red',
      });
      setIsCreating(false);
      return;
    }

    const categoryId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/blog-category/${categoryId}` as Route);
  };

  return (
    <Group gap="xs">
      <UnstyledButton onClick={handleAddNewBlogCategory} fz={'lg'}>
        Add new
      </UnstyledButton>
      <ActionIcon variant="transparent" onClick={handleAddNewBlogCategory} loading={isCreating}>
        <AddNewIcon width={32} height={32} />
      </ActionIcon>
    </Group>
  );
}
