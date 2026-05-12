import { Image, Text, ActionIcon } from '@mantine/core';
import { BsCartPlus } from 'react-icons/bs';
import classes from './featured-products.module.scss';

export interface Product {
    id: string;
    title: string;
    image: string;
    oldPrice: string;
    newPrice: string;
    warranty: string;
    isTrending: boolean;
}

export function ProductCard({ product }: { product: Product }) {
    return (
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
    );
}