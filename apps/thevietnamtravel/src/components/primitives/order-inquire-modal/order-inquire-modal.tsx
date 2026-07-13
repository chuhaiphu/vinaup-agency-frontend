'use client';

import { Title, Text, Group, Divider, Stack, Box, Modal, ModalProps, ActionIcon } from '@mantine/core';
import {
  VinaupLocationIcon,
  VinaupUserIcon,
  VinaupEmailIcon,
  VinaupPhoneIcon,
  VinaupSendIcon
} from '@vinaup/ui/cores';
import Image from 'next/image';
import classes from './order-inquire-modal.module.scss';

interface ModalInputProps {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  error?: boolean;
  rightSection?: React.ReactNode;
}

const ModalInput = ({ icon, label, placeholder, error, rightSection }: ModalInputProps) => (
  <Box
    className={classes.orderInquireModalRoot}
    data-error={error || undefined}
  >
    <Box className={classes.iconWrapper}>
      {icon}
    </Box>
    <Box style={{ flex: 1 }}>
      <Text size="11px" fw={700} c={error ? '#fa5252' : 'var(--vinaup-black)'} mb={2}>
        {label}
      </Text>
      <input
        className={classes.nativeInput}
        placeholder={placeholder}
      />
    </Box>
    {rightSection && (
      <Box className={classes.rightSection}>
        {rightSection}
      </Box>
    )}
  </Box>
);

export default function OrderInquireModal(props: ModalProps) {
  return (
    <Modal
      {...props}
      withCloseButton={false}
      size="lg"
      radius="md"
      padding={0}
    >
      <Box p={{ base: 'md', lg: 'xl' }}>
        <Group justify="space-between" align="center" mb="md">
          <Title order={2} c="var(--vinaup-green)">Order Inquire</Title>
          <ActionIcon variant="transparent" onClick={props.onClose} size={32}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="var(--vinaup-green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ActionIcon>
        </Group>

        <Stack gap="md">
          <Box>
            <Title order={3} c="var(--vinaup-green)" fw={500} mb={4}>
              Title tên chương trình du lịch [h1]
            </Title>
            <Text size="md" fw={500}>
              Price: <Text component="span" td="underline" size="sm">đ</Text> <Text component="span" fw={700}>12.000.000</Text>
            </Text>
          </Box>

          <Divider color="gray.3" />

          <Box>
            <Title order={4} c="var(--vinaup-green-brand)" mb="md">
              Your information
            </Title>
            <Stack gap="sm">
              <ModalInput
                icon={<VinaupUserIcon size={20} fill="var(--vinaup-green-brand)" />}
                label="Full name"
                placeholder="---"
              />
              <ModalInput
                icon={<VinaupEmailIcon size={20} fill="var(--vinaup-green-brand)" />}
                label="Email"
                placeholder="---"
              />
              <ModalInput
                icon={<VinaupPhoneIcon size={20} fill="var(--vinaup-green-brand)" />}
                label="Whatsapp"
                placeholder="---"
              />
              <ModalInput
                icon={<VinaupLocationIcon size={20} fill="var(--vinaup-green-brand)" />}
                label="National"
                placeholder="---"
                rightSection={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--vinaup-green-brand)" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 15.5L7.5 11H10.5V8H13.5V11H16.5L12 15.5Z" />
                  </svg>
                }
              />
            </Stack>
          </Box>

          <Divider color="gray.3" />

          <Box>
            <Title order={4} c="var(--vinaup-green)" mb="xs">
              Request booking to
            </Title>
            <Text size="sm" c="dimmed">
              Travel seller / Agency Name ABC
            </Text>
            <Title order={4} mb="md">
              Nguyễn Văn Tèo Em
            </Title>

            <Group justify="space-between" align="center" mt="md">
              <Box className={classes.recaptchaContainer}>
                <Group gap="sm">
                  <div className={classes.checkboxMock} />
                  <Box>
                    <Text size="13px" fw={500} c="#222">I'm not a robot</Text>
                    <Text size="8px" c="dimmed" mt={2} lh="1.2">
                      reCAPTCHA is changing its terms of service.<br />
                      <span className={classes.takeActionText}>Take action.</span>
                    </Text>
                  </Box>
                </Group>
                <Stack gap={0} align="center">
                  <Image src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" width={24} height={24} unoptimized />
                  <Text size="8px" c="dimmed" mt={2}>reCAPTCHA</Text>
                  <Text size="8px" c="dimmed">Privacy - Terms</Text>
                </Stack>
              </Box>

              <Group gap={8} className={classes.sendButton} align="center">
                <Text fw={700} size="18px" c="var(--vinaup-green)">Send</Text>
                <VinaupSendIcon size={24} fill="var(--vinaup-green)" />
              </Group>
            </Group>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
}
