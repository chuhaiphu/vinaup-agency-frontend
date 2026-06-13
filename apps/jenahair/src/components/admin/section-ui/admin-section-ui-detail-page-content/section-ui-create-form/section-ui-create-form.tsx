'use client';

import { Button, NumberInput, Paper, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

import {
  createSectionUIActionPrivate,
  getSectionUICredentialsByCodeActionPrivate,
} from '@/actions/section-ui-actions';
import { DynamicSectionUIResponse } from '@/interfaces/dynamic-section-ui-interfaces';
import { SectionUICredentialsResponse } from '@/interfaces/section-ui-credentials-interfaces';

import PropertyFormatGuideModal from '../property-format-guide-modal/property-format-guide-modal';
import TemplateCodeField from '../template-code-field/template-code-field';

interface SectionUICreateFormProps {
  usedPositions: number[];
  onCreated: (item: DynamicSectionUIResponse) => void;
}

export default function SectionUICreateForm({ usedPositions, onCreated }: SectionUICreateFormProps) {
  const [templateCode, setTemplateCode] = useState<string>('');
  const [validatedCredentials, setValidatedCredentials] =
    useState<SectionUICredentialsResponse | null>(null);
  const [position, setPosition] = useState<number | string>('');
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [guideOpened, { open: openGuide, close: closeGuide }] = useDisclosure(false);

  const handleValidateTemplateCode = async () => {
    if (!templateCode.trim()) {
      notifications.show({ title: 'Error', message: 'Please enter a template code', color: 'red' });
      return;
    }

    setIsValidating(true);
    const response = await getSectionUICredentialsByCodeActionPrivate(templateCode.trim());
    if (response.success && response.data) {
      setValidatedCredentials(response.data);
      notifications.show({ message: 'Template found!', color: 'green', position: 'top-right' });
    } else {
      setValidatedCredentials(null);
      notifications.show({
        title: 'Invalid Code',
        message: 'Template not found. Please check the code.',
        color: 'red',
      });
    }
    setIsValidating(false);
  };

  const handleCreate = async () => {
    if (!validatedCredentials) {
      notifications.show({
        title: 'Error',
        message: 'Please validate a template code first',
        color: 'red',
      });
      return;
    }

    const posNum = typeof position === 'string' ? parseInt(position) : position;
    if (!posNum || posNum < 1) {
      notifications.show({
        title: 'Error',
        message: 'Please enter a valid position (>= 1)',
        color: 'red',
      });
      return;
    }
    if (usedPositions.includes(posNum)) {
      notifications.show({ title: 'Error', message: `Position ${posNum} is already used`, color: 'red' });
      return;
    }

    setIsLoading(true);
    const response = await createSectionUIActionPrivate({
      position: posNum,
      sectionUICredentialsId: validatedCredentials.id,
      properties: validatedCredentials.propertyFormat,
    });

    if (response.success && response.data) {
      notifications.show({ message: 'Dynamic Section UI created', color: 'green', position: 'top-right' });
      onCreated(response.data);
    } else {
      notifications.show({
        title: 'Error',
        message: response.error || 'Failed to create',
        color: 'red',
      });
    }
    setIsLoading(false);
  };

  return (
    <Paper p="md" withBorder bg="gray.0">
      <Stack gap="md">
        <TemplateCodeField
          code={templateCode}
          onCodeChange={(code) => {
            setTemplateCode(code);
            setValidatedCredentials(null);
          }}
          onValidate={handleValidateTemplateCode}
          isValidating={isValidating}
          validatedCredentials={validatedCredentials}
          badgeLabel="✓ Template Valid"
          onViewGuide={openGuide}
        />

        <NumberInput
          label="Position"
          description={`Used positions: ${usedPositions.length > 0 ? usedPositions.join(', ') : 'none'}`}
          placeholder="Enter position number..."
          value={position}
          onChange={setPosition}
          min={1}
          required
          size="md"
        />

        <Button onClick={handleCreate} loading={isLoading} disabled={!validatedCredentials || !position}>
          Create
        </Button>
      </Stack>

      <PropertyFormatGuideModal
        opened={guideOpened}
        onClose={closeGuide}
        propertyFormat={validatedCredentials?.propertyFormat ?? null}
      />
    </Paper>
  );
}
