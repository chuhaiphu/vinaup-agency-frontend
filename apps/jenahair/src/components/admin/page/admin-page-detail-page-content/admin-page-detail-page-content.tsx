'use client';

import { ActionIcon, Grid, GridCol, Group, Stack, Text, UnstyledButton } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { VinaupAddNewIcon as AddNewIcon } from '@vinaup/ui/cores';
import { generateErrorMessage } from '@vinaup/utils';
import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';

import {
  createPageActionPrivate,
  deletePageActionPrivate,
  updatePageActionPrivate,
} from '@/actions/page-actions';
import AdditionalImagesSection from '@/components/admin/shared/additional-images-section/additional-images-section';
import DeleteConfirmModal from '@/components/admin/shared/delete-confirm-modal/delete-confirm-modal';
import FeatureImageSection from '@/components/admin/shared/feature-image-section/feature-image-section';
import SeoPreviewSection from '@/components/admin/shared/seo-preview-section/seo-preview-section';
import VideoSection from '@/components/admin/shared/video-section/video-section';
import { MAX_IMAGE_COUNT_ALLOWED, SITE_BASE_URL } from '@/constants';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { PageResponse } from '@/interfaces/page-interfaces';
import { useAuthContext } from '@/providers/auth-provider';
import { generateUniqueEndpoint } from '@/utils/generate-unique-endpoint';

import { PageDetailFormValues, toPageDetailFormValues } from './_form';
import classes from './admin-page-detail-page-content.module.scss';
import PageConfigSection from './page-config-section/page-config-section';
import PageContentSection from './page-content-section/page-content-section';
import PageTitleSection from './page-title-section/page-title-section';

interface AdminPageDetailPageContentProps {
  currentPagePromise: Promise<ActionResponse<PageResponse>>;
}

export default function AdminPageDetailPageContent({
  currentPagePromise,
}: AdminPageDetailPageContentProps) {
  const currentPageResult = use(currentPagePromise);
  const { getUser } = useAuthContext();

  if (!currentPageResult.success || !currentPageResult.data) {
    return <div>Page not found</div>;
  }

  return (
    <AdminPageDetailPageContentInner
      currentPageData={currentPageResult.data}
      userId={getUser()?.id ?? ''}
    />
  );
}

interface AdminPageDetailPageContentInnerProps {
  currentPageData: PageResponse;
  userId: string;
}

function AdminPageDetailPageContentInner({
  currentPageData,
  userId,
}: AdminPageDetailPageContentInnerProps) {
  const form = useForm<PageDetailFormValues>({
    initialValues: toPageDetailFormValues(currentPageData),
  });

  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const router = useRouter();

  const handleAddNewPage = async () => {
    setIsCreating(true);
    const newTitle = 'Untitled';
    const endpoint = await generateUniqueEndpoint(newTitle, 'page');

    const response = await createPageActionPrivate({
      title: newTitle,
      endpoint: endpoint,
      destinations: [],
      userId: userId,
    });

    if (!response.success || !response.data) {
      notifications.show({
        title: 'Create page failed',
        message: response.error || 'Failed to create page',
        color: 'red',
      });
      setIsCreating(false);
      return;
    }
    const pageId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/page/${pageId}` as Route);
    notifications.show({
      title: 'New page created',
      message: 'New page has been successfully created',
      color: 'green',
      position: 'top-center',
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const values = form.getValues();

      // ─── Step 1: resolve the final endpoint ─────
      // The endpoint is editable here (unlike blog/diary): a manual edit wins over the
      // title-derived value; either source still goes through the uniqueness check.
      let finalEndpoint = values.endpoint;
      if (values.title !== currentPageData.title && values.endpoint === currentPageData.endpoint) {
        finalEndpoint = await generateUniqueEndpoint(values.title, 'page', currentPageData.id);
      } else if (values.endpoint !== currentPageData.endpoint) {
        finalEndpoint = await generateUniqueEndpoint(values.endpoint, 'page', currentPageData.id);
      }

      // ─── Step 2: persist every field in one update ─────
      // All fields (including image urls) are buffered in the form and saved together.
      await updatePageActionPrivate(currentPageData.id, {
        title: values.title,
        endpoint: finalEndpoint,
        content: values.content,
        additionalImageUrls: values.additionalImageUrls,
        additionalImagesPosition: values.additionalImagesPosition,
        visibility: values.visibility,
        type: values.type,
        videoPosition: values.videoPosition,
        videoUrl: values.videoUrl,
        videoThumbnailUrl: values.videoThumbnailUrl,
        mainImageUrl: values.mainImageUrl,
      });

      // Reflect the server-resolved endpoint back into the form so the URL display stays live
      form.setFieldValue('endpoint', finalEndpoint);

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

  const handleDeletePage = async () => {
    setIsDeleting(true);
    try {
      const result = await deletePageActionPrivate(currentPageData.id);
      if (result.success) {
        router.replace('/adminup/page' as Route);
        notifications.show({
          message: 'Page has been successfully deleted',
          color: 'green',
          position: 'top-center',
        });
      } else {
        notifications.show({
          title: 'Delete failed',
          message: result.error || 'Failed to delete page',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Delete failed',
        message: generateErrorMessage(error, 'Failed to delete page'),
        color: 'red',
      });
    } finally {
      setIsDeleting(false);
      setDeleteModalOpened(false);
    }
  };

  return (
    <div className={classes.adminPageDetailPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Page detail</Text>
        <Group gap="xs">
          <UnstyledButton onClick={handleAddNewPage} fz={'lg'}>
            Add new
          </UnstyledButton>
          <ActionIcon variant="transparent" onClick={handleAddNewPage} loading={isCreating}>
            <AddNewIcon width={32} height={32} />
          </ActionIcon>
        </Group>
      </Group>
      <Grid>
        <GridCol span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 9 }}>
          <Stack>
            <PageTitleSection form={form} />
            <PageContentSection form={form} />
            <AdditionalImagesSection
              imageUrls={form.getValues().additionalImageUrls}
              onChange={(imageUrls) => form.setFieldValue('additionalImageUrls', imageUrls)}
              position={form.getValues().additionalImagesPosition}
              onPositionChange={(position) =>
                form.setFieldValue('additionalImagesPosition', position)
              }
              maxCount={MAX_IMAGE_COUNT_ALLOWED}
            />
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 3 }}>
          <PageConfigSection
            form={form}
            isSaving={isSaving}
            onSave={handleSave}
            onExit={() => router.push('/adminup/page' as Route)}
            onDeleteClick={() => setDeleteModalOpened(true)}
          />
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
      <SeoPreviewSection
        title={form.getValues().title}
        contentHtml={form.getValues().content}
        url={`${SITE_BASE_URL}/${form.getValues().endpoint}`}
        updatedAt={currentPageData.updatedAt}
        mt={'md'}
      />
      <DeleteConfirmModal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        onConfirm={handleDeletePage}
        isDeleting={isDeleting}
      />
    </div>
  );
}
