# ViTinhNet — Vi phạm còn lại (Refactor Audit)

> Đối chiếu `apps/vitinhnet/src` với [CODING-CONVENTION](../../docs/CODING-CONVENTION.md) + `docs/principle/*` + `docs/pattern/*`. Cập nhật: 2026-06-13.
> Đã hoàn tất: tầng dữ liệu mock-first 4 domain (`product`/`tech-news`/`order`/`customer-contact`) + wire page, gộp `ProductResponse`, đổi tên file/interface, `clsx`→`generateClassName`, `import/order`. Chi tiết cách dựng & quy trình ráp API: [§ Tầng dữ liệu](#phụ-lục--tầng-dữ-liệu-mock-first-đã-dựng).
> Dưới đây **chỉ** liệt kê phần còn vi phạm.

---

## Bảng trạng thái

| Convention | Trạng thái | Ghi chú |
| --- | :---: | --- |
| §4 Prettier | ❌ | 36 file sai format (indent 4-space) |
| §3.2 Import order | ⚠️ | 6 warning còn lại (side-effect CSS import + 1 unused var) |
| §2 Folder by layer | ❌ | `stores/` sai chỗ; `components/cart/` lệch scope |
| §8 Zustand (vị trí + selector) | ❌ | sai folder + không selector + seed mock trong store |
| §9 Server-first | ❌ | 9 component `'use client'` không cần |
| [DRY] | ❌ | pad-2-số ×2 kiểu; tự cài sticky-header; 2 kiểu pagination |
| §14 Styling (CSS var) | ❌ | ~24 hex hard-code trong `.tsx` |
| §13 Comments | ❌ | comment narration còn rải rác |
| [Not-Found] | ❌ | thiếu root `app/not-found.tsx`; text tiếng Anh + hex |
| §12 Metadata/SEO | ❌ | `og:image` không tồn tại; trùng metadata; README template |

---

## P0 — Cơ học (tooling)

1. **Prettier 36 file sai format** (indent 4-space, convention `tabWidth: 2`).
   → `npx prettier --write "apps/vitinhnet/src/**/*.{ts,tsx,scss}"`.
2. **6 ESLint warning còn lại** (không chặn lint nhưng nên dọn):
   - side-effect `import '@mantine/carousel/styles.css'` chen giữa nhóm import ở [featured-products.tsx](src/components/landing/sections/featured-products/featured-products.tsx), [viewed-products.tsx](src/components/landing/sections/viewed-products/viewed-products.tsx) → chuyển CSS import xuống cuối nhóm.
   - biến không dùng `manualInputIds`/`setManualInputIds` tại [cart-item-list.tsx:23](src/components/cart/cart-item-list.tsx#L23) → xoá.

## P1 — Cấu trúc thư mục (§2, §8)

3. **`src/stores/cart-store.ts` sai vị trí** → `src/libs/zustand/cart-store.ts` (§8). Cập nhật 4 import (`@/stores/cart-store` ở [gio-hang](src/app/(landing)/gio-hang/page.tsx#L15), [landing-header](src/components/landing/layout/landing-header/landing-header.tsx#L12), [cart-item-list](src/components/cart/cart-item-list.tsx#L17), [order-summary](src/components/cart/order-summary.tsx#L9)). **Đồng thời cập nhật [OBSERVER-PATTERN.md](../../docs/pattern/OBSERVER-PATTERN.md)** (đang trích dẫn sai `src/stores/cart-store.ts`).
4. **`components/cart/` lệch scope** → gom về `components/landing/cart/` cho nhất quán với `components/landing/{layout,sections,primitives,…}` (§4.5).

## P1 — Server/Client boundary (§9, [SERVER-CLIENT-BOUNDARY])

5. **9 component `'use client'` không có state/effect/handler** → bỏ hoặc đẩy client xuống lá:
   | Component | Xử lý |
   | --- | --- |
   | [computer-shop-landing-footer.tsx](src/components/landing/layout/computer-shop-landing-footer/computer-shop-landing-footer.tsx) | chỉ `Link` + text → **bỏ** `'use client'` |
   | [commitments.tsx](src/components/landing/sections/commitments/commitments.tsx) | tĩnh → **bỏ** |
   | [product-card-v2.tsx](src/components/landing/sections/featured-products/product-card-v2.tsx) | `Link` + render → **bỏ** |
   | [featured-products.tsx](src/components/landing/sections/featured-products/featured-products.tsx) · [viewed-products.tsx](src/components/landing/sections/viewed-products/viewed-products.tsx) | wrapper có thể Server; `GridCarousel` con tự là client |
   | [tin-cong-nghe-category-tags.tsx](src/components/landing/tin-cong-nghe/tin-cong-nghe-category-tags/tin-cong-nghe-category-tags.tsx) · [category-controls.tsx](src/app/(landing)/[category]/category-controls.tsx) | chỉ render `CategoryScroll`/`Link` → **bỏ** |
   | [hero-section.tsx](src/components/landing/sections/hero-section/hero-section.tsx) · [tech-news.tsx](src/components/landing/sections/tech-news/tech-news.tsx) | dùng lib client (carousel / `Marquee`) → **tách leaf client**, giữ wrapper Server |

## P1 — State / Observer (§7, §8, [OBSERVER])

6. **Không dùng selector** (re-render trên mọi thay đổi store) — sửa từng field:
   - [gio-hang/page.tsx:18](src/app/(landing)/gio-hang/page.tsx#L18) `const { items } = useCartStore()` → `useCartStore((s) => s.items)`
   - [landing-header.tsx:47](src/components/landing/layout/landing-header/landing-header.tsx#L47) → `useCartStore((s) => s.items.length)`
   - [cart-item-list.tsx:22](src/components/cart/cart-item-list.tsx#L22) (5 slice) → mỗi slice một selector
   - [order-summary.tsx:18](src/components/cart/order-summary.tsx#L18) (5 field) → selector từng field
7. **Store giữ mock + magic number** [cart-store.ts:20,52-53](src/stores/cart-store.ts#L20): `mockItems`, `discount/shippingFee: 600000` → khởi tạo `items: []`; đưa phí/giảm giá ra `constants/` hoặc lấy từ server.

## P1 — DRY ([DRY])

8. **Pad 2 chữ số lặp 2 kiểu**: [news-card.tsx:29,33](src/components/landing/sections/tech-news/news-card.tsx#L29) `padStart(2,'0')` vs [tin-cong-nghe-item.tsx:31,35](src/components/landing/tin-cong-nghe/tin-cong-nghe-grid/tin-cong-nghe-item.tsx#L31) `n < 10 ? '0'+n : n` → một helper `src/utils/format-two-digits.ts`.
9. **Tự cài sticky scroll**: [landing-header.tsx:46,66](src/components/landing/layout/landing-header/landing-header.tsx#L46) (`isScrolled` + `addEventListener('scroll')`) → tái dùng `StickyHeader` của `@vinaup/ui/landing` (§8.4).
10. **2 kiểu pagination khác nhau**: [category-pagination.tsx](src/app/(landing)/[category]/category-pagination.tsx) (server, `searchParams`/URL) vs [tin-cong-nghe-grid.tsx:17](src/components/landing/tin-cong-nghe/tin-cong-nghe-grid/tin-cong-nghe-grid.tsx#L17) (client `useState`, ship cả list) → thống nhất một chiến lược (khuyến nghị server `searchParams`).
11. **ProductCardV2 local** trùng vai trò `ProductCard` của `@vinaup/ui/landing` (§8.2) → cân nhắc tái dùng component shared nếu shape khớp.

## P2 — Styling (§14)

12. **~24 hex hard-code trong `.tsx`**, phần lớn trùng CSS var có sẵn — thay bằng `var(--vinaup-*)`:
   | Hex | Var | File |
   | --- | --- | --- |
   | `#C44C50` | `--vinaup-soft-crimson` | [cart-item-list.tsx:46,69](src/components/cart/cart-item-list.tsx#L46), [order-summary.tsx:73,81](src/components/cart/order-summary.tsx#L73), [tin-cong-nghe-item.tsx:30,34](src/components/landing/tin-cong-nghe/tin-cong-nghe-grid/tin-cong-nghe-item.tsx#L30) |
   | `#0E54C9` | `--vinaup-blue-link` | [category-controls.tsx:32](src/app/(landing)/[category]/category-controls.tsx#L32), [featured-products.tsx:50](src/components/landing/sections/featured-products/featured-products.tsx#L50), [tin-cong-nghe-grid.tsx:52](src/components/landing/tin-cong-nghe/tin-cong-nghe-grid/tin-cong-nghe-grid.tsx#L52), [category-tags.tsx:34](src/components/landing/tin-cong-nghe/tin-cong-nghe-category-tags/tin-cong-nghe-category-tags.tsx#L34) |
   | `#121212` | `--vinaup-black` | [checkout-form.tsx](src/components/cart/checkout-form.tsx) (×5) |
   | `#f5f5f5`, `#6D6E72`, `#051b2c`, `#00E1FF` | (chưa có var / xét bổ sung palette) | footer (×4), cart-item-list, tech-news, not-found |
   Ngoài ra rà soát class outermost đặt `<componentName>Root` (§14).

## P2 — Comments (§13)

13. **Comment narration** (kể WHAT/layout, không answer WHY) → xoá:
   - [category-controls.tsx:5-6](src/app/(landing)/[category]/category-controls.tsx#L5) `// Thêm import icon` / `// Thêm import Link`
   - [cart-item-list.tsx:66,137](src/components/cart/cart-item-list.tsx#L66) `// Đẩy checkbox/icon xuống 1 xíu ở mobile`

## P2 — Not-Found ([NOT-FOUND])

14. **Thiếu root `app/not-found.tsx`** (chỉ có [(landing)/not-found.tsx](src/app/(landing)/not-found.tsx)). Đồng thời file này: `export default async` thừa `async` ([:6](src/app/(landing)/not-found.tsx#L6)), màu `#00E1FF` hard-code ([:11](src/app/(landing)/not-found.tsx#L11)), text tiếng Anh "Page Not Found" ([:15](src/app/(landing)/not-found.tsx#L15)) trong app tiếng Việt → đưa lên root + bỏ `async` + Việt hoá + CSS var.

## P2 — Metadata / SEO (§12)

15. **`og:image` `/images/group1.png` KHÔNG tồn tại** trong `public/`, khai báo ở cả [app/layout.tsx:26](src/app/layout.tsx#L26) lẫn [(landing)/layout.tsx:28](src/app/(landing)/layout.tsx#L28) → trỏ ảnh có thật.
16. **Trùng metadata** root vs landing (title/og/description) → root giữ default + template, trang override phần riêng.
17. **`description` rỗng nghĩa** ([app/layout.tsx:19](src/app/layout.tsx#L19)) + **README còn template `create-next-app`** ([README.md](README.md)) → viết mô tả thật (domain, route, env).

## P2 — Placeholder / lỗi logic

18. **`MaintenanceGuard` = `return null`** (dead code) + `<Suspense>` bọc nó trong [(landing)/layout.tsx](src/app/(landing)/layout.tsx) → xoá cả hai.
19. **Home render `<FeaturedProducts/>` 3×** cùng data ([page.tsx:21-23](src/app/(landing)/page.tsx#L21)) → placeholder, dọn.
20. **`categories` camelCase inline + item trùng** (Laptop HP/Dell/Lenovo ×3) tại [featured-products.tsx:16](src/components/landing/sections/featured-products/featured-products.tsx#L16) → ra `constants/` (CONSTANT_CASE) + bỏ trùng.
21. **`CategoryControls` mọi href giống nhau** `/${categorySlug}` ([category-controls.tsx:22,28](src/app/(landing)/[category]/category-controls.tsx#L22)) → link đúng sub-category.
22. **Nút "xoá" giỏ hàng**: `items.forEach(... removeItem)` khi đang đọc/sửa list ([cart-item-list.tsx:52](src/components/cart/cart-item-list.tsx#L52)) → lọc theo id-set rồi xoá.
23. **Text literal cứng chưa nhận qua props**: [product-detail.tsx:45,47](src/components/landing/sections/product-detail/product-detail.tsx#L45) ("Hàng có sẵn", "HP computer", benefits), [product-description.tsx:16](src/components/landing/sections/product-description/product-description.tsx#L16) ("Tên danh mục A") → đưa vào `ProductResponse` + render từ props (nút "Mua ngay"/"Thêm giỏ" cũng chưa có handler).

## Khi có CMS/backend

24. **`dangerouslySetInnerHTML`** cho nội dung blog ([tin-cong-nghe/[endpoint]/page.tsx:109](src/app/(landing)/tin-cong-nghe/[endpoint]/page.tsx#L109)) + [seo-article.tsx:23](src/components/landing/sections/seo-article/seo-article.tsx#L23) → sanitize (XSS) khi nguồn là CMS thật.

## Nhất quán (nhỏ)

25. `id` của `TechNewsArticleResponse` là `number`, còn `ProductResponse`/`OrderResponse` là `string` → thống nhất khi backend chốt kiểu.

---

## Target tree (phần còn phải di chuyển)

```
apps/vitinhnet/src/
├── app/not-found.tsx                  # ⬅ chuyển từ app/(landing)/not-found.tsx
├── components/landing/cart/           # ⬅ chuyển từ components/cart/
├── libs/zustand/cart-store.ts         # ⬅ chuyển từ src/stores/cart-store.ts
├── constants/                         # ⬅ thêm: phí ship/giảm giá, nav categories
└── utils/format-two-digits.ts         # ⬅ thêm: helper pad 2 chữ số
```

## Doc cần cập nhật

- [OBSERVER-PATTERN.md](../../docs/pattern/OBSERVER-PATTERN.md): sửa đường dẫn ví dụ `src/stores/cart-store.ts` → `src/libs/zustand/cart-store.ts` sau khi move (mục 3).

---

## Phụ lục — Tầng dữ liệu mock-first (đã dựng)

Hợp đồng `Component → Action (ActionResponse<T>) → Api (HttpResponse<T>) → transport` giống jenahair; mock là transport ở tầng thấp nhất.

- **Đã có:** nền tảng `interfaces/_base-interfaces.ts`, `actions/_base.ts` (`executeApi`), `apis/_base.ts` (chờ backend), `apis/_mock.ts` (`mockApiResponse`); 4 domain đủ `interfaces` (`*Response`/`*Request`) + `apis` + `actions`; mock ở `mocks/*.mock.ts` type bằng `*Response[]`. Public read có `'use cache'` + `cacheLife('default')` + `cacheTag(...)`.
- **Ráp API thật = chỉ sửa `apis/`:** tạo `.env` (`API_URL`) → trong từng `*-apis.ts` xoá khối `// --- MOCK ---`, mở `// --- REAL ---` (đã viết sẵn `apiPublic`) → xoá `apis/_mock.ts` + `mocks/`. Action/page/component không đụng.
