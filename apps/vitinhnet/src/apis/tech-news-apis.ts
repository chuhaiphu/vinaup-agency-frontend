import { TechNewsArticleResponse } from '@/interfaces/tech-news-interfaces';
import { MOCK_TECH_NEWS_ARTICLES } from '@/mocks/tech-news.mock';

import { mockApiResponse } from './_mock';
// When the backend is ready, swap the mock seam for the real transport:
// import { generateFilterQueryString } from '@vinaup/utils';
// import { apiPublic } from './_base';

export interface TechNewsFilterParams {
  categoryEndpoint?: string;
}

export async function getAllTechNewsApiPublic(filter?: TechNewsFilterParams) {
  // --- MOCK (current) ---
  const data = filter?.categoryEndpoint
    ? MOCK_TECH_NEWS_ARTICLES.filter((article) => article.categoryEndpoint === filter.categoryEndpoint)
    : MOCK_TECH_NEWS_ARTICLES;
  return mockApiResponse<TechNewsArticleResponse[]>(data);

  // --- REAL (when API is live) ---
  // const queryString = generateFilterQueryString({ category: filter?.categoryEndpoint });
  // return apiPublic<TechNewsArticleResponse[]>(`/tech-news${queryString}`, { method: 'GET' });
}

export async function getTechNewsByEndpointApiPublic(endpoint: string) {
  // --- MOCK (current) ---
  const article = MOCK_TECH_NEWS_ARTICLES.find((item) => item.endpoint === endpoint);
  return mockApiResponse<TechNewsArticleResponse | undefined>(article);

  // --- REAL (when API is live) ---
  // return apiPublic<TechNewsArticleResponse>(`/tech-news/${endpoint}`, { method: 'GET' });
}
