'use client';

import { SpotlightActionData } from '@mantine/spotlight';
import { SpotlightSearch } from '@vinaup/ui/landing';
import { useRouter } from 'next/navigation';

import { BlogResponse } from '@/interfaces/blog-interfaces';
import { DiaryResponse } from '@/interfaces/diary-interfaces';
import { PageResponse } from '@/interfaces/page-interfaces';

import classes from './blogs-diaries-spotlight-search-content.module.scss';

export default function BlogsDiariesSpotlightSearchContent({
  blogsResponse,
  diariesResponse,
  pagesResponse,
}: {
  blogsResponse: BlogResponse[];
  diariesResponse: DiaryResponse[];
  pagesResponse: PageResponse[];
}) {
  const router = useRouter();
  const spotlightActions: SpotlightActionData[] = [
    ...(pagesResponse ?? []).map((page) => ({
      id: `page-${page.id}`,
      label: page.title,
      onClick: () => {
        router.push(`/${page.endpoint}`);
      },
    })),
    ...(blogsResponse ?? []).map((blog) => ({
      id: `blog-${blog.id}`,
      label: blog.title,
      onClick: () => {
        router.push(`/blogs/${blog.endpoint}`);
      },
    })),
    ...(diariesResponse ?? []).map((diary) => ({
      id: `diary-${diary.id}`,
      label: diary.title,
      onClick: () => {
        router.push(`/nhat-ky/${diary.endpoint}`);
      },
    })),
  ];

  return (
    <SpotlightSearch
      spotlightActions={spotlightActions}
      classNames={{
        root: classes.spotlightRoot,
        content: classes.spotlightContent,
        search: classes.spotlightSearch,
        actionsList: classes.spotlightActionsList,
        action: classes.spotlightAction,
      }}
    />
  );
}
