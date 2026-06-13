import { TechNewsCategory } from '@/interfaces/tech-news-interfaces';

/**
 * Fixed tech-news taxonomy used by the category tags + the `[endpoint]` route to tell a
 * category page from an article page. Lives in `constants/` because it is navigation chrome,
 * not server entity data. → CODING-CONVENTION §1.4 / §2
 */
export const TECH_NEWS_CATEGORIES: TechNewsCategory[] = [
  { id: 1, title: 'Tất cả', endpoint: '' },
  { id: 2, title: 'Tin tức chung', endpoint: 'tin-tuc-chung' },
  { id: 3, title: 'Đánh giá sản phẩm', endpoint: 'danh-gia-san-pham' },
  { id: 4, title: 'Hướng dẫn thủ thuật', endpoint: 'huong-dan-thu-thuat' },
];
