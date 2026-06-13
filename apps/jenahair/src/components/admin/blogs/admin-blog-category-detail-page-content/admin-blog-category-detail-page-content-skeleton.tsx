import { Grid, GridCol, Paper, Stack } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';

export default function AdminBlogCategoryDetailPageContentSkeleton() {
  return (
    <div>
      <Grid>
        {/* Left column: category info */}
        <GridCol span={{ base: 12, sm: 12, md: 7, lg: 7, xl: 8 }}>
          <Stack>
            <Paper p="md" radius="md" withBorder>
              <Skeleton height={320} borderRadius={4} />
            </Paper>
          </Stack>
        </GridCol>
        {/* Right column: config, video, feature image */}
        <GridCol span={{ base: 12, sm: 12, md: 5, lg: 5, xl: 4 }}>
          <Stack>
            <Paper p="md" radius="md" withBorder>
              <Skeleton height={180} borderRadius={4} />
            </Paper>
            <Paper p="md" radius="md" withBorder>
              <Skeleton height={120} borderRadius={4} />
            </Paper>
            <Paper p="md" radius="md" withBorder>
              <Skeleton height={160} borderRadius={4} />
            </Paper>
          </Stack>
        </GridCol>
      </Grid>
    </div>
  );
}
