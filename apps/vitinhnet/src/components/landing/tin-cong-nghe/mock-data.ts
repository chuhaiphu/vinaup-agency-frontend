export interface ITinCongNghe {
  id: number;
  title: string;
  endpoint: string;
  categoryEndpoint: string;
  mainImageUrl: string;
  likes: number;
  views: number;
  content: string;
}

export const MOCK_CATEGORIES = [
  { id: 1, title: 'Tất cả', endpoint: '' },
  { id: 2, title: 'Tin tức chung', endpoint: 'tin-tuc-chung' },
  { id: 3, title: 'Đánh giá sản phẩm', endpoint: 'danh-gia-san-pham' },
  { id: 4, title: 'Hướng dẫn thủ thuật', endpoint: 'huong-dan-thu-thuat' },
];

export const MOCK_BLOGS: ITinCongNghe[] = [
  {
    id: 1,
    title: 'Top 5 laptop văn phòng đáng mua nhất năm 2026',
    endpoint: 'top-5-laptop-van-phong-dang-mua-nhat',
    categoryEndpoint: 'tin-tuc-chung',
    mainImageUrl: '',
    likes: 45,
    views: 120,
    content: '<p>Nội dung chi tiết bài viết Top 5 laptop...</p><p>Đang cập nhật thêm...</p>'
  },
  {
    id: 2,
    title: 'Đánh giá chi tiết card đồ họa RTX 5090',
    endpoint: 'danh-gia-chi-tiet-rtx-5090',
    categoryEndpoint: 'danh-gia-san-pham',
    mainImageUrl: '',
    likes: 128,
    views: 890,
    content: '<p>Nội dung chi tiết bài viết đánh giá RTX 5090...</p>'
  },
  {
    id: 3,
    title: 'Cách tối ưu hóa Windows 11 để chơi game mượt mà',
    endpoint: 'cach-toi-uu-hoa-windows-11',
    categoryEndpoint: 'huong-dan-thu-thuat',
    mainImageUrl: '',
    likes: 24,
    views: 56,
    content: '<p>Nội dung về tối ưu hóa Windows 11...</p>'
  },
  {
    id: 4,
    title: 'Intel rò rỉ thông tin về CPU thế hệ thứ 16',
    endpoint: 'intel-ro-ri-tin-cpu-the-he-16',
    categoryEndpoint: 'tin-tuc-chung',
    mainImageUrl: '',
    likes: 76,
    views: 200,
    content: '<p>Chi tiết thông tin về CPU Intel thế hệ 16...</p>'
  },
  {
    id: 5,
    title: 'AMD ra mắt Ryzen 9000 Series với kiến trúc Zen 5',
    endpoint: 'amd-ra-mat-ryzen-9000-series',
    categoryEndpoint: 'tin-tuc-chung',
    mainImageUrl: '',
    likes: 312,
    views: 1250,
    content: '<p>AMD vừa chính thức giới thiệu...</p>'
  },
  {
    id: 6,
    title: 'Đánh giá màn hình Asus ROG Swift OLED 240Hz',
    endpoint: 'danh-gia-man-hinh-asus-rog-swift-oled',
    categoryEndpoint: 'danh-gia-san-pham',
    mainImageUrl: '',
    likes: 89,
    views: 430,
    content: '<p>ROG Swift OLED là một trong những chiếc màn hình...</p>'
  },
  {
    id: 7,
    title: 'Hướng dẫn build PC gaming 15 triệu chơi mượt mọi game eSport',
    endpoint: 'huong-dan-build-pc-gaming-15-trieu',
    categoryEndpoint: 'huong-dan-thu-thuat',
    mainImageUrl: '',
    likes: 410,
    views: 3200,
    content: '<p>Với ngân sách 15 triệu đồng, bạn có thể...</p>'
  },
  {
    id: 8,
    title: 'Top 5 bàn phím cơ không dây giá rẻ dưới 1 triệu',
    endpoint: 'top-ban-phim-co-khong-day-gia-re',
    categoryEndpoint: 'danh-gia-san-pham',
    mainImageUrl: '',
    likes: 67,
    views: 315,
    content: '<p>Thị trường bàn phím cơ đang rất nhộn nhịp...</p>'
  },
  {
    id: 9,
    title: 'Thủ thuật khắc phục lỗi màn hình xanh (BSOD) trên Windows',
    endpoint: 'khac-phuc-loi-man-hinh-xanh-windows',
    categoryEndpoint: 'huong-dan-thu-thuat',
    mainImageUrl: '',
    likes: 120,
    views: 1540,
    content: '<p>Lỗi màn hình xanh (BSOD) thường xảy ra do...</p>'
  },
  {
    id: 10,
    title: 'Review chuột không dây Logitech G Pro X Superlight 2',
    endpoint: 'review-chuot-logitech-g-pro-x-superlight-2',
    categoryEndpoint: 'danh-gia-san-pham',
    mainImageUrl: '',
    likes: 215,
    views: 1800,
    content: '<p>Được thiết kế dành riêng cho game thủ chuyên nghiệp...</p>'
  },
  {
    id: 11,
    title: 'Apple rục rịch chuẩn bị sự kiện WWDC với loạt thiết bị Mac mới',
    endpoint: 'apple-chuan-bi-su-kien-wwdc-mac-moi',
    categoryEndpoint: 'tin-tuc-chung',
    mainImageUrl: '',
    likes: 85,
    views: 920,
    content: '<p>Tại sự kiện WWDC sắp tới, Apple dự kiến sẽ...</p>'
  },
  {
    id: 12,
    title: 'Hướng dẫn vệ sinh laptop và thay keo tản nhiệt tại nhà',
    endpoint: 'huong-dan-ve-sinh-laptop-thay-keo-tan-nhiet',
    categoryEndpoint: 'huong-dan-thu-thuat',
    mainImageUrl: '',
    likes: 310,
    views: 2400,
    content: '<p>Sau một quá trình sử dụng từ 6 tháng đến 1 năm...</p>'
  },
  {
    id: 13,
    title: 'So sánh SSD PCIe Gen 4 và Gen 5: Có đáng để nâng cấp?',
    endpoint: 'so-sanh-ssd-pcie-gen-4-va-gen-5',
    categoryEndpoint: 'danh-gia-san-pham',
    mainImageUrl: '',
    likes: 54,
    views: 450,
    content: '<p>SSD PCIe Gen 5 đang ngày càng phổ biến nhưng...</p>'
  },
  {
    id: 14,
    title: 'Nvidia công bố công nghệ DLSS 4.0 với cải tiến AI vượt bậc',
    endpoint: 'nvidia-cong-bo-dlss-4-0',
    categoryEndpoint: 'tin-tuc-chung',
    mainImageUrl: '',
    likes: 198,
    views: 1100,
    content: '<p>Công nghệ DLSS 4.0 của Nvidia mang tới...</p>'
  },
  {
    id: 15,
    title: 'Cách cài đặt song song Windows và Ubuntu Linux trên cùng máy',
    endpoint: 'cai-dat-song-song-windows-ubuntu',
    categoryEndpoint: 'huong-dan-thu-thuat',
    mainImageUrl: '',
    likes: 145,
    views: 950,
    content: '<p>Việc sử dụng 2 hệ điều hành mang lại nhiều lợi ích...</p>'
  },
  {
    id: 16,
    title: 'Đánh giá tai nghe Razer BlackShark V2 Pro 2026',
    endpoint: 'danh-gia-tai-nghe-razer-blackshark-v2-pro',
    categoryEndpoint: 'danh-gia-san-pham',
    mainImageUrl: '',
    likes: 72,
    views: 310,
    content: '<p>BlackShark V2 Pro đã trải qua đợt nâng cấp lớn...</p>'
  },
  {
    id: 17,
    title: 'Hướng dẫn ép xung RAM (Overclock) qua BIOS đơn giản',
    endpoint: 'huong-dan-ep-xung-ram-bios',
    categoryEndpoint: 'huong-dan-thu-thuat',
    mainImageUrl: '',
    likes: 67,
    views: 520,
    content: '<p>Bật XMP/EXPO thực chất cũng là ép xung...</p>'
  },
  {
    id: 18,
    title: 'Màn hình cong và phẳng: Đâu là lựa chọn hoàn hảo?',
    endpoint: 'man-hinh-cong-va-phang-lua-chon',
    categoryEndpoint: 'danh-gia-san-pham',
    mainImageUrl: '',
    likes: 104,
    views: 860,
    content: '<p>Tùy theo nhu cầu làm việc hay chơi game giải trí...</p>'
  },
  {
    id: 19,
    title: 'Nguồn máy tính chuẩn ATX 3.1 có gì đặc biệt?',
    endpoint: 'nguon-may-tinh-chuan-atx-3-1',
    categoryEndpoint: 'tin-tuc-chung',
    mainImageUrl: '',
    likes: 38,
    views: 215,
    content: '<p>Tiêu chuẩn ATX 3.1 khắc phục rất nhiều...</p>'
  },
  {
    id: 20,
    title: 'Top 5 phần mềm benchmark máy tính miễn phí tốt nhất',
    endpoint: 'top-5-phan-mem-benchmark-mien-phi',
    categoryEndpoint: 'huong-dan-thu-thuat',
    mainImageUrl: '',
    likes: 180,
    views: 2200,
    content: '<p>Để đánh giá chính xác sức mạnh của PC, chúng ta cần...</p>'
  }
];
