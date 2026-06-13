import { notFound } from 'next/navigation';

import { getAllProductsActionPublic, getProductBySlugActionPublic } from '@/actions/product-actions';
import { ProductDescription } from '@/components/landing/sections/product-description/product-description';
import { ProductDetail } from '@/components/landing/sections/product-detail/product-detail';
import { ViewedProducts } from '@/components/landing/sections/viewed-products/viewed-products';

export async function generateStaticParams() {
  const result = await getAllProductsActionPublic();
  return (result.data ?? []).map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const result = await getProductBySlugActionPublic(slug);
  if (!result.success || !result.data) {
    notFound();
  }

  const viewedResult = await getAllProductsActionPublic();
  const viewedProducts = (viewedResult.data ?? []).slice(0, 10);

  return (
    <>
      <ProductDetail product={result.data} />
      <ProductDescription />
      <ViewedProducts products={viewedProducts} />
    </>
  );
}
