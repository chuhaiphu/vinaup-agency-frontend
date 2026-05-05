export interface IThemeSocialLinkItem {
  id: string;
  platform: string;
  url: string;
  isActive: boolean;
}

export interface IGlobalSettingResponse<TValue> {
  id: string;
  key: string;
  value: TValue;
  updatedAt: string;
}

export type IThemeSocialLinksResponse = IGlobalSettingResponse<IThemeSocialLinkItem[]>;

export interface IUpdateThemeConfigSocialLinks {
  value: IThemeSocialLinkItem[];
}

export interface IMarqueeSlide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export type IMarqueeSlidesResponse = IGlobalSettingResponse<IMarqueeSlide[]>;

export interface IUpdateThemeConfigMarquee {
  value: IMarqueeSlide[];
}

export interface ICarouselSlide {
  id: string | number;
  imageUrl: string;
  href?: string;
  title?: string;
  subTitle?: string;
}

export type ICarouselSlidesResponse = IGlobalSettingResponse<ICarouselSlide[]>;

export interface IUpdateThemeConfigCarousel {
  value: ICarouselSlide[];
}
