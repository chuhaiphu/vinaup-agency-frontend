export interface ProductSpecs {
  cpu: string;
  ram: string;
  storage: string;
  gpu: string;
  power: string;
  dimensions: string;
}

export interface ProductResponse {
  id: string;
  slug: string;
  title: string;
  category: string;
  imageUrl: string;
  galleryImageUrls: string[];
  price: number;
  originalPrice: number;
  discountPercent: number;
  warranty: string;
  isTrending: boolean;
  specs?: ProductSpecs;
}
