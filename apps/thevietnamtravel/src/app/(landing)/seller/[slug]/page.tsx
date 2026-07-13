'use client';

import { Container, Grid, Paper, Title, Text, Group, Box, GridCol, Stack } from '@mantine/core';
import {
  VinaupEmailIcon,
  VinaupPhoneIcon,
  VinaupLocationIcon
} from '@vinaup/ui/cores';

import TourCard from '@/components/primitives/tour-card/tour-card';
import ReviewsSection from '@/components/primitives/reviews-section/reviews-section';
import classes from './page.module.scss';

const MOCK_TOURS = Array.from({ length: 8 }).map((_, index) => ({
  id: index,
  title: 'Tour Pickleball noi bat 2345 Dalat',
  imageUrl: '/mock-images/z6005041616453_ab9be89ca94e5e8d8caff5c6cbd85233-1.jpg',
  price: 'đ 12.000.000',
  href: '#',
}));

export default function SellerPage() {
  return (
    <>
      {/* Full-width Banner Section */}
      <div className={classes.fullWidthBanner}>
        <Container size="xl">
          <Paper className={classes.sellerCard}>
            <Box className={classes.sellerInfo}>
              <Group mb="md" align="center" className={classes.nameWrapper}>
                <Title order={2} c="var(--vinaup-green-brand)">Nguyen Văn Tèo Em</Title>
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
              <Box className={classes.avatarCircle}>
                Avatar
              </Box>
            </Box>
          </Paper>
        </Container>
      </div>

      <Container size="xl" classNames={{ root: classes.pageRoot }} py="24px">
        {/* Travel Agency Section */}
        <Paper p="24px" radius="md" mb="xl" shadow="sm">
          <Group align="center">
            <Title order={2} className={classes.sectionTitle} style={{ flexShrink: 0, marginRight: '40px' }}>
              Travel Agency
            </Title>
            <Title order={2} c="var(--vinaup-green-brand)" style={{ fontSize: '24px' }}>
              Agency Name ABC
            </Title>
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
