import { AutoScrollCarousel } from '@vinaup/ui/landing';
import { cacheLife, cacheTag } from 'next/cache';
import Image from 'next/image';

import { getMarqueeActionPublic } from '@/actions/theme-config-actions';

import classes from './agency-marquee-section.module.scss';

export async function AgencyMarqueeSection() {
  // Cache into the static shell; reads theme-config, so tag it to be invalidated.
  // → docs/pattern/CACHING-REVALIDATION.md (Rule 1)
  'use cache';
  cacheLife('default');
  cacheTag('theme-config');
  const result = await getMarqueeActionPublic();
  const slides = result.data?.value ?? [];

  if (slides.length === 0) return null;
  const renderSlide = (slide: (typeof slides)[number]) => {
    if (slide.imageUrl) {
      return (
        <div key={slide.id} className={classes.item}>
          <Image
            src={slide.imageUrl}
            alt={slide.title}
            className={classes.image}
            width={240}
            height={120}
          />
        </div>
      );
    } else if (slide.title && slide.title.trim() !== '') {
      return (
        <div key={slide.id} className={classes.item}>
          <span className={classes.title}>{slide.title}</span>
        </div>
      );
    }
    return null;
  };
  return <AutoScrollCarousel>{slides.map((slide) => renderSlide(slide))}</AutoScrollCarousel>;
}
