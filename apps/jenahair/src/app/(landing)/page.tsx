import { Container, Stack } from '@mantine/core';

import { AgencyMarqueeSection } from '@/components/landing/sections/agency-marquee-section/agency-marquee-section';
import { BannerCarouselSection } from '@/components/landing/sections/banner-carousel-section/banner-carousel-section';
import { BrandIntroduction } from '@/components/landing/sections/brand-introduction/brand-introduction';
import { SalonDiarySection } from '@/components/landing/sections/salon-diary-section/salon-diary-section';
import { SalonServicesBanner } from '@/components/landing/sections/salon-services-banner/salon-services-banner';
import { SalonVideoAndBlogsShowcase } from '@/components/landing/sections/salon-video-and-blogs-showcase/salon-video-and-blogs-showcase';
import { MOCK_SALON_SERVICES } from '@/mocks/salon-services';

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
          imageAlt="Jenahair Certificate"
          services={MOCK_SALON_SERVICES}
        />

        <SalonDiarySection />

        <SalonVideoAndBlogsShowcase />
      </Stack>
    </div>
  );
}
