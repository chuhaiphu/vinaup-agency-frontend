import { getCompareProductsActionPublic } from '@/actions/product-actions';

import { ProductCompare } from './product-compare';

export default async function ComparePage() {
  const result = await getCompareProductsActionPublic();
  const products = result.success && result.data ? result.data : [];

  return (
    <main>
      <ProductCompare products={products} />
    </main>
  );
}
