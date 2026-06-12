import { HeroCarousel } from '@vinaup/ui/landing';
import { cacheLife, cacheTag } from 'next/cache';

import { getCarouselActionPublic } from '@/actions/theme-config-actions';

export async function BannerCarouselSection() {
  // Cache into the static shell; reads theme-config, so tag it to be invalidated.
  // → docs/pattern/CACHING-REVALIDATION.md (Rule 1)
  'use cache';
  cacheLife('default');
  cacheTag('theme-config');
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
