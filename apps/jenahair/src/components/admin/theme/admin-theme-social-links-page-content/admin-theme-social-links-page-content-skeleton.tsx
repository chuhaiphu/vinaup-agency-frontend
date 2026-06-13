import { Group, Paper, Stack } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';

import classes from './admin-theme-social-links-page-content.module.scss';

const FIELD_COUNT = 5;

export default function AdminThemeSocialLinksPageContentSkeleton() {
  return (
    <div className={classes.socialLinksPageRoot}>
      <Paper radius="md" shadow="xs" classNames={{ root: classes.paperBlock }}>
        <Stack p="sm" gap="md">
          {/* Header: title + save button */}
          <Group justify="space-between">
            <Skeleton width={140} height={24} borderRadius={4} />
            <Skeleton width={80} height={32} borderRadius={4} />
          </Group>
          {/* Social link inputs */}
          {Array.from({ length: FIELD_COUNT }).map((_, i) => (
            <Skeleton key={i} height={56} borderRadius={4} />
          ))}
        </Stack>
      </Paper>
    </div>
  );
}
