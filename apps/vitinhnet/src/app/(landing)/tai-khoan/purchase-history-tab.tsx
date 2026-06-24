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
              {/* DESKTOP VIEW */}
              <Box visibleFrom="sm">
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
                          <Table.Td>
                            <Text fw={600} size="md">{item.name}</Text>
                          </Table.Td>
                          <Table.Td ta="right">
                            <Text size="md">{item.price.toLocaleString('vi-VN')}đ</Text>
                          </Table.Td>
                          <Table.Td ta="center">
                            <Text size="md">{item.quantity}</Text>
                          </Table.Td>
                          <Table.Td ta="right">
                            <Text size="md" fw={500}>{item.total.toLocaleString('vi-VN')} đ</Text>
                          </Table.Td>
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

              {/* MOBILE VIEW */}
              <Box hiddenFrom="sm">
                <Box p="md" pb="xs">
                  <Text fw={700} size="xl">Đơn hàng {order.orderId}</Text>
                </Box>

                <Box px="md">
                  {order.items.map((item, iIdx) => (
                    <Group key={iIdx} justify="space-between" align="flex-start" py="sm" style={{ borderBottom: '1px solid #e0e0e0' }} wrap="nowrap">
                      <Text fw={600} size="md" style={{ flex: 1 }}>{item.name}</Text>
                      <Box ta="right" style={{ minWidth: 110 }}>
                        <Text size="md" c="dimmed">SL: {item.quantity}</Text>
                        <Text size="md">{item.price.toLocaleString('vi-VN')}đ</Text>
                      </Box>
                    </Group>
                  ))}
                </Box>

                <Box px="md" py="md">
                  <Group justify="space-between" mb="sm">
                    <Text size="md">Tình trạng:</Text>
                    {getStatusBadge(order.status)}
                  </Group>
                  <Group justify="space-between" mb="xs">
                    <Text size="md">Ngày mua:</Text>
                    <Text size="md" fw={500}>{order.date}</Text>
                  </Group>
                  <Group justify="space-between" mb="xs">
                    <Text size="md">Tổng cộng:</Text>
                    <Text size="md" fw={500}>{order.subtotal.toLocaleString('vi-VN')}đ</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="md">Giảm giá:</Text>
                    <Text size="md" fw={500}>{order.discount.toLocaleString('vi-VN')}đ</Text>
                  </Group>
                </Box>

                <Box p="md" bg="#f8f9fa">
                  <Group justify="space-between" wrap="nowrap">
                    <Text fw={700} size="xl">Tổng thanh toán:</Text>
                    <Text fw={700} size="xl" className={classes.totalPriceText}>
                      {order.total.toLocaleString('vi-VN')}đ
                    </Text>
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
