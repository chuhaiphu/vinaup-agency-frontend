'use client';

import { Container, Title, Group, Button, Box } from '@mantine/core';
import { VinaupGlobalIcon } from '@vinaup/ui/cores';
import { Route } from 'next';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';

import { TechNewsArticleResponse } from '@/interfaces/tech-news-interfaces';

import { NewsCard } from './news-card';
import classes from './tech-news.module.scss';


export function TechNews({ articles }: { articles: TechNewsArticleResponse[] }) {
    return (
        <Box className={classes.section}>
            <Container size="xl" w="100%" pt={{ base: '1rem', sm: '2rem' }}>
                {/* Header */}
                <div className={classes.header}>
                    <Title className={classes.title}>Tin công nghệ</Title>

                    <Group gap={"0.5rem"}>
                        <Button
                            component={Link}
                            href={"/tin-cong-nghe" as Route}
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
            <Box className={classes.marqueeWrapper} pb={{ base: '1rem', sm: '2rem' }}>
                <Marquee
                    speed={40}
                    pauseOnHover={true}
                    gradient={false}
                >
                    {articles.map((item, index) => (
                        <div key={`${item.id}-${index}`} className={classes.newsCardWrapper}>
                            <NewsCard item={item} />
                        </div>
                    ))}
                </Marquee>
            </Box>
        </Box>
    );
}
