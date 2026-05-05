'use client';

import { Carousel, CarouselSlide } from '@mantine/carousel';
import { Box, rgba } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import classes from './hero-carousel.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Route } from 'next';

export interface HeroSlide {
  id: string | number;
  image: string;
  alt: string;
  title?: string;
  subTitle?: string;
  href?: string;
}

interface HeroCarouselProps {
  children?: React.ReactNode;
  data: HeroSlide[];
  height?: string | number;
  borderRadius?: string | number;
}

export function HeroCarousel({
  children,
  data,
  height = '75vh',
  borderRadius = '1rem',
}: HeroCarouselProps) {
  const autoplay = useRef(
    Autoplay({
      delay: 4000,
      stopOnMouseEnter: false,
      stopOnInteraction: false,
      playOnInit: true,
    })
  );

  return (
    <Box
      className={classes.carouselWrapper}
      h={height}
      bdrs={borderRadius}
    >
      <Carousel
        height="100%"
        withControls={false}
        withIndicators
        plugins={[autoplay.current]}
        emblaOptions={{
          loop: true,
          watchDrag: true,
          watchResize: true,
          watchSlides: true,
        }}
        classNames={{
          root: classes.carouselRoot,
          container: classes.carouselContainer,
          indicators: classes.indicatorsCustom,
          indicator: classes.indicatorDot,
        }}
      >
        {data.map((slide, index) => {
          const slideContent = (
            <>
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                loading='eager'
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                className={classes.slideImage}
              />
              {(slide.title || slide.subTitle) && (
                <div className={classes.slideTextOverlay}>
                  <div className={classes.textContainer}>
                    {slide.title && (
                      <p className={classes.slideTitle}>{slide.title}</p>
                    )}
                    {slide.subTitle && (
                      <p className={classes.slideSubTitle}>{slide.subTitle}</p>
                    )}
                  </div>
                </div>
              )}
            </>
          );
          return (
            <CarouselSlide key={slide.id} className={classes.slide}>
              {slide.href ? (
                <Link href={slide.href as Route} target="_blank" className={classes.slideLink}>
                  {slideContent}
                </Link>
              ) : slideContent}
            </CarouselSlide>
          );
        })}
      </Carousel>
      <div className={classes.contentOverlay}>{children}</div>
    </Box>
  );
}
