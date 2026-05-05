import {
  IThemeSocialLinksResponse,
  IUpdateThemeConfigSocialLinks,
  IMarqueeSlidesResponse,
  IUpdateThemeConfigMarquee,
  ICarouselSlidesResponse,
  IUpdateThemeConfigCarousel,
} from '@/interfaces/theme-config-interface';
import { apiPrivate, apiPublic } from './_base';

// ==================== PUBLIC ROUTES ====================

export async function getThemeConfigApiPublic() {
  return apiPublic<IThemeSocialLinksResponse>('/theme-config/social-links', {
    method: 'GET',
  });
}

export async function getMarqueeApiPublic() {
  return apiPublic<IMarqueeSlidesResponse>('/theme-config/marquee', {
    method: 'GET',
  });
}

export async function getCarouselApiPublic() {
  return apiPublic<ICarouselSlidesResponse>('/theme-config/carousel', {
    method: 'GET',
  });
}

// ==================== ADMIN ROUTES ====================

export async function getThemeConfigAdminApiPrivate() {
  return apiPrivate<IThemeSocialLinksResponse>('/theme-config/admin/social-links', {
    method: 'GET',
  });
}

export async function updateThemeConfigSocialLinksApiPrivate(
  data: IUpdateThemeConfigSocialLinks
) {
  return apiPrivate<IThemeSocialLinksResponse>('/theme-config/admin/social-links', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function getMarqueeAdminApiPrivate() {
  return apiPrivate<IMarqueeSlidesResponse>('/theme-config/admin/marquee', {
    method: 'GET',
  });
}

export async function updateMarqueeApiPrivate(data: IUpdateThemeConfigMarquee) {
  return apiPrivate<IMarqueeSlidesResponse>('/theme-config/admin/marquee', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function getCarouselAdminApiPrivate() {
  return apiPrivate<ICarouselSlidesResponse>('/theme-config/admin/carousel', {
    method: 'GET',
  });
}

export async function updateCarouselApiPrivate(data: IUpdateThemeConfigCarousel) {
  return apiPrivate<ICarouselSlidesResponse>('/theme-config/admin/carousel', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
