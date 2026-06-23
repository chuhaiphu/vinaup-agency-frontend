
import { Container, Title, Box } from '@mantine/core';
import { GridCarousel } from '@vinaup/ui/landing';

import classes from './featured-products.module.scss';

import { VinaupArrowRightIcon } from '@vinaup/ui/cores';
import Link from 'next/link';

import {
  CategoryScroll,
  CategoryScrollItem,
} from '@/components/landing/primitives/category-scroll/category-scroll';
import { ProductCardV2 } from '@/components/landing/sections/featured-products/product-card-v2';
import { ProductResponse } from '@/interfaces/product-interfaces';

import '@mantine/carousel/styles.css';

const categories = [
  { label: 'Laptop HP', slug: 'laptop-hp' },
  { label: 'Laptop Dell', slug: 'laptop-dell' },
  { label: 'Laptop Lenovo', slug: 'laptop-lenovo' },
  { label: 'Laptop HP', slug: 'laptop-hp' },
  { label: 'Laptop Dell', slug: 'laptop-dell' },
  { label: 'Laptop Lenovo', slug: 'laptop-lenovo' },
  { label: 'Laptop HP', slug: 'laptop-hp' },
  { label: 'Laptop Dell', slug: 'laptop-dell' },
  { label: 'Laptop Lenovo', slug: 'laptop-lenovo' },
];

export function FeaturedProducts({ products }: { products: ProductResponse[] }) {
  const scrollItems: CategoryScrollItem[] = categories.map((cat) => ({
    label: cat.label,
    href: `/laptop-nhap-khau/${cat.slug}`,
  }));

  return (
    <Box className={classes.section}>
      <Container size="xl" w="100%" pt={{ base: '1rem', sm: '2rem' }}>
        {/* Header */}
        <div className={classes.header}>
          <Link href="/laptop-nhap-khau" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Title order={2} className={classes.titleButton}>
              <div className={classes.titleDecorator} />
              <span className={classes.titleText}>Laptop Nhập Khẩu</span>
              <div className={classes.titleArrow}>
                <VinaupArrowRightIcon size={18} fill="#0E54C9" className={classes.titleArrowIcon} />
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
