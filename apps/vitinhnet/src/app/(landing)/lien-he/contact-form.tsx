'use client';

import { Paper, Text, TextInput, Textarea, Flex, Box, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconMessageDots } from '@tabler/icons-react';
import { VinaupUserIcon, VinaupPhoneIcon, VinaupEmailIcon, VinaupSendIcon } from '@vinaup/ui/cores';
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

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column" p={{ base: 8, md: 'md' }} gap={4}>
          <Flex gap="md" align="center">
            <VinaupUserIcon size={24} fill="var(--vinaup-blue-link)" />
            <Box flex={1}>
              <Text className={classes.inputLabel} c={form.errors.fullName ? 'red' : undefined}>Họ tên</Text>
              <TextInput
                variant="unstyled"
                placeholder="---"
                classNames={{ input: classes.contactInput }}
                {...form.getInputProps('fullName')}
                error={form.errors.fullName ? true : undefined}
              />
            </Box>
          </Flex>

          <Flex gap="md" align="center">
            <VinaupPhoneIcon size={24} fill="var(--vinaup-blue-link)" />
            <Box flex={1}>
              <Text className={classes.inputLabel} c={form.errors.phone ? 'red' : undefined}>Số điện thoại</Text>
              <TextInput
                variant="unstyled"
                placeholder="---"
                classNames={{ input: classes.contactInput }}
                {...form.getInputProps('phone')}
                error={form.errors.phone ? true : undefined}
              />
            </Box>
          </Flex>

          <Flex gap="md" align="center">
            <VinaupEmailIcon size={24} fill="var(--vinaup-blue-link)" />
            <Box flex={1}>
              <Text className={classes.inputLabel} c={form.errors.email ? 'red' : undefined}>Email</Text>
              <TextInput
                variant="unstyled"
                placeholder="---"
                classNames={{ input: classes.contactInput }}
                {...form.getInputProps('email')}
                error={form.errors.email ? true : undefined}
              />
            </Box>
          </Flex>

          <Flex gap="md" align="flex-start">
            <Box pt={"1rem"}>
              <IconMessageDots size={30} color="var(--vinaup-blue-link)" stroke={2} />
            </Box>
            <Box flex={1}>
              <Text className={classes.inputLabel} c={form.errors.message ? 'red' : undefined}>Nội dung</Text>
              <Textarea
                variant="unstyled"
                placeholder="---"
                classNames={{ input: classes.contactInput }}
                minRows={2}
                autosize
                {...form.getInputProps('message')}
                error={form.errors.message ? true : undefined}
              />
            </Box>
          </Flex>

          <Flex justify="flex-end">
            <Button
              type="submit"
              loading={isSubmitting}
              variant="transparent"
              color="var(--vinaup-blue-link)"
              rightSection={<VinaupSendIcon size={24} fill="var(--vinaup-blue-link)" />}
              size="md"
              className={classes.submitButton}
              fz="lg"
              fw={600}
            >
              Gửi
            </Button>
          </Flex>
        </Flex>
      </form>
    </Paper >
  );
}
