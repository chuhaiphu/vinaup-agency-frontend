'use client';
import { notifications } from '@mantine/notifications';
import {
  MediaModal,
  type Media,
  type UploadResult,
  type CreateMediaRequest,
} from '@vinaup/ui/admin';

import { createManyMediaActionPrivate } from '@/actions/media-actions';
import { uploadImageActionPrivate } from '@/actions/upload-actions';

interface MediaImageModalProps {
  opened: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
  images: Media[];
  onImagesChange: (images: Media[]) => void;
}

export default function MediaImageModal({
  opened,
  onClose,
  onSelect,
  images,
  onImagesChange,
}: MediaImageModalProps) {
  const handleUpload = async (files: File[]): Promise<UploadResult[]> => {
    const successResults: UploadResult[] = [];

    // Upload sequentially to ensure unique file names
    for (const file of files) {
      const uploadResponse = await uploadImageActionPrivate(file, 'media');
      if (uploadResponse.success && uploadResponse.data) {
        successResults.push({
          url: uploadResponse.data,
          name: file.name,
        });
      }
    }

    if (successResults.length === 0 && files.length > 0) {
      throw new Error('All files failed to upload.');
    }
    return successResults;
  };

  const handleSave = async (data: CreateMediaRequest[]): Promise<Media[]> => {
    const response = await createManyMediaActionPrivate(data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'There was an error saving to the database');
    }
    return response.data as unknown as Media[];
  };

  const handleUploadSuccess = (media: Media[]) => {
    onImagesChange([...images, ...media]);
    notifications.show({
      title: 'Upload success',
      message: `Upload success ${media.length} images`,
      color: 'green',
    });
  };

  const handleUploadError = (error: Error) => {
    notifications.show({
      title: 'Upload failed',
      message: error.message || 'There was an error',
      color: 'red',
    });
  };
  return (
    <MediaModal
      opened={opened}
      onClose={onClose}
      images={images}
      onSelect={(image) => onSelect(image.url)}
      onUpload={handleUpload}
      onSave={handleSave}
      onUploadSuccess={handleUploadSuccess}
      onUploadError={handleUploadError}
    />
  );
}
