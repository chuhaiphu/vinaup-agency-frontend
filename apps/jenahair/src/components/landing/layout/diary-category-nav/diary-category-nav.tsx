'use client';

import { Paper, Stack, Group, Text } from '@mantine/core';
import { TreeManager } from '@vinaup/utils';
import { Route } from 'next';
import { useParams, useRouter } from 'next/navigation';
import React, { use, useMemo } from 'react';

import { ActionResponse } from '@/interfaces/_base-interfaces';
import { DiaryCategoryResponse } from '@/interfaces/diary-category-interfaces';

import classes from './diary-category-nav.module.scss';

interface DiaryCategoryNavProps {
  diaryCategoriesDataPromise: Promise<ActionResponse<DiaryCategoryResponse[]>>;
}

export default function DiaryCategoryNav({ diaryCategoriesDataPromise }: DiaryCategoryNavProps) {
  const router = useRouter();
  const { id } = useParams();

  const diaryCategoriesData = use(diaryCategoriesDataPromise);

  const treeManager = useMemo(() => {
    if (diaryCategoriesData.data === undefined || diaryCategoriesData.data?.length === 0) {
      return null;
    }
    return new TreeManager(diaryCategoriesData.data);
  }, [diaryCategoriesData]);

  const isActiveDiaryCategory = (categoryId: string) => {
    return id === categoryId;
  };

  const renderDiaryCategoryTree = () => {
    const root = treeManager?.getRoot();
    if (!root || !root.children) {
      return null;
    }
    return root.children?.map((child) => renderDiaryCategoryBar(child, 0));
  };

  const renderDiaryCategoryBar = (
    diaryCategory: DiaryCategoryResponse,
    depth: number = 0,
  ): React.ReactNode => {
    return (
      <React.Fragment key={diaryCategory.id}>
        <Stack
          key={diaryCategory.id}
          className={`${classes.navItem} ${isActiveDiaryCategory(diaryCategory.id) ? classes.active : ''}`}
          bd={'1px solid #c7c7c7'}
          bdrs={'sm'}
          p={'8px'}
          ml={depth * 16}
          onClick={() => {
            router.push(`/adminup/diary-category/${diaryCategory.id}` as Route);
          }}
        >
          <Group key={diaryCategory.id}>
            <Text fw={isActiveDiaryCategory(diaryCategory.id) ? 'bold' : 'normal'}>
              {diaryCategory.title}
            </Text>
          </Group>
        </Stack>
        <>{diaryCategory.children?.map((child) => renderDiaryCategoryBar(child, depth + 1))}</>
      </React.Fragment>
    );
  };

  return (
    <Paper p={'sm'} radius={'md'} shadow="xs" withBorder>
      <Stack gap={'xs'}>{renderDiaryCategoryTree()}</Stack>
    </Paper>
  );
}
