import {
  ThemeSocialLinksResponse,
  UpdateThemeConfigSocialLinksRequest,
  MarqueeSlidesResponse,
  UpdateThemeConfigMarqueeRequest,
  CarouselSlidesResponse,
  UpdateThemeConfigCarouselRequest,
} from '@/interfaces/theme-config-interfaces';

import { apiPrivate, apiPublic } from './_base';

// ==================== PUBLIC ROUTES ====================

export async function getThemeConfigApiPublic() {
  return apiPublic<ThemeSocialLinksResponse>('/theme-config/social-links', {
    method: 'GET',
  });
}

export async function getMarqueeApiPublic() {
  return apiPublic<MarqueeSlidesResponse>('/theme-config/marquee', {
    method: 'GET',
  });
}

export async function getCarouselApiPublic() {
  return apiPublic<CarouselSlidesResponse>('/theme-config/carousel', {
    method: 'GET',
  });
}

// ==================== ADMIN ROUTES ====================

export async function getThemeConfigAdminApiPrivate() {
  return apiPrivate<ThemeSocialLinksResponse>('/theme-config/admin/social-links', {
    method: 'GET',
  });
}

export async function updateThemeConfigSocialLinksApiPrivate(
  data: UpdateThemeConfigSocialLinksRequest,
) {
  return apiPrivate<ThemeSocialLinksResponse>('/theme-config/admin/social-links', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function getMarqueeAdminApiPrivate() {
  return apiPrivate<MarqueeSlidesResponse>('/theme-config/admin/marquee', {
    method: 'GET',
  });
}

export async function updateMarqueeApiPrivate(data: UpdateThemeConfigMarqueeRequest) {
  return apiPrivate<MarqueeSlidesResponse>('/theme-config/admin/marquee', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function getCarouselAdminApiPrivate() {
  return apiPrivate<CarouselSlidesResponse>('/theme-config/admin/carousel', {
    method: 'GET',
  });
}

export async function updateCarouselApiPrivate(data: UpdateThemeConfigCarouselRequest) {
  return apiPrivate<CarouselSlidesResponse>('/theme-config/admin/carousel', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
