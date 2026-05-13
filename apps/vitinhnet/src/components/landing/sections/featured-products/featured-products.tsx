'use client';

import { Container, Title, Group, Button, Box } from '@mantine/core';
import { GridCarousel } from '@vinaup/ui/landing';
import { ProductCard, type Product } from './product-card';
import classes from './featured-products.module.scss';
import '@mantine/carousel/styles.css';
import { VinaupGlobalIcon } from '@vinaup/ui/cores';

const categories = ['Laptop HP', 'Máy tính bàn HP', 'Laptop Dell', 'Tất cả'];

const defaultProducts: Product[] = Array(6).fill(null).map((_, index) => ({
    id: index.toString(),
    title: 'Dell Latitude 5420 i5 1145G7 8G 256G 14" A1...',
    image: 'dell_3f2b91da99f7492ab27a0850bf13ccc5.png',
    oldPrice: '10.800.000đ',
    newPrice: '9.800.000đ',
    warranty: 'Bảo hành 6 tháng',
    isTrending: true,
}));

export function FeaturedProducts() {
    return (
        <Box className={classes.section}>
            <Container size="xl" w="100%" pt={"2rem"}>
                {/* Header */}
                <div className={classes.header}>
                    <Title className={classes.title}>Laptop Dell</Title>

                    <Group gap="sm">
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
                        <VinaupGlobalIcon size={28} fill="#051b2c" />
                    </Group>
                </div>

                {/* Carousel */}
                <GridCarousel
                    items={defaultProducts}
                    slideSize={{ base: '50%', sm: '33.333333%', md: '25%', lg: '20%' }}
                    carouselProps={{
                        withIndicators: false,
                        height: "100%",
                        slideGap: { base: '10px', sm: '15px', md: '20px' },
                        emblaOptions: { loop: false, align: 'start' },
                    }}
                    renderItem={(product) => (
                        <ProductCard product={product} />
                    )}
                />
            </Container>
        </Box>
    );
}
