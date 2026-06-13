import { ProductResponse } from '@/interfaces/product-interfaces';
import { MOCK_COMPARE_PRODUCTS, MOCK_PRODUCTS } from '@/mocks/product.mock';

import { mockApiResponse } from './_mock';
// When the backend is ready, swap the mock seam for the real transport:
// import { generateFilterQueryString } from '@vinaup/utils';
// import { apiPublic } from './_base';

export interface ProductFilterParams {
  category?: string;
}

export async function getAllProductsApiPublic(filter?: ProductFilterParams) {
  // --- MOCK (current) ---
  const data = filter?.category
    ? MOCK_PRODUCTS.filter((product) => product.category === filter.category)
    : MOCK_PRODUCTS;
  return mockApiResponse<ProductResponse[]>(data);

  // --- REAL (when API is live) — delete the mock block above, enable this ---
  // const queryString = generateFilterQueryString({ category: filter?.category });
  // return apiPublic<ProductResponse[]>(`/products${queryString}`, { method: 'GET' });
}

export async function getProductBySlugApiPublic(slug: string) {
  // --- MOCK (current) ---
  const product = MOCK_PRODUCTS.find((item) => item.slug === slug);
  return mockApiResponse<ProductResponse | undefined>(product);

  // --- REAL (when API is live) ---
  // return apiPublic<ProductResponse>(`/products/${slug}`, { method: 'GET' });
}

export async function getCompareProductsApiPublic() {
  // --- MOCK (current) ---
  return mockApiResponse<ProductResponse[]>(MOCK_COMPARE_PRODUCTS);

  // --- REAL (when API is live) ---
  // return apiPublic<ProductResponse[]>('/products/compare', { method: 'GET' });
}
