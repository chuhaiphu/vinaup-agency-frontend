'use client';

import React from 'react';
import { Paper, Title, Flex, Text, Divider, Checkbox, Button, Box, Anchor, TextInput } from '@mantine/core';
import { IconDiscount2 } from '@tabler/icons-react';
import { useCartStore } from '@/stores/cart-store';
import { UseFormReturnType } from '@mantine/form';
import { CheckoutFormData } from '@/interfaces/cart';
import classes from './OrderSummary.module.scss';

interface OrderSummaryProps {
  form: UseFormReturnType<CheckoutFormData>;
}

export const OrderSummary = ({ form }: OrderSummaryProps) => {
  const { getSubtotal, discount, shippingFee, getTotal, getTotalSelectedItems } = useCartStore();

  const totalSelected = getTotalSelectedItems();
  
  return (
    <Paper radius="md" withBorder p="md" className={classes.stickySummary}>
      <Title order={4} mb="md" className={classes.summaryTitle}>Thông tin đơn hàng</Title>
      
      <Box bg="var(--mantine-color-gray-0)" p="md" mb="md" style={{ borderRadius: 'var(--mantine-radius-sm)' }}>
        <Flex align="center" gap="xs" mb="xs">
          <Box bg="var(--vinaup-blue-link)" p={2} className={classes.discountIconWrapper}>
            <IconDiscount2 size={16} color="white" />
          </Box>
          <Text className={classes.promoText}>Sử dụng mã giảm giá</Text>
        </Flex>
        <TextInput
          variant="unstyled"
          placeholder="Nhập vào đây"
          classNames={{ input: classes.promoInput }}
        />
      </Box>

      <Flex direction="column" gap="sm" mb="md">
        <Flex justify="space-between">
          <Text className={classes.summaryLabel}>Tổng tiền:</Text>
          <Text className={classes.summaryValue}>{getSubtotal().toLocaleString('vi-VN')} đ</Text>
        </Flex>
        
        <Flex justify="space-between">
          <Text className={classes.summaryLabel}>Giảm giá sản phẩm:</Text>
          <Text className={classes.summaryDiscountValue}>-{discount.toLocaleString('vi-VN')} đ</Text>
        </Flex>

        <Flex justify="space-between">
          <Text className={classes.summaryLabel}>Vận chuyển (Thu chi hộ):</Text>
          <Text className={classes.summaryValue}>{shippingFee.toLocaleString('vi-VN')} đ</Text>
        </Flex>
      </Flex>

      <Divider my="sm" />

      <Flex justify="space-between" align="center" mb="md">
        <Text className={classes.totalLabel}>Cần thanh toán:</Text>
        <Text className={classes.totalValue}>
          {getTotal().toLocaleString('vi-VN')} đ
        </Text>
      </Flex>

      <Box mb="md">
        <Checkbox
          label={
            <Text className={classes.termsText}>
              Đồng ý <Anchor className={classes.termsLink}>điều khoản thanh toán</Anchor>
            </Text>
          }
          color="#C44C50"
          {...form.getInputProps('agreeToTerms', { type: 'checkbox' })}
        />
      </Box>

      <Button
        type="submit"
        color="#C44C50"
        fullWidth
        size="md"
        className={classes.checkoutButton}
        disabled={totalSelected === 0}
      >
        Đặt hàng ngay
      </Button>
    </Paper>
  );
};
