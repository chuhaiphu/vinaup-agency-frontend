import { Grid, GridCol, Paper, Stack } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';

import classes from './admin-menu-detail-page-content.module.scss';

export default function AdminMenuDetailPageContentSkeleton() {
  return (
    <div className={classes.menuDetailRoot}>
      <Grid>
        {/* Left column: menu fields (title, parent, custom url) */}
        <GridCol span={{ base: 12, sm: 12, md: 7, lg: 7, xl: 8 }}>
          <Stack>
            <Paper p="md" radius="md" withBorder>
              <Skeleton height={260} borderRadius={4} />
            </Paper>
          </Stack>
        </GridCol>
        {/* Right column: configuration */}
        <GridCol span={{ base: 12, sm: 12, md: 5, lg: 5, xl: 4 }}>
          <Paper p="md" radius="md" withBorder>
            <Skeleton height={220} borderRadius={4} />
          </Paper>
        </GridCol>
      </Grid>
    </div>
  );
}
