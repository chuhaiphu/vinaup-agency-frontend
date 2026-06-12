import slugify from 'slugify';

import { getBlogByEndpointActionPublic } from '@/actions/blog-actions';
import { getBlogCategoryByEndpointActionPublic } from '@/actions/blog-category-actions';
import { getDiaryByEndpointActionPublic } from '@/actions/diary-actions';
import { getDiaryCategoryByEndpointActionPublic } from '@/actions/diary-category-actions';
import { getPageByEndpointActionPublic } from '@/actions/page-actions';
import { ActionResponse } from '@/interfaces/_base-interfaces';

export type EndpointModel = 'blog' | 'blog-category' | 'diary' | 'diary-category' | 'page';

type EndpointChecker = (endpoint: string) => Promise<ActionResponse<{ id: string } | null>>;

const checkersByModel: Record<EndpointModel, EndpointChecker[]> = {
  blog: [getBlogByEndpointActionPublic, getBlogCategoryByEndpointActionPublic],
  'blog-category': [getBlogByEndpointActionPublic, getBlogCategoryByEndpointActionPublic],
  diary: [getDiaryByEndpointActionPublic, getDiaryCategoryByEndpointActionPublic],
  'diary-category': [getDiaryByEndpointActionPublic, getDiaryCategoryByEndpointActionPublic],
  page: [getPageByEndpointActionPublic],
};

export const generateUniqueEndpoint = async (
  title: string,
  model: EndpointModel,
  currentModelId?: string,
): Promise<string> => {
  let slugifiedTitle = '';
  if (!title || title.trim().length === 0) {
    slugifiedTitle = 'no-title';
  } else {
    slugifiedTitle = title;
  }
  const baseEndpoint = slugify(slugifiedTitle, {
    replacement: '-',
    remove: undefined,
    lower: true,
    strict: false,
    locale: 'vi',
    trim: true,
  });

  const checkers = checkersByModel[model];
  let endpoint = baseEndpoint;
  let isUnique = false;

  while (!isUnique) {
    const results = await Promise.all(checkers.map((fn) => fn(endpoint)));
    const hasConflict = results.some(
      (res) => res.success && res.data && res.data.id !== currentModelId,
    );

    if (hasConflict) {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      endpoint = `${baseEndpoint}-${randomSuffix}`;
    } else {
      isUnique = true;
    }
  }

  return endpoint;
};
