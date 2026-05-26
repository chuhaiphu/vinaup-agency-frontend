'use client';

import { Image, Text, AspectRatio } from '@mantine/core';
import { BsPlusCircle } from 'react-icons/bs';
import { VinaupHeartIcon } from '@vinaup/ui/cores';
import classes from './product-card-v2.module.scss';
import Link from 'next/link';
import { Route } from 'next';

export interface Product {
    id: string;
    title: string;
    image: string;
    oldPrice: string;
    newPrice: string;
    discountPercent?: string;
    slug?: string;
}

export function ProductCardV2({ product }: { product: Product }) {
    const productSlug = product.slug || product.id;
    const productUrl = `/san-pham/${productSlug}` as Route;

    return (
        <div className={classes.productCard}>
            {product.discountPercent && <div className={classes.badge}>{product.discountPercent}</div>}

            <Link href={productUrl} className={classes.imageWrapper} style={{ display: 'block' }}>
                <AspectRatio ratio={1 / 1}>
                    <Image
                        src={product.image}
                        alt={product.title}
                        fit="contain"
                        fallbackSrc="https://placehold.co/400x300?text=Product"
                    />
                </AspectRatio>
            </Link>

            <div className={classes.productInfo}>
                <Link href={productUrl} style={{ textDecoration: 'none' }}>
                    <Text className={classes.productTitle} lineClamp={2}>{product.title}</Text>
                </Link>

                <div className={classes.metaContainer}>
                    {/* Hàng 1: Giá mới và Icon Trái tim */}
                    <div className={classes.priceRow}>
                        <Text className={classes.newPrice}>{product.newPrice}</Text>
                        <span className={classes.favorited}>
                            <VinaupHeartIcon fill="#C44C50" size={18} />
                        </span>
                    </div>

                    {/* Hàng 2: Giá cũ (Giảm giá) và So sánh */}
                    <div className={classes.actionRow}>
                        <Text className={classes.oldPrice}>{product.oldPrice}</Text>
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