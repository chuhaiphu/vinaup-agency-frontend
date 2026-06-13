'use client';

import { Button, Modal, Stack, Text, Textarea } from '@mantine/core';
import { CopyToClipboard } from '@vinaup/ui/shared';

interface PropertyFormatGuideModalProps {
  opened: boolean;
  onClose: () => void;
  propertyFormat: Record<string, unknown> | null;
}

export default function PropertyFormatGuideModal({
  opened,
  onClose,
  propertyFormat,
}: PropertyFormatGuideModalProps) {
  const formatJson = propertyFormat ? JSON.stringify(propertyFormat, null, 2) : '';

  return (
    <Modal opened={opened} onClose={onClose} title="Property Format Guide" size="lg">
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Copy the JSON schema below and use it as a template for your properties configuration.
        </Text>
        <Textarea
          readOnly
          autosize
          minRows={10}
          maxRows={20}
          value={formatJson}
          styles={{ input: { fontFamily: 'monospace', fontSize: '12px' } }}
        />
        <CopyToClipboard content={formatJson} notification={{ message: 'Copied to clipboard' }}>
          <Button component="div">Copy to Clipboard</Button>
        </CopyToClipboard>
      </Stack>
    </Modal>
  );
}
