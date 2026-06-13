'use client';

import {
  Button,
  Group,
  NumberInput,
  PasswordInput,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { SmtpFormValues } from '../_form';

interface SmtpConfigSectionProps {
  form: UseFormReturnType<SmtpFormValues>;
  isSaving: boolean;
  onSave: () => void;
}

export default function SmtpConfigSection({ form, isSaving, onSave }: SmtpConfigSectionProps) {
  const secure = form.getValues().secure;

  return (
    <Stack gap={'md'}>
      <Group justify="space-between">
        <Text size="lg" fw={500}>
          SMTP Configuration
        </Text>
        <Button loading={isSaving} onClick={onSave} variant="filled" color="teal" size="sm">
          Save
        </Button>
      </Group>

      <Group grow align="flex-start">
        <Stack gap={2}>
          <Text fw={500}>Host</Text>
          <TextInput placeholder="smtp.gmail.com" {...form.getInputProps('host')} />
        </Stack>
        <Stack gap={2}>
          <Text fw={500}>Port</Text>
          <NumberInput
            placeholder="587"
            allowNegative={false}
            {...form.getInputProps('port')}
          />
        </Stack>
      </Group>

      <Group grow align="flex-start">
        <Stack gap={2}>
          <Text fw={500}>Username</Text>
          <TextInput placeholder="email@example.com" {...form.getInputProps('username')} />
        </Stack>
        <Stack gap={2}>
          <Text fw={500}>Password</Text>
          <PasswordInput
            placeholder="Leave blank to keep current password"
            autoComplete="new-password"
            {...form.getInputProps('password')}
          />
        </Stack>
      </Group>

      <Stack gap={0}>
        <Group>
          <Text fw={500}>Secure Connection ({secure ? 'SSL' : 'TLS'})</Text>
          <Text c="dimmed">Require port {secure ? '465' : '587'}</Text>
        </Group>
        <Switch
          label={secure ? 'Enabled' : 'Disabled'}
          checked={secure}
          onChange={(e) => form.setFieldValue('secure', e.currentTarget.checked)}
        />
      </Stack>
    </Stack>
  );
}
