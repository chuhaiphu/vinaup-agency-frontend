import { Container, Grid, GridCol, Stack, Group } from '@mantine/core';
import { VinaupGlobalIcon } from '@vinaup/ui/cores';
import { cacheLife, cacheTag } from 'next/cache';
import Link from 'next/link';

import { BlogsColumn } from './blogs-column';
import classes from './salon-video-and-blogs-showcase.module.scss';
import { VideoSectionShowcase } from './video-section-showcase';

export async function SalonVideoAndBlogsShowcase() {
  // Cache this section into the prerendered static shell. It reads blogs (via
  // BlogsColumn) and theme-config (via VideoSectionShowcase), so it must tag
  // both to be invalidated — a component cache is its own entry, separate from
  // the actions it calls. → docs/pattern/CACHING-REVALIDATION.md (Rule 1)
  'use cache';
  cacheLife('default');
  cacheTag('blogs', 'theme-config');
  return (
    <section className={classes.sectionWrapper}>
      <Container size={'lg'} pb={'2rem'}>
        <div className={classes.header}>
          <h2 className={classes.mainTitle}>Salon cam kết với khách hàng</h2>
          <p className={classes.mainDescription}>
            Salon phục vụ làm đẹp cho khách hàng, đến khi hài lòng mà không phụ thu thêm chi phí
            phát sinh. Sản phẩm phục vụ khách hàng là hàng chính hãng
          </p>
        </div>
      </Container>
      <Container size={'xl'}>
        <Grid gap={{ base: 'xl', md: 'lg' }}>
          <GridCol span={{ base: 12, md: 6 }}>
            <Stack gap="1.5rem" h="100%">
              <Group justify="space-between" align="center">
                <h3 className={classes.subTitle}>Video</h3>
                <Link href="/nhat-ky" className={classes.seeAllLink} prefetch>
                  Tất cả
                  <VinaupGlobalIcon size={23} fill="currentColor" />
                </Link>
              </Group>

              <VideoSectionShowcase />
            </Stack>
          </GridCol>

          <GridCol span={{ base: 12, md: 6 }}>
            <Stack gap="1.5rem" h="100%">
              <Group justify="space-between" align="center">
                <h3 className={classes.subTitle}>Blog</h3>
                <Link href="/blogs" className={classes.seeAllLink} prefetch>
                  Tất cả
                  <VinaupGlobalIcon size={23} fill="currentColor" />
                </Link>
              </Group>

              <BlogsColumn />
            </Stack>
          </GridCol>
        </Grid>
      </Container>
    </section>
  );
}
