'use client';

import { Grid, GridCol, Group, Paper, Stack } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';

const FIELD_ROWS = 3;

export default function AdminMediaImageDetailSkeleton() {
  return (
    <Grid>
      {/* Image preview */}
      <GridCol span={{ base: 12, md: 7 }}>
        <Skeleton width="100%" height={360} borderRadius={8} />
      </GridCol>

      {/* Metadata + actions */}
      <GridCol span={{ base: 12, md: 5 }}>
        <Paper p="md" radius="md" withBorder>
          <Stack gap="md">
            <Skeleton width={140} height={24} borderRadius={4} />
            <Stack gap="xs">
              {Array.from({ length: FIELD_ROWS }).map((_, i) => (
                <Skeleton key={i} width="100%" height={40} borderRadius={4} />
              ))}
            </Stack>
            <Group justify="flex-end" gap="xs">
              <Skeleton width={80} height={32} borderRadius={4} />
              <Skeleton width={80} height={32} borderRadius={4} />
            </Group>
          </Stack>
        </Paper>
      </GridCol>
    </Grid>
  );
}
