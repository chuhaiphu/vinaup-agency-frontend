'use server';

import { cacheLife, cacheTag } from 'next/cache';

import { executeApi } from '@/actions/_base';
import {
  getAllTechNewsApiPublic,
  getTechNewsByEndpointApiPublic,
  TechNewsFilterParams,
} from '@/apis/tech-news-apis';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { TechNewsArticleResponse } from '@/interfaces/tech-news-interfaces';

export async function getAllTechNewsActionPublic(
  filter?: TechNewsFilterParams,
): Promise<ActionResponse<TechNewsArticleResponse[]>> {
  'use cache';
  cacheLife('default');
  cacheTag('tech-news');
  return executeApi(() => getAllTechNewsApiPublic(filter));
}

export async function getTechNewsByEndpointActionPublic(
  endpoint: string,
): Promise<ActionResponse<TechNewsArticleResponse | undefined>> {
  'use cache';
  cacheLife('default');
  cacheTag('tech-news', `tech-news:${endpoint}`);
  return executeApi(() => getTechNewsByEndpointApiPublic(endpoint));
}
