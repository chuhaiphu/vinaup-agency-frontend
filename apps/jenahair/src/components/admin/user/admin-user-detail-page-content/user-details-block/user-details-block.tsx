'use client';

import { Button, Group, Paper, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { ConfirmModal } from '@vinaup/ui/shared';
import { useState } from 'react';
import { MdLockReset } from 'react-icons/md';

import { resetMyPasswordActionPrivate } from '@/actions/auth-actions';
import { UserResponse } from '@/interfaces/user-interfaces';

interface UserDetailsBlockProps {
  user: UserResponse;
}

export default function UserDetailsBlock({ user }: UserDetailsBlockProps) {
  const [resetPasswordModalOpened, setResetPasswordModalOpened] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleResetPassword = async () => {
    setIsResetting(true);

    const result = await resetMyPasswordActionPrivate();
    if (result.success) {
      notifications.show({
        title: 'Password Reset',
        message: 'Your password has been reset successfully',
        color: 'green',
        position: 'top-center',
        autoClose: 10000,
      });
    } else {
      notifications.show({
        title: 'Reset failed',
        message: result.error || 'Failed to reset password',
        color: 'red',
      });
    }
    setIsResetting(false);
    setResetPasswordModalOpened(false);
  };

  return (
    <>
      <Paper p="lg" mb="lg" style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
        <Group justify="space-between" align="flex-start">
          <Stack gap="md">
            <div>
              <Text size="sm" c="dimmed">
                Email
              </Text>
              <Text size="md" fw={500}>
                {user.email}
              </Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Name
              </Text>
              <Text size="md" fw={500}>
                {user.name || 'N/A'}
              </Text>
            </div>
          </Stack>

          <Button
            variant="outline"
            color="blue"
            leftSection={<MdLockReset size={20} />}
            onClick={() => setResetPasswordModalOpened(true)}
          >
            Reset Password
          </Button>
        </Group>
      </Paper>

      <ConfirmModal
        variant="primary"
        opened={resetPasswordModalOpened}
        onClose={() => setResetPasswordModalOpened(false)}
        onConfirm={handleResetPassword}
        loading={isResetting}
        title="Confirm Reset Password"
        confirmLabel="Reset Password"
        message="Are you sure you want to reset your password?"
      />
    </>
  );
}
