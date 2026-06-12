'use server';

import { cacheLife, cacheTag, updateTag } from 'next/cache';

import { executeApi } from '@/actions/_base';
import {
  getThemeConfigAdminApiPrivate,
  getThemeConfigApiPublic,
  updateThemeConfigSocialLinksApiPrivate,
  getMarqueeApiPublic,
  getMarqueeAdminApiPrivate,
  updateMarqueeApiPrivate,
  getCarouselApiPublic,
  getCarouselAdminApiPrivate,
  updateCarouselApiPrivate,
} from '@/apis/theme-config-apis';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import {
  ThemeSocialLinksResponse,
  UpdateThemeConfigSocialLinksRequest,
  MarqueeSlidesResponse,
  UpdateThemeConfigMarqueeRequest,
  CarouselSlidesResponse,
  UpdateThemeConfigCarouselRequest,
} from '@/interfaces/theme-config-interfaces';

export async function getThemeConfigActionPublic(): Promise<
  ActionResponse<ThemeSocialLinksResponse>
> {
  'use cache';
  cacheLife('default');
  cacheTag('theme-config');
  return executeApi(async () => getThemeConfigApiPublic());
}

export async function updateThemeConfigSocialLinksActionPrivate(
  input: UpdateThemeConfigSocialLinksRequest,
): Promise<ActionResponse<ThemeSocialLinksResponse>> {
  const result = await executeApi(async () => updateThemeConfigSocialLinksApiPrivate(input));

  if (result.success) {
    updateTag('theme-config');
  }

  return result;
}

export async function getThemeConfigAdminActionPrivate(): Promise<
  ActionResponse<ThemeSocialLinksResponse>
> {
  return executeApi(async () => getThemeConfigAdminApiPrivate());
}

export async function getMarqueeActionPublic(): Promise<ActionResponse<MarqueeSlidesResponse>> {
  'use cache';
  cacheLife('default');
  cacheTag('theme-config');
  return executeApi(async () => getMarqueeApiPublic());
}

export async function getMarqueeAdminActionPrivate(): Promise<
  ActionResponse<MarqueeSlidesResponse>
> {
  return executeApi(async () => getMarqueeAdminApiPrivate());
}

export async function updateMarqueeActionPrivate(
  input: UpdateThemeConfigMarqueeRequest,
): Promise<ActionResponse<MarqueeSlidesResponse>> {
  const result = await executeApi(async () => updateMarqueeApiPrivate(input));

  if (result.success) {
    updateTag('theme-config');
  }

  return result;
}

export async function getCarouselActionPublic(): Promise<ActionResponse<CarouselSlidesResponse>> {
  'use cache';
  cacheLife('default');
  cacheTag('theme-config');
  return executeApi(async () => getCarouselApiPublic());
}

export async function getCarouselAdminActionPrivate(): Promise<
  ActionResponse<CarouselSlidesResponse>
> {
  return executeApi(async () => getCarouselAdminApiPrivate());
}

export async function updateCarouselActionPrivate(
  input: UpdateThemeConfigCarouselRequest,
): Promise<ActionResponse<CarouselSlidesResponse>> {
  const result = await executeApi(async () => updateCarouselApiPrivate(input));

  if (result.success) {
    updateTag('theme-config');
  }

  return result;
}
