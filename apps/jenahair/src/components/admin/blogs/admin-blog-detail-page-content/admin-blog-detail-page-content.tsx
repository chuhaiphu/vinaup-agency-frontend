'use client';

import {
  ActionIcon,
  Grid,
  GridCol,
  Group,
  Paper,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { VinaupAddNewIcon as AddNewIcon } from '@vinaup/ui/cores';
import { ConfirmModal } from '@vinaup/ui/shared';
import { generateErrorMessage } from '@vinaup/utils';
import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';

import {
  createBlogActionPrivate,
  deleteBlogActionPrivate,
  updateBlogActionPrivate,
} from '@/actions/blog-actions';
import {
  createBlogCategoryBlogActionPrivate,
  deleteBlogCategoryBlogActionPrivate,
} from '@/actions/blog-category-blog-actions';
import AdditionalImagesSection from '@/components/admin/shared/additional-images-section/additional-images-section';
import CategoryMultiSelect from '@/components/admin/shared/category-multi-select/category-multi-select';
import FeatureImageSection from '@/components/admin/shared/feature-image-section/feature-image-section';
import SeoPreviewSection from '@/components/admin/shared/seo-preview-section/seo-preview-section';
import VideoSection from '@/components/admin/shared/video-section/video-section';
import { MAX_IMAGE_COUNT_ALLOWED, SITE_BASE_URL } from '@/constants';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { BlogCategoryResponse } from '@/interfaces/blog-category-interfaces';
import { BlogResponse } from '@/interfaces/blog-interfaces';
import { useAuthContext } from '@/providers/auth-provider';
import { generateUniqueEndpoint } from '@/utils/generate-unique-endpoint';

import { BlogDetailFormValues, toBlogDetailFormValues } from './_form';
import classes from './admin-blog-detail-page-content.module.scss';
import BlogConfigSection from './blog-config-section/blog-config-section';
import BlogContentSection from './blog-content-section/blog-content-section';
import BlogDestinationSection from './blog-destination-section/blog-destination-section';
import BlogTitleSection from './blog-title-section/blog-title-section';

interface AdminBlogDetailPageContentProps {
  currentBlogPromise: Promise<ActionResponse<BlogResponse>>;
  blogCategoriesPromise: Promise<ActionResponse<BlogCategoryResponse[]>>;
}

export default function AdminBlogDetailPageContent({
  currentBlogPromise,
  blogCategoriesPromise,
}: AdminBlogDetailPageContentProps) {
  const currentBlogResult = use(currentBlogPromise);
  const blogCategoriesResult = use(blogCategoriesPromise);
  const { getUser } = useAuthContext();

  if (!currentBlogResult.success || !currentBlogResult.data) {
    return <div>Blog not found</div>;
  }

  return (
    <AdminBlogDetailPageContentInner
      // Remount on id change so useForm re-initializes to drops unsaved edits when navigate forth and back.
      key={currentBlogResult.data.id}
      currentBlogData={currentBlogResult.data}
      blogCategoriesData={blogCategoriesResult.data ?? []}
      userId={getUser()?.id ?? ''}
    />
  );
}

interface AdminBlogDetailPageContentInnerProps {
  currentBlogData: BlogResponse;
  blogCategoriesData: BlogCategoryResponse[];
  userId: string;
}

function AdminBlogDetailPageContentInner({
  currentBlogData,
  blogCategoriesData,
  userId,
}: AdminBlogDetailPageContentInnerProps) {
  const form = useForm<BlogDetailFormValues>({
    initialValues: toBlogDetailFormValues(currentBlogData),
  });

  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const router = useRouter();

  const handleAddNewBlog = async () => {
    setIsCreating(true);
    const newTitle = '';
    const endpoint = await generateUniqueEndpoint(newTitle, 'blog');
    const response = await createBlogActionPrivate({
      title: newTitle,
      endpoint: endpoint,
      destinations: ['Ho Chi Minh'],
      userId: userId,
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
    notifications.show({
      title: 'New blog created',
      message: 'New blog has been successfully created',
      color: 'green',
      position: 'top-center',
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const values = form.getValues();

      // ─── Step 1: regenerate the endpoint only when the title changed ─────
      // The endpoint is derived from the title.
      let newEndpoint = currentBlogData.endpoint;
      if (values.title !== currentBlogData.title) {
        newEndpoint = await generateUniqueEndpoint(values.title, 'blog', currentBlogData.id);
      }

      // ─── Step 2: persist every field in one update ─────
      // All fields (including image urls) are buffered in the form and saved together.
      await updateBlogActionPrivate(currentBlogData.id, {
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
      const currentBlogCategoryIds = currentBlogData.blogCategoryBlogs.map(
        (bcb) => bcb.blogCategoryId,
      );
      const toAdd = values.categoryIds.filter((id) => !currentBlogCategoryIds.includes(id));
      const toRemove = currentBlogCategoryIds.filter((id) => !values.categoryIds.includes(id));

      for (const blogCategoryId of toAdd) {
        await createBlogCategoryBlogActionPrivate({
          blogId: currentBlogData.id,
          blogCategoryId: blogCategoryId,
          sortOrder: 0,
        });
      }

      for (const blogCategoryId of toRemove) {
        const blogCategoryBlog = currentBlogData.blogCategoryBlogs.find(
          (bcb) => bcb.blogCategoryId === blogCategoryId,
        );
        if (blogCategoryBlog) {
          await deleteBlogCategoryBlogActionPrivate(blogCategoryBlog.id);
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

  const handleDeleteBlog = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteBlogActionPrivate(currentBlogData.id);
      if (result.success) {
        router.replace('/adminup/blog');
        notifications.show({
          message: 'Blog has been successfully deleted',
          color: 'green',
          position: 'top-center',
        });
      } else {
        notifications.show({
          title: 'Delete failed',
          message: result.error || 'Failed to delete blog',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Delete failed',
        message: generateErrorMessage(error, 'Failed to delete blog'),
        color: 'red',
      });
    } finally {
      setIsDeleting(false);
      setDeleteModalOpened(false);
    }
  };

  return (
    <div className={classes.adminBlogDetailPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Blog detail</Text>
        <Group gap="xs">
          <UnstyledButton onClick={handleAddNewBlog} fz={'lg'}>
            Add new
          </UnstyledButton>
          <ActionIcon variant="transparent" onClick={handleAddNewBlog} loading={isCreating}>
            <AddNewIcon width={32} height={32} />
          </ActionIcon>
        </Group>
      </Group>
      <Grid>
        <GridCol span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 9 }}>
          <Stack>
            <BlogTitleSection form={form} endpoint={currentBlogData.endpoint} />
            <BlogContentSection form={form} />
            <AdditionalImagesSection
              imageUrls={form.getValues().additionalImageUrls}
              onChange={(imageUrls) => form.setFieldValue('additionalImageUrls', imageUrls)}
              position={form.getValues().additionalImagesPosition}
              onPositionChange={(position) =>
                form.setFieldValue('additionalImagesPosition', position)
              }
              maxCount={MAX_IMAGE_COUNT_ALLOWED}
            />
            <BlogDestinationSection form={form} country={currentBlogData.country} />
            <SeoPreviewSection
              title={form.getValues().title}
              contentHtml={form.getValues().content}
              url={`${SITE_BASE_URL}/blogs/${currentBlogData.endpoint}`}
              updatedAt={currentBlogData.updatedAt}
            />
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 3 }}>
          <BlogConfigSection
            form={form}
            updatedAt={currentBlogData.updatedAt}
            isSaving={isSaving}
            onSave={handleSave}
            onExit={() => router.push('/adminup/blog')}
            onDeleteClick={() => setDeleteModalOpened(true)}
          />
          <Paper p={'xs'} radius={'md'} mt={'sm'} classNames={{ root: classes.paperBlock }}>
            <Group justify="space-between" wrap="nowrap">
              <CategoryMultiSelect
                categories={blogCategoriesData}
                value={form.getValues().categoryIds}
                onChange={(categoryIds) => form.setFieldValue('categoryIds', categoryIds)}
                maxValues={3}
                placeholder="Select up to 3 blog categories"
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
      <ConfirmModal
        variant="danger"
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        onConfirm={handleDeleteBlog}
        loading={isDeleting}
      />
    </div>
  );
}
