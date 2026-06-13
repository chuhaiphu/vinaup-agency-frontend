'use client';

import { Button, Group, Paper, Stack, Text, TextInput } from '@mantine/core';

import { SectionUICredentialsResponse } from '@/interfaces/section-ui-credentials-interfaces';

import classes from './template-code-field.module.scss';

interface TemplateCodeFieldProps {
  code: string;
  onCodeChange: (code: string) => void;
  onValidate: () => void;
  isValidating: boolean;
  validatedCredentials: SectionUICredentialsResponse | null;
  badgeLabel: string;
  onViewGuide: () => void;
  // Edit mode passes the "Apply" button here; create mode leaves it out.
  extraAction?: React.ReactNode;
}

export default function TemplateCodeField({
  code,
  onCodeChange,
  onValidate,
  isValidating,
  validatedCredentials,
  badgeLabel,
  onViewGuide,
  extraAction,
}: TemplateCodeFieldProps) {
  return (
    <Stack gap="xs">
      <Text size="md" fw={500}>
        Template Code
      </Text>
      <Group>
        <TextInput
          size="md"
          placeholder="Enter template code..."
          value={code}
          onChange={(e) => onCodeChange(e.currentTarget.value)}
          className={classes.templateInput}
        />
        <Button onClick={onValidate} loading={isValidating} variant="outline" size="md">
          Validate
        </Button>
        {extraAction}
      </Group>
      {validatedCredentials && (
        <Paper p="sm" withBorder bg="green.0">
          <Group justify="space-between">
            <Text size="sm" c="green.8" fw={500}>
              {badgeLabel}
            </Text>
            <Button variant="outline" size="xs" onClick={onViewGuide}>
              View Guide
            </Button>
          </Group>
        </Paper>
      )}
    </Stack>
  );
}
