import type { ResolvingMetadata } from 'next';

import { getAppConfigActionPublic } from '@/actions/app-config-actions';
import {
  getAllPagesPublicActionPublic,
  getPageByEndpointActionPublic,
} from '@/actions/page-actions';
import DynamicEndpointPageContent from '@/components/landing/page/dynamic-endpoint-page-content/dynamic-endpoint-page-content';

import notFound from '../not-found';

const PAGE_ENDPOINT_PLACEHOLDER = '__placeholder__';

export async function generateStaticParams() {
  const pagesResponse = await getAllPagesPublicActionPublic();

  if (!pagesResponse.success || !pagesResponse.data) {
    return [{ endpoint: PAGE_ENDPOINT_PLACEHOLDER }];
  }

  const pagesParams = pagesResponse.data.map((page) => ({
    endpoint: page.endpoint,
  }));

  return pagesParams.length > 0 ? pagesParams : [{ endpoint: PAGE_ENDPOINT_PLACEHOLDER }];
}

export async function generateMetadata(
  { params }: { params: Promise<{ endpoint: string }> },
  parent: ResolvingMetadata,
) {
  const { endpoint } = await params;
  const pageResponse = await getPageByEndpointActionPublic(endpoint);

  if (!pageResponse.success || !pageResponse.data) {
    return {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  const page = pageResponse.data;
  const resolvedParent = await parent;
  const description = page.content
    ? page.content.replace(/<[^>]*>/g, '').substring(0, 160)
    : 'Khám phá thông tin và dịch vụ của Jena Hair';

  return {
    title: page.title,
    description,
    openGraph: {
      ...resolvedParent.openGraph,
      url: `https://jenahair.com/${endpoint}`,
      title: page.title,
      description,
    },
  };
}

export default async function DynamicEndpointPage({
  params,
}: {
  params: Promise<{ endpoint: string }>;
}) {
  'use cache';
  const { endpoint } = await params;

  if (endpoint === PAGE_ENDPOINT_PLACEHOLDER) {
    notFound();
  }

  const [pageResponse, allPagesResponse, appConfigResponse] = await Promise.all([
    getPageByEndpointActionPublic(endpoint),
    getAllPagesPublicActionPublic(),
    getAppConfigActionPublic(),
  ]);

  if (!pageResponse.success || !pageResponse.data) {
    notFound();
  }

  const allPages = allPagesResponse.success ? (allPagesResponse.data ?? []) : [];
  const page = pageResponse.data;
  const appConfig = appConfigResponse.success ? appConfigResponse.data : undefined;

  return <DynamicEndpointPageContent page={page} allPages={allPages} appConfig={appConfig} />;
}
