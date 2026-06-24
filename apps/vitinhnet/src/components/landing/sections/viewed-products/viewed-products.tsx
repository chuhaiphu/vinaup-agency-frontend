import { Container, Title, Box } from '@mantine/core';
import { GridCarousel } from '@vinaup/ui/landing';

import classes from './viewed-products.module.scss';

import { ProductCardV2 } from '@/components/landing/sections/featured-products/product-card-v2';
import { ProductResponse } from '@/interfaces/product-interfaces';

import '@mantine/carousel/styles.css';

export function ViewedProducts({ products }: { products: ProductResponse[] }) {
  return (
    <Box className={classes.section}>
      <Container size="xl" w="100%" pb={{ base: '1rem', sm: '2rem' }}>
        <div className={classes.header}>
          <Title className={classes.title}>Bạn đã xem</Title>
        </div>

        <GridCarousel
          items={products}
          slideSize={{ base: '50%', xs: '33.333333%', sm: '33.333333%', md: '25%', lg: '20%' }}
          carouselProps={{
            withIndicators: false,
            height: '100%',
            slideGap: { base: '10px', sm: '15px', md: '20px' },
            emblaOptions: { loop: false, align: 'start', watchDrag: false },
          }}
          renderItem={(product) => <ProductCardV2 product={product} />}
        />
      </Container>
    </Box>
  );
}
