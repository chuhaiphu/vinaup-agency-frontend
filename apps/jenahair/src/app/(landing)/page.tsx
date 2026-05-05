import { Container, Stack } from '@mantine/core';
import { BrandIntroduction } from '@/components/landing/sections/brand-introduction/brand-introduction';
import { AgencyMarqueeSection } from '@/components/landing/sections/agency-marquee-section/agency-marquee-section';
import { SalonServicesBanner } from '@/components/landing/sections/salon-services-banner/salon-services-banner';
import { SalonDiarySection } from '@/components/landing/sections/salon-diary-section/salon-diary-section';
import { MOCK_SALON_SERVICES } from '@/mocks/salon-services';
import { SalonVideoAndBlogsShowcase } from '@/components/landing/sections/salon-video-and-blogs-showcase/salon-video-and-blogs-showcase';
import { BannerCarouselSection } from '@/components/landing/sections/banner-carousel-section/banner-carousel-section';

export default function Home() {
  return (
    <div>
      <Container size={'xl'}>
        <BannerCarouselSection />
      </Container>
      <Container size={'lg'}>
        <BrandIntroduction />
      </Container>

      <Stack gap="3rem" pt="3rem">
        <AgencyMarqueeSection />

        <SalonServicesBanner
          imageSrc="/images/IntroImage.png"
          imageAlt="Jena Hair Certificate"
          services={MOCK_SALON_SERVICES}
        />

        <SalonDiarySection />

        <SalonVideoAndBlogsShowcase />
      </Stack>
    </div>
  );
}
