import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { getMediaByIdActionPrivate } from '@/actions/media-actions';
import AdminMediaImageDetailSection from '@/components/admin/media/admin-media-image-detail-section/admin-media-image-detail-section';
import AdminMediaImageDetailSkeleton from '@/components/admin/media/admin-media-image-detail-section/admin-media-image-detail-skeleton';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { MediaResponse } from '@/interfaces/media-interfaces';

export default function AdminMediaImageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const mediaPromise = params.then((p) => getMediaByIdActionPrivate(p.id));

  return (
    <Suspense fallback={<AdminMediaImageDetailSkeleton />}>
      <AdminMediaImageDetailContent mediaPromise={mediaPromise} />
    </Suspense>
  );
}

async function AdminMediaImageDetailContent({
  mediaPromise,
}: {
  mediaPromise: Promise<ActionResponse<MediaResponse>>;
}) {
  const mediaResponse = await mediaPromise;
  if (!mediaResponse.success || !mediaResponse.data) {
    notFound();
  }

  return <AdminMediaImageDetailSection image={mediaResponse.data} />;
}
