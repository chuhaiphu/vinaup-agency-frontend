'use client';

import { MediaGrid, type Media } from '@vinaup/ui/admin';
import { Route } from 'next';
import { useRouter, usePathname } from 'next/navigation';

import { MediaResponse } from '@/interfaces/media-interfaces';

interface MediaImageGridProps {
  images: MediaResponse[];
}

export default function MediaImageGrid({ images }: MediaImageGridProps) {
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname.split('/');
  const isDetailPage = pathSegments.length === 5 && pathSegments[3] === 'images';
  const selectedImageId = isDetailPage ? pathSegments[4] : null;
  const handleImageClick = (imageId: string) => {
    router.push(`/adminup/media/images/${imageId}` as Route);
  };

  return (
    <MediaGrid
      images={images as unknown as Media[]}
      selectedImageId={selectedImageId}
      onImageClick={handleImageClick}
      sortOptions={[
        { value: 'createdAt', label: 'Ngày tạo' },
        { value: 'updatedAt', label: 'Ngày cập nhật' },
        { value: 'name', label: 'Tên file' },
      ]}
    />
  );
}
