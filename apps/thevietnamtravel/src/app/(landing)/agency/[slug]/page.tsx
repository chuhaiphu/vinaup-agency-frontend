'use client';

import { Container, Grid, Paper, Title, Text, Group, Box, GridCol, Stack } from '@mantine/core';
import {
  VinaupEmailIcon,
  VinaupPhoneIcon,
  VinaupLocationIcon,
  VinaupVerifiedIcon
} from '@vinaup/ui/cores';

import TourCard from '@/components/primitives/tour-card/tour-card';
import ReviewsSection from '@/components/primitives/reviews-section/reviews-section';
import classes from './page.module.scss';

const VerifiedBadge = () => (
  <Group gap={4}>
    <VinaupVerifiedIcon size={20} fill="var(--vinaup-green-brand)" />
    <Text size="sm" c="var(--vinaup-medium-dark-gray)">Verified</Text>
  </Group>
);

const MOCK_TOURS = Array.from({ length: 8 }).map((_, index) => ({
  id: index,
  title: 'Tour Pickleball noi bat 2345 Dalat',
  imageUrl: '/mock-images/z6005041616453_ab9be89ca94e5e8d8caff5c6cbd85233-1.jpg',
  price: 'đ 12.000.000',
  href: '#',
}));

const MOCK_SELLERS = [
  '/mock-images/z6005041616453_ab9be89ca94e5e8d8caff5c6cbd85233-1.jpg',
  '/mock-images/z6005041616453_ab9be89ca94e5e8d8caff5c6cbd85233-1.jpg',
  '/mock-images/z6005041616453_ab9be89ca94e5e8d8caff5c6cbd85233-1.jpg',
  '/mock-images/z6005041616453_ab9be89ca94e5e8d8caff5c6cbd85233-1.jpg',
];

export default function AgencyPage() {
  return (
    <>
      {/* Full-width Banner Section */}
      <div className={classes.fullWidthBanner}>
        <Container size="xl">
          <Paper className={classes.agencyCard}>
            <Box className={classes.agencyInfo}>
              <Group mb="md" align="center" className={classes.nameWrapper}>
                <Title order={2} c="var(--vinaup-green-brand)">Agency Name ABC</Title>
                <VerifiedBadge />
              </Group>

              <Stack gap="xs">
                <Group gap="sm">
                  <VinaupEmailIcon size={20} fill="var(--vinaup-green)" />
                  <Text size="md" c="var(--vinaup-green-brand)">Email@gmail.com</Text>
                </Group>
                <Group gap="sm">
                  <VinaupPhoneIcon size={20} fill="var(--vinaup-green)" />
                  <Text size="md" c="var(--vinaup-green-brand)">092092982 - Whatsapp</Text>
                </Group>
                <Group gap="sm">
                  <VinaupLocationIcon size={20} fill="var(--vinaup-green)" />
                  <Text size="md" c="var(--vinaup-green-brand)">999 Hung Vuong - Hà Nội</Text>
                </Group>
              </Stack>
            </Box>

            <Box className={classes.avatarWrapper}>
              <Box className={classes.avatarSquare}>
                Avatar
              </Box>
            </Box>
          </Paper>
        </Container>
      </div>

      <Container size="xl" py="24px">
        {/* Travel Seller Section */}
        <Paper p="24px" radius="md" mb="xl" shadow="sm">
          <Group align="center">
            <Title order={2} className={classes.sectionTitle} style={{ flexShrink: 0, marginRight: '40px' }}>
              Travel Seller
            </Title>
            <Group gap="md">
              {MOCK_SELLERS.map((seller, idx) => (
                <img key={idx} src={seller} className={classes.sellerAvatar} alt="Seller" />
              ))}
            </Group>
          </Group>
        </Paper>

        {/* Tour Grid */}
        <Grid gutter={20} mb="xl">
          {MOCK_TOURS.map((tour, idx) => (
            <GridCol span={{ base: 12, sm: 6, md: 4, lg: 3 }} key={idx}>
              <TourCard {...tour} />
            </GridCol>
          ))}
        </Grid>

        <Box my={40} style={{ borderTop: '1px solid var(--vinaup-green)' }} />

        {/* Reviews Section */}
        <ReviewsSection />
      </Container>
    </>
  );
}
