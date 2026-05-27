'use client';

import { Container, Title, Box } from '@mantine/core';
import { GridCarousel } from '@vinaup/ui/landing';
import classes from './featured-products.module.scss';
import '@mantine/carousel/styles.css';
import { VinaupArrowRightIcon } from '@vinaup/ui/cores';
import { Product, ProductCardV2 } from '@/components/landing/sections/featured-products/product-card-v2';
import Link from 'next/link';
import { CategoryScroll, CategoryScrollItem } from '@/components/landing/primitives/category-scroll/category-scroll';

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
    discountPercent: '-16%'
}));

export function FeaturedProducts() {
    const scrollItems: CategoryScrollItem[] = categories.map(cat => ({
        label: cat.label,
        href: `/laptop-nhap-khau/${cat.slug}`,
    }));

    return (
        <Box className={classes.section}>
            <Container size="xl" w="100%" pt={{ base: '1rem', sm: '2rem' }}>
                {/* Header */}
                <div className={classes.header}>
                    <Link
                        href="/laptop-nhap-khau"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <Title
                            order={2}
                            className={classes.titleButton}
                        >
                            <div className={classes.titleDecorator} />
                            <span className={classes.titleText}>Laptop Nhập Khẩu</span>
                            <div className={classes.titleArrow}>
                                <VinaupArrowRightIcon size={20} fill="#0E54C9" />
                            </div>
                        </Title>
                    </Link>

                    <div className={classes.rightSection}>
                        <CategoryScroll
                            items={scrollItems}
                            scrollStep={150}
                            containerClassName={classes.scrollContainer}
                            itemClassName={classes.categoryPill}
                            wrapperClassName={classes.scrollWrapper}
                        />
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
