'use client';

import { useRef, useState, useEffect } from 'react';
import { Container, Title, Button, Box, ActionIcon } from '@mantine/core';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';
import { GridCarousel } from '@vinaup/ui/landing';
import classes from './featured-products.module.scss';
import '@mantine/carousel/styles.css';
import { VinaupGlobalIcon, VinaupHeartIcon } from '@vinaup/ui/cores';
import { Product, ProductCardV2 } from '@/components/landing/sections/featured-products/product-card-v2';


const categories = ['Laptop HP', 'Máy tính bàn HP', 'Laptop Dell', 'Máy tính bàn Dell', 'Laptop Lenovo'];

const defaultProducts: Product[] = Array(6).fill(null).map((_, index) => ({
    id: index.toString(),
    title: 'Dell Latitude 5420 i5 1145G7 8G 256G 14" A1',
    image: '1751241600_Dell5490(1).jpg',
    oldPrice: '24.800.000đ',
    newPrice: '22.800.000đ',
    isTrending: true,
}));

export function FeaturedProducts() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const updateArrows = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        updateArrows();
        window.addEventListener('resize', updateArrows);
        return () => window.removeEventListener('resize', updateArrows);
    }, []);

    const handleScrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
        }
    };

    const handleScrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
        }
    };

    return (
        <Box className={classes.section}>
            <Container size="xl" w="100%" pt={"2rem"}>
                {/* Header */}
                <div className={classes.header}>
                    <Title className={classes.title}>Laptop Dell</Title>

                    <div className={classes.rightSection}>
                        <div className={classes.scrollWrapper}>
                            {showLeftArrow && (
                                <ActionIcon 
                                    variant="subtle" 
                                    className={classes.scrollButton} 
                                    onClick={handleScrollLeft}
                                    size={30}
                                >
                                    <IconChevronLeft size={18} />
                                </ActionIcon>
                            )}
                            <div className={classes.scrollContainer} ref={scrollRef} onScroll={updateArrows}>
                                {categories.map((cat, idx) => (
                                    <Button
                                        key={idx}
                                        variant="default"
                                        size="sm"
                                        className={classes.categoryPill}
                                        data-active={cat === 'Laptop Dell'}
                                    >
                                        {cat}
                                    </Button>
                                ))}
                            </div>
                            {showRightArrow && (
                                <ActionIcon 
                                    variant="subtle" 
                                    className={classes.scrollButton} 
                                    onClick={handleScrollRight}
                                    size={30}
                                >
                                    <IconChevronRight size={18} />
                                </ActionIcon>
                            )}
                        </div>
                    </div>

                    <div className={classes.fixedActionGroup}>
                        <Button
                            variant="default"
                            size="sm"
                            className={classes.categoryPill}
                        >
                            Tất cả
                        </Button>
                        <div className={classes.globalIcon}>
                            <VinaupGlobalIcon size={28} fill="#051b2c" />
                        </div>
                    </div>
                </div>

                {/* Carousel */}
                <GridCarousel
                    items={defaultProducts}
                    slideSize={{ base: '50%', xs: '33.333333%', sm: '33.333333%', md: '25%', lg: '20%' }}
                    carouselProps={{
                        withIndicators: false,
                        height: "100%",
                        slideGap: { base: '10px', sm: '15px', md: '20px' },
                        emblaOptions: { loop: false, align: 'start' },
                    }}
                    renderItem={(product) => (
                        <ProductCardV2 
                            product={product}
                        />
                    )}
                />
            </Container>
        </Box>
    );
}
