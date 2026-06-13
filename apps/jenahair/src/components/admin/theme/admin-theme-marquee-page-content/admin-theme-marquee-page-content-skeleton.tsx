import { Group, Paper, Stack } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';

import classes from './admin-theme-marquee-page-content.module.scss';

export default function AdminThemeMarqueePageContentSkeleton() {
  return (
    <div className={classes.marqueePageRoot}>
      <Paper radius="md" shadow="xs" classNames={{ root: classes.paperBlock }}>
        <Stack p="sm" gap="md">
          {/* Header: add slide + save */}
          <Group justify="space-between">
            <Skeleton width={32} height={32} borderRadius={4} />
            <Skeleton width={80} height={32} borderRadius={4} />
          </Group>
          {/* Slide tabs */}
          <Group gap="xs">
            <Skeleton width={80} height={32} borderRadius={4} />
            <Skeleton width={80} height={32} borderRadius={4} />
          </Group>
          {/* Active slide panel: title, description, image */}
          <Skeleton height={56} borderRadius={4} />
          <Skeleton height={56} borderRadius={4} />
          <Skeleton height={160} borderRadius={4} />
        </Stack>
      </Paper>
    </div>
  );
}
