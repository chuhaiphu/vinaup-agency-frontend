export interface ITinCongNghe {
  id: number;
  title: string;
  endpoint: string;
  categoryEndpoint: string;
  mainImageUrl: string;
  galleryImages?: string[];
  likes: number;
  views: number;
  content: string;
}

export const MOCK_CATEGORIES = [
  { id: 1, title: "Tất cả", endpoint: "" },
  { id: 2, title: "Tin tức chung", endpoint: "tin-tuc-chung" },
  { id: 3, title: "Đánh giá sản phẩm", endpoint: "danh-gia-san-pham" },
  { id: 4, title: "Hướng dẫn thủ thuật", endpoint: "huong-dan-thu-thuat" },
];

export const MOCK_BLOGS: ITinCongNghe[] = [
  {
    id: 1,
    title: "Top 5 laptop văn phòng đáng mua nhất năm 2026",
    endpoint: "top-5-laptop-van-phong-dang-mua-nhat",
    categoryEndpoint: "tin-tuc-chung",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    galleryImages: [
      "/MSI-Gaming-PC_2024-09-30.png",
      "https://placehold.co/1200x600/1E1E1E/FFF?text=Laptop+Van+Phong+2026",
      "https://placehold.co/1200x600/C44C50/FFF?text=Top+5+Review"
    ],
    likes: 45,
    views: 120,
    content: `<p>Nội dung chi tiết bài viết Top 5 laptop văn phòng đáng mua nhất năm 2026. Trong năm nay, hàng loạt các mẫu laptop cho dân văn phòng được ra mắt với thiết kế mỏng nhẹ, pin siêu trâu và tích hợp sức mạnh phần cứng vượt trội.</p>
<p>Dưới đây là một số dòng máy nổi bật, hiệu năng ấn tượng và tối ưu cho công việc hàng ngày mà bạn không nên bỏ lỡ:</p>
<h2>1. Laptop Asus HP Envy 2026</h2>
<p>Được trang bị CPU tiết kiệm điện mới nhất, màn hình OLED độ phân giải cao và khung máy hoàn thiện bằng hợp kim chắc chắn. Nhờ trọng lượng nhẹ, nó cực kỳ tiện lợi để mang đi làm hoặc đi công tác.</p>
<img src="https://placehold.co/1000x500?text=Laptop+Van+Phong+Mau+1" alt="Laptop Mau 1" style="max-width: 100%; height: auto; border-radius: 12px; margin: 20px 0; object-fit: cover;" />
<h2>2. Laptop Dell ThinkPad X1 Carbon (Gen 14)</h2>
<p>Đây là mẫu laptop cực kỳ phù hợp cho giới doanh nhân nhờ thiết kế đẳng cấp, vỏ carbon siêu nhẹ nhưng siêu cứng cáp. Bàn phím hành trình sâu, đem lại cảm giác gõ tốt nhất trên thị trường.</p>
<img src="https://placehold.co/1000x500?text=Laptop+Van+Phong+Mau+2" alt="Laptop Mau 2" style="max-width: 100%; height: auto; border-radius: 12px; margin: 20px 0; object-fit: cover;" />
<p>Tóm lại, nếu bạn đang tìm kiếm một chiếc máy vừa mạnh mẽ lại vừa bền bỉ cho công việc văn phòng trong năm 2026, các dòng sản phẩm trên chắc chắn là sự lựa chọn hàng đầu.</p>`,
  },
  {
    id: 2,
    title: "Đánh giá chi tiết card đồ họa RTX 5090",
    endpoint: "danh-gia-chi-tiet-rtx-5090",
    categoryEndpoint: "danh-gia-san-pham",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    galleryImages: [
      "/MSI-Gaming-PC_2024-09-30.png",
      "https://placehold.co/1200x600/000000/00FF00?text=RTX+5090+Gaming",
      "https://placehold.co/1200x600/333333/00FF00?text=Max+Settings+4K"
    ],
    likes: 128,
    views: 890,
    content: `<p>Trong bài viết này, chúng ta sẽ cùng đi sâu vào đánh giá chi tiết card đồ họa RTX 5090 siêu khủng vừa ra mắt. Hứa hẹn đây sẽ là "cỗ máy cày game" không đối thủ trong thời gian dài.</p>
<h2>Thông số kỹ thuật cực kì ấn tượng</h2>
<p>Dòng card mới mang đến mức hiệu năng VRAM và số lượng CUDA cores khổng lồ. Đặc biệt, nó được tích hợp khả năng tối ưu hóa tản nhiệt bằng chất lỏng buồng hơi thế hệ 3.</p>
<img src="https://placehold.co/1000x500?text=Card+Do+Hoa+NVIDIA" alt="Card Do Hoa" style="max-width: 100%; height: auto; border-radius: 12px; margin: 20px 0; object-fit: cover;" />
<h2>Hiệu năng thực tế khi chơi Game AAA</h2>
<p>Test với các tựa game nặng nhất, FPS luôn ổn định ở mức trên 120 cho độ phân giải 4K, ray tracing bật tối đa. Không có hiện tượng drop FPS giật lag ở các khu vực đông hiệu ứng.</p>
<img src="https://placehold.co/1000x500?text=Test+Game+Hieu+Nang" alt="Test Game" style="max-width: 100%; height: auto; border-radius: 12px; margin: 20px 0; object-fit: cover;" />
<p>Tổng kết: Đây là mẫu card thuộc phân khúc cao cấp siêu đắt đỏ mới xứng đáng đứng số 1 về giá trị trải nghiệm gaming thời điểm hiện tại.</p>`,
  },
  {
    id: 3,
    title: "Cách tối ưu hóa Windows 11 để chơi game mượt mà",
    endpoint: "cach-toi-uu-hoa-windows-11",
    categoryEndpoint: "huong-dan-thu-thuat",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    likes: 24,
    views: 56,
    content: "<p>Nội dung về tối ưu hóa Windows 11...</p>",
  },
  {
    id: 4,
    title: "Intel rò rỉ thông tin về CPU thế hệ thứ 16",
    endpoint: "intel-ro-ri-tin-cpu-the-he-16",
    categoryEndpoint: "tin-tuc-chung",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    likes: 76,
    views: 200,
    content: "<p>Chi tiết thông tin về CPU Intel thế hệ 16...</p>",
  },
  {
    id: 5,
    title: "AMD ra mắt Ryzen 9000 Series với kiến trúc Zen 5",
    endpoint: "amd-ra-mat-ryzen-9000-series",
    categoryEndpoint: "tin-tuc-chung",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    likes: 312,
    views: 1250,
    content: "<p>AMD vừa chính thức giới thiệu...</p>",
  },
  {
    id: 6,
    title: "Đánh giá màn hình Asus ROG Swift OLED 240Hz",
    endpoint: "danh-gia-man-hinh-asus-rog-swift-oled",
    categoryEndpoint: "danh-gia-san-pham",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    likes: 89,
    views: 430,
    content: "<p>ROG Swift OLED là một trong những chiếc màn hình...</p>",
  },
  {
    id: 7,
    title: "Hướng dẫn build PC gaming 15 triệu chơi mượt mọi game eSport",
    endpoint: "huong-dan-build-pc-gaming-15-trieu",
    categoryEndpoint: "huong-dan-thu-thuat",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    likes: 410,
    views: 3200,
    content: "<p>Với ngân sách 15 triệu đồng, bạn có thể...</p>",
  },
  {
    id: 8,
    title: "Top 5 bàn phím cơ không dây giá rẻ dưới 1 triệu",
    endpoint: "top-ban-phim-co-khong-day-gia-re",
    categoryEndpoint: "danh-gia-san-pham",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    likes: 67,
    views: 315,
    content: "<p>Thị trường bàn phím cơ đang rất nhộn nhịp...</p>",
  },
  {
    id: 9,
    title: "So sánh hiệu năng Intel vs AMD năm 2026",
    endpoint: "so-sanh-intel-vs-amd-2026",
    categoryEndpoint: "tin-tuc-chung",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    likes: 101,
    views: 540,
    content: "<p>Bài viết so sánh hiệu năng CPU mới nhất...</p>",
  },
  {
    id: 10,
    title: "Hướng dẫn cài đặt Windows 11 từ USB",
    endpoint: "huong-dan-cai-windows-11-usb",
    categoryEndpoint: "huong-dan-thu-thuat",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    likes: 55,
    views: 210,
    content: "<p>Chi tiết các bước cài đặt Windows 11...</p>",
  },
  {
    id: 11,
    title: "Top 10 card đồ họa tốt nhất cho game thủ 2026",
    endpoint: "top-10-card-do-hoa-2026",
    categoryEndpoint: "danh-gia-san-pham",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    likes: 210,
    views: 980,
    content: "<p>Danh sách card đồ họa nổi bật năm 2026...</p>",
  },
  {
    id: 12,
    title: "Tin đồn về MacBook Pro M5 sắp ra mắt",
    endpoint: "tin-don-macbook-pro-m5",
    categoryEndpoint: "tin-tuc-chung",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    likes: 77,
    views: 340,
    content: "<p>MacBook Pro M5 có gì mới?</p>",
  },
  {
    id: 13,
    title: "Hướng dẫn ép xung CPU an toàn cho người mới",
    endpoint: "huong-dan-ep-xung-cpu-an-toan",
    categoryEndpoint: "huong-dan-thu-thuat",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    likes: 33,
    views: 120,
    content: "<p>Hướng dẫn chi tiết ép xung CPU...</p>",
  },
  {
    id: 14,
    title: "Đánh giá laptop gaming MSI 2026",
    endpoint: "danh-gia-laptop-gaming-msi-2026",
    categoryEndpoint: "danh-gia-san-pham",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    likes: 98,
    views: 410,
    content: "<p>MSI Gaming 2026 có gì nổi bật?</p>",
  },
  {
    id: 15,
    title: "Tổng hợp các phần mềm miễn phí nên cài cho máy tính mới",
    endpoint: "phan-mem-mien-phi-cho-may-tinh-moi",
    categoryEndpoint: "tin-tuc-chung",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    likes: 120,
    views: 600,
    content: "<p>Danh sách phần mềm miễn phí hữu ích...</p>",
  },
  {
    id: 16,
    title: "Hướng dẫn vệ sinh laptop đúng cách",
    endpoint: "huong-dan-ve-sinh-laptop",
    categoryEndpoint: "huong-dan-thu-thuat",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    likes: 41,
    views: 180,
    content: "<p>Vệ sinh laptop giúp tăng tuổi thọ...</p>",
  },
  {
    id: 17,
    title: "Đánh giá chuột gaming Logitech G Pro X Superlight 2",
    endpoint: "danh-gia-chuot-gaming-logitech-gpro-x2",
    categoryEndpoint: "danh-gia-san-pham",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    likes: 87,
    views: 370,
    content: "<p>Logitech G Pro X Superlight 2 có gì mới?</p>",
  },
  {
    id: 18,
    title: "Tin tức công nghệ nổi bật tháng 5/2026",
    endpoint: "tin-tuc-cong-nghe-thang-5-2026",
    categoryEndpoint: "tin-tuc-chung",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    likes: 56,
    views: 210,
    content: "<p>Tổng hợp tin tức công nghệ mới nhất...</p>",
  },
  {
    id: 19,
    title: "Hướng dẫn lắp ráp máy tính để bàn cho người mới",
    endpoint: "huong-dan-lap-rap-may-tinh-de-ban",
    categoryEndpoint: "huong-dan-thu-thuat",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    likes: 62,
    views: 250,
    content: "<p>Chi tiết các bước lắp ráp máy tính...</p>",
  },
  {
    id: 20,
    title: "Đánh giá tai nghe không dây Sony WH-1000XM6",
    endpoint: "danh-gia-tai-nghe-sony-wh-1000xm6",
    categoryEndpoint: "danh-gia-san-pham",
    mainImageUrl: "/MSI-Gaming-PC_2024-09-30.png",
    likes: 73,
    views: 320,
    content: "<p>Sony WH-1000XM6 có gì nổi bật?</p>",
  },
];
