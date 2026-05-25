'use client';

import { Image, Text, AspectRatio } from '@mantine/core';
import { BsPlusCircle } from 'react-icons/bs';
import { VinaupHeartIcon } from '@vinaup/ui/cores';
import classes from './product-card-v2.module.scss';

export interface Product {
    id: string;
    title: string;
    image: string;
    oldPrice: string;
    newPrice: string;
    discountPercent?: string;
}

export function ProductCardV2({ product }: { product: Product }) {
    return (
        <div className={classes.productCard}>
            {product.discountPercent && <div className={classes.badge}>{product.discountPercent}</div>}

            <div className={classes.imageWrapper}>
                <AspectRatio ratio={1 / 1}>
                    <Image
                        src={product.image}
                        alt={product.title}
                        fit="contain"
                        fallbackSrc="https://placehold.co/400x300?text=Product"
                    />
                </AspectRatio>
            </div>

            <div className={classes.productInfo}>
                <Text className={classes.productTitle} lineClamp={2}>{product.title}</Text>

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