import { Suspense } from 'react';
import { Loader, Center } from '@mantine/core';
import { ProductDetail } from '@/components/landing/sections/product-detail/product-detail';
import { ProductDescription } from '@/components/landing/sections/product-description/product-description';
import { ViewedProducts } from '@/components/landing/sections/viewed-products/viewed-products';

export function generateStaticParams() {
    return [{ slug: 'placeholder-product' }];
}

export default function ProductDetailPage(
    props: {
        params: Promise<{ slug: string }>;
    }
) {
    return (
        <Suspense fallback={<Center py="3rem"><Loader color="red" /></Center>}>
            <ProductDetail />
            <ProductDescription />
            <ViewedProducts />
        </Suspense>
    );
}
