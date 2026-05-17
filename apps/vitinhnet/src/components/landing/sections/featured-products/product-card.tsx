import { Image, Text, ActionIcon, AspectRatio } from '@mantine/core';
import { BsCartPlus } from 'react-icons/bs';
import classes from './product-card.module.scss';

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
                <Text className={classes.productTitle}>{product.title}</Text>

                <div className={classes.footer}>
                    <div>
                        <Text className={classes.oldPrice}>{product.oldPrice}</Text>
                        <Text className={classes.newPrice}>{product.newPrice}</Text>
                        <Text className={classes.warranty}>{product.warranty}</Text>
                    </div>

                    <ActionIcon className={classes.cartButton}>
                        <BsCartPlus size={24} />
                    </ActionIcon>
                </div>
            </div>
        </div>
    );
}