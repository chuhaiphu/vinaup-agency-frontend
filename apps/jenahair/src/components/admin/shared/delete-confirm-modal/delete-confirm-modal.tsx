'use client';

import { Button, Group, Modal, Stack, Text } from '@mantine/core';

interface DeleteConfirmModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  title?: string;
  message?: string;
}

export default function DeleteConfirmModal({
  opened,
  onClose,
  onConfirm,
  isDeleting,
  title = 'Confirm Delete',
  message,
}: DeleteConfirmModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <Stack>
        {message && <Text>{message}</Text>}
        <Group justify="flex-end" mt="sm">
          <Button variant="default" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button color="red" onClick={onConfirm} loading={isDeleting}>
            Delete
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
