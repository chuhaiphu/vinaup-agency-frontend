'use client';

import { Image, Text, AspectRatio } from '@mantine/core';
import { VinaupHeartIcon } from '@vinaup/ui/cores';
import { generateFormattedPrice } from '@vinaup/utils';
import { Route } from 'next';
import Link from 'next/link';
import { BsPlusCircle } from 'react-icons/bs';

import { ProductResponse } from '@/interfaces/product-interfaces';

import classes from './product-card-v2.module.scss';

export function ProductCardV2({ product }: { product: ProductResponse }) {
  const productUrl = `/san-pham/${product.slug}` as Route;

  return (
    <div className={classes.productCard}>
      {product.discountPercent > 0 && <div className={classes.badge}>-{product.discountPercent}%</div>}

      <Link href={productUrl} className={classes.imageWrapper} style={{ display: 'block' }}>
        <AspectRatio ratio={1 / 1}>
          <Image
            src={product.imageUrl}
            alt={product.title}
            fit="contain"
            fallbackSrc="https://placehold.co/400x300?text=Product"
          />
        </AspectRatio>
      </Link>

      <div className={classes.productInfo}>
        <Link href={productUrl} style={{ textDecoration: 'none' }}>
          <Text className={classes.productTitle} lineClamp={2}>
            {product.title}
          </Text>
        </Link>

        <div className={classes.metaContainer}>
          <div className={classes.priceRow}>
            <Text className={classes.newPrice}>{generateFormattedPrice(product.price)}đ</Text>
            <span className={classes.favorited}>
              <VinaupHeartIcon fill="var(--vinaup-soft-crimson)" size={18} />
            </span>
          </div>

          <div className={classes.actionRow}>
            <Text className={classes.oldPrice}>{generateFormattedPrice(product.originalPrice)}đ</Text>
            <div className={classes.compare}>
              <BsPlusCircle size={16} />
              <span>So sánh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
