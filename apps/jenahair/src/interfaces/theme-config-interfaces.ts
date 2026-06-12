export interface ThemeSocialLinkItem {
  id: string;
  platform: string;
  url: string;
  isActive: boolean;
}

export interface GlobalSettingResponse<TValue> {
  id: string;
  key: string;
  value: TValue;
  updatedAt: string;
}

export type ThemeSocialLinksResponse = GlobalSettingResponse<ThemeSocialLinkItem[]>;

export interface UpdateThemeConfigSocialLinksRequest {
  value: ThemeSocialLinkItem[];
}

export interface MarqueeSlide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export type MarqueeSlidesResponse = GlobalSettingResponse<MarqueeSlide[]>;

export interface UpdateThemeConfigMarqueeRequest {
  value: MarqueeSlide[];
}

export interface CarouselSlide {
  id: string | number;
  imageUrl: string;
  href?: string;
  title?: string;
  subTitle?: string;
}

export type CarouselSlidesResponse = GlobalSettingResponse<CarouselSlide[]>;

export interface UpdateThemeConfigCarouselRequest {
  value: CarouselSlide[];
}
