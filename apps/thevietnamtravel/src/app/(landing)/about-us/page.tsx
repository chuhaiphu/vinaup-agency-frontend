'use client';

import { Container, Title, Text } from '@mantine/core';
import { VideoSection } from '@vinaup/ui/landing';
import Image from 'next/image';

import classes from './page.module.scss';

export default function AboutUsPage() {
  return (
    <>
      {/* Full-width Banner Section */}
      <div className={classes.fullWidthBanner}>
        <Container size="xl" classNames={{ root: classes.pageRoot }} py="lg">
          <div className={classes.bannerCard}>
            <Title order={1} className={classes.bannerTitle}>
              Title Page / About Us [h1]
            </Title>
          </div>
        </Container>
      </div>

      <Container size="xl" classNames={{ root: classes.pageRoot }} pb="xl" pt="xl">
        <div className={classes.mainContent}>
          {/* Main Image */}
          <div className={classes.imageWrapper}>
            <Image
              src="/mock-images/z6005041616453_ab9be89ca94e5e8d8caff5c6cbd85233-1.jpg"
              alt="About Us Image"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Content */}
          <div className={classes.sectionContent}>
            <Text size="16px" lh="1.6">
              Head deep into the Esquinas rainforest to stay in our much-loved lodge to the Esquinas rainforest to stay in our much-loved lo Head deep into the Esquinas rainforest to stay in our much-loved lodge Head deep into the Esquinas rainforest to stay in our much-loved lodge
            </Text>
          </div>

          {/* Video */}
          <div className={classes.videoWrapper}>
            <VideoSection url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" title="YouTube video player" />
          </div>
        </div>
      </Container>
    </>
  );
}
