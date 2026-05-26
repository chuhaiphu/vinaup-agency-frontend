'use client';

import { Container, Title, Box } from '@mantine/core';
import { GridCarousel } from '@vinaup/ui/landing';
import classes from './viewed-products.module.scss';
import '@mantine/carousel/styles.css';
import { Product, ProductCardV2 } from '@/components/landing/sections/featured-products/product-card-v2';

const defaultProducts: Product[] = Array(6).fill(null).map((_, index) => ({
    id: index.toString(),
    title: 'Dell Latitude 5420 i5 1145G7 8G 256G 14" A1',
    image: '/1751241600_Dell5490(1).jpg',
    oldPrice: '10.800.000đ',
    newPrice: '49.800.000đ',
    discountPercent: '-16%'
}));

export function ViewedProducts() {
    return (
        <Box className={classes.section}>
            <Container size="xl" w="100%" pb={{ base: '1rem', sm: '2rem' }}>
                <div className={classes.header}>
                    <Title className={classes.title}>Bạn đã xem</Title>
                </div>

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