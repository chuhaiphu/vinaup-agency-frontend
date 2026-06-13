'use client';

import { ActionIcon, Grid, GridCol, Group, Paper, Stack, Text, UnstyledButton } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { VinaupAddNewIcon as AddNewIcon } from '@vinaup/ui/cores';
import { generateErrorMessage } from '@vinaup/utils';
import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';

import {
  createDiaryActionPrivate,
  deleteDiaryActionPrivate,
  updateDiaryActionPrivate,
} from '@/actions/diary-actions';
import {
  createDiaryCategoryDiaryActionPrivate,
  deleteDiaryCategoryDiaryActionPrivate,
} from '@/actions/diary-category-diary-actions';
import AdditionalImagesSection from '@/components/admin/shared/additional-images-section/additional-images-section';
import CategoryMultiSelect from '@/components/admin/shared/category-multi-select/category-multi-select';
import DeleteConfirmModal from '@/components/admin/shared/delete-confirm-modal/delete-confirm-modal';
import FeatureImageSection from '@/components/admin/shared/feature-image-section/feature-image-section';
import SeoPreviewSection from '@/components/admin/shared/seo-preview-section/seo-preview-section';
import VideoSection from '@/components/admin/shared/video-section/video-section';
import { MAX_IMAGE_COUNT_ALLOWED, SITE_BASE_URL } from '@/constants';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { DiaryCategoryResponse } from '@/interfaces/diary-category-interfaces';
import { DiaryResponse } from '@/interfaces/diary-interfaces';
import { useAuthContext } from '@/providers/auth-provider';
import { generateUniqueEndpoint } from '@/utils/generate-unique-endpoint';

import { DiaryDetailFormValues, toDiaryDetailFormValues } from './_form';
import classes from './admin-diary-detail-page-content.module.scss';
import DiaryConfigSection from './diary-config-section/diary-config-section';
import DiaryContentSection from './diary-content-section/diary-content-section';
import DiaryDestinationSection from './diary-destination-section/diary-destination-section';
import DiaryTitleSection from './diary-title-section/diary-title-section';

interface AdminDiaryDetailPageContentProps {
  currentDiaryPromise: Promise<ActionResponse<DiaryResponse>>;
  diaryCategoriesPromise: Promise<ActionResponse<DiaryCategoryResponse[]>>;
}

export default function AdminDiaryDetailPageContent({
  currentDiaryPromise,
  diaryCategoriesPromise,
}: AdminDiaryDetailPageContentProps) {
  const currentDiaryResult = use(currentDiaryPromise);
  const diaryCategoriesResult = use(diaryCategoriesPromise);
  const { getUser } = useAuthContext();

  if (!currentDiaryResult.success || !currentDiaryResult.data) {
    return <div>Diary not found</div>;
  }

  return (
    <AdminDiaryDetailPageContentInner
      currentDiaryData={currentDiaryResult.data}
      diaryCategoriesData={diaryCategoriesResult.data ?? []}
      userId={getUser()?.id ?? ''}
    />
  );
}

interface AdminDiaryDetailPageContentInnerProps {
  currentDiaryData: DiaryResponse;
  diaryCategoriesData: DiaryCategoryResponse[];
  userId: string;
}

function AdminDiaryDetailPageContentInner({
  currentDiaryData,
  diaryCategoriesData,
  userId,
}: AdminDiaryDetailPageContentInnerProps) {
  const form = useForm<DiaryDetailFormValues>({
    initialValues: toDiaryDetailFormValues(currentDiaryData),
  });

  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const router = useRouter();

  const handleAddNewDiary = async () => {
    setIsCreating(true);
    const newTitle = '';
    const endpoint = await generateUniqueEndpoint(newTitle, 'diary');
    const response = await createDiaryActionPrivate({
      title: newTitle,
      endpoint: endpoint,
      destinations: ['Ho Chi Minh'],
      userId: userId,
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
    notifications.show({
      title: 'New diary created',
      message: 'New diary has been successfully created',
      color: 'green',
      position: 'top-center',
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const values = form.getValues();

      // ─── Step 1: regenerate the endpoint only when the title changed ─────
      // The endpoint is derived from the title; an unchanged title keeps the published URL stable.
      let newEndpoint = currentDiaryData.endpoint;
      if (values.title !== currentDiaryData.title) {
        newEndpoint = await generateUniqueEndpoint(values.title, 'diary', currentDiaryData.id);
      }

      // ─── Step 2: persist every field in one update ─────
      // All fields (including image urls) are buffered in the form and saved together.
      await updateDiaryActionPrivate(currentDiaryData.id, {
        title: values.title,
        endpoint: newEndpoint,
        content: values.content,
        additionalImageUrls: values.additionalImageUrls,
        additionalImagesPosition: values.additionalImagesPosition,
        videoUrl: values.videoUrl,
        videoThumbnailUrl: values.videoThumbnailUrl,
        mainImageUrl: values.mainImageUrl,
        videoPosition: values.videoPosition,
        destinations: values.destinations,
        visibility: values.visibility,
        sortOrder: values.sortOrder,
      });

      // ─── Step 3: diff the category links against the loaded snapshot ─────
      // The join rows are separate entities, so they are created/deleted individually.
      const currentDiaryCategoryIds = currentDiaryData.diaryCategoryDiaries.map(
        (dcd) => dcd.diaryCategoryId,
      );
      const toAdd = values.categoryIds.filter((id) => !currentDiaryCategoryIds.includes(id));
      const toRemove = currentDiaryCategoryIds.filter((id) => !values.categoryIds.includes(id));

      for (const diaryCategoryId of toAdd) {
        await createDiaryCategoryDiaryActionPrivate({
          diaryId: currentDiaryData.id,
          diaryCategoryId: diaryCategoryId,
          sortOrder: 0,
        });
      }

      for (const diaryCategoryId of toRemove) {
        const diaryCategoryDiary = currentDiaryData.diaryCategoryDiaries.find(
          (dcd) => dcd.diaryCategoryId === diaryCategoryId,
        );
        if (diaryCategoryDiary) {
          await deleteDiaryCategoryDiaryActionPrivate(diaryCategoryDiary.id);
        }
      }

      notifications.show({
        title: 'Success',
        message: 'All changes have been saved successfully',
        color: 'green',
        position: 'top-right',
      });
    } catch (error) {
      notifications.show({
        title: 'Save failed',
        message: generateErrorMessage(error, 'Unknown error'),
        color: 'red',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteDiary = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteDiaryActionPrivate(currentDiaryData.id);
      if (result.success) {
        router.replace('/adminup/diary');
        notifications.show({
          message: 'Diary has been successfully deleted',
          color: 'green',
          position: 'top-center',
        });
      } else {
        notifications.show({
          title: 'Delete failed',
          message: result.error || 'Failed to delete diary',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Delete failed',
        message: generateErrorMessage(error, 'Failed to delete diary'),
        color: 'red',
      });
    } finally {
      setIsDeleting(false);
      setDeleteModalOpened(false);
    }
  };

  return (
    <div className={classes.adminDiaryDetailPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Diary detail</Text>
        <Group gap="xs">
          <UnstyledButton onClick={handleAddNewDiary} fz={'lg'}>
            Add new
          </UnstyledButton>
          <ActionIcon variant="transparent" onClick={handleAddNewDiary} loading={isCreating}>
            <AddNewIcon width={32} height={32} />
          </ActionIcon>
        </Group>
      </Group>
      <Grid>
        <GridCol span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 9 }}>
          <Stack>
            <DiaryTitleSection form={form} endpoint={currentDiaryData.endpoint} />
            <DiaryContentSection form={form} />
            <AdditionalImagesSection
              imageUrls={form.getValues().additionalImageUrls}
              onChange={(imageUrls) => form.setFieldValue('additionalImageUrls', imageUrls)}
              position={form.getValues().additionalImagesPosition}
              onPositionChange={(position) =>
                form.setFieldValue('additionalImagesPosition', position)
              }
              maxCount={MAX_IMAGE_COUNT_ALLOWED}
            />
            <DiaryDestinationSection form={form} country={currentDiaryData.country} />
            <SeoPreviewSection
              title={form.getValues().title}
              contentHtml={form.getValues().content}
              url={`${SITE_BASE_URL}/nhat-ky/${currentDiaryData.endpoint}`}
              updatedAt={currentDiaryData.updatedAt}
            />
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 3 }}>
          <DiaryConfigSection
            form={form}
            updatedAt={currentDiaryData.updatedAt}
            isSaving={isSaving}
            onSave={handleSave}
            onExit={() => router.push('/adminup/diary')}
            onDeleteClick={() => setDeleteModalOpened(true)}
          />
          <Paper p={'xs'} radius={'md'} mt={'sm'} classNames={{ root: classes.paperBlock }}>
            <Group justify="space-between" wrap="nowrap">
              <CategoryMultiSelect
                categories={diaryCategoriesData}
                value={form.getValues().categoryIds}
                onChange={(categoryIds) => form.setFieldValue('categoryIds', categoryIds)}
                maxValues={3}
                placeholder="Select up to 3 diary categories"
              />
            </Group>
          </Paper>
          <VideoSection
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
            imageUrl={form.getValues().mainImageUrl}
            onChange={(imageUrl) => form.setFieldValue('mainImageUrl', imageUrl)}
          />
        </GridCol>
      </Grid>
      <DeleteConfirmModal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        onConfirm={handleDeleteDiary}
        isDeleting={isDeleting}
      />
    </div>
  );
}
