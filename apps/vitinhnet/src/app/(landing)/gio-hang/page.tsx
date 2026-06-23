'use client';

import { Container, Grid, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconChevronLeft } from '@tabler/icons-react';
import Link from 'next/link';

import { createOrderActionPublic } from '@/actions/order-actions';
import { CartItemList } from '@/components/landing/cart/cart-item-list';
import classes from '@/components/landing/cart/cart.module.scss';
import { CheckoutForm } from '@/components/landing/cart/checkout-form';
import { OrderSummary } from '@/components/landing/cart/order-summary';
import { CheckoutFormData } from '@/interfaces/cart-interfaces';
import { useCartStore } from '@/libs/zustand/cart-store';

export default function CartCheckoutPage() {
  const items = useCartStore((state) => state.items);

  const form = useForm<CheckoutFormData>({
    initialValues: {
      billing: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
      },
      shipping: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
      },
      useBillingForShipping: false,
      agreeToTerms: false,
    },
    validate: {
      billing: {
        fullName: (value) => (value.trim().length > 0 ? null : 'Vui lòng nhập họ tên'),
        phone: (value) => (value.trim().length > 0 ? null : 'Vui lòng nhập số điện thoại'),
        address: (value) => (value.trim().length > 0 ? null : 'Vui lòng nhập địa chỉ'),
      },
      shipping: {
        fullName: (value, values) =>
          values.useBillingForShipping || value.trim().length > 0 ? null : 'Vui lòng nhập họ tên',
        phone: (value, values) =>
          values.useBillingForShipping || value.trim().length > 0
            ? null
            : 'Vui lòng nhập số điện thoại',
        address: (value, values) =>
          values.useBillingForShipping || value.trim().length > 0 ? null : 'Vui lòng nhập địa chỉ',
      },
      agreeToTerms: (value) => (value ? null : 'Bạn cần đồng ý với điều khoản thanh toán'),
    },
  });

  const handleSubmit = async (values: CheckoutFormData) => {
    const selectedItems = items.filter((item) => item.isSelected);

    if (selectedItems.length === 0) {
      notifications.show({
        title: 'Thất bại',
        message: 'Bạn chưa chọn sản phẩm nào để thanh toán',
        color: 'red',
      });
      return;
    }

    const result = await createOrderActionPublic({ customer: values, items: selectedItems });

    if (result.success) {
      notifications.show({
        title: 'Đã đặt hàng thành công!',
        message: 'Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng.',
        color: 'green',
      });
    } else {
      notifications.show({
        title: 'Thất bại',
        message: result.error ?? 'Không thể tạo đơn hàng, vui lòng thử lại.',
        color: 'red',
      });
    }
  };

  return (
    <Container size="xl" py={{ base: '1rem', md: '2rem' }}>
      <Anchor component={Link} href="/" className={classes.returnLink}>
        <IconChevronLeft size={16} /> Mua thêm sản phẩm khác
      </Anchor>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gap="lg">
          <Grid.Col span={{ base: 12, md: 8 }}>
            {/* Cart Items */}
            <CartItemList />

            {/* Customer Forms */}
            <CheckoutForm form={form} />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            {/* Order Summary & Submit action */}
            <OrderSummary form={form} />
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  );
}
