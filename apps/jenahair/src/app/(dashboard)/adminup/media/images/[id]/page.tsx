import { notFound } from 'next/navigation';

import { getMediaByIdActionPrivate } from '@/actions/media-actions';
import AdminMediaImageDetailSection from '@/components/admin/media/admin-media-image-detail-section/admin-media-image-detail-section';

export default async function AdminMediaImageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mediaResponse = await getMediaByIdActionPrivate(id);

  if (!mediaResponse.success || !mediaResponse.data) {
    notFound();
  }

  const image = mediaResponse.data;

  return <AdminMediaImageDetailSection image={image} />;
}
