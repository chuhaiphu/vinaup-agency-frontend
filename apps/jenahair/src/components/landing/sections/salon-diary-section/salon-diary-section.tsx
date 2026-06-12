import { Container } from '@mantine/core';
import { cacheLife, cacheTag } from 'next/cache';
import Link from 'next/link';

import { getAllDiariesActionPublic } from '@/actions/diary-actions';
import DiaryGrid from '@/components/landing/diary/diary-grid/diary-grid';

import classes from './salon-diary-section.module.scss';

async function SalonDiaryContent() {
  const result = await getAllDiariesActionPublic();
  const diaries = result.success ? (result.data ?? []).slice(0, 8) : [];

  return <DiaryGrid diaries={diaries} showPagination={false} />;
}

export async function SalonDiarySection() {
  // Cache this whole section into the prerendered static shell so it ships with
  // the initial HTML instead of streaming behind a Suspense fallback. A
  // component-level 'use cache' is a SEPARATE cache entry from the actions it
  // calls, so it must declare its own tag to be invalidated.
  // → docs/pattern/CACHING-REVALIDATION.md (Rule 1)
  'use cache';
  cacheLife('default');
  cacheTag('diaries');

  return (
    <section>
      <Container size={'lg'} className={classes.header}>
        <h2 className={classes.title}>Nhật ký cắt tóc & trang điểm</h2>
        <p className={classes.description}>
          Salon Jena được chị em truyền miệng vì “Tay nghề giỏi, tận tâm & sử dụng sản phẩm đến từ
          tự nhiên chính hãng tốt cho sức khỏe...”{' '}
          <Link href="/nhat-ky" className={classes.link} prefetch={true}>
            Xem nhật ký
          </Link>
        </p>
      </Container>
      <Container size={'xl'}>
        <SalonDiaryContent />

        <Link href="/nhat-ky" className={classes.seeMore} prefetch={true}>
          Xem thêm
        </Link>
      </Container>
    </section>
  );
}
