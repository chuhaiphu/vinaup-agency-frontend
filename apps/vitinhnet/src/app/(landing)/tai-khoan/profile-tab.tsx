import { Box, Text, TextInput, Select, Button, Stack } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import classes from './page.module.scss';

// List of major provinces in Vietnam for dropdown select
const VIETNAM_PROVINCES = [
  { value: 'hcm', label: 'Thành phố Hồ Chí Minh' },
  { value: 'hn', label: 'Thành phố Hà Nội' },
  { value: 'dn', label: 'Thành phố Đà Nẵng' },
  { value: 'ct', label: 'Thành phố Cần Thơ' },
  { value: 'hp', label: 'Thành phố Hải Phòng' },
  { value: 'bd', label: 'Tỉnh Bình Dương' },
  { value: 'dnai', label: 'Tỉnh Đồng Nai' },
  { value: 'la', label: 'Tỉnh Long An' },
  { value: 'tg', label: 'Tỉnh Tiền Giang' },
  { value: 'vt', label: 'Tỉnh Bà Rịa - Vũng Tàu' },
];

interface ProfileFormValues {
  fullName: string;
  phoneNumber: string;
  email: string;
  province: string;
  deliveryAddress: string;
}

interface ProfileTabProps {
  form: UseFormReturnType<ProfileFormValues>;
  isPending: boolean;
  onSubmit: (values: ProfileFormValues) => void;
}

export function ProfileTab({ form, isPending, onSubmit }: ProfileTabProps) {
  return (
    <Box>
      <Text className={classes.contentTitle}>Thông tin tài khoản</Text>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack className={classes.formGrid}>
          <Box className={classes.formRow}>
            <Text className={classes.formLabel}>Họ và tên</Text>
            <TextInput
              radius="sm"
              placeholder="Nhập họ và tên"
              className={classes.formInput}
              styles={{ input: { fontSize: 'var(--form-font-size)' } }}
              {...form.getInputProps('fullName')}
            />
          </Box>

          <Box className={classes.formRow}>
            <Text className={classes.formLabel}>Số điện thoại</Text>
            <TextInput
              radius="sm"
              placeholder="Nhập số điện thoại"
              className={classes.formInput}
              styles={{ input: { fontSize: 'var(--form-font-size)' } }}
              {...form.getInputProps('phoneNumber')}
            />
          </Box>

          <Box className={classes.formRow}>
            <Text className={classes.formLabel}>Email</Text>
            <TextInput
              radius="sm"
              placeholder="Nhập địa chỉ email"
              className={classes.formInput}
              styles={{ input: { fontSize: 'var(--form-font-size)' } }}
              {...form.getInputProps('email')}
            />
          </Box>

          <Box className={classes.formRow}>
            <Text className={classes.formLabel}>Tỉnh thành</Text>
            <Select
              radius="sm"
              placeholder="Tỉnh / Thành phố"
              data={VIETNAM_PROVINCES}
              clearable
              searchable
              className={classes.formInput}
              styles={{ input: { fontSize: 'var(--form-font-size)' } }}
              {...form.getInputProps('province')}
            />
          </Box>

          <Box className={classes.formRow}>
            <Text className={classes.formLabel}>Địa chỉ giao hàng</Text>
            <TextInput
              radius="sm"
              placeholder="Nhập địa chỉ giao hàng chi tiết"
              className={classes.formInput}
              styles={{ input: { fontSize: 'var(--form-font-size)' } }}
              {...form.getInputProps('deliveryAddress')}
            />
          </Box>

          <Box className={classes.formRow}>
            <Box /> {/* Spacer for label column */}
            <Button type="submit" className={classes.submitButton} loading={isPending}>
              Lưu thay đổi
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
