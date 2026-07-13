import { Box, Group, Text } from '@mantine/core';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Link from 'next/link';
import classes from './popular-destinations.module.scss';
import { Route } from 'next';

const DESTINATIONS = [
  'Ho Chi Minh Museum', 'Temple of Literature', 'Tran Quoc Pagoda', 'Dong Xuan Market',
  'One Pillar Pagoda', 'St. Joseph’s Cathedral', 'Fansipan Peak', 'Trang An Complex',
  'Golden Bridge', 'Marble Mountains', 'My Son Sanctuary', 'Imperial City of Hue',
  'Thien Mu Pagoda', 'Khai Dinh Tomb', 'Linh Ung Pagoda', 'Japanese Covered Bridge',
  'Po Nagar Cham Towers', 'Valley of Love', 'Mui Ne White Sand Dunes', 'Independence Palace',
  'Notre-Dame Cathedral', 'Ben Thanh Market', 'Cu Chi Tunnels', 'Cai Rang Floating Market'
];

const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Biến mọi ký tự không phải chữ/số thành dấu gạch ngang
    .replace(/(^-|-$)+/g, '');   // Xóa dấu gạch ngang ở đầu hoặc cuối nếu bị dư
};

export default function PopularDestinationsSection() {

  return (
    <Box component="section" className={classes.popularDestinationsRoot}>
      <Box className={classes.inner}>
        {/* Header bar: Thanh trắng chứa tiêu đề và filter */}
        <Group className={classes.headerBar} justify="space-between" align="center" gap="md">
          <Text className={classes.headerTitle}>Popular tourist destinations</Text>
          <Group gap={4} className={classes.filterGroup}>
            <Text className={classes.filterText}>Highlight</Text>
            <MdKeyboardArrowDown size={32} className={classes.filterIcon} />
          </Group>
        </Group>

        {/* Custom Grid: Tỉ lệ 1.5 : 1.5 : 1.5 : 1 */}
        <div className={classes.destinationGrid}>
          {DESTINATIONS.map((name, index) => (
            <Link
              key={index}
              href={`/destinations/${createSlug(name)}` as Route} //Dùng route để typescript bỏ qua lỗi đường dẫn không hợp lệ
              className={classes.destinationItem}
            >
              {name}
            </Link>
          ))}
        </div>
      </Box>
    </Box>
  );
}
