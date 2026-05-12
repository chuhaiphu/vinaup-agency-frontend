'use client';

import { Container, Title, Group, Button, Box, Image, Text, ActionIcon } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { BsCartPlus } from 'react-icons/bs';
import { TbWorld } from 'react-icons/tb';
import classes from './featured-products.module.scss';
import '@mantine/carousel/styles.css';

const categories = ['Laptop HP', 'Máy tính bàn HP', 'Laptop Dell', 'Tất cả'];

const defaultProducts = Array(6).fill(null).map((_, index) => ({
    id: index.toString(),
    title: 'Dell Latitude 5420 i5 1145G7 8G 256G 14" A1...',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2664&auto=format&fit=crop',
    oldPrice: '10.800.000đ',
    newPrice: '9.800.000đ',
    warranty: 'Bảo hành 6 tháng',
    isTrending: true,
}));

export function FeaturedProducts() {
    return (
        <Box className={classes.section}>
            <Container size="xl" w="100%" pt={"3rem"}>
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
                        <ActionIcon variant="default" size="lg" radius="xl">
                            <TbWorld size={20} color="#051b2c" />
                        </ActionIcon>
                    </Group>
                </div>

                {/* Carousel */}
                <Carousel
                    withIndicators={false}
                    height="100%"
                    slideSize={{ base: '100%', sm: '50%', md: '33.333333%', lg: '20%' }}
                    slideGap="md"
                    emblaOptions={{ loop: true, align: 'start' }}
                >
                    {defaultProducts.map((product) => (
                        <Carousel.Slide key={product.id}>
                            <div className={classes.productCard}>
                                {product.isTrending && <div className={classes.badge}>Bán chạy</div>}

                                <div className={classes.imageWrapper}>
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        h={140}
                                        fit="contain"
                                        fallbackSrc="https://placehold.co/400x300?text=Product"
                                    />
                                </div>

                                <div className={classes.productInfo}>
                                    <Text className={classes.productTitle}>{product.title}</Text>

                                    <div>
                                        <Text className={classes.oldPrice}>{product.oldPrice}</Text>
                                        <Text className={classes.newPrice}>{product.newPrice}</Text>
                                    </div>

                                    <div className={classes.footer}>
                                        <Text className={classes.warranty}>{product.warranty}</Text>
                                        <ActionIcon className={classes.cartButton}>
                                            <BsCartPlus size={18} />
                                        </ActionIcon>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Slide>
                    ))}
                </Carousel>
            </Container>
        </Box>
    );
}
