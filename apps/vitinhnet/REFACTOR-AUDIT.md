# ViTinhNet — Báo cáo Audit & Kế hoạch Refactor toàn diện

> Đối chiếu toàn bộ source `apps/vitinhnet` với `docs/CODING-CONVENTION.md`, `docs/principle/*`, `docs/pattern/*` và 2 app anh em (`jenahair`, `the-local-travel`) + `@vinaup/ui`, `@vinaup/utils`.
> Ngày: 2026-06-13 · Phạm vi: toàn bộ `apps/vitinhnet/src` (40 file nguồn, không tính `.next/`).

---

## 0. Tóm tắt điều hành (Executive Summary)

ViTinhNet hiện là một **prototype tĩnh 100% mock**: không có một dòng `fetch`/Server Action/API nào, mọi dữ liệu (sản phẩm, blog, giỏ hàng, banner) đều hard-code ngay trong component hoặc trong store. Bản thân việc dùng mock ở giai đoạn prototype **không sai** (xem `the-local-travel` trong [KISS](../../docs/principle/KISS.md)) — nhưng cách tổ chức hiện tại vi phạm hàng loạt quy ước **cơ học (tooling-enforced)** và **kiến trúc (review-enforced)**:

| Nhóm | Mức độ | Số lượng bằng chứng |
| --- | --- | --- |
| ESLint **error** (chặn lint gate) | 🔴 P0 | **4 lỗi** (3 filename + 1 interface `I`-prefix) |
| ESLint **warning** (`import/order`) | 🟠 P0 | **137 warning** (130 auto-fix được) |
| Prettier sai format | 🟠 P0 | **38/40 file** (toàn bộ codebase, phần lớn indent 4-space thay vì 2) |
| Phantom dependency (`clsx` không khai báo) | 🟠 P0 | 2 file |
| Sai vị trí/tên file & folder (§1, §2) | 🟠 P1 | store, interfaces, cart folder, 3 file cart |
| Thiếu tầng dữ liệu (SoC/Repository) | 🟠 P1 | toàn app |
| `interface`/mock định nghĩa rải rác trong component | 🟠 P1 | ≥6 chỗ |
| Lạm dụng `'use client'` (vi phạm Server-first) | 🟠 P1 | ≥6 component |
| Zustand không dùng selector (Observer §Rule 4) | 🟠 P1 | **mọi** chỗ đọc store |
| DRY: `.toLocaleString` / `Product` / product-card trùng lặp | 🟠 P1 | nhiều |
| Hard-code màu hex thay vì CSS var (§14) | 🟡 P2 | **29 hex** trong tsx |
| Comment "kể chuyện" tiếng Việt (§13) | 🟡 P2 | nhiều |
| Lỗi/placeholder logic (home render 3× `FeaturedProducts`, og:image thiếu, slug bị bỏ qua…) | 🟡 P2 | nhiều |

**Khuyến nghị tổng:** Làm theo 3 đợt — **P0 (cơ học, 1–2 giờ, gần như tự động)** → **P1 (tái cấu trúc tầng & state)** → **P2 (chất lượng & SEO)**. Chi tiết ở [§14 Kế hoạch hành động](#14-kế-hoạch-hành-động-theo-thứ-tự-ưu-tiên).

---

## 1. Phương pháp & nguồn đối chiếu

- **Convention (source of truth):** [docs/CODING-CONVENTION.md](../../docs/CODING-CONVENTION.md)
- **Principle:** [SOC](../../docs/principle/SOC.md), [DRY](../../docs/principle/DRY.md), [KISS](../../docs/principle/KISS.md)
- **Pattern:** [REPOSITORY](../../docs/pattern/REPOSITORY-PATTERN.md), [CACHING](../../docs/pattern/CACHING-PATTERN.md), [SERVER-CLIENT-BOUNDARY](../../docs/pattern/SERVER-CLIENT-BOUNDARY.md), [DATA-STREAMING](../../docs/pattern/DATA-STREAMING-PATTERN.md), [PROVIDER](../../docs/pattern/PROVIDER-PATTERN.md), [OBSERVER](../../docs/pattern/OBSERVER-PATTERN.md), [COMPOSITE](../../docs/pattern/COMPOSITE-PATTERN.md), [DATE-TIME](../../docs/pattern/DATE-TIME-PATTERN.md), [NOT-FOUND](../../docs/pattern/NOT-FOUND-PATTERN.md)
- **Tooling đã chạy thực tế:** `prettier --check`, `eslint`, đối chiếu `@vinaup/utils` exports và `package.json`.

---

## 2. Bảng điểm tuân thủ (Compliance Scorecard)

| Doc / Quy ước | Trạng thái | Ghi chú nhanh |
| --- | :---: | --- |
| §1.1 File naming (kebab-case) | ❌ | 3 file cart PascalCase (ESLint error) |
| §1.2 Symbol naming (no `I`-prefix) | ❌ | `ITinCongNghe` (ESLint error) |
| §1.2 Const casing (`CONSTANT_CASE`) | ⚠️ | lẫn lộn `categories`/`slides` vs `NAV_LINKS`/`MOCK_*` |
| §2 Folder by layer/domain | ❌ | thiếu `apis/actions/interfaces/constants/utils`; `stores/` sai chỗ; `cart/` lệch scope |
| §3.1 Path alias (không deep-relative) | ❌ | `../../../../mocks/...` ở 3 file tin-cong-nghe |
| §3.2 Import order | ⚠️ | 137 warning |
| §4 Prettier | ❌ | 38/40 file |
| §5–6 Repository / Server Actions | ⛔ N/A→cần | chưa có tầng nào (app mock) |
| §7 Provider | ✅ | không cần (không có auth) — đúng KISS |
| §8 Zustand (vị trí + selector) | ❌ | sai folder + không dùng selector |
| §9 Server-first component | ❌ | lạm dụng `'use client'` |
| §10 Form/Modal (Mantine) | ✅ | `gio-hang` dùng `@mantine/form` đúng |
| §13 Comments (answer WHY) | ❌ | nhiều comment kể chuyện layout |
| §14 Styling (CSS var, no hex) | ❌ | 29 hex hard-code |
| [Pattern] SoC layering | ❌ | dữ liệu + render + type trộn trong 1 file |
| [Pattern] DRY | ❌ | `Product`×3, `.toLocaleString`×7, product-card×2 + trùng `@vinaup/ui` |
| [Pattern] Server/Client boundary | ❌ | xem §6 |
| [Pattern] Not-Found | ⚠️ | chỉ `tin-cong-nghe` dùng `notFound()`; thiếu root `app/not-found.tsx` |
| [Pattern] Date-Time | ⛔ N/A | blog/sản phẩm chưa có trường thời gian |

Chú thích: ✅ đạt · ⚠️ một phần · ❌ vi phạm · ⛔ chưa áp dụng (cần bổ sung khi có backend).

---

## 3. 🔴 P0 — Vi phạm cơ học (tooling chặn, sửa gần như tự động)

### 3.1 ESLint ERROR (4) — **phải sửa, đang chặn `npm run lint`**

| File | Lỗi | Rule | Sửa |
| --- | --- | --- | --- |
| [components/cart/CartItemList.tsx](src/components/cart/CartItemList.tsx) | filename PascalCase | `check-file/filename-naming-convention` | đổi tên → `cart-item-list.tsx` |
| [components/cart/CheckoutForm.tsx](src/components/cart/CheckoutForm.tsx) | filename PascalCase | nt | → `checkout-form.tsx` |
| [components/cart/OrderSummary.tsx](src/components/cart/OrderSummary.tsx) | filename PascalCase | nt | → `order-summary.tsx` |
| [mocks/tech-news-data.mock.ts:1](src/mocks/tech-news-data.mock.ts#L1) | `interface ITinCongNghe` cấm `^I[A-Z]` | `@typescript-eslint/naming-convention` | đổi tên `ITinCongNghe` → `TechNewsArticle` (và chuyển vào `interfaces/`, xem §5) |

> Cùng với 3 file `.tsx`, các file `*.module.scss` đi kèm (`CartItemList.module.scss`, `CheckoutForm.module.scss`, `OrderSummary.module.scss`) cũng PascalCase — không bị ESLint bắt (rule chỉ quét `.ts/.tsx`) nhưng vẫn vi phạm §1.1, phải đổi kèm theo.

### 3.2 Prettier — 38/40 file sai format

Nguyên nhân chính: **thụt lề 4-space** (convention `tabWidth: 2`), thừa khoảng trắng cuối dòng. Đây là toàn bộ codebase trừ 2 file.

```bash
# Fix một phát:
npx prettier --write "apps/vitinhnet/src/**/*.{ts,tsx,scss}"
```

### 3.3 ESLint `import/order` — 137 warning (130 auto-fix)

Hai mẫu lặp đi lặp lại: (a) thiếu dòng trống giữa các nhóm import; (b) external/`@vinaup/*` xếp sau relative. Sửa:

```bash
npx eslint "apps/vitinhnet/src/**/*.{ts,tsx}" --fix
```

### 3.4 `clsx` — phantom dependency

[seo-article.tsx:7](src/components/landing/sections/seo-article/seo-article.tsx#L7) và [category-scroll.tsx:9](src/components/landing/primitives/category-scroll/category-scroll.tsx#L9) `import clsx from 'clsx'` nhưng **`clsx` không có trong [package.json](package.json)** (chỉ chạy nhờ hoisting của monorepo — sẽ vỡ khi cài lẻ). Codebase đã có sẵn `generateClassName` trong `@vinaup/utils` ([packages/utils/src/generators/generate-class-name.ts](../../packages/utils/src/generators/generate-class-name.ts)).

→ **Thay `clsx(...)` bằng `generateClassName(...)` từ `@vinaup/utils`** (đúng DRY §4 + COMPOSITE Rule 2). Nếu muốn giữ `clsx` thì phải thêm vào `dependencies`.

---

## 4. 🟠 P1 — Naming & cấu trúc thư mục (§1, §2, §3.1)

### 4.1 Zustand store sai vị trí (§2, §8 + OBSERVER)

[stores/cart-store.ts](src/stores/cart-store.ts) đang ở `src/stores/` — convention §8 và §2 quy định **`src/libs/zustand/<name>-store.ts`** (xem `jenahair/src/libs/zustand/admin-layout-sider-store.ts`).

→ Di chuyển: `src/stores/cart-store.ts` → **`src/libs/zustand/cart-store.ts`**; cập nhật mọi import `@/stores/cart-store` → `@/libs/zustand/cart-store`.

> ⚠️ **Doc drift cần xử lý:** [OBSERVER-PATTERN.md](../../docs/pattern/OBSERVER-PATTERN.md) đang **trích dẫn sai** đường dẫn `apps/vitinhnet/src/stores/cart-store.ts` (3 chỗ). Convention §8 mới là source-of-truth (`src/libs/zustand/`). Sau khi move file, **phải cập nhật lại OBSERVER-PATTERN.md** cho khớp (theo CLAUDE.md → Post-Implementation Docs Update).

### 4.2 Interface file thiếu suffix + sai nội dung (§1.1)

- [interfaces/cart.ts](src/interfaces/cart.ts) → phải là **`interfaces/cart-interfaces.ts`** (role suffix bắt buộc, số nhiều — xem `jenahair/src/interfaces/*-interfaces.ts`).

### 4.3 `interface` định nghĩa lẫn trong component/mock (SoC + DRY + §2)

Type phải sống ở `src/interfaces/<domain>-interfaces.ts`, không nằm trong component/mock:

| Type | Đang ở | Phải về |
| --- | --- | --- |
| `Product` (shape A) | [product-card.tsx:5](src/components/landing/sections/featured-products/product-card.tsx#L5) | `interfaces/product-interfaces.ts` |
| `Product` (shape B – khác field!) | [product-card-v2.tsx:10](src/components/landing/sections/featured-products/product-card-v2.tsx#L10) | gộp về 1 `Product` |
| `NewsItem` | [news-card.tsx:5](src/components/landing/sections/tech-news/news-card.tsx#L5) | `interfaces/tech-news-interfaces.ts` |
| `ITinCongNghe` | [tech-news-data.mock.ts:1](src/mocks/tech-news-data.mock.ts#L1) | đổi tên + về `interfaces/tech-news-interfaces.ts` |
| `CategoryScrollItem/Props` | [category-scroll.tsx:11](src/components/landing/primitives/category-scroll/category-scroll.tsx#L11) | ok giữ tại component (props nội bộ) — chấp nhận được |
| `ProductGalleryProps` | [product-gallery.tsx:12](src/components/landing/primitives/product-gallery/product-gallery.tsx#L12) | ok giữ (props nội bộ) |

> Có **hai `interface Product` khác shape, cùng tên, cùng export** (một có `warranty/isTrending`, một có `discountPercent/slug`) — đây là DRY + naming nghiêm trọng: phải hợp nhất thành **một** `Product` chuẩn.

### 4.4 Deep-relative import (§3.1) — vi phạm

3 file `tin-cong-nghe` import `'../../../../mocks/tech-news-data.mock'`:
- [tin-cong-nghe-grid.tsx:8](src/components/landing/tin-cong-nghe/tin-cong-nghe-grid/tin-cong-nghe-grid.tsx#L8)
- [tin-cong-nghe-item.tsx:5](src/components/landing/tin-cong-nghe/tin-cong-nghe-grid/tin-cong-nghe-item.tsx#L5)
- [tin-cong-nghe-category-tags.tsx:4](src/components/landing/tin-cong-nghe/tin-cong-nghe-category-tags/tin-cong-nghe-category-tags.tsx#L4)

→ Dùng alias `@/interfaces/...` (cho type) và `@/mocks/...` (cho data).

### 4.5 `cart/` lệch scope folder (§2)

[components/cart/](src/components/cart/) nằm ngoài `components/landing/`. Mọi component khác đều theo `components/landing/{layout,sections,primitives,...}`. Cart là một feature của landing.

→ Gom về **`components/landing/cart/`** cho nhất quán scope (hoặc nếu coi `cart` là scope riêng theo §2 "split by scope `<feature>`" thì phải nhất quán toàn app — khuyến nghị đưa vào `landing/cart/`).

### 4.6 Casing hằng số không nhất quán (§1.2)

`CONSTANT_CASE` cho data tĩnh tái sử dụng; hiện lẫn lộn:

| camelCase (nên là CONSTANT_CASE) | Vị trí |
| --- | --- |
| `categories`, `defaultProducts` | [featured-products.tsx:12,24](src/components/landing/sections/featured-products/featured-products.tsx#L12) |
| `defaultNews` | [tech-news.tsx:11](src/components/landing/sections/tech-news/tech-news.tsx#L11) |
| `defaultProducts` | [viewed-products.tsx:9](src/components/landing/sections/viewed-products/viewed-products.tsx#L9) |
| `slides` | [hero-section.tsx:8](src/components/landing/sections/hero-section/hero-section.tsx#L8) |
| `tags` | [computer-shop-landing-footer.tsx:8](src/components/landing/layout/computer-shop-landing-footer/computer-shop-landing-footer.tsx#L8) |
| `thumbnails` | [product-detail.tsx:14](src/components/landing/sections/product-detail/product-detail.tsx#L14) |

(So với `NAV_LINKS`, `MOCK_PRODUCTS`, `CATEGORY_MAP`, `MOCK_BLOGS` đã đúng) → Thực ra **tất cả các mock này nên rời khỏi component vào `src/mocks/`** (xem §5.2), lúc đó đặt tên `CONSTANT_CASE`.

---

## 5. 🟠 P1 — Tầng dữ liệu & SoC (Repository / SoC / KISS)

### 5.1 Thiếu toàn bộ tầng dữ liệu

App **không có** `apis/`, `actions/`, `constants/`, `utils/`, `providers/`. Hiện toàn bộ là mock — theo [KISS](../../docs/principle/KISS.md) "đừng thêm tầng app chưa cần", **chấp nhận được ở giai đoạn prototype**. Nhưng ViTinhNet rõ ràng là e-commerce (giỏ hàng, checkout, sản phẩm, blog) sẽ cần backend.

**Khuyến nghị (bổ sung khi tích hợp API thật — không làm vội nếu chưa có backend):**
- Tạo `src/apis/_base.ts` (`apiPublic`/`apiPrivate`) + `product-apis.ts`, `tech-news-apis.ts`, `order-apis.ts`, `customer-contact-apis.ts` — theo [REPOSITORY-PATTERN](../../docs/pattern/REPOSITORY-PATTERN.md).
- Tạo `src/actions/_base.ts` (`executeApi`) + `*-actions.ts` tương ứng, đặt `'use cache'` + `cacheTag`/`cacheLife` cho read công khai (sản phẩm, blog) theo [CACHING-PATTERN](../../docs/pattern/CACHING-PATTERN.md).
- Đặt tên theo §1.3: `getAllProductsActionPublic`, `getProductBySlugActionPublic`, `createOrderActionPublic`, `createCustomerContactActionPublic`…

> Có thể copy nguyên `_base.ts`/`_base-interfaces.ts` từ `jenahair` để khởi tạo nhanh.

### 5.2 Mock data nhúng trong component thay vì `src/mocks/`

Hiện chỉ `tech-news-data.mock.ts` và `seo-article.mock.ts` ở đúng chỗ. Còn lại nhúng inline:

| Mock | Vị trí | Đưa về |
| --- | --- | --- |
| `MOCK_PRODUCTS` (90 item) + `CATEGORY_MAP` | [[category]/page.tsx:11,20](src/app/(landing)/[category]/page.tsx#L11) | `mocks/product.mock.ts` + `constants/category-constants.ts` |
| `defaultProducts`, `categories` | [featured-products.tsx](src/components/landing/sections/featured-products/featured-products.tsx#L12) | `mocks/product.mock.ts` |
| `defaultProducts` | [viewed-products.tsx](src/components/landing/sections/viewed-products/viewed-products.tsx#L9) | `mocks/product.mock.ts` |
| `defaultNews` | [tech-news.tsx:11](src/components/landing/sections/tech-news/tech-news.tsx#L11) | `mocks/tech-news-data.mock.ts` |
| `slides` | [hero-section.tsx:8](src/components/landing/sections/hero-section/hero-section.tsx#L8) | `mocks/hero.mock.ts` |
| `tags` | [computer-shop-landing-footer.tsx:8](src/components/landing/layout/computer-shop-landing-footer/computer-shop-landing-footer.tsx#L8) | `mocks/footer.mock.ts` hoặc `constants/` |
| `MOCK_PRODUCTS` (compare) | [product-compare.tsx:8](src/app/(landing)/trang-so-sanh/product-compare.tsx#L8) | `mocks/product.mock.ts` |
| `thumbnails`, mọi text/giá literal | [product-detail.tsx](src/components/landing/sections/product-detail/product-detail.tsx), [product-description.tsx](src/components/landing/sections/product-description/product-description.tsx) | `mocks/product.mock.ts` + nhận qua props |

**Mục tiêu SoC:** component **render**, dữ liệu đến từ **props** (đọc trên server) — không component lá nào tự "fetch" hay tự chứa data ([SERVER-CLIENT-BOUNDARY Rule 3](../../docs/pattern/SERVER-CLIENT-BOUNDARY.md)).

### 5.3 Mock seed nằm trong store

[cart-store.ts:19-47](src/stores/cart-store.ts#L19) chứa `mockItems` (+ `discount: 600000`, `shippingFee: 600000` hard-code). Store là Observer cho **UI/ephemeral state** — không phải nơi giữ data sản phẩm. → Khởi tạo `items: []`; seed từ mock/action riêng nếu cần demo.

---

## 6. 🟠 P1 — Server/Client Boundary (§9 + pattern)

### 6.1 Lạm dụng `'use client'` (vi phạm "default Server Component")

Các component sau gắn `'use client'` nhưng **không có state/effect/handler/browser API** → phải bỏ `'use client'`, để Server Component (ship 0 KB JS):

| Component | Bằng chứng | Ghi chú |
| --- | --- | --- |
| [lien-he/page.tsx:1](src/app/(landing)/lien-he/page.tsx#L1) | form tĩnh, **không** `useForm`/`useState`/onSubmit | nút "Gửi" hiện không làm gì |
| [computer-shop-landing-footer.tsx:1](src/components/landing/layout/computer-shop-landing-footer/computer-shop-landing-footer.tsx#L1) | chỉ `Link` + text tĩnh | bỏ `'use client'` |
| [featured-products.tsx:1](src/components/landing/sections/featured-products/featured-products.tsx#L1) | chỉ map data → carousel | carousel con tự là client; cha có thể là server |
| [viewed-products.tsx:1](src/components/landing/sections/viewed-products/viewed-products.tsx#L1) | nt | nt |
| [product-card-v2.tsx:1](src/components/landing/sections/featured-products/product-card-v2.tsx#L1) | chỉ `Link` + render | không có tương tác |
| [tech-news.tsx:1](src/components/landing/sections/tech-news/tech-news.tsx#L1) | Marquee là lib client, nhưng wrapper có thể tách | cân nhắc |

> Nguyên tắc [SERVER-CLIENT-BOUNDARY Rule 2](../../docs/pattern/SERVER-CLIENT-BOUNDARY.md): đẩy `'use client'` xuống **lá nhỏ nhất** (đúng tương tác), không lên cả section/page.

### 6.2 Xử lý `params`/`Suspense` không nhất quán giữa các route động

3 route động dùng 3 kiểu khác nhau (đều lệch [SERVER-CLIENT-BOUNDARY §await params](../../docs/pattern/SERVER-CLIENT-BOUNDARY.md)):

| Route | Hiện tại | Đúng theo pattern |
| --- | --- | --- |
| [[category]/page.tsx](src/app/(landing)/[category]/page.tsx) | **không** `generateStaticParams`, chain promise + `<Suspense>`, đọc `searchParams` | hợp lệ với route request-time, nhưng dữ liệu là mock toàn cục → nên có `generateStaticParams` cho 6 category cố định |
| [san-pham/[slug]/page.tsx](src/app/(landing)/san-pham/[slug]/page.tsx) | có `generateStaticParams` trả `[{slug:'placeholder-product'}]`, bọc `<Suspense>`, **không dùng `slug`** | có `generateStaticParams` ⇒ `await params` ở root, **bỏ `<Suspense>` thừa**; phải dùng `slug` để load sản phẩm + `notFound()` khi không thấy |
| [tin-cong-nghe/[endpoint]/page.tsx](src/app/(landing)/tin-cong-nghe/[endpoint]/page.tsx) | `generateStaticParams` + `await params` + `notFound()` | ✅ đúng nhất — nhưng là "god page" (xem 6.4) |

### 6.3 `<Suspense>` vô nghĩa

- [san-pham/[slug]/page.tsx:16](src/app/(landing)/san-pham/[slug]/page.tsx#L16) bọc `<Suspense>` quanh 3 component **đồng bộ, không async, không đọc params** → fallback không bao giờ hiện ([DATA-STREAMING quan hệ ⚠️(3)](../../docs/pattern/DATA-STREAMING-PATTERN.md)).
- [(landing)/layout.tsx:42](src/app/(landing)/layout.tsx#L42) bọc `<Suspense fallback={null}>` quanh [`MaintenanceGuard`](src/components/landing/primitives/maintenance-guard/maintenance-guard.tsx) — mà component này là **`return null`** (stub rỗng). → Xoá cả `MaintenanceGuard` lẫn `<Suspense>` (dead code) hoặc hiện thực hóa thật.

### 6.4 "God page" trộn 2 concern

[tin-cong-nghe/[endpoint]/page.tsx](src/app/(landing)/tin-cong-nghe/[endpoint]/page.tsx) xử lý **cả trang category lẫn trang chi tiết blog** trong một file bằng `if (category) … if (blog) …`. → Tách thành 2 segment: `tin-cong-nghe/[category]/...` và `tin-cong-nghe/bai-viet/[endpoint]/...`, hoặc tách 2 content component. Mỗi component một concern ([COMPOSITE Rule 5](../../docs/pattern/COMPOSITE-PATTERN.md)).

---

## 7. 🟠 P1 — Zustand / Observer Pattern

### 7.1 Không dùng selector — vi phạm [OBSERVER Rule 4](../../docs/pattern/OBSERVER-PATTERN.md)

**Mọi** chỗ đọc store đều destructure cả store → re-render trên mọi thay đổi:

| Vị trí | Hiện tại | Sửa |
| --- | --- | --- |
| [gio-hang/page.tsx:16](src/app/(landing)/gio-hang/page.tsx#L16) | `const { items } = useCartStore()` | `useCartStore((s) => s.items)` |
| [CartItemList.tsx:20](src/components/cart/CartItemList.tsx#L20) | `const { items, toggleAllSelection, ... } = useCartStore()` | mỗi slice một selector |
| [OrderSummary.tsx:16](src/components/cart/OrderSummary.tsx#L16) | `const { getSubtotal, discount, ... } = useCartStore()` | selector từng field |
| [landing-header.tsx:45](src/components/landing/layout/landing-header/landing-header.tsx#L45) | `const { items: cartItems } = useCartStore()` | `useCartStore((s) => s.items.length)` |

### 7.2 Store giữ mock data + magic number

Xem §5.3. Ngoài ra `discount`/`shippingFee` cố định 600000 nên là hằng số/đến từ server, không hard-code trong store.

### 7.3 (Cân nhắc UX) Cart không persist

Convention §8/[OBSERVER Variant 2] cho phép `persist` cho user-preference. Giỏ hàng thường nên sống qua reload → cân nhắc `persist` middleware (và nhớ `clearStorage()` khi có logout — hiện chưa có auth nên tạm thời chưa cần).

---

## 8. 🟠 P1 — DRY

### 8.1 `.toLocaleString('vi-VN')` lặp 7 lần → dùng `generateFormattedPrice`

`@vinaup/utils` đã export `generateFormattedPrice(price: number)` ([packages/utils/src/generators/generate-formatted-price.ts](../../packages/utils/src/generators/generate-formatted-price.ts)). Các chỗ tự format:
- [CartItemList.tsx:94](src/components/cart/CartItemList.tsx#L94) `item.price.toLocaleString('vi-VN')`
- [OrderSummary.tsx:41,46,51,60](src/components/cart/OrderSummary.tsx#L41) (×4)

→ `import { generateFormattedPrice } from '@vinaup/utils'` rồi `{generateFormattedPrice(item.price)}₫`.

> ⚠️ Tiền đề: **giá phải là `number`**. Hiện product cards lưu giá dạng **chuỗi đã format sẵn** (`oldPrice: '24.800.000đ'`) — sai kiểu dữ liệu. Đổi `Product.price`/`originalPrice` về `number` rồi format ở tầng hiển thị (client) để dùng được helper chung.

### 8.2 Hai `ProductCard` + trùng với `@vinaup/ui`

- [product-card.tsx](src/components/landing/sections/featured-products/product-card.tsx) (`ProductCard`) **không nơi nào dùng** — dead code? (chỉ `ProductCardV2` được dùng) → xoá hoặc hợp nhất.
- `@vinaup/ui/landing` đã có `ProductCard` ([packages/ui/.../product-card](../../packages/ui/src/components/landing/primitives/cards/product-card/product-card.tsx)). Theo [COMPOSITE Rule 1](../../docs/pattern/COMPOSITE-PATTERN.md)/[DRY](../../docs/principle/DRY.md): nếu shape phù hợp, **tái sử dụng component shared** thay vì duy trì `ProductCardV2` riêng. Nếu khác biệt thật sự → giữ local nhưng chỉ **một** card.

### 8.3 Logic pad "0x" lặp

- [news-card.tsx:35,38](src/components/landing/sections/tech-news/news-card.tsx#L35) `likes.toString().padStart(2,'0')`
- [tin-cong-nghe-item.tsx:28,32](src/components/landing/tin-cong-nghe/tin-cong-nghe-grid/tin-cong-nghe-item.tsx#L28) `likes < 10 ? '0'+likes : likes`

→ Một helper `formatTwoDigits(n)` trong `src/utils/` (hoặc dùng `String(n).padStart(2,'0')` nhất quán).

### 8.4 Sticky/scroll header tự cài lại

[landing-header.tsx:47-66](src/components/landing/layout/landing-header/landing-header.tsx#L47) tự viết scroll-listener `isScrolled`. `@vinaup/ui/landing` có `StickyHeader` ([packages/ui/.../sticky-header](../../packages/ui/src/components/landing/layout/header/sticky-header/sticky-header.tsx)). → Cân nhắc tái dùng để bỏ `useEffect` thủ công.

### 8.5 `CategoryScroll` — ứng viên `@vinaup/ui`

[category-scroll.tsx](src/components/landing/primitives/category-scroll/category-scroll.tsx) là primitive generic, đang được dùng ở ≥3 nơi trong app. Hiện **đúng** khi để local (mới 1 app dùng — [COMPOSITE Rule 1](../../docs/pattern/COMPOSITE-PATTERN.md)). Ghi chú: nếu app khác cần → promote lên `@vinaup/ui/landing`.

---

## 9. 🟡 P2 — Not-Found Pattern

- **Thiếu root `app/not-found.tsx`.** Hiện chỉ có [app/(landing)/not-found.tsx](src/app/(landing)/not-found.tsx) (trong route group). [NOT-FOUND pattern](../../docs/pattern/NOT-FOUND-PATTERN.md) yêu cầu **một file root** vừa làm boundary cho mọi `notFound()`, vừa bắt mọi URL không khớp route. → Cân nhắc đưa lên `app/not-found.tsx`.
- `not-found.tsx` đang `export default async function` — không cần `async`. Màu `#00E1FF` hard-code (§14) và text **tiếng Anh** ("Page Not Found") trong app tiếng Việt → đồng bộ ngôn ngữ + dùng CSS var.
- Các route khác **không** dùng `notFound()` khi data thiếu (category, sản phẩm) — khi gắn API thật phải `notFound()` ngay tại Server Component sau khi đọc data ([NOT-FOUND Rule 2](../../docs/pattern/NOT-FOUND-PATTERN.md)), không render giả "không tìm thấy" với HTTP 200.

---

## 10. 🟡 P2 — Styling (§14)

- **29 màu hex hard-code** trong `.tsx`, nhiều cái **trùng đúng CSS var có sẵn**: `#C44C50` (=`--vinaup-soft-crimson`, ×7), `#0E54C9` (=`--vinaup-blue-link`, ×5), `#121212` (=`--vinaup-black`, ×9). Ví dụ [CartItemList.tsx:44,68](src/components/cart/CartItemList.tsx#L44) `color="#C44C50"`, [CheckoutForm.tsx](src/components/cart/CheckoutForm.tsx) `fill="#121212"`. → Thay bằng `var(--vinaup-*)` theo §14 (không thêm giá trị palette mới). Nhiều component đang **lẫn lộn** cả `var()` lẫn hex cho cùng một màu → thống nhất về biến.
- Class outermost nên là `<componentName>Root` (§14) — rà soát các module hiện đặt `.section`, `.wrapper`, `.footer`… (ví dụ [seo-article.tsx:17](src/components/landing/sections/seo-article/seo-article.tsx#L17) `.wrapper`).

---

## 11. 🟡 P2 — Comments (§13)

Convention: comment trả lời **WHY**, không kể WHAT/layout. Hiện rất nhiều comment "kể chuyện" và TODO cá nhân tiếng Việt:
- [CartItemList.tsx:60,80,135](src/components/cart/CartItemList.tsx#L60): "ĐÂY LÀ KHỐI RESPONSIVE QUAN TRỌNG NHẤT", "Đẩy checkbox xuống 1 xíu ở mobile"…
- [category-controls.tsx:7,8](src/app/(landing)/[category]/category-controls.tsx#L7): "Thêm import icon", "Thêm import Link"
- [trang-so-sanh/page.tsx:2](src/app/(landing)/trang-so-sanh/page.tsx#L2): "Sửa lại đường dẫn import nếu bạn để component ở thư mục khác"
- [product-description.tsx:119](src/components/landing/sections/product-description/product-description.tsx#L119): "SỬ DỤNG STACK ĐỂ XẾP DỌC 2 ẢNH VUÔNG"

→ Xoá hết comment narration; chỉ giữ comment giải thích quyết định không hiển nhiên (theo mẫu `// ─── Step N` của CLAUDE.md khi logic phức tạp).

---

## 12. 🟡 P2 — Metadata / SEO

- **`og:image` `/images/group1.png` KHÔNG tồn tại** trong `public/` — khai báo ở **cả** [app/layout.tsx:25](src/app/layout.tsx#L25) **và** [(landing)/layout.tsx:28](src/app/(landing)/layout.tsx#L28). Sửa đường dẫn tới ảnh có thật (vd `/vitinhnet-trangdai.png`).
- **Trùng metadata** giữa root layout và landing layout (title/og/canonical lặp). Root layout nên giữ default + template; trang/section override phần riêng. Gộp để tránh drift.
- `description` ở [app/layout.tsx:18](src/app/layout.tsx#L18) chỉ là "Vi Tinh Net" (rỗng nghĩa) — viết mô tả SEO thật.

---

## 13. 🟡 P2 — Lỗi logic / placeholder cần dọn

| # | Vấn đề | Vị trí |
| --- | --- | --- |
| 1 | Trang chủ render **`<FeaturedProducts/>` 3 lần** (cùng data) — placeholder | [(landing)/page.tsx:11-13](src/app/(landing)/page.tsx#L11) |
| 2 | `CategoryControls` mọi sub-category đều link về `/${categorySlug}` (href giống nhau) | [category-controls.tsx:18-21](src/app/(landing)/[category]/category-controls.tsx#L18) |
| 3 | `featured-products` `categories` có item trùng lặp (Laptop HP/Dell/Lenovo lặp 3 lần) | [featured-products.tsx:12](src/components/landing/sections/featured-products/featured-products.tsx#L12) |
| 4 | `san-pham/[slug]` **bỏ qua `slug`**, render sản phẩm cứng | [san-pham/[slug]/page.tsx](src/app/(landing)/san-pham/[slug]/page.tsx) |
| 5 | Checkout submit chỉ `console.log` payload (mock) | [gio-hang/page.tsx:62-74](src/app/(landing)/gio-hang/page.tsx#L62) |
| 6 | Nút "xoá" ở header giỏ hàng: `items.forEach(... removeItem)` trong khi đọc/sửa list — nên lọc rồi xoá theo id-set | [CartItemList.tsx:50](src/components/cart/CartItemList.tsx#L50) |
| 7 | `dangerouslySetInnerHTML` cho nội dung blog (mock) — khi có CMS thật phải sanitize (XSS) | [tin-cong-nghe/[endpoint]/page.tsx:102](src/app/(landing)/tin-cong-nghe/[endpoint]/page.tsx#L102), [seo-article.tsx:22](src/components/landing/sections/seo-article/seo-article.tsx#L22) |
| 8 | Pagination 2 kiểu khác nhau: server-side (searchParams) ở `[category]` vs client-side (`useState`, ship toàn bộ list) ở `tin-cong-nghe-grid` | [category-pagination.tsx](src/app/(landing)/[category]/category-pagination.tsx) vs [tin-cong-nghe-grid.tsx:17](src/components/landing/tin-cong-nghe/tin-cong-nghe-grid/tin-cong-nghe-grid.tsx#L17) — thống nhất 1 chiến lược |
| 9 | `lien-he` form không có handler/validation (nút không hoạt động) | [lien-he/page.tsx](src/app/(landing)/lien-he/page.tsx) |

---

## 14. Kế hoạch hành động theo thứ tự ưu tiên

### Đợt P0 — Cơ học (nhanh, gần như tự động, không đổi hành vi)
1. [ ] `npx prettier --write "apps/vitinhnet/src/**/*.{ts,tsx,scss}"` (38 file) — _chưa chạy toàn cục; file mới đã đúng 2-space._
2. [x] `npx eslint "apps/vitinhnet/src/**/*.{ts,tsx}" --fix` (import/order) — còn 6 warning vô hại (side-effect CSS import + 1 unused var cũ).
3. [x] Đổi tên 3 file cart `.tsx` + 3 `.module.scss` về kebab-case; cập nhật import.
4. [x] Đổi tên `ITinCongNghe` → `TechNewsArticleResponse` (chuyển vào `interfaces/tech-news-interfaces.ts`).
5. [x] Thay `clsx` → `generateClassName` (`@vinaup/utils`) ở 2 file vitinhnet (phantom dep — `clsx` không có trong `package.json`, chỉ là transitive dep của `@mantine/core`/`@mantine/dates`; bỏ import trực tiếp là xong, không có dòng nào để xoá khỏi `package.json`).
6. [x] `npm run lint` xanh (0 error) + `tsc --noEmit` sạch + `next build` thành công (124 trang).

### Đợt P1 — Cấu trúc & state
7. [ ] Move `src/stores/cart-store.ts` → `src/libs/zustand/cart-store.ts`; cập nhật import; **cập nhật OBSERVER-PATTERN.md**.
8. [x] `interfaces/cart.ts` → `interfaces/cart-interfaces.ts`; tạo `interfaces/product-interfaces.ts`, `interfaces/tech-news-interfaces.ts`; gộp **một** `ProductResponse` (xoá 2 `Product` trùng + `product-card.tsx` dead code).
9. [x] Rời mọi mock/`Product`/`NewsItem` khỏi component về `src/interfaces` + `src/mocks` + `src/constants`; sửa deep-relative import sang alias.
10. [ ] Gom `components/cart/` → `components/landing/cart/`.
11. [~] Bỏ `'use client'` ở các component tĩnh (§6.1); đẩy client xuống lá — _đã làm `lien-he` (page Server + `contact-form.tsx` client leaf); còn footer/featured/viewed/product-card-v2._
12. [ ] Thêm selector cho mọi lần đọc `useCartStore` (§7.1); store khởi tạo `items: []`.
13. [~] Đổi giá sang `number` + dùng `generateFormattedPrice` — _xong cho card/detail/compare; còn helper pad 2 chữ số._
14. [~] Xoá `MaintenanceGuard` + Suspense thừa; sửa Suspense/params cho 3 route động nhất quán — _`san-pham/[slug]` đã đúng (`generateStaticParams` + `await params` + `notFound`, bỏ Suspense thừa); `[category]` giữ Suspense (request-time `searchParams`); còn `MaintenanceGuard`._

### Đợt P2 — Chất lượng, SEO, dọn placeholder
15. [ ] Thay 29 hex → `var(--vinaup-*)`; chuẩn hoá class `*Root`.
16. [ ] Xoá comment narration; viết lại theo "answer WHY".
17. [ ] Sửa `og:image` thật; gộp metadata root/landing; viết description SEO.
18. [ ] Thêm root `app/not-found.tsx`; bỏ `async`; đồng bộ tiếng Việt.
19. [ ] Dọn placeholder ở §13 (home 3×, href trùng, slug bỏ qua, 2 kiểu pagination…).

### Đợt sau (khi có backend) — Bổ sung tầng dữ liệu
20. [x] Tạo `apis/_base.ts` + `*-apis.ts`; `actions/_base.ts` + `*-actions.ts` (Repository + Caching) — **scaffold trước, dùng mock seam `apis/_mock.ts`** (xem §17).
21. [x] Page đọc data trên server → `notFound()` khi thiếu → truyền props xuống section (home, `[category]`, `san-pham/[slug]`, `tin-cong-nghe`, `trang-so-sanh`).
22. [x] Form `lien-he`/checkout gọi Server Action (`createCustomerContactActionPublic` / `createOrderActionPublic`) + `@mantine/notifications` cho kết quả.

---

## 17. Tầng dữ liệu mock-first (đã scaffold 2026-06-13)

Mục tiêu: **ráp API thật không phải refactor kiến trúc**. Hợp đồng `Component → Action (ActionResponse<T>) → Api (HttpResponse<T>) → transport` giống hệt jenahair; mock chỉ là một transport ở tầng thấp nhất.

**Đã tạo (4 domain):** `product`, `tech-news`, `order`, `customer-contact` — mỗi domain đủ `interfaces/<domain>-interfaces.ts` (`*Response`/`*Request`), `apis/<domain>-apis.ts`, `actions/<domain>-actions.ts`; mock dataset ở `mocks/*.mock.ts` **được type bằng `*Response[]`**. Nền tảng: `interfaces/_base-interfaces.ts`, `actions/_base.ts` (`executeApi`), `apis/_base.ts` (copy jenahair, chờ backend), `apis/_mock.ts` (`mockApiResponse`).

**Seam mock = tầng `apis/`.** Mỗi hàm `*-apis.ts` trả `HttpResponse<T>` qua `mockApiResponse(...)`. Public read bọc `'use cache'` + `cacheLife('default')` + `cacheTag(...)` trong action — nên đã chạy đúng cache (build: `revalidate 15m / expire 1y`, PPR cho route động).

**Quy trình ráp API thật (chỉ sửa `apis/`, không đụng action/page/component):**
1. Tạo `.env` với `API_URL`.
2. Trong từng `*-apis.ts`: xoá khối `// --- MOCK ---`, mở khối `// --- REAL ---` (đã viết sẵn `apiPublic(...)`).
3. Xoá `apis/_mock.ts` + `mocks/*.mock.ts` khi hết cần.

**Lưu ý:** `cart-store.ts` vẫn giữ state UI tạm (Observer) — **không** đi qua pipeline này; "order" chỉ là mutation `createOrderActionPublic` lúc checkout. `id` của tech-news vẫn là `number` theo dữ liệu cũ (product/order dùng `string`).

---

## 15. Cấu trúc mục tiêu (target tree, sau refactor)

```
apps/vitinhnet/src/
├── app/(landing)/...                      # routes (đổi Suspense/params nhất quán)
│   └── not-found.tsx  → chuyển lên app/not-found.tsx
├── components/landing/
│   ├── cart/                              # ⬅ chuyển từ components/cart/, kebab-case
│   │   ├── cart-item-list.tsx
│   │   ├── checkout-form.tsx
│   │   └── order-summary.tsx
│   ├── layout/ · sections/ · primitives/ · tin-cong-nghe/
├── libs/zustand/cart-store.ts             # ⬅ chuyển từ src/stores/
├── interfaces/
│   ├── cart-interfaces.ts                 # ⬅ đổi tên từ cart.ts
│   ├── product-interfaces.ts              # ⬅ gộp 2 Product
│   └── tech-news-interfaces.ts            # ⬅ TechNewsArticle (hết I-prefix)
├── constants/                             # ⬅ MỚI: CATEGORY_MAP, discount/shippingFee...
├── mocks/                                 # product.mock.ts, hero.mock.ts, ... (data rời khỏi component)
├── utils/                                 # ⬅ MỚI khi cần: format-two-digits.ts
├── apis/  · actions/                      # ⬅ MỚI khi có backend (Repository + Caching)
```

---

## 16. Ghi chú cập nhật tài liệu (bắt buộc theo CLAUDE.md)

Sau khi thực thi, **phải cập nhật docs** cho khớp:
- [OBSERVER-PATTERN.md](../../docs/pattern/OBSERVER-PATTERN.md): sửa đường dẫn ví dụ `src/stores/cart-store.ts` → `src/libs/zustand/cart-store.ts` (đang drift so với convention §8).
- Nếu thêm `apis/actions`: bổ sung `apps/vitinhnet/README.md` (domain model, route map) theo two-tier docs ([docs/README.md](../../docs/README.md)).
- `apps/vitinhnet/README.md` hiện vẫn là template `create-next-app` mặc định — nên viết lại mô tả app (domain, route, env).
