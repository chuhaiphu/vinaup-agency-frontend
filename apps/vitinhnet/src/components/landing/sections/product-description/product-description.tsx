import { Container, Grid, GridCol, Box, Title, Text, List, ListItem, Group, Stack, AspectRatio, Image } from '@mantine/core';
import classes from './product-description.module.scss';
import {
    VinaupPriceTagIcon,
    VinaupLocationIcon,
    VinaupArrowRightIcon
} from '@vinaup/ui/cores';
import { VideoSection } from '@vinaup/ui/landing';

export function ProductDescription() {
    return (
        <Container size="xl" py={{ base: '1rem', sm: '2rem' }}>
            <Group gap="xs" mb="sm" className={classes.categoryTag}>
                <VinaupPriceTagIcon size={18} fill="var(--vinaup-soft-crimson)" />
                <Text size="md" tt="uppercase" fw={500}>Tên danh mục A</Text>
            </Group>

            <Grid gap={{ base: '16px', md: '20px' }}>
                {/* Left Column */}
                <GridCol span={{ base: 12, md: 8, lg: 8 }}>
                    <Box className={classes.card} mb={'20px'}>
                        <Group gap="sm" mb="md" align="center" wrap="nowrap">
                            <VinaupArrowRightIcon size={28} fill="var(--vinaup-blue-link)" />
                            <Title
                                order={2}
                                className={classes.sectionTitle}
                            >
                                Thông tin sản phẩm
                            </Title>
                        </Group>

                        <Text fw={700} mb="1rem" size="md">
                            HP EliteDesk 800 G5 SFF là dòng máy bộ doanh nghiệp cao cấp của HP, cực kỳ phổ biến tại thị trường máy cũ/refurbished Việt Nam nhờ độ bền bỉ vượt trội, hiệu năng ổn định và khả năng nâng cấp linh hoạt.
                        </Text>

                        <Title order={5} className={classes.subTitle}>
                            🔴 CHÍNH SÁCH BÁN HÀNG:
                        </Title>
                        <List mb="1rem" spacing="xs" size="md">
                            <ListItem>BẢO HÀNH 12 THÁNG – Chế độ 1 Đổi 1 nhanh chóng trong suốt thời gian bảo hành.</ListItem>
                            <ListItem>(Giá bán trên chưa bao gồm VAT)</ListItem>
                        </List>

                        <Title order={5} className={classes.subTitle}>
                            ⚙️ Cấu hình phần cứng
                        </Title>
                        <List mb="1rem" spacing="xs" size="md">
                            <ListItem><b>CPU:</b> Intel Core i3-9100</ListItem>
                            <ListItem><b>RAM:</b> 8GB</ListItem>
                            <ListItem><b>Ổ cứng:</b> SSD 512GB</ListItem>
                            <ListItem><b>GPU:</b> Intel UHD 630 (Thiết kế bo mạch sẵn sàng để gắn thêm VGA rời)</ListItem>
                            <ListItem><b>Nguồn:</b> ~180W (Tối ưu hóa lượng điện tiêu thụ)</ListItem>
                            <ListItem><b>Kích thước:</b> Nhỏ gọn dạng SFF (Small Form Factor), tiết kiệm tối đa không gian bàn làm việc.</ListItem>
                        </List>

                        <Title order={5} className={classes.subTitle}>
                            🌟 Ưu điểm nổi bật
                        </Title>
                        <List mb="1rem" spacing="xs" size="md">
                            <ListItem><b>Hiệu năng tối ưu trong tầm giá:</b> Hỗ trợ nâng cấp tốt lên các dòng i5/i7 Gen 9, cấu hình vẫn cực kỳ mượt mà ở thời điểm hiện tại (2024).</ListItem>
                            <ListItem><b>Độ bền chuẩn doanh nghiệp:</b> Linh kiện cao cấp giúp máy vận hành bền bỉ, chạy liên tục 24/7 làm server rất tốt.</ListItem>
                            <ListItem>
                                <b>Khả năng nâng cấp dễ dàng:</b>
                                <List withPadding size="md" mt="xs">
                                    <ListItem>Nâng cấp RAM lên đến 32–64GB thoải mái.</ListItem>
                                    <ListItem>Hỗ trợ khe cắm SSD NVMe tốc độ cực nhanh.</ListItem>
                                    <ListItem>Thiết kế vừa vặn để gắn thêm VGA Low-Profile khi có nhu cầu đồ họa.</ListItem>
                                </List>
                            </ListItem>
                            <ListItem><b>Kết nối đa dạng:</b> Sở hữu đầy đủ các cổng giao tiếp hiện đại như USB 3.1, Type-C, DisplayPort và VGA.</ListItem>
                            <ListItem><b>Siêu tiết kiệm điện:</b> Lượng điện tiêu thụ ở trạng thái chờ (idle) cực thấp, chỉ vài Watt theo thực tế trải nghiệm.</ListItem>
                        </List>

                        <Title order={5} className={classes.subTitle}>
                            🎯 Phù hợp với đối tượng nào?
                        </Title>
                        <List spacing="xs" size="md">
                            <ListItem><b>Nhu cầu văn phòng:</b> Kế toán, hành chính, quản lý bán hàng, telesale.</ListItem>
                            <ListItem><b>Học tập & Lập trình:</b> Lựa chọn kinh tế và hiệu quả cho học sinh, sinh viên, coder.</ListItem>
                            <ListItem><b>Đồ họa nhẹ:</b> Xử lý mượt mà các file Photoshop, Illustrator (AI) cơ bản.</ListItem>
                        </List>
                    </Box>

                    <Box className={classes.videoWrapper}>
                        <VideoSection
                            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                            height={400}
                        />
                    </Box>

                    <Group gap="xs" mt="sm">
                        <VinaupLocationIcon size={20} fill="var(--vinaup-soft-crimson)" />
                        <Text size="md">Dong Nai, Ho Chi Minh</Text>
                    </Group>
                </GridCol>

                {/* Right Column */}
                <GridCol span={{ base: 12, md: 4, lg: 4 }}>
                    <Box className={classes.card} mb={{ base: '16px', md: '20px' }}>
                        <Group gap="sm" mb="md" align="center" wrap="nowrap">
                            <VinaupArrowRightIcon size={28} fill="var(--vinaup-blue-link)" />
                            <Title
                                order={2}
                                className={classes.sectionTitle}
                            >
                                Cấu hình phần cứng
                            </Title>
                        </Group>
                        <List spacing="sm" size="md">
                            <ListItem><b>CPU:</b> Intel Core i3-9100</ListItem>
                            <ListItem><b>RAM:</b> 8GB</ListItem>
                            <ListItem><b>Ổ cứng:</b> SSD 512GB</ListItem>
                            <ListItem><b>GPU:</b> Intel UHD 630 (Thiết kế bo mạch sẵn sàng để gắn thêm VGA rời)</ListItem>
                            <ListItem><b>Nguồn:</b> ~180W (Tối ưu hóa lượng điện tiêu thụ)</ListItem>
                            <ListItem><b>Kích thước:</b> Nhỏ gọn dạng SFF (Small Form Factor), tiết kiệm tối đa không gian bàn làm việc.</ListItem>
                        </List>
                    </Box>

                    {/* SỬ DỤNG STACK ĐỂ XẾP DỌC 2 ẢNH VUÔNG */}
                    <Stack gap={'20px'}>
                        <AspectRatio ratio={1 / 1}>
                            <Image
                                src="/1751241600_Dell5490(1).jpg"
                                alt="Ảnh mô tả 1"
                                radius="md"
                            />
                        </AspectRatio>
                        <AspectRatio ratio={1 / 1}>
                            <Image
                                src="/1751241600_Dell5490(1).jpg"
                                alt="Ảnh mô tả 2"
                                radius="md"
                            />
                        </AspectRatio>
                    </Stack>
                </GridCol>
            </Grid>
        </Container>
    );
}