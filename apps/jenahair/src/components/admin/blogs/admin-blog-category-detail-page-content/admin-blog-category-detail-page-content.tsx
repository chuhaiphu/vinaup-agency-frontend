'use client';

import { Grid, GridCol, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { ConfirmModal } from '@vinaup/ui/shared';
import { TreeManager, generateErrorMessage } from '@vinaup/utils';
import { useRouter } from 'next/navigation';
import { use, useMemo, useState } from 'react';

import {
  deleteBlogCategoryActionPrivate,
  updateBlogCategoryActionPrivate,
} from '@/actions/blog-category-actions';
import FeatureImageSection from '@/components/admin/shared/feature-image-section/feature-image-section';
import VideoSection from '@/components/admin/shared/video-section/video-section';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { BlogCategoryResponse } from '@/interfaces/blog-category-interfaces';
import { generateUniqueEndpoint } from '@/utils/generate-unique-endpoint';

import { BlogCategoryDetailFormValues, toBlogCategoryDetailFormValues } from './_form';
import BlogCategoryConfigSection from './blog-category-config-section/blog-category-config-section';
import BlogCategoryInfoSection from './blog-category-info-section/blog-category-info-section';

interface AdminBlogCategoryDetailPageContentProps {
  currentBlogCategoryPromise: Promise<ActionResponse<BlogCategoryResponse>>;
  blogCategoriesPromise: Promise<ActionResponse<BlogCategoryResponse[]>>;
  availableSortOrdersPromise: Promise<ActionResponse<number[]>>;
}

export default function AdminBlogCategoryDetailPageContent({
  currentBlogCategoryPromise,
  blogCategoriesPromise,
  availableSortOrdersPromise,
}: AdminBlogCategoryDetailPageContentProps) {
  const currentBlogCategoryResult = use(currentBlogCategoryPromise);
  const blogCategoriesResult = use(blogCategoriesPromise);
  const availableSortOrdersResult = use(availableSortOrdersPromise);

  if (!currentBlogCategoryResult.success || !currentBlogCategoryResult.data) {
    return <div>Blog category not found</div>;
  }

  return (
    <AdminBlogCategoryDetailPageContentInner
      // Remount on id change so useForm re-initializes to drops unsaved edits when navigate forth and back.
      key={currentBlogCategoryResult.data.id}
      currentBlogCategory={currentBlogCategoryResult.data}
      blogCategoriesData={blogCategoriesResult.data ?? []}
      availableSortOrdersData={availableSortOrdersResult.data ?? []}
    />
  );
}

interface AdminBlogCategoryDetailPageContentInnerProps {
  currentBlogCategory: BlogCategoryResponse;
  blogCategoriesData: BlogCategoryResponse[];
  availableSortOrdersData: number[];
}

function AdminBlogCategoryDetailPageContentInner({
  currentBlogCategory,
  blogCategoriesData,
  availableSortOrdersData,
}: AdminBlogCategoryDetailPageContentInnerProps) {
  const form = useForm<BlogCategoryDetailFormValues>({
    initialValues: toBlogCategoryDetailFormValues(currentBlogCategory),
  });

  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const router = useRouter();

  const treeManager = useMemo(() => {
    if (blogCategoriesData.length === 0) {
      return null;
    }
    return new TreeManager(blogCategoriesData);
  }, [blogCategoriesData]);

  // Filter out the current category and its children — a category cannot be its own ancestor
  const excludedIds = treeManager?.toIds(treeManager?.toFlatList(currentBlogCategory.id) ?? []);
  excludedIds?.add(currentBlogCategory.id);

  const parentOptions = blogCategoriesData
    .filter((cat) => !excludedIds?.has(cat.id))
    .map((cat) => ({ value: cat.id, label: cat.title }));

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const values = form.getValues();

      // ─── Step 1: regenerate the endpoint only when the title changed ─────
      let newEndpoint = currentBlogCategory.endpoint;
      if (values.title !== currentBlogCategory.title) {
        newEndpoint = await generateUniqueEndpoint(
          values.title,
          'blog-category',
          currentBlogCategory.id,
        );
      }

      // ─── Step 2: persist every field in one update ─────
      // All fields (including image urls) are buffered in the form and saved together.
      await updateBlogCategoryActionPrivate(currentBlogCategory.id, {
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

  const handleDeleteBlogCategory = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteBlogCategoryActionPrivate(currentBlogCategory.id);
      if (result.success) {
        router.replace('/adminup/blog-category');
        notifications.show({
          message: 'Blog category has been successfully deleted',
          color: 'green',
          position: 'top-center',
          autoClose: 1500,
        });
      } else {
        notifications.show({
          title: 'Delete failed',
          message: result.error || 'Failed to delete blog category',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Delete failed',
        message: generateErrorMessage(error, 'Failed to delete blog category'),
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
            <BlogCategoryInfoSection
              form={form}
              endpoint={currentBlogCategory.endpoint}
              parentOptions={parentOptions}
            />
          </Stack>
        </GridCol>

        <GridCol span={{ base: 12, sm: 12, md: 5, lg: 5, xl: 4 }}>
          <BlogCategoryConfigSection
            form={form}
            availableSortOrders={availableSortOrdersData}
            isSaving={isSaving}
            onSave={handleSave}
            onExit={() => router.push('/adminup/blog-category')}
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
        onConfirm={handleDeleteBlogCategory}
        loading={isDeleting}
        message="Are you sure you want to delete this blog category?"
      />
    </div>
  );
}
