'use client';

import React from 'react';
import { Container, Grid, GridCol, Box, Title, Text, List, ListItem, Group } from '@mantine/core';
import { VinaupArrowRightIcon } from '@vinaup/ui/cores';
import classes from './product-compare.module.scss';

const MOCK_PRODUCTS = [
    {
        id: 1,
        name: 'Máy bộ HP EliteDesk 800 G5 SFF | Core i3-9100',
        price: '5.900.000đ',
        originalPrice: '7.500.000đ',
        specs: {
            cpu: 'Intel Core i3-9100',
            ram: '8GB',
            storage: 'SSD 512GB',
            gpu: 'Intel UHD 630',
            power: '~180W',
            dimensions: 'SFF Nhỏ gọn'
        }
    },
    {
        id: 2,
        name: 'Máy bộ Dell OptiPlex 3070 SFF | Core i5-9400',
        price: '6.500.000đ',
        originalPrice: '8.000.000đ',
        specs: {
            cpu: 'Intel Core i5-9400',
            ram: '8GB',
            storage: 'SSD 256GB',
            gpu: 'Intel UHD 630',
            power: '~200W',
            dimensions: 'SFF Nhỏ gọn'
        }
    },
    {
        id: 3,
        name: 'Máy bộ Lenovo ThinkCentre M720s | Core i3-8100',
        price: '5.200.000đ',
        originalPrice: '6.800.000đ',
        specs: {
            cpu: 'Intel Core i3-8100',
            ram: '8GB',
            storage: 'SSD 256GB',
            gpu: 'Intel UHD 630',
            power: '~180W',
            dimensions: 'SFF Nhỏ gọn'
        }
    },
    {
        id: 4,
        name: 'Máy bộ HP ProDesk 400 G6 SFF | Core i5-9500',
        price: '7.100.000đ',
        originalPrice: '8.900.000đ',
        specs: {
            cpu: 'Intel Core i5-9500',
            ram: '16GB',
            storage: 'SSD 512GB',
            gpu: 'Intel UHD 630',
            power: '~180W',
            dimensions: 'SFF Nhỏ gọn'
        }
    }
];

export function ProductCompare() {
    return (
        <Container size="xl" py={{ base: '1rem', sm: '2rem' }}>
            <Title order={2} mb="md" className={classes.mainTitle}>
                So sánh sản phẩm
            </Title>

            <Grid gap="20px" align="stretch">
                {MOCK_PRODUCTS.map((product) => (
                    <GridCol key={product.id} span={{ base: 12, sm: 6, md: 3 }}>
                        <Box className={classes.card}>
                            <Text fw={700} className={classes.productName} mb="sm" lineClamp={2}>
                                {product.name}
                            </Text>

                            <Group gap="xs" mb="lg" align="flex-end">
                                <Text fw={700} className={classes.productPrice}>
                                    {product.price}
                                </Text>
                                <Text td="line-through" className={classes.originalPrice}>
                                    {product.originalPrice}
                                </Text>
                            </Group>

                            <Group gap="sm" mb="md" align="center" wrap="nowrap">
                                <VinaupArrowRightIcon size={20} fill="var(--vinaup-blue-link)" />
                                <Title order={4} className={classes.sectionTitle}>
                                    Cấu hình phần cứng
                                </Title>
                            </Group>

                            <List spacing="xs" className={classes.specList}>
                                <ListItem><b>CPU:</b> {product.specs.cpu}</ListItem>
                                <ListItem><b>RAM:</b> {product.specs.ram}</ListItem>
                                <ListItem><b>Ổ cứng:</b> {product.specs.storage}</ListItem>
                                <ListItem><b>GPU:</b> {product.specs.gpu}</ListItem>
                                <ListItem><b>Nguồn:</b> {product.specs.power}</ListItem>
                                <ListItem><b>Kích thước:</b> {product.specs.dimensions}</ListItem>
                            </List>
                        </Box>
                    </GridCol>
                ))}
            </Grid>
        </Container>
    );
}