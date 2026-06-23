# Hướng dẫn gọi API và sử dụng Mock Data (Dành cho Frontend Developer)

Tài liệu này hướng dẫn cách gọi API, xử lý dữ liệu và cách sử dụng Mock Data trong dự án khi Backend chưa hoàn thiện. Dự án sử dụng kiến trúc **Repository Pattern** kết hợp với **Next.js Server Actions**.

## 🌟 Kiến trúc tổng quan
Kiến trúc luồng dữ liệu đi qua 3 tầng chính, giúp tách biệt hoàn toàn UI và Logic gọi API:
1. **`src/interfaces`**: Định nghĩa kiểu dữ liệu (Types/Interfaces).
2. **`src/apis`**: Nơi thực hiện gọi HTTP Request thật (hoặc Mock). Trả về chuẩn `HttpResponse`.
3. **`src/actions`**: Server Actions. Bọc các hàm API lại bằng `executeApi` để xử lý lỗi đồng nhất, trả về chuẩn `ActionResponse` (`{ success, data, error }`).

---

## 🚀 Quy trình 3 bước để tạo mới một API

Giả sử bạn đang code màn hình **"Liên hệ"** và cần gửi form data. Bạn sẽ làm theo 3 bước sau:

### Bước 1: Định nghĩa cấu trúc dữ liệu (`src/interfaces`)
Tạo file (vd: `customer-contact-interfaces.ts`) để khai báo xem dữ liệu gửi đi (Request) và dữ liệu nhận về (Response).

```typescript
// Dữ liệu User nhập từ Form
export interface CreateCustomerContactRequest {
  fullName: string;
  email: string;
  message: string;
}

// Dữ liệu Backend sẽ trả về sau khi tạo xong
export interface CustomerContactResponse {
  id: string;
  fullName: string;
  email: string;
  message: string;
  createdAt: string;
}
```

### Bước 2: Tạo hàm gọi API & Mock Data (`src/apis`)
Đây là nơi giao tiếp với server. Do hiện tại **chưa có Backend**, bạn sẽ dùng hàm `mockApiResponse` (import từ `_mock.ts`) để giả lập server trả về.

Tạo file (vd: `customer-contact-apis.ts`):

```typescript
import { mockApiResponse } from './_mock';
// import { apiPublic } from './_base'; // Sẽ dùng cái này khi có Backend thật

export async function createCustomerContactApiPublic(data: CreateCustomerContactRequest) {
  
  // --- HIỆN TẠI: DÙNG MOCK DATA ---
  // Trả về dữ liệu giả lập như một cục JSON từ Server thật
  return mockApiResponse<CustomerContactResponse>({
    id: `mock-contact-${Date.now()}`,
    ...data, // Trả lại các dữ liệu form vừa gửi
    createdAt: new Date().toISOString(),
  });

  // --- TƯƠNG LAI: KHI BACKEND ĐÃ CODE XONG ---
  // Xóa đoạn Mock ở trên và mở comment đoạn dưới:
  //
  // return apiPublic<CustomerContactResponse>('/customer-contacts', {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  // });
}
```

### Bước 3: Tạo Server Action (`src/actions`)
Tạo file action (vd: `customer-contact-actions.ts`). Frontend UI Component sẽ **không gọi trực tiếp API**, mà sẽ gọi qua Server Action này.

```typescript
'use server';

import { executeApi } from '@/actions/_base';
import { createCustomerContactApiPublic } from '@/apis/customer-contact-apis';
import { ActionResponse } from '@/interfaces/_base-interfaces';

export async function createCustomerContactActionPublic(
  input: CreateCustomerContactRequest
): Promise<ActionResponse<CustomerContactResponse>> {
  // executeApi sẽ lo toàn bộ việc bắt lỗi 500, lỗi mạng, chuẩn hóa status code...
  return executeApi(() => createCustomerContactApiPublic(input));
}
```

---

## 💻 Cách sử dụng ở Client Component (UI)

Đứng ở góc độ người làm UI (Client Component), bạn **chỉ quan tâm đến Bước 3**. Bạn gọi hàm Action và xử lý cực kì nhẹ nhàng nhờ định dạng `success: boolean`.

```tsx
'use client';
import { useState } from 'react';
import { createCustomerContactActionPublic } from '@/actions/customer-contact-actions';
import { toast } from 'sonner'; // Hoặc thư viện toast bạn dùng

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData) => {
    setIsLoading(true);
    
    // Gọi Action
    const result = await createCustomerContactActionPublic({
      fullName: formData.name,
      email: formData.email,
      message: formData.msg,
    });

    setIsLoading(false);

    if (result.success) {
      // Thành công! Dữ liệu mock nằm ở result.data
      toast.success("Gửi liên hệ thành công!");
      console.log('ID được tạo:', result.data?.id);
    } else {
      // Có lỗi xảy ra (ví dụ quăng lỗi 500)
      toast.error(result.error);
    }
  };

  return (
    <form>
      {/* ... inputs ... */}
      <button disabled={isLoading}>Gửi đi</button>
    </form>
  );
}
```

## 🎯 Tóm tắt
1. **Làm UI:** Thoải mái thiết kế giao diện bằng React.
2. **Cần API:** Vào `src/apis/...`, dùng hàm `mockApiResponse` trả về cục object JSON tùy ý.
3. **Gọi API lên UI:** Tạo 1 file trong `src/actions/...`, bọc bằng `executeApi()` có từ khóa `'use server'`. UI chỉ gọi file Action này.
4. **Khi có Backend thật:** Chỉ vào đúng thư mục `src/apis/...` thay đổi ruột hàm thành `fetch` / `apiPublic` / `apiPrivate`. Không cần sửa UI Component, không cần sửa Actions.
