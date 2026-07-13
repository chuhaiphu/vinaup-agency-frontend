"use client";

import { useRef, useCallback } from "react";
import type { MantineSpacing } from "@mantine/core";
import { Stack } from "@mantine/core";
import { EmblaCarouselType } from "embla-carousel";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Carousel } from "@mantine/carousel";

import { SectionHeader } from "@/components/primitives/section-header/section-header";
import classes from "./grid-carousel.module.scss"

interface GridCarouselProps<T extends { id: string | number }> {
  title: string;
  subtitle?: string;
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  rows?: number;
  rowGap?: MantineSpacing;
  slideGap?: MantineSpacing;
  slideSize?: string | number | {
    base?: string | number;
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
  };
}

export default function GridCarousel<T extends { id: string | number }>({
  title,
  subtitle,
  data,
  renderItem,
  rows = 2,
  rowGap = "lg",
  slideGap = "lg",
  slideSize = { base: "50%", sm: "33.333%", md: "25%", lg: "20%" },
}: GridCarouselProps<T>) {
  const emblaRef = useRef<EmblaCarouselType | null>(null);

  const handlePrev = useCallback(() => emblaRef.current?.scrollPrev(), []);
  const handleNext = useCallback(() => emblaRef.current?.scrollNext(), []);

  const columns: T[][] = [];
  for (let i = 0; i < data.length; i += rows) {
    columns.push(data.slice(i, i + rows));
  }

  const navButtons = (
    <div className={classes.navButtons}>
      <button
        className={classes.navBtn}
        aria-label="Previous"
        onClick={handlePrev}
      >
        <MdChevronLeft size={20} />
      </button>
      <button
        className={classes.navBtn}
        aria-label="Next"
        onClick={handleNext}
      >
        <MdChevronRight size={20} />
      </button>
    </div>
  )

  return (
    <div className={classes.gridCarouselRoot}>
      <SectionHeader
        title={title}
        subtitle={subtitle}
        rightSection={navButtons}
      />

      <Carousel
        getEmblaApi={(embla) => {
          emblaRef.current = embla;
        }}
        withControls={false}
        withIndicators={false}
        slideSize={slideSize}
        slideGap={slideGap}
        classNames={{ viewport: classes.carouselViewport }}
        emblaOptions={{ loop: true, align: "start" }}
      >
        {columns.map((col, colIndex) => (
          <Carousel.Slide key={colIndex}>
            <Stack gap={rowGap}>{col.map((item) => renderItem(item))}</Stack>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
