import { HeroCarousel } from '@vinaup/ui/landing';

import { getCarouselActionPublic } from '@/actions/theme-config-actions';

export async function BannerCarouselSection() {
  'use cache';
  const result = await getCarouselActionPublic();
  const slides = (result.data?.value ?? []).filter((slide) => !!slide.imageUrl);

  if (slides.length === 0) return null;

  return (
    <HeroCarousel
      data={slides.map((slide) => ({
        id: slide.id,
        image: slide.imageUrl,
        alt: slide.title ?? '',
        title: slide.title,
        subTitle: slide.subTitle,
        href: slide.href,
      }))}
      height="75vh"
    />
  );
}
