'use client';

import { Button, Group, Stack, Text, TextInput, Tooltip } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { SmtpFormValues } from '../_form';

interface SmtpSenderSectionProps {
  form: UseFormReturnType<SmtpFormValues>;
  isSendingTest: boolean;
  onSendTest: () => void;
}

export default function SmtpSenderSection({
  form,
  isSendingTest,
  onSendTest,
}: SmtpSenderSectionProps) {
  return (
    <Stack gap={'md'}>
      <Text size="lg" fw={500}>
        Sender Information
      </Text>
      <Group grow align="flex-start">
        <Stack gap={2}>
          <Text fw={500}>From Name</Text>
          <TextInput placeholder="My Company Name" {...form.getInputProps('fromName')} />
        </Stack>
        <Stack gap={2}>
          <Text fw={500}>From Email</Text>
          <TextInput placeholder="no-reply@example.com" {...form.getInputProps('fromEmail')} />
        </Stack>
      </Group>

      <Stack gap={2}>
        <Group justify="space-between" align="flex-end">
          <Stack gap={2} style={{ flex: 1 }}>
            <Tooltip label="Email address to receive notifications" position="left-end">
              <Text w={'fit-content'} fw={500}>
                Receive Email
              </Text>
            </Tooltip>
            <TextInput placeholder="support@example.com" {...form.getInputProps('receiveEmail')} />
          </Stack>
          <Button
            onClick={onSendTest}
            loading={isSendingTest}
            variant="outline"
            disabled={!form.getValues().receiveEmail}
          >
            Send Test Email
          </Button>
        </Group>
      </Stack>
    </Stack>
  );
}
