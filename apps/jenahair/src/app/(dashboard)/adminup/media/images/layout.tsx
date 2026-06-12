import { Grid, GridCol } from '@mantine/core';

import MediaAvailableImagesSection from '@/components/admin/media/media-available-images-section/media-available-images-section';

export default function AdminMediaImagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Grid>
      <GridCol span={9}>
        <MediaAvailableImagesSection />
      </GridCol>
      <GridCol span={3}>{children}</GridCol>
    </Grid>
  );
}
