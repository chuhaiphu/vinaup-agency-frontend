import { Box, Text, Badge, Button, Table, Group } from '@mantine/core';
import { IconCalendar, IconInbox } from '@tabler/icons-react';

import classes from './page.module.scss';

interface WarrantyItem {
  orderId: string;
  name: string;
  purchaseDate: string;
  expiryDate: string;
  status: 'active' | 'expired';
}

const MOCK_WARRANTY_ITEMS: WarrantyItem[] = [
  {
    orderId: '#Net-260620',
    name: 'HP 600/800 G5 SFF i3 9100 8G 256G A1',
    purchaseDate: '18/06/2026',
    expiryDate: '18/06/2027',
    status: 'active',
  },
  {
    orderId: '#Net-260619',
    name: 'HP 600/800 G5 SFF i3 9100 8G 256G A1',
    purchaseDate: '18/06/2026',
    expiryDate: '18/06/2027',
    status: 'expired',
  },
];

export function WarrantyTab() {
  return (
    <Box>
      <Text className={classes.contentTitle}>Sản phẩm bảo hành</Text>

      {/* Date Filter */}
      <Group mb="md" gap="md">
        <Button variant="subtle" leftSection={<IconCalendar size={18} />} className={classes.dateFilterBtn}>
          22/06/2026
        </Button>
      </Group>

      {MOCK_WARRANTY_ITEMS.length === 0 ? (
        <Box className={classes.noDataBox}>
          <IconInbox size={48} stroke={1.5} />
          <Text className={classes.noDataText}>Bạn chưa có sản phẩm nào trong diện bảo hành.</Text>
        </Box>
      ) : (
        <Box className={classes.warrantyCard}>
          <Box className={classes.tableWrapper}>
            <Table className={classes.orderTable} horizontalSpacing="md" verticalSpacing="sm">
              <Table.Thead className={classes.tableHead}>
                <Table.Tr>
                  <Table.Th>Mã đơn hàng</Table.Th>
                  <Table.Th>Tên hàng</Table.Th>
                  <Table.Th>Ngày mua</Table.Th>
                  <Table.Th>Hạn bảo hành</Table.Th>
                  <Table.Th ta="center">Tình trạng</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {MOCK_WARRANTY_ITEMS.map((item, idx) => (
                  <Table.Tr key={idx}>
                    <Table.Td data-label="Mã đơn hàng">
                      <Text fw={500} size="md">{item.orderId}</Text>
                    </Table.Td>
                    <Table.Td data-label="Tên hàng">
                      <Text fw={600} size="md">{item.name}</Text>
                    </Table.Td>
                    <Table.Td data-label="Ngày mua">
                      <Text size="md">{item.purchaseDate}</Text>
                    </Table.Td>
                    <Table.Td data-label="Hạn bảo hành">
                      <Text size="md">{item.expiryDate}</Text>
                    </Table.Td>
                    <Table.Td data-label="Tình trạng" ta="center">
                      {item.status === 'active' ? (
                        <Badge className={classes.badgeSuccess} variant="light" size="lg" style={{ textTransform: 'none', fontWeight: 600, fontSize: '14px' }}>
                          Còn bảo hành
                        </Badge>
                      ) : (
                        <Badge className={classes.badgeExpired} variant="light" size="lg" style={{ textTransform: 'none', fontWeight: 600, fontSize: '14px' }}>
                          Hết bảo hành
                        </Badge>
                      )}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Box>
        </Box>
      )}
    </Box>
  );
}
