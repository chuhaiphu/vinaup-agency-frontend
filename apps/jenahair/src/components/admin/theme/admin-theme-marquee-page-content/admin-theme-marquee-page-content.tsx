'use client';
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Paper,
  Stack,
  Tabs,
  Text,
  TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { VinaupAddNewIcon as AddNewIcon } from '@vinaup/ui/cores';
import { generateErrorMessage } from '@vinaup/utils';
import { use, useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';

import { updateMarqueeActionPrivate } from '@/actions/theme-config-actions';
import UploadImageSection from '@/components/admin/media/upload-image-section/upload-image-section';
import { MAX_MARQUEE_SLIDE_COUNT } from '@/constants';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { MarqueeSlide, MarqueeSlidesResponse } from '@/interfaces/theme-config-interfaces';

import classes from './admin-theme-marquee-page-content.module.scss';

interface AdminThemeMarqueePageContentProps {
  marqueePromise: Promise<ActionResponse<MarqueeSlidesResponse>>;
}

function generateId() {
  return `slide-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function AdminThemeMarqueePageContent({
  marqueePromise,
}: AdminThemeMarqueePageContentProps) {
  const result = use(marqueePromise);
  const initialSlides: MarqueeSlide[] = result.data?.value ?? [];

  return <AdminThemeMarqueePageContentInner initialSlides={initialSlides} />;
}

function AdminThemeMarqueePageContentInner({ initialSlides }: { initialSlides: MarqueeSlide[] }) {
  const [slides, setSlides] = useState<MarqueeSlide[]>(initialSlides);
  const [activeTab, setActiveTab] = useState<string | null>(initialSlides[0]?.id ?? null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleAddSlide = () => {
    if (slides.length >= MAX_MARQUEE_SLIDE_COUNT) return;
    const newSlide: MarqueeSlide = {
      id: generateId(),
      title: '',
      description: '',
      imageUrl: '',
    };
    setSlides((prev) => [...prev, newSlide]);
    setActiveTab(newSlide.id);
  };

  const handleUpdateSlide = (id: string, field: keyof MarqueeSlide, value: string) => {
    setSlides((prev) =>
      prev.map((slide) => (slide.id === id ? { ...slide, [field]: value } : slide)),
    );
  };

  const handleConfirmDelete = () => {
    if (!deleteTargetId) return;
    const idx = slides.findIndex((s) => s.id === deleteTargetId);
    const next = slides.filter((s) => s.id !== deleteTargetId);
    setSlides(next);
    if (activeTab === deleteTargetId) {
      setActiveTab(next[Math.max(0, idx - 1)]?.id ?? next[0]?.id ?? null);
    }
    setDeleteTargetId(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await updateMarqueeActionPrivate({ value: slides });

      if (!result.success) {
        notifications.show({
          title: 'Error',
          message: result.error || 'Failed to save marquee',
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
      <div className={classes.marqueePageRoot}>
        <Paper radius={'md'} shadow="xs" classNames={{ root: classes.paperBlock }}>
          <Stack p={'sm'} gap={'md'}>
            <Group justify="space-between">
              <ActionIcon
                variant="transparent"
                onClick={handleAddSlide}
                disabled={slides.length >= MAX_MARQUEE_SLIDE_COUNT}
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
                    <Tabs.Tab key={slide.id} value={slide.id}>
                      <Text size="md">Slide {i + 1}</Text>
                    </Tabs.Tab>
                  ))}
                </Tabs.List>

                {slides.map((slide) => (
                  <Tabs.Panel key={slide.id} value={slide.id} pt={'sm'}>
                    <Stack gap={'md'}>
                      <TextInput
                        label="Title"
                        value={slide.title}
                        onChange={(e) => handleUpdateSlide(slide.id, 'title', e.target.value)}
                      />
                      <TextInput
                        label="Description"
                        value={slide.description}
                        onChange={(e) => handleUpdateSlide(slide.id, 'description', e.target.value)}
                      />
                      <Group align="center">
                        <UploadImageSection
                          size="md"
                          imageUrl={slide.imageUrl || undefined}
                          isLoading={false}
                          onImageSelect={(url) => handleUpdateSlide(slide.id, 'imageUrl', url)}
                          onRemoveFile={() => handleUpdateSlide(slide.id, 'imageUrl', '')}
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
                          onClick={() => setDeleteTargetId(slide.id)}
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

      <Modal
        opened={deleteTargetId !== null}
        onClose={() => setDeleteTargetId(null)}
        title="Confirm Delete"
        centered
      >
        <Stack>
          <Text>Are you sure you want to delete this slide? This action cannot be undone.</Text>
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={() => setDeleteTargetId(null)}>
              Cancel
            </Button>
            <Button color="red" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
