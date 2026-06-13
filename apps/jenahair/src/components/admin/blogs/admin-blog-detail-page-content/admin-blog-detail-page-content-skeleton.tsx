import { Grid, GridCol, Group, Paper, Stack } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';

import classes from './admin-blog-detail-page-content.module.scss';

export default function AdminBlogDetailPageContentSkeleton() {
  return (
    <div className={classes.adminBlogDetailPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Skeleton width={140} height={28} borderRadius={4} />
        <Skeleton width={120} height={28} borderRadius={4} />
      </Group>
      <Grid>
        {/* Left column: title, content, additional images */}
        <GridCol span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 9 }}>
          <Stack>
            <Paper p="md" radius="md" withBorder>
              <Skeleton height={48} borderRadius={4} />
            </Paper>
            <Paper p="md" radius="md" withBorder>
              <Skeleton height={280} borderRadius={4} />
            </Paper>
            <Paper p="md" radius="md" withBorder>
              <Skeleton height={160} borderRadius={4} />
            </Paper>
          </Stack>
        </GridCol>
        {/* Right column: config, category, video, feature image */}
        <GridCol span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 3 }}>
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
