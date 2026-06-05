'use client';

import { Container, Grid, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import Link from 'next/link';
import { IconChevronLeft } from '@tabler/icons-react';
import { CartItemList } from '@/components/cart/CartItemList';
import { CheckoutForm } from '@/components/cart/CheckoutForm';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { CheckoutFormData } from '@/interfaces/cart';
import { useCartStore } from '@/stores/cart-store';
import classes from '@/components/cart/cart.module.scss';

export default function CartCheckoutPage() {
  const { items } = useCartStore();

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
        fullName: (value, values) => (values.useBillingForShipping || value.trim().length > 0 ? null : 'Vui lòng nhập họ tên'),
        phone: (value, values) => (values.useBillingForShipping || value.trim().length > 0 ? null : 'Vui lòng nhập số điện thoại'),
        address: (value, values) => (values.useBillingForShipping || value.trim().length > 0 ? null : 'Vui lòng nhập địa chỉ'),
      },
      agreeToTerms: (value) => (value ? null : 'Bạn cần đồng ý với điều khoản thanh toán'),
    },
  });

  const handleSubmit = (values: CheckoutFormData) => {
    const selectedItems = items.filter(item => item.isSelected);
    
    if (selectedItems.length === 0) {
      notifications.show({
        title: 'Thất bại',
        message: 'Bạn chưa chọn sản phẩm nào để thanh toán',
        color: 'red',
      });
      return;
    }

    const payload = {
      customer: values,
      cart: selectedItems,
    };

    console.log('--- MOCK SUBMIT PAYLOAD ---');
    console.log(JSON.stringify(payload, null, 2));

    notifications.show({
      title: 'Đã đặt hàng thành công!',
      message: 'Vui lòng mở console để kiểm tra payload giả lập.',
      color: 'green',
    });
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
