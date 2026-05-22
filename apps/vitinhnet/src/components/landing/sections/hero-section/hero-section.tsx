'use client';

import { Container, Grid, Title, Text, Button, Group, Box, GridCol } from '@mantine/core';
import { HeroCarousel } from '@vinaup/ui/landing';
import classes from './hero-section.module.scss';
import { DellLogoIcon, HpLogoIcon } from '@vinaup/ui/cores';

const slides = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Máy tính bộ văn phòng',
    subTitle: 'Hiệu năng ổn định, giá cả phải chăng cho doanh nghiệp',
    href: '#',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1600&auto=format&fit=crop',
    title: 'Laptop Gaming Cũ',
    subTitle: 'Chiến game siêu mượt, ngoại hình như mới',
    href: '#',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1142&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Linh Kiện Chính Hãng',
    subTitle: 'Nâng cấp dễ dàng, bảo hành dài hạn',
    href: '#',
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Máy tính bộ văn phòng',
    subTitle: 'Hiệu năng ổn định, giá cả phải chăng cho doanh nghiệp',
    href: '#',
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1600&auto=format&fit=crop',
    title: 'Laptop Gaming Cũ',
    subTitle: 'Chiến game siêu mượt, ngoại hình như mới',
    href: '#',
  },
];

export function HeroSection() {
  return (
    <Box className={classes.heroSection}>
      <Container size="xl" w="100%">
        <Grid align="stretch" gap={20}>
          {/* Left Content */}
          <GridCol span={{ base: 12, md: 4 }} order={{ base: 2, md: 1 }}>
            <div className={classes.contentWrapper}>
              <div>
                <Title className={classes.title}>Máy tính cũ<br />giá rẻ</Title>
                <Text className={classes.description}>
                  Chuyên bán máy tính bàn, máy laptop đã qua sử dụng uy tín và còn rất mới
                </Text>
              </div>

              <div>
                <Group mt={{ base: '1.5rem', sm: 'xl' }} gap="md">
                  <Button size="lg" radius="md" className={classes.btnPrimary}>
                    Liên hệ
                  </Button>
                  <Button size="lg" radius="md" variant="outline" className={classes.btnOutline}>
                    Đăng ký đại lý
                  </Button>
                </Group>

                <Group gap="xl" mt={{ base: '1.5rem', sm: 'xl' }} className={classes.brandLogos}>
                  <HpLogoIcon size={66} fill="white" />
                  <DellLogoIcon size={66} fill="white" />
                </Group>
              </div>
            </div>
          </GridCol>

          {/* Right Content */}
          <GridCol span={{ base: 12, md: 8 }} order={{ base: 1, md: 2 }}>
            <HeroCarousel
              data={slides.map((slide) => ({
                id: slide.id,
                image: slide.imageUrl,
                alt: slide.title ?? '',
                title: slide.title,
                subTitle: slide.subTitle,
                href: slide.href,
              }))}
              overlayOpacity={0.2}
              ratio={3 / 2}
            />
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
}