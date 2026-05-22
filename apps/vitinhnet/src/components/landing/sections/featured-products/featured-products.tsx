'use client';

import { useRef, useState, useEffect } from 'react';
import { Container, Title, Button, Box, ActionIcon } from '@mantine/core';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';
import { GridCarousel } from '@vinaup/ui/landing';
import classes from './featured-products.module.scss';
import '@mantine/carousel/styles.css';
import { VinaupGlobalIcon } from '@vinaup/ui/cores';
import { Product, ProductCardV2 } from '@/components/landing/sections/featured-products/product-card-v2';
import Link from 'next/link';
import { Route } from 'next';


const categories = [
    { label: 'Laptop HP', slug: 'laptop-hp' },
    { label: 'Laptop Dell', slug: 'laptop-dell' },
    { label: 'Laptop Lenovo', slug: 'laptop-lenovo' },
    { label: 'Laptop HP', slug: 'laptop-hp' },
    { label: 'Laptop Dell', slug: 'laptop-dell' },
    { label: 'Laptop Lenovo', slug: 'laptop-lenovo' },
    { label: 'Laptop HP', slug: 'laptop-hp' },
    { label: 'Laptop Dell', slug: 'laptop-dell' },
    { label: 'Laptop Lenovo', slug: 'laptop-lenovo' }
];

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
            <Container size="xl" w="100%" pt={{ base: '1rem', sm: '2rem' }}>
                {/* Header */}
                <div className={classes.header}>
                    <Title className={classes.title}>Laptop Nhập Khẩu</Title>

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
                                <Link
                                    href={"laptop-nhap-khau" as Route}
                                    style={{ textDecoration: 'none' }}
                                    className={classes.mobileAllBtn}
                                >
                                    <Button
                                        variant="default"
                                        size="sm"
                                        className={classes.categoryPill}
                                    >
                                        Tất cả
                                    </Button>
                                </Link>
                                {categories.map((cat, idx) => (
                                    <Link
                                        key={idx}
                                        href={`/laptop-nhap-khau/${cat.slug}` as Route}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Button
                                            variant="default"
                                            size="sm"
                                            className={classes.categoryPill}
                                        >
                                            {cat.label}
                                        </Button>
                                    </Link>
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
                            component={Link}
                            href={"laptop-nhap-khau" as Route}
                            variant="default"
                            size="sm"
                            className={`${classes.categoryPill} ${classes.desktopAllBtn}`}
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
                        emblaOptions: { loop: false, align: 'start', watchDrag: false },
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
