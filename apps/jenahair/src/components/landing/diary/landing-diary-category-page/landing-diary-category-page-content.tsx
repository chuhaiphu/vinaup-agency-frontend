import { Box, Container, Stack } from '@mantine/core';
import { VideoSection } from '@vinaup/ui/landing';

import { getDiaryCategoryDiariesByDiaryCategoryIdActionPublic } from '@/actions/diary-category-diary-actions';
import DiaryCategoryTags from '@/components/landing/diary/diary-category-tags/diary-category-tags';
import DiaryGrid from '@/components/landing/diary/diary-grid/diary-grid';
import { DiaryCategoryResponse } from '@/interfaces/diary-category-interfaces';
import { DiaryResponse } from '@/interfaces/diary-interfaces';

import classes from './landing-diary-category-page-content.module.scss';

type LandingDiaryCategoryPageContentProps = {
  category: DiaryCategoryResponse;
  searchParams: Promise<{ q?: string; destinations?: string }>;
};

const isHtmlDescriptionEmpty = (html: string | null | undefined): boolean => {
  if (!html) return true;
  const trimmed = html.trim();
  return trimmed === '' || trimmed === '<p></p>';
};

export default async function LandingDiaryCategoryPageContent({
  category,
  searchParams,
}: LandingDiaryCategoryPageContentProps) {
  const queryParams = await searchParams;

  const diaryCategoryDiariesResponse = await getDiaryCategoryDiariesByDiaryCategoryIdActionPublic(
    category.id,
  );

  const diariesInCategory: DiaryResponse[] =
    diaryCategoryDiariesResponse.success && diaryCategoryDiariesResponse.data
      ? diaryCategoryDiariesResponse.data
          .map((dcd) => dcd.diary)
          .filter(
            (diary): diary is DiaryResponse => diary !== undefined && diary.visibility === 'public',
          )
      : [];

  const sortedDiaries = [...diariesInCategory]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const renderVideoSection = () => {
    if (!category.videoUrl) {
      return null;
    }
    return (
      <VideoSection
        url={category.videoUrl}
        title={category.title}
        height={480}
        thumbnailUrl={category.videoThumbnailUrl || undefined}
      />
    );
  };

  return (
    <div className={classes.diaryCategoryPage}>
      {/* --- 1. ORANGE HEADER --- */}
      <Box className={classes.diaryCategoryHeader}>
        <Container size={'xl'}>
          <h1 className={classes.diaryCategoryTitle}>{category.title}</h1>
        </Container>
      </Box>

      {/* --- 2. INTRO SECTION --- */}
      <Container size={'xl'} className={classes.diaryCategoryIntro}>
        <DiaryCategoryTags activeEndpoint={category.endpoint} />
        <Box mt={'sm'}>{category.videoPosition === 'top' && renderVideoSection()}</Box>
        <Stack gap="sm" mt={'sm'}>
          {!isHtmlDescriptionEmpty(category.description) && (
            <div
              className={classes.diaryCategoryDescription}
              dangerouslySetInnerHTML={{ __html: category.description ?? '' }}
            />
          )}
        </Stack>
      </Container>

      <Container size="xl">
        <DiaryGrid queryParams={queryParams} diaries={sortedDiaries} />
      </Container>

      {category.videoPosition !== 'top' && (
        <Container size="xl" p={0}>
          {renderVideoSection()}
        </Container>
      )}
    </div>
  );
}
