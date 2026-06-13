'use client';
import {
  ActionIcon,
  Button,
  Group,
  Paper,
  Stack,
  Tabs,
  Text,
  TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { VinaupAddNewIcon as AddNewIcon } from '@vinaup/ui/cores';
import { ConfirmModal } from '@vinaup/ui/shared';
import { generateErrorMessage } from '@vinaup/utils';
import { use, useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';

import { updateCarouselActionPrivate } from '@/actions/theme-config-actions';
import UploadImageSection from '@/components/admin/media/upload-image-section/upload-image-section';
import { MAX_CAROUSEL_SLIDE_COUNT } from '@/constants';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { CarouselSlide, CarouselSlidesResponse } from '@/interfaces/theme-config-interfaces';

import classes from './admin-theme-carousel-page-content.module.scss';

interface AdminThemeBannerCarouselPageContentProps {
  carouselPromise: Promise<ActionResponse<CarouselSlidesResponse>>;
}

function generateId() {
  return `slide-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function AdminThemeBannerCarouselPageContent({
  carouselPromise,
}: AdminThemeBannerCarouselPageContentProps) {
  const result = use(carouselPromise);
  const initialSlides: CarouselSlide[] = result.data?.value ?? [];

  return <AdminThemeBannerCarouselPageContentInner initialSlides={initialSlides} />;
}

function AdminThemeBannerCarouselPageContentInner({
  initialSlides,
}: {
  initialSlides: CarouselSlide[];
}) {
  const [slides, setSlides] = useState<CarouselSlide[]>(initialSlides);
  const [activeTab, setActiveTab] = useState<string | null>(
    initialSlides[0]?.id?.toString() ?? null,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleAddSlide = () => {
    if (slides.length >= MAX_CAROUSEL_SLIDE_COUNT) return;
    const newSlide: CarouselSlide = {
      id: generateId(),
      imageUrl: '',
      href: '',
      title: '',
      subTitle: '',
    };
    setSlides((prev) => [...prev, newSlide]);
    setActiveTab(newSlide.id.toString());
  };

  const handleUpdateSlide = (id: string, field: keyof Omit<CarouselSlide, 'id'>, value: string) => {
    setSlides((prev) =>
      prev.map((slide) => (slide.id.toString() === id ? { ...slide, [field]: value } : slide)),
    );
  };

  const handleConfirmDelete = () => {
    if (!deleteTargetId) return;
    const idx = slides.findIndex((s) => s.id.toString() === deleteTargetId);
    const next = slides.filter((s) => s.id.toString() !== deleteTargetId);
    setSlides(next);
    if (activeTab === deleteTargetId) {
      setActiveTab(next[Math.max(0, idx - 1)]?.id?.toString() ?? next[0]?.id?.toString() ?? null);
    }
    setDeleteTargetId(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await updateCarouselActionPrivate({ value: slides });

      if (!result.success) {
        notifications.show({
          title: 'Error',
          message: result.error || 'Failed to save carousel',
          color: 'red',
          position: 'top-right',
        });
        return;
      }

      notifications.show({
        message: 'Saved successfully',
        color: 'green',
        position: 'top-right',
        autoClose: 1500,
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: generateErrorMessage(error, 'Unknown error'),
        color: 'red',
        position: 'top-right',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className={classes.bannerCarouselPageRoot}>
        <Paper radius={'md'} shadow="xs" classNames={{ root: classes.paperBlock }}>
          <Stack p={'sm'} gap={'md'}>
            <Group justify="space-between">
              <ActionIcon
                variant="transparent"
                onClick={handleAddSlide}
                disabled={slides.length >= MAX_CAROUSEL_SLIDE_COUNT}
                size={32}
              >
                <AddNewIcon width={24} height={24} />
              </ActionIcon>
              <Button loading={isSaving} onClick={handleSave} color="teal" size="sm">
                Save
              </Button>
            </Group>

            {slides.length === 0 ? (
              <Text c="dimmed" size="sm">
                No slides yet. Click + to add a slide.
              </Text>
            ) : (
              <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                  {slides.map((slide, i) => (
                    <Tabs.Tab key={slide.id.toString()} value={slide.id.toString()}>
                      <Text size="md">Slide {i + 1}</Text>
                    </Tabs.Tab>
                  ))}
                </Tabs.List>

                {slides.map((slide) => (
                  <Tabs.Panel key={slide.id.toString()} value={slide.id.toString()} pt={'sm'}>
                    <Stack gap={'md'}>
                      <TextInput
                        label="Title"
                        value={slide.title ?? ''}
                        onChange={(e) =>
                          handleUpdateSlide(slide.id.toString(), 'title', e.target.value)
                        }
                      />
                      <TextInput
                        label="Sub title"
                        value={slide.subTitle ?? ''}
                        onChange={(e) =>
                          handleUpdateSlide(slide.id.toString(), 'subTitle', e.target.value)
                        }
                      />
                      <TextInput
                        label="Href"
                        placeholder="/path or https://example.com"
                        value={slide.href ?? ''}
                        onChange={(e) =>
                          handleUpdateSlide(slide.id.toString(), 'href', e.target.value)
                        }
                      />
                      <Group align="center">
                        <UploadImageSection
                          size="md"
                          imageUrl={slide.imageUrl || undefined}
                          isLoading={false}
                          onImageSelect={(url) =>
                            handleUpdateSlide(slide.id.toString(), 'imageUrl', url)
                          }
                          onRemoveFile={() =>
                            handleUpdateSlide(slide.id.toString(), 'imageUrl', '')
                          }
                        />
                        <Stack gap={2}>
                          <Text size="lg">{slide.imageUrl ? 'Edit' : 'Upload'}</Text>
                          <Text size="sm" c="dimmed">
                            png, jpg, jpeg; Size ≤ 5Mbs
                          </Text>
                        </Stack>
                      </Group>
                      <Group justify="flex-end">
                        <ActionIcon
                          variant="transparent"
                          color="red"
                          size={32}
                          onClick={() => setDeleteTargetId(slide.id.toString())}
                        >
                          <HiOutlineTrash size={32} />
                        </ActionIcon>
                      </Group>
                    </Stack>
                  </Tabs.Panel>
                ))}
              </Tabs>
            )}
          </Stack>
        </Paper>
      </div>

      <ConfirmModal
        variant="danger"
        opened={deleteTargetId !== null}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this slide? This action cannot be undone."
      />
    </>
  );
}
