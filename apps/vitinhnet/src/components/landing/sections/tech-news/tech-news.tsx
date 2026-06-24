import { Container, Title, Group, Button, Box } from '@mantine/core';
import { VinaupGlobalIcon } from '@vinaup/ui/cores';
import { Route } from 'next';
import Link from 'next/link';

import { TechNewsArticleResponse } from '@/interfaces/tech-news-interfaces';

import { TechNewsMarquee } from './tech-news-marquee';
import classes from './tech-news.module.scss';

export function TechNews({ articles }: { articles: TechNewsArticleResponse[] }) {
  return (
    <Box className={classes.section}>
      <Container size="xl" w="100%" pt={{ base: '1rem', sm: '2rem' }}>
        {/* Header */}
        <div className={classes.header}>
          <Title className={classes.title}>Tin công nghệ</Title>

          <Group gap={'0.5rem'}>
            <Link href={'/tin-cong-nghe' as Route} style={{ textDecoration: 'none' }}>
              <Button variant="default" size="sm" className={classes.categoryPill}>
                Tất cả
              </Button>
            </Link>
            <VinaupGlobalIcon size={28} fill="#051b2c" />
          </Group>
        </div>
      </Container>

      {/* Marquee Carousel */}
      <Box className={classes.marqueeWrapper} pb={{ base: '1rem', sm: '2rem' }}>
        <TechNewsMarquee articles={articles} />
      </Box>
    </Box>
  );
}
