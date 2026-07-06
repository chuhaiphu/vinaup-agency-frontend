import { Container, Grid, Paper, Title, Text, Group, Button, GridCol, SimpleGrid, Divider, Progress, Avatar } from '@mantine/core';
import { VinaupLocationIcon, VinaupPriceTagIcon, VinaupCopyIcon, VinaupEyeIcon, VinaupHeartIcon, VinaupShareIcon } from '@vinaup/ui/cores';
import { VideoSection } from '@vinaup/ui/landing';
import Image from 'next/image';
import Link from 'next/link';

import ContactSellerCard from '@/components/primitives/contact-seller-card/contact-seller-card';
import TourCard from '@/components/primitives/tour-card/tour-card';
import classes from './page.module.scss';

// Mock data
const MOCK_RELATED_TOURS = Array.from({ length: 4 }).map((_, index) => ({
  id: index,
  title: 'Tour Pickleball noi bat 2345 Dalat',
  imageUrl: '/mock-images/z6005041616453_ab9be89ca94e5e8d8caff5c6cbd85233-1.jpg',
  price: 'đ 12.000.000',
  href: '#',
}));

export default function TourDetailPage() {
  return (
    <>
      {/* Full-width Banner Section */}
      <div className={classes.fullWidthBanner}>
        <Container size="xl" classNames={{ root: classes.pageRoot }} py="lg">
          <Paper radius="md" p="lg" className={classes.bannerCard}>
            <Group justify="space-between" align="flex-start" mb="sm">
              <Title order={1} className={classes.bannerTitle}>
                Title tên chương trình du lịch [h1]
              </Title>
              <Button color="var(--vinaup-green)" radius="xl" size="sm">
                Order Request
              </Button>
            </Group>

            <Group justify="space-between">
              <Group className={classes.priceInfo}>
                <Text size="20px">Price from:</Text>
                <Text className={classes.currentPrice}>đ 12.000.000</Text>
                <Text className={classes.originalPrice}>13.000.000</Text>
              </Group>
              <Text size="20px" className={classes.duration}>Duration: 4 days</Text>
            </Group>
          </Paper>

          <Group justify="space-between" className={classes.iconRow} mt="md" px="xs">
            <Group gap="xs">
              <VinaupLocationIcon size={24} fill="var(--vinaup-green)" />
              <Text size="20px">Dong Nai, Ho Chi Minh</Text>
            </Group>
            <Group gap="xs">
              <Text size="20px">
                <Link href="#">Category ABC</Link>; <Link href="#">Category XYZ</Link>
              </Text>
              <VinaupPriceTagIcon size={24} fill="var(--vinaup-green)" />
            </Group>
          </Group>
        </Container>
      </div>

      <Container size="xl" classNames={{ root: classes.pageRoot }} pb="xl" pt="md">
        <Grid gutter={20} className={classes.mainContent}>
          {/* Main Left Content */}
          <GridCol span={{ base: 12, lg: 9 }}>
            <div className={classes.imageWrapper}>
              <Image
                src="/mock-images/z6005041616453_ab9be89ca94e5e8d8caff5c6cbd85233-1.jpg"
                alt="Tour Image"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            <Group justify="space-between" align="center" mt="xl" mb="md">
              <Title order={2} className={classes.sectionTitle} mt={0} mb={0}>
                Overview
              </Title>
              <Group gap="xl" align="center">
                <Group gap={6} align="center" style={{ cursor: 'pointer' }}>
                  <Text size="16px" c="var(--vinaup-black)">Copy</Text>
                  <VinaupCopyIcon size={20} fill="var(--vinaup-green)" />
                </Group>

                <Group gap={6} align="center">
                  <Text size="16px" c="var(--vinaup-black)">102</Text>
                  <VinaupEyeIcon size={20} fill="var(--vinaup-green)" stroke="var(--vinaup-green)" />
                </Group>

                <Group gap={6} align="center" style={{ cursor: 'pointer' }}>
                  <Text size="16px" c="var(--vinaup-black)">Share</Text>
                  <VinaupShareIcon size={20} fill="var(--vinaup-green)" />
                </Group>

                <Group gap={6} align="center" style={{ cursor: 'pointer' }}>
                  <Text size="16px" c="var(--vinaup-black)">01</Text>
                  <VinaupHeartIcon size={20} fill="var(--vinaup-green)" />
                </Group>
              </Group>
            </Group>
            <Text className={classes.sectionContent} size="20px" lh="1.6" mb="md">
              Head deep into the Esquinas rainforest to stay in our much-loved lodge
              Head deep into the Esquinas rainforest to stay in our much-loved lodge
              Head deep into the Esquinas rainforest to stay in our much-loved lodge
            </Text>

            <Title order={2} className={classes.sectionTitle}>
              Itinerary
            </Title>
            <Text className={classes.sectionContent} size="20px" lh="1.6" mb="md">
              Head deep into the Esquinas rainforest to stay in our much-loved lodge
              Head deep into the Esquinas rainforest to stay in our much-loved lodge
              Head deep into the Esquinas rainforest to stay in our much-loved lodge
            </Text>

            <div className={classes.videoWrapper}>
              <VideoSection url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" title="YouTube video player" />
            </div>
          </GridCol>

          {/* Right Sidebar */}
          <GridCol span={{ base: 12, lg: 3 }}>
            <ContactSellerCard
              name="Nguyễn Văn Tèo Em"
              avatarUrl="/mock-images/z6005041616453_ab9be89ca94e5e8d8caff5c6cbd85233-1.jpg"
              email="Davidlam.VILtours@gmail.com"
              phone="+84 912 711 789"
              location="Vietnam"
              workingHours="Online 24/7"
            />

            <div className={classes.mapWrapper}>
              <Image
                src="/mock-images/z6005041616453_ab9be89ca94e5e8d8caff5c6cbd85233-1.jpg"
                alt="Map Location"
                fill
              />
            </div>
          </GridCol>
        </Grid>

        {/* Related Tours Section */}
        <Divider my="xl" color="var(--vinaup-green)" />

        <Title order={3} className={classes.relatedSectionTitle}>
          Your tours have viewed
        </Title>

        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing="lg"
          verticalSpacing="lg"
        >
          {MOCK_RELATED_TOURS.map((tour) => (
            <TourCard key={tour.id} {...tour} />
          ))}
        </SimpleGrid>

        {/* Reviews Section */}
        <Divider my="xl" color="var(--vinaup-green)" />

        <Group justify="space-between" mb="xl" align="center">
          <Title order={3} c="var(--vinaup-green)" fw={700}>
            Reviews in Thevietnamtravel
          </Title>
          <Button color="var(--vinaup-green)" radius="md">
            Reviews
          </Button>
        </Group>

        <div style={{ maxWidth: '550px' }}>
          <Group justify="space-between" mb={4}>
            <Text size="md" fw={500}>Satisfaction</Text>
            <Text size="md" c="var(--vinaup-green)" fw={700}>87%</Text>
          </Group>
          <Progress value={87} color="#F5B21A" size="md" radius={2} mb="xl" />

          <Group align="flex-start" wrap="nowrap" mt="lg">
            <Avatar radius="xl" size="md" />
            <div style={{ flex: 1 }}>
              <Group gap="xs" mb={4}>
                <Text fw={700} size="18px" c="var(--vinaup-green)">Nguyen Van Teo</Text>
                <Text size="sm" c="dimmed" fs="italic">(22/12/26)</Text>
              </Group>
              <Text size="16px" mb="xs" lh="1.6">
                This Pokémon likes to lick its palms that are sweetened by being soaked in honey. Teddiursa concocts its own honey by blending fruits and pollen collected by Beedrill. Blastoise has water spouts that protrude from its shell. The water
              </Text>

              <Group justify="flex-end" mb={4}>
                <Text size="sm" c="var(--vinaup-green)" fw={700}>75%</Text>
              </Group>
              <Progress value={75} color="#F5B21A" size="sm" radius={2} />

              <Text size="md" fs="italic" c="var(--vinaup-green)" mt="md" style={{ cursor: 'pointer' }}>
                View more
              </Text>
            </div>
          </Group>
        </div>
      </Container>
    </>
  );
}
