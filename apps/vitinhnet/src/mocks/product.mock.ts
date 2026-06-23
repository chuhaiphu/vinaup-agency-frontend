import { CATEGORY_SLUGS } from '@/constants/category-constants';
import { ProductResponse } from '@/interfaces/product-interfaces';

const PRODUCT_IMAGE = '/1751241600_Dell5490(1).jpg';

// 90 grid products spread across the 6 categories (≈15 each) so `[category]` filtering
// returns a non-trivial, paginatable set. Shape mirrors the future API exactly:
// prices are `number`, formatting happens at the display tier (generateFormattedPrice).
export const MOCK_PRODUCTS: ProductResponse[] = Array.from({ length: 1200 }, (_, index) => {
  const category = CATEGORY_SLUGS[index % CATEGORY_SLUGS.length];
  return {
    id: String(index + 1),
    slug: `dell-latitude-5420-${index + 1}`,
    title: 'Dell Latitude 5420 i5 1145G7 8G 256G 14" A1',
    category,
    imageUrl: PRODUCT_IMAGE,
    galleryImageUrls: [PRODUCT_IMAGE, PRODUCT_IMAGE, PRODUCT_IMAGE, PRODUCT_IMAGE, PRODUCT_IMAGE],
    price: 22800000,
    originalPrice: 24800000,
    discountPercent: 16,
    warranty: 'Bảo hành 12 tháng',
    isTrending: index % 5 === 0,
  };
});

// Curated set with hardware specs for the comparison page (`trang-so-sanh`).
export const MOCK_COMPARE_PRODUCTS: ProductResponse[] = [
  {
    id: 'cmp-1',
    slug: 'hp-elitedesk-800-g5-sff-i3-9100',
    title: 'Máy bộ HP EliteDesk 800 G5 SFF | Core i3-9100',
    category: 'may-tinh-dong-bo',
    imageUrl: PRODUCT_IMAGE,
    galleryImageUrls: [PRODUCT_IMAGE],
    price: 5900000,
    originalPrice: 7500000,
    discountPercent: 21,
    warranty: 'Bảo hành 12 tháng',
    isTrending: false,
    specs: {
      cpu: 'Intel Core i3-9100',
      ram: '8GB',
      storage: 'SSD 512GB',
      gpu: 'Intel UHD 630',
      power: '~180W',
      dimensions: 'SFF Nhỏ gọn',
    },
  },
  {
    id: 'cmp-2',
    slug: 'dell-optiplex-3070-sff-i5-9400',
    title: 'Máy bộ Dell OptiPlex 3070 SFF | Core i5-9400',
    category: 'may-tinh-dong-bo',
    imageUrl: PRODUCT_IMAGE,
    galleryImageUrls: [PRODUCT_IMAGE],
    price: 6500000,
    originalPrice: 8000000,
    discountPercent: 19,
    warranty: 'Bảo hành 12 tháng',
    isTrending: false,
    specs: {
      cpu: 'Intel Core i5-9400',
      ram: '8GB',
      storage: 'SSD 256GB',
      gpu: 'Intel UHD 630',
      power: '~200W',
      dimensions: 'SFF Nhỏ gọn',
    },
  },
  {
    id: 'cmp-3',
    slug: 'lenovo-thinkcentre-m720s-i3-8100',
    title: 'Máy bộ Lenovo ThinkCentre M720s | Core i3-8100',
    category: 'may-tinh-dong-bo',
    imageUrl: PRODUCT_IMAGE,
    galleryImageUrls: [PRODUCT_IMAGE],
    price: 5200000,
    originalPrice: 6800000,
    discountPercent: 24,
    warranty: 'Bảo hành 12 tháng',
    isTrending: false,
    specs: {
      cpu: 'Intel Core i3-8100',
      ram: '8GB',
      storage: 'SSD 256GB',
      gpu: 'Intel UHD 630',
      power: '~180W',
      dimensions: 'SFF Nhỏ gọn',
    },
  },
  {
    id: 'cmp-4',
    slug: 'hp-prodesk-400-g6-sff-i5-9500',
    title: 'Máy bộ HP ProDesk 400 G6 SFF | Core i5-9500',
    category: 'may-tinh-dong-bo',
    imageUrl: PRODUCT_IMAGE,
    galleryImageUrls: [PRODUCT_IMAGE],
    price: 7100000,
    originalPrice: 8900000,
    discountPercent: 20,
    warranty: 'Bảo hành 12 tháng',
    isTrending: false,
    specs: {
      cpu: 'Intel Core i5-9500',
      ram: '16GB',
      storage: 'SSD 512GB',
      gpu: 'Intel UHD 630',
      power: '~180W',
      dimensions: 'SFF Nhỏ gọn',
    },
  },
];
