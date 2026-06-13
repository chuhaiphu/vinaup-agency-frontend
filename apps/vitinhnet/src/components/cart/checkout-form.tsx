'use client';

import { Paper, Text, TextInput, Title, Flex, Switch, Box } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconChevronDown } from '@tabler/icons-react';
import { VinaupUserIcon, VinaupPhoneIcon, VinaupLocationIcon } from '@vinaup/ui/cores';
import React from 'react';

import { CheckoutFormData } from '@/interfaces/cart-interfaces';

import classes from './checkout-form.module.scss';

interface CheckoutFormProps {
  form: UseFormReturnType<CheckoutFormData>;
}

export const CheckoutForm = ({ form }: CheckoutFormProps) => {
  const handleToggleShipping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked;
    form.setFieldValue('useBillingForShipping', isChecked);

    if (isChecked) {
      form.setFieldValue('shipping', { ...form.values.billing });
    } else {
      form.setFieldValue('shipping', {
        fullName: '',
        email: '',
        phone: '',
        address: '',
      });
    }
  };

  return (
    <Flex direction="column" gap="20px" mt="20px">
      {/* Billing Info */}
      <Paper radius="md" withBorder p={0} className={classes.formSection}>
        <Flex align="center" p={{ base: 8, md: 'md' }} className={classes.formSectionHeader}>
          <Title order={4} className={classes.sectionTitle}>
            Thông tin thanh toán
          </Title>
        </Flex>

        <Flex direction="column" p={{ base: 8, md: 'md' }} gap="xl">
          <Flex gap="md" align="center">
            <Box>
              <VinaupUserIcon size={24} fill="#121212" />
            </Box>
            <Box flex={1}>
              <Text className={classes.inputLabel}>Họ và tên</Text>
              <TextInput
                variant="unstyled"
                placeholder="Nhập vào đây"
                classNames={{ input: classes.checkoutInput }}
                {...form.getInputProps('billing.fullName')}
              />
            </Box>
          </Flex>

          <Flex gap="md" align="center">
            <Box pt={4}>
              <VinaupLocationIcon size={24} fill="#121212" />
            </Box>
            <Box flex={1}>
              <Flex justify="space-between" align="center" mb={4}>
                <Text className={classes.inputLabel}>Địa chỉ</Text>
                <Flex align="center" gap={4}>
                  <Text className={classes.dropdownLabel}>Tỉnh thành</Text>
                  <IconChevronDown size={14} color="var(--vinaup-blue-link)" />
                </Flex>
              </Flex>
              <TextInput
                variant="unstyled"
                placeholder="Nhập vào đây"
                classNames={{ input: classes.checkoutInput }}
                {...form.getInputProps('billing.address')}
              />
            </Box>
          </Flex>

          <Flex gap="md" align="center">
            <Box pt={4}>
              <VinaupPhoneIcon size={24} fill="#121212" />
            </Box>
            <Box flex={1}>
              <Text className={classes.inputLabel}>Số điện thoại</Text>
              <TextInput
                variant="unstyled"
                placeholder="Nhập vào đây"
                classNames={{ input: classes.checkoutInput }}
                {...form.getInputProps('billing.phone')}
              />
            </Box>
          </Flex>
        </Flex>
      </Paper>

      {/* Shipping Info */}
      <Paper radius="md" withBorder p={0} className={classes.formSection}>
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          align={{ base: 'flex-start', sm: 'center' }}
          justify="space-between"
          gap="sm"
          p={{ base: 8, md: 'md' }}
          className={classes.formSectionHeader}
        >
          <Title order={4} className={classes.sectionTitle}>
            Thông tin giao hàng
          </Title>
          <Switch
            label={<Text className={classes.switchLabel}>Lấy thông tin thanh toán</Text>}
            labelPosition="left"
            checked={form.values.useBillingForShipping}
            onChange={handleToggleShipping}
            color="#0E54C9"
            styles={{ body: { alignItems: 'center' } }}
          />
        </Flex>

        <Flex direction="column" p={{ base: 8, md: 'md' }} gap="xl">
          <Flex gap="md" align="center">
            <Box pt={4}>
              <VinaupLocationIcon size={24} fill="#121212" />
            </Box>
            <Box flex={1}>
              <Text className={classes.inputLabel}>Địa chỉ</Text>
              <TextInput
                variant="unstyled"
                placeholder="Nhập vào đây"
                classNames={{ input: classes.checkoutInput }}
                {...form.getInputProps('shipping.address')}
                disabled={form.values.useBillingForShipping}
              />
            </Box>
          </Flex>

          <Flex gap="md" align="center">
            <Box pt={4}>
              <VinaupPhoneIcon size={24} fill="#121212" />
            </Box>
            <Box flex={1}>
              <Text className={classes.inputLabel}>Số điện thoại</Text>
              <TextInput
                variant="unstyled"
                placeholder="Nhập vào đây"
                classNames={{ input: classes.checkoutInput }}
                {...form.getInputProps('shipping.phone')}
                disabled={form.values.useBillingForShipping}
              />
            </Box>
          </Flex>
        </Flex>
      </Paper>
    </Flex>
  );
};
