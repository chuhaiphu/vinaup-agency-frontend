'use client';
import { notifications } from '@mantine/notifications';
import { CreateMediaRequest, Media, MediaUpload, type UploadResult } from '@vinaup/ui/admin';

import { createManyMediaActionPrivate } from '@/actions/media-actions';
import { uploadImageActionPrivate } from '@/actions/upload-actions';

export default function MediaImageUploadSection() {
  const handleUpload = async (files: File[]): Promise<UploadResult[]> => {
    const successResults: UploadResult[] = [];

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
      throw new Error(response.error || 'Lỗi khi lưu vào cơ sở dữ liệu');
    }
    return response.data as unknown as Media[];
  };

  const handleUploadSuccess = (media: Media[]) => {
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
    <MediaUpload
      folder="media"
      multiple={true}
      maxSize={5 * 1024 * 1024} // 5MB
      acceptedTypes={['image/png', 'image/jpeg', 'image/jpg', 'image/webp']}
      onUpload={handleUpload}
      onSave={handleSave}
      onUploadSuccess={handleUploadSuccess}
      onUploadError={handleUploadError}
    />
  );
}
