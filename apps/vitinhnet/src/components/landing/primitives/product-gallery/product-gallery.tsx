'use client';

import { Badge } from '@mantine/core';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';
import Image from 'next/image';
import { useState } from 'react';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import { EmblaCarouselType } from 'embla-carousel';
import '@mantine/carousel/styles.css';
import classes from './product-gallery.module.scss';

export interface ProductGalleryProps {
    images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);

    const handleThumbnailClick = (idx: number) => {
        setCurrentImageIndex(idx);
        embla?.scrollTo(idx);
    };

    return (
        <div className={classes.gallery}>
            <div className={classes.mainImageWrapper}>
                <div className={classes.mainImageContainer}>
                    <Carousel
                        getEmblaApi={setEmbla}
                        onSlideChange={setCurrentImageIndex}
                        withIndicators={false}
                        withControls={true}
                        emblaOptions={{
                            align: 'start',
                        }}
                        classNames={{
                            control: classes.carouselControl,
                        }}
                        previousControlIcon={<IconChevronLeft size={20} />}
                        nextControlIcon={<IconChevronRight size={20} />}
                    >
                        {images.map((img, idx) => (
                            <CarouselSlide key={`${img}-${idx}`}>
                                <div style={{ position: 'relative', width: '100%', aspectRatio: '2 / 1' }}>
                                    <Image
                                        src={img}
                                        alt={`Product image ${idx + 1}`}
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            </CarouselSlide>
                        ))}
                    </Carousel>
                </div>
                <Badge className={classes.imageCounter} variant="filled" color="gray" size="sm">
                    {currentImageIndex + 1}/{images.length}
                </Badge>
            </div>

            <div className={classes.thumbnails}>
                {images.map((img, idx) => (
                    <div
                        key={`${img}-${idx}`}
                        className={`${classes.thumbnail} ${currentImageIndex === idx ? classes.activeThumbnail : ''}`}
                        onClick={() => handleThumbnailClick(idx)}
                    >
                        <Image src={img} alt={`Thumbnail ${idx}`} fill style={{ objectFit: 'cover' }} />
                    </div>
                ))}
            </div>
        </div>
    );
}
