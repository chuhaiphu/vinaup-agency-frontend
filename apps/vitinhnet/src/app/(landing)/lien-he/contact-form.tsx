'use client';

import { Paper, Text, TextInput, Textarea, Title, Flex, Box, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconMessageDots } from '@tabler/icons-react';
import { VinaupUserIcon, VinaupPhoneIcon, VinaupEmailIcon } from '@vinaup/ui/cores';
import { useState } from 'react';

import { createCustomerContactActionPublic } from '@/actions/customer-contact-actions';
import { CreateCustomerContactRequest } from '@/interfaces/customer-contact-interfaces';

import classes from './page.module.scss';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateCustomerContactRequest>({
    initialValues: { fullName: '', phone: '', email: '', message: '' },
    validate: {
      fullName: (value) => (value.trim().length > 0 ? null : 'Vui lòng nhập họ và tên'),
      phone: (value) => (value.trim().length > 0 ? null : 'Vui lòng nhập số điện thoại'),
    },
  });

  const handleSubmit = async (values: CreateCustomerContactRequest) => {
    setIsSubmitting(true);
    const result = await createCustomerContactActionPublic(values);
    setIsSubmitting(false);

    if (result.success) {
      notifications.show({
        title: 'Đã gửi liên hệ',
        message: 'Cảm ơn bạn, chúng tôi sẽ phản hồi trong thời gian sớm nhất.',
        color: 'green',
      });
      form.reset();
    } else {
      notifications.show({
        title: 'Thất bại',
        message: result.error ?? 'Không thể gửi liên hệ, vui lòng thử lại.',
        color: 'red',
      });
    }
  };

  return (
    <Paper radius="md" withBorder p={0} className={classes.formSection}>
      <Flex align="center" className={classes.formSectionHeader}>
        <Title order={4} className={classes.sectionTitle}>
          Nhập thông tin
        </Title>
      </Flex>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column" p={{ base: 8, md: 'md' }} gap="xl">
          <Flex gap="md" align="center">
            <Box>
              <VinaupUserIcon size={24} fill="var(--vinaup-black)" />
            </Box>
            <Box flex={1}>
              <Text className={classes.inputLabel}>Họ và tên</Text>
              <TextInput
                variant="unstyled"
                placeholder="Nhập họ và tên"
                classNames={{ input: classes.contactInput }}
                {...form.getInputProps('fullName')}
              />
            </Box>
          </Flex>

          <Flex gap="md" align="center">
            <Box>
              <VinaupPhoneIcon size={24} fill="var(--vinaup-black)" />
            </Box>
            <Box flex={1}>
              <Text className={classes.inputLabel}>Số điện thoại</Text>
              <TextInput
                variant="unstyled"
                placeholder="Nhập số điện thoại"
                classNames={{ input: classes.contactInput }}
                {...form.getInputProps('phone')}
              />
            </Box>
          </Flex>

          <Flex gap="md" align="center">
            <Box>
              <VinaupEmailIcon size={24} fill="var(--vinaup-black)" />
            </Box>
            <Box flex={1}>
              <Text className={classes.inputLabel}>Email</Text>
              <TextInput
                variant="unstyled"
                placeholder="Nhập địa chỉ email"
                classNames={{ input: classes.contactInput }}
                {...form.getInputProps('email')}
              />
            </Box>
          </Flex>

          <Flex gap="md" align="flex-start">
            <Box>
              <IconMessageDots size={30} color="var(--vinaup-black)" stroke={2} />
            </Box>
            <Box flex={1}>
              <Text className={classes.inputLabel}>Nội dung</Text>
              <Textarea
                variant="unstyled"
                placeholder="Nhập nội dung bạn cần liên hệ..."
                classNames={{ input: classes.contactInput }}
                minRows={2}
                autosize
                {...form.getInputProps('message')}
              />
            </Box>
          </Flex>

          <Flex justify="flex-end">
            <Button
              type="submit"
              loading={isSubmitting}
              color="var(--vinaup-soft-crimson)"
              size="md"
              radius="md"
              px="xl"
              className={classes.submitButton}
            >
              Gửi liên hệ
            </Button>
          </Flex>
        </Flex>
      </form>
    </Paper>
  );
}
