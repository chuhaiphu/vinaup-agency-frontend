/**
 * Slug → display-name map for the landing product categories.
 * Lives in `constants/` (not inline in a page) so both the `[category]` route and any
 * future nav/breadcrumb read a single source of truth. → CODING-CONVENTION §1.4 / §2
 */
export const CATEGORY_MAP: Record<string, string> = {
  'laptop-nhap-khau': 'Laptop Nhập Khẩu',
  'may-tinh-dong-bo': 'Máy Tính Đồng Bộ',
  'man-hinh': 'Màn Hình Máy Tính',
  'may-in': 'Máy In',
  'linh-kien': 'Linh Kiện Máy Tính',
  pcnet: 'PCNet Máy Tính Net',
};

export const CATEGORY_SLUGS = Object.keys(CATEGORY_MAP);
