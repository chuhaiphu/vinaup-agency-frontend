import { Box, Text, Badge, Button, Table, Group, Grid } from '@mantine/core';
import { IconCalendar, IconInbox } from '@tabler/icons-react';
import { ServerPagination } from '@/components/landing/common/server-pagination/server-pagination';

import classes from './page.module.scss';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface OrderHistory {
  orderId: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: 'pending' | 'shipping' | 'completed' | 'cancelled';
}

const createMockOrder = (id: string, status: OrderHistory['status']): OrderHistory => ({
  orderId: id,
  date: '18/06/2026',
  items: [
    {
      id: id + '-1',
      name: 'HP 600/800 G5 SFF i3 9100 8G 256G A1',
      price: 18000000,
      quantity: 1,
      total: 18000000,
    },
    {
      id: id + '-2',
      name: 'HP 600/800 G5 SFF i3 9100 8G 256G A1',
      price: 18000000,
      quantity: 1,
      total: 18000000,
    },
  ],
  subtotal: 36000000,
  discount: 0,
  total: 36000000,
  status,
});

const MOCK_ORDERS: OrderHistory[] = [
  createMockOrder('#Net-2606200', 'completed'),
  createMockOrder('#Net-2606201', 'pending'),
  createMockOrder('#Net-2606202', 'shipping'),
  createMockOrder('#Net-2606203', 'cancelled'),
];

const getStatusBadge = (status: OrderHistory['status']) => {
  const badgeStyle = { textTransform: 'none' as const, fontWeight: 500, fontSize: '14px' };
  switch (status) {
    case 'pending':
      return <Badge color="yellow" variant="light" size="lg" style={badgeStyle}>Chờ xử lý</Badge>;
    case 'shipping':
      return <Badge color="blue" variant="light" size="lg" style={badgeStyle}>Đang giao hàng</Badge>;
    case 'completed':
      return <Badge color="teal" variant="light" size="lg" className={classes.badgeSuccess} style={badgeStyle}>Đã giao hàng</Badge>;
    case 'cancelled':
      return <Badge color="red" variant="light" size="lg" style={badgeStyle}>Đã hủy</Badge>;
    default:
      return null;
  }
};

export function PurchaseHistoryTab() {
  return (
    <Box>
      <Text className={classes.contentTitle}>Lịch sử mua hàng</Text>

      {/* Date Filter */}
      <Group mb="md" gap="md">
        <Button variant="subtle" leftSection={<IconCalendar size={18} />} className={classes.dateFilterBtn}>
          22/06/2026
        </Button>
      </Group>

      {MOCK_ORDERS.length === 0 ? (
        <Box className={classes.noDataBox}>
          <IconInbox size={48} stroke={1.5} />
          <Text className={classes.noDataText}>Bạn chưa có đơn hàng nào.</Text>
        </Box>
      ) : (
        <Box className={classes.ordersList}>
          {MOCK_ORDERS.map((order, idx) => (
            <Box key={idx} className={classes.orderCard}>
              <Box className={classes.tableWrapper}>
                <Table className={classes.orderTable} horizontalSpacing="md" verticalSpacing="sm">
                  <Table.Thead className={classes.tableHead}>
                    <Table.Tr>
                      <Table.Th>Tên hàng</Table.Th>
                      <Table.Th ta="right">Đơn giá</Table.Th>
                      <Table.Th ta="center">Số lượng</Table.Th>
                      <Table.Th ta="right">Thành tiền</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {order.items.map((item, iIdx) => (
                      <Table.Tr key={iIdx}>
                        <Table.Td data-label="Tên hàng">
                          <Text fw={600} size="sm">{item.name}</Text>
                        </Table.Td>
                        <Table.Td data-label="Đơn giá" ta="right">{item.price.toLocaleString('vi-VN')}đ</Table.Td>
                        <Table.Td data-label="Số lượng" ta="center">{item.quantity}</Table.Td>
                        <Table.Td data-label="Thành tiền" ta="right">{item.total.toLocaleString('vi-VN')} đ</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Box>

              <Box className={classes.orderFooter}>
                <Box className={classes.footerLeftInfo}>
                  <Group justify="space-between" mb="xs" wrap="nowrap">
                    <Text>Ngày mua:</Text>
                    <Text ta="right">{order.date}</Text>
                  </Group>
                  <Group justify="space-between" mb="sm" wrap="nowrap">
                    <Text>Mã đơn hàng:</Text>
                    <Text ta="right">{order.orderId}</Text>
                  </Group>
                  <Group justify="space-between" wrap="nowrap">
                    <Text>Tình trạng: </Text>
                    <Box>{getStatusBadge(order.status)}</Box>
                  </Group>
                </Box>

                <Box className={classes.footerRightSummary}>
                  <Group justify="space-between" mb="xs" wrap="nowrap">
                    <Text fw={500}>Tổng cộng</Text>
                    <Text ta="right">{order.subtotal.toLocaleString('vi-VN')} đ</Text>
                  </Group>
                  <Group justify="space-between" mb="xs" wrap="nowrap">
                    <Text fw={500}>Giảm giá</Text>
                    <Text ta="right">{order.discount.toLocaleString('vi-VN')} đ</Text>
                  </Group>
                  <Group justify="space-between" wrap="nowrap">
                    <Text fw={600}>Tổng thanh toán</Text>
                    <Text ta="right" className={classes.totalPriceText}>{order.total.toLocaleString('vi-VN')} đ</Text>
                  </Group>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* Pagination */}
      <Box mt="xl" display="flex" style={{ justifyContent: 'flex-start' }}>
        <ServerPagination currentPage={1} totalPages={10} />
      </Box>
    </Box>
  );
}
