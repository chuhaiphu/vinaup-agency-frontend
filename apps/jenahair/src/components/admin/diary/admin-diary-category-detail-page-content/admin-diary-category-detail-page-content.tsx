'use client';

import { Grid, GridCol, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { ConfirmModal } from '@vinaup/ui/shared';
import { TreeManager, generateErrorMessage } from '@vinaup/utils';
import { useRouter } from 'next/navigation';
import { use, useMemo, useState } from 'react';

import {
  deleteDiaryCategoryActionPrivate,
  updateDiaryCategoryActionPrivate,
} from '@/actions/diary-category-actions';
import FeatureImageSection from '@/components/admin/shared/feature-image-section/feature-image-section';
import VideoSection from '@/components/admin/shared/video-section/video-section';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { DiaryCategoryResponse } from '@/interfaces/diary-category-interfaces';
import { generateUniqueEndpoint } from '@/utils/generate-unique-endpoint';

import { DiaryCategoryDetailFormValues, toDiaryCategoryDetailFormValues } from './_form';
import DiaryCategoryConfigSection from './diary-category-config-section/diary-category-config-section';
import DiaryCategoryInfoSection from './diary-category-info-section/diary-category-info-section';

interface AdminDiaryCategoryDetailPageContentProps {
  currentDiaryCategoryPromise: Promise<ActionResponse<DiaryCategoryResponse>>;
  diaryCategoriesPromise: Promise<ActionResponse<DiaryCategoryResponse[]>>;
  availableSortOrdersPromise: Promise<ActionResponse<number[]>>;
}

export default function AdminDiaryCategoryDetailPageContent({
  currentDiaryCategoryPromise,
  diaryCategoriesPromise,
  availableSortOrdersPromise,
}: AdminDiaryCategoryDetailPageContentProps) {
  const currentDiaryCategoryResult = use(currentDiaryCategoryPromise);
  const diaryCategoriesResult = use(diaryCategoriesPromise);
  const availableSortOrdersResult = use(availableSortOrdersPromise);

  if (!currentDiaryCategoryResult.success || !currentDiaryCategoryResult.data) {
    return <div>Diary category not found</div>;
  }

  return (
    <AdminDiaryCategoryDetailPageContentInner
      // Remount on id change so useForm re-initializes to drops unsaved edits when navigate forth and back.
      key={currentDiaryCategoryResult.data.id}
      currentDiaryCategory={currentDiaryCategoryResult.data}
      diaryCategoriesData={diaryCategoriesResult.data ?? []}
      availableSortOrdersData={availableSortOrdersResult.data ?? []}
    />
  );
}

interface AdminDiaryCategoryDetailPageContentInnerProps {
  currentDiaryCategory: DiaryCategoryResponse;
  diaryCategoriesData: DiaryCategoryResponse[];
  availableSortOrdersData: number[];
}

function AdminDiaryCategoryDetailPageContentInner({
  currentDiaryCategory,
  diaryCategoriesData,
  availableSortOrdersData,
}: AdminDiaryCategoryDetailPageContentInnerProps) {
  const form = useForm<DiaryCategoryDetailFormValues>({
    initialValues: toDiaryCategoryDetailFormValues(currentDiaryCategory),
  });

  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const router = useRouter();

  const treeManager = useMemo(() => {
    if (diaryCategoriesData.length === 0) {
      return null;
    }
    return new TreeManager(diaryCategoriesData);
  }, [diaryCategoriesData]);

  // Filter out the current category and its children — a category cannot be its own ancestor
  const excludedIds = treeManager?.toIds(treeManager?.toFlatList(currentDiaryCategory.id) ?? []);
  excludedIds?.add(currentDiaryCategory.id);

  const parentOptions = diaryCategoriesData
    .filter((cat) => !excludedIds?.has(cat.id))
    .map((cat) => ({ value: cat.id, label: cat.title }));

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const values = form.getValues();

      // ─── Step 1: regenerate the endpoint only when the title changed ─────
      let newEndpoint = currentDiaryCategory.endpoint;
      if (values.title !== currentDiaryCategory.title) {
        newEndpoint = await generateUniqueEndpoint(
          values.title,
          'diary-category',
          currentDiaryCategory.id,
        );
      }

      // ─── Step 2: persist every field in one update ─────
      await updateDiaryCategoryActionPrivate(currentDiaryCategory.id, {
        title: values.title,
        description: values.description,
        parentId: values.parentId || undefined,
        sortOrder: values.sortOrder,
        videoUrl: values.videoUrl,
        videoPosition: values.videoPosition,
        videoThumbnailUrl: values.videoThumbnailUrl,
        mainImageUrl: values.mainImageUrl,
        endpoint: newEndpoint,
      });

      notifications.show({
        message: 'Saved successfully',
        color: 'green',
        position: 'top-right',
        autoClose: 900,
      });
    } catch (error) {
      notifications.show({
        title: 'Save failed',
        message: generateErrorMessage(error, 'Failed to save'),
        color: 'red',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteDiaryCategory = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteDiaryCategoryActionPrivate(currentDiaryCategory.id);
      if (result.success) {
        router.replace('/adminup/diary-category');
        notifications.show({
          message: 'Diary category has been successfully deleted',
          color: 'green',
          position: 'top-center',
          autoClose: 1500,
        });
      } else {
        notifications.show({
          title: 'Delete failed',
          message: result.error || 'Failed to delete diary category',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Delete failed',
        message: generateErrorMessage(error, 'Failed to delete diary category'),
        color: 'red',
      });
    } finally {
      setIsDeleting(false);
      setDeleteModalOpened(false);
    }
  };

  return (
    <div>
      <Grid>
        <GridCol span={{ base: 12, sm: 12, md: 7, lg: 7, xl: 8 }}>
          <Stack>
            <DiaryCategoryInfoSection
              form={form}
              endpoint={currentDiaryCategory.endpoint}
              parentOptions={parentOptions}
            />
          </Stack>
        </GridCol>

        <GridCol span={{ base: 12, sm: 12, md: 5, lg: 5, xl: 4 }}>
          <DiaryCategoryConfigSection
            form={form}
            availableSortOrders={availableSortOrdersData}
            isSaving={isSaving}
            onSave={handleSave}
            onExit={() => router.push('/adminup/diary-category')}
            onDeleteClick={() => setDeleteModalOpened(true)}
          />
          <VideoSection
            label="Video"
            videoUrl={form.getValues().videoUrl}
            onVideoUrlChange={(videoUrl) => form.setFieldValue('videoUrl', videoUrl)}
            thumbnailUrl={form.getValues().videoThumbnailUrl}
            onThumbnailChange={(thumbnailUrl) =>
              form.setFieldValue('videoThumbnailUrl', thumbnailUrl)
            }
            position={form.getValues().videoPosition}
            onPositionChange={(position) => form.setFieldValue('videoPosition', position)}
          />
          <FeatureImageSection
            label="Featured image"
            hint="(png, jpg; jpeg; Size < 2M)"
            hintSize="sm"
            imageUrl={form.getValues().mainImageUrl}
            onChange={(imageUrl) => form.setFieldValue('mainImageUrl', imageUrl)}
          />
        </GridCol>
      </Grid>

      <ConfirmModal
        variant="danger"
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        onConfirm={handleDeleteDiaryCategory}
        loading={isDeleting}
        message="Are you sure you want to delete this diary category?"
      />
    </div>
  );
}
