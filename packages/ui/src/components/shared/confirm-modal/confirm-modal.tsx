'use client';

import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { ReactNode } from 'react';

type ConfirmModalVariant = 'danger' | 'primary';

interface ConfirmModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  message?: ReactNode;
  title?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmModalVariant;
}

// ─── Variant presets ─────
// Centralize the only two confirm flavors used in admin (destructive vs. neutral)
// so call sites pick a variant instead of repeating color + default label/title.
const variantPresetMap: Record<ConfirmModalVariant, { color: string; label: string; title: string }> =
  {
    danger: { color: 'red', label: 'Delete', title: 'Confirm Delete' },
    primary: { color: 'blue', label: 'Confirm', title: 'Confirm' },
  };

export function ConfirmModal({
  opened,
  onClose,
  onConfirm,
  loading = false,
  message,
  title,
  confirmLabel,
  cancelLabel = 'Cancel',
  variant = 'primary',
}: ConfirmModalProps) {
  const preset = variantPresetMap[variant];

  return (
    <Modal opened={opened} onClose={onClose} title={title ?? preset.title} centered>
      <Stack>
        {message && <Text>{message}</Text>}
        <Group justify="flex-end" mt="sm">
          <Button variant="default" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button color={preset.color} onClick={onConfirm} loading={loading}>
            {confirmLabel ?? preset.label}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
