'use server';

import { cacheLife, cacheTag } from 'next/cache';

import { executeApi } from '@/actions/_base';
import {
  getAllProductsApiPublic,
  getCompareProductsApiPublic,
  getProductBySlugApiPublic,
  ProductFilterParams,
} from '@/apis/product-apis';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { ProductResponse } from '@/interfaces/product-interfaces';

export async function getAllProductsActionPublic(
  filter?: ProductFilterParams,
): Promise<ActionResponse<ProductResponse[]>> {
  'use cache';
  cacheLife('default');
  cacheTag('products');
  return executeApi(() => getAllProductsApiPublic(filter));
}

export async function getProductBySlugActionPublic(
  slug: string,
): Promise<ActionResponse<ProductResponse | undefined>> {
  'use cache';
  cacheLife('default');
  cacheTag('products', `product:${slug}`);
  return executeApi(() => getProductBySlugApiPublic(slug));
}

export async function getCompareProductsActionPublic(): Promise<ActionResponse<ProductResponse[]>> {
  'use cache';
  cacheLife('default');
  cacheTag('products');
  return executeApi(() => getCompareProductsApiPublic());
}
