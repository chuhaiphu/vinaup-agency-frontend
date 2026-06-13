import { Container, Stack, Box, Title } from '@mantine/core';

import { getAllTechNewsActionPublic } from '@/actions/tech-news-actions';
import TinCongNgheCategoryTags from '@/components/landing/tin-cong-nghe/tin-cong-nghe-category-tags/tin-cong-nghe-category-tags';
import TinCongNgheGrid from '@/components/landing/tin-cong-nghe/tin-cong-nghe-grid/tin-cong-nghe-grid';

import classes from './page.module.scss';

export const metadata = { title: 'Tin Công Nghệ | ViTinhNet' };

export default async function TechNewsPage() {
    const result = await getAllTechNewsActionPublic();
    const articles = result.data ?? [];

    return (
        <div className={classes.pageWrapper}>
            <Container size="xl" pt={{ base: '1rem', md: '2rem' }}>
                {/* 1. HEADER */}
                <Box className={classes.header}>
                    <Title order={2} className={classes.h1Title}>
                        Tin Công Nghệ
                    </Title>
                </Box>

                {/* 2. CATEGORY TAGS */}
                <Stack gap="sm" mb="1rem">
                    <TinCongNgheCategoryTags />
                </Stack>
            </Container>

            {/* 3. BLOGS GRID */}
            <Container size="xl" pb={{ base: '1rem', md: '2rem' }}>
                <TinCongNgheGrid blogs={articles} />
            </Container>
        </div>
    );
}
