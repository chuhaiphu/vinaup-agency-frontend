import { Container, Title, Text, Group, Avatar } from '@mantine/core';
import { VinaupLocationIcon, VinaupPriceTagIcon, VinaupCopyIcon, VinaupEyeIcon, VinaupHeartIcon, VinaupShareIcon } from '@vinaup/ui/cores';
import { VideoSection } from '@vinaup/ui/landing';
import Image from 'next/image';
import Link from 'next/link';

import classes from './page.module.scss';

export default function BlogDetailPage() {
  return (
    <>
      {/* Full-width Banner Section */}
      <div className={classes.fullWidthBanner}>
        <Container size="xl" classNames={{ root: classes.pageRoot }} py="lg">
          <div className={classes.bannerCard}>
            <Title order={1} className={classes.bannerTitle}>
              Title tên BLOG TITLE [h1]
            </Title>
          </div>

          <Group justify="space-between" className={classes.iconRow} mt="md" px="xs">
            <Group gap="xs">
              <VinaupLocationIcon size={24} fill="#fff" />
              <Text size="20px">Dong Nai, Ho Chi Minh</Text>
            </Group>
            <Group gap="xs">
              <Text size="20px">
                <Link href="#">Catagogy ABC</Link>; <Link href="#">Catagogy XYZ</Link>
              </Text>
              <VinaupPriceTagIcon size={24} fill="#fff" />
            </Group>
          </Group>
        </Container>
      </div>

      <Container size="xl" classNames={{ root: classes.pageRoot }} pb="xl" pt="xl">
        <div className={classes.mainContent}>
          {/* Main Image */}
          <div className={classes.imageWrapper}>
            <Image
              src="/mock-images/z6005041616453_ab9be89ca94e5e8d8caff5c6cbd85233-1.jpg"
              alt="Blog Image"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Author and Stats */}
          <div className={classes.authorRow}>
            <div className={classes.authorInfo}>
              <Avatar src="/mock-images/z6005041616453_ab9be89ca94e5e8d8caff5c6cbd85233-1.jpg" radius="xl" size="md" />
              <Text className={classes.authorName}>Tèo Em 12</Text>
            </div>

            <div className={classes.statsRow}>
              <Group gap={6} align="center" className={classes.statItem}>
                <Text size="16px">Copy</Text>
                <VinaupCopyIcon size={20} fill="var(--vinaup-green)" />
              </Group>

              <Group gap={6} align="center" className={classes.statItem}>
                <Text size="16px">102</Text>
                <VinaupEyeIcon size={20} fill="var(--vinaup-green)" stroke="var(--vinaup-green)" />
              </Group>

              <Group gap={6} align="center" className={classes.statItem}>
                <Text size="16px">Share</Text>
                <VinaupShareIcon size={20} fill="var(--vinaup-green)" />
              </Group>

              <Group gap={6} align="center" className={classes.statItem}>
                <Text size="16px">01</Text>
                <VinaupHeartIcon size={20} fill="var(--vinaup-green)" />
              </Group>
            </div>
          </div>

          {/* Content */}
          <div className={classes.sectionContent}>
            <Text size="20px" lh="1.6" mb="md">
              Head deep into the Esquinas rainforest to stay in our much-loved lodge to the Esquinas rainforest to stay in our much-loved lodge Head deep into the Esquinas rainforest to stay in our much-loved lodge Head deep into the Esquinas rainforest to stay in our much-loved lodge
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
