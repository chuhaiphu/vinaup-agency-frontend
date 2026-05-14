'use client';

import { Container, Title, Group, Button, Box } from '@mantine/core';
import Marquee from 'react-fast-marquee';
import { NewsCard, type NewsItem } from './news-card';
import classes from './tech-news.module.scss';
import { VinaupGlobalIcon } from '@vinaup/ui/cores';

const defaultNews: NewsItem[] = Array(6).fill(null).map((_, index) => ({
    id: index.toString(),
    title: 'Title new abc Title new abc Title new abc',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2670&auto=format&fit=crop',
    likes: 1,
    views: 1,
}));

export function TechNews() {
    return (
        <Box className={classes.section}>
            <Container size="xl" w="100%" pt="2rem">
                {/* Header */}
                <div className={classes.header}>
                    <Title className={classes.title}>Tin công nghệ</Title>

                    <Group gap={"0.5rem"}>
                        <Button
                            variant="default"
                            size="sm"
                            className={classes.categoryPill}
                        >
                            Tất cả
                        </Button>
                        <VinaupGlobalIcon size={28} fill="#051b2c" />
                    </Group>
                </div>
            </Container>

            {/* Marquee Carousel */}
            <Box className={classes.marqueeWrapper} pb="2rem">
                <Marquee
                    speed={40}
                    pauseOnHover={true}
                    gradient={false}
                >
                    {defaultNews.map((item, index) => (
                        <div key={`${item.id}-${index}`} className={classes.newsCardWrapper}>
                            <NewsCard item={item} />
                        </div>
                    ))}
                </Marquee>
            </Box>
        </Box>
    );
}
