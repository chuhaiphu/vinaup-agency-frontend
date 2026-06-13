'use client';

import { Button, Group, Select, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { JSONEditor } from '@vinaup/ui/admin';
import { useState } from 'react';

import {
  deleteSectionUIActionPrivate,
  getSectionUICredentialsByCodeActionPrivate,
  updateSectionUIActionPrivate,
} from '@/actions/section-ui-actions';
import DeleteConfirmModal from '@/components/admin/shared/delete-confirm-modal/delete-confirm-modal';
import { MAX_SECTION_POSITION } from '@/constants';
import { DynamicSectionUIResponse } from '@/interfaces/dynamic-section-ui-interfaces';
import { SectionUICredentialsResponse } from '@/interfaces/section-ui-credentials-interfaces';

import { SectionUIEditFormValues, toSectionUIEditFormValues } from '../_form';
import classes from './section-ui-edit-form.module.scss';
import PropertyFormatGuideModal from '../property-format-guide-modal/property-format-guide-modal';
import TemplateCodeField from '../template-code-field/template-code-field';

interface SectionUIEditFormProps {
  item: DynamicSectionUIResponse;
  usedPositions: number[];
  onUpdated: (item: DynamicSectionUIResponse) => void;
  onDeleted: () => void;
}

export default function SectionUIEditForm({
  item,
  usedPositions,
  onUpdated,
  onDeleted,
}: SectionUIEditFormProps) {
  const form = useForm<SectionUIEditFormValues>({
    initialValues: toSectionUIEditFormValues(item),
    validate: {
      // The item may keep its own position; only other rows' positions are taken.
      position: (value) =>
        value !== item.position && usedPositions.includes(value)
          ? `Position ${value} is already used`
          : null,
    },
  });

  const [templateCode, setTemplateCode] = useState<string>(item.sectionUICredentials?.code || '');
  const [validatedCredentials, setValidatedCredentials] =
    useState<SectionUICredentialsResponse | null>(item.sectionUICredentials || null);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
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

  // Buffered: applying a template swaps the credentials id and resets the properties buffer to the
  // new format. Nothing is persisted until Save — consistent with the other detail screens.
  const handleApplyTemplate = () => {
    if (!validatedCredentials) return;
    form.setFieldValue('sectionUICredentialsId', validatedCredentials.id);
    form.setFieldValue(
      'propertiesJson',
      JSON.stringify(validatedCredentials.propertyFormat, null, 2),
    );
  };

  const handleSave = async () => {
    if (form.validate().hasErrors) return;

    const values = form.getValues();

    // ─── Parse the buffered JSON before persisting ─────
    // The JSONEditor edits free text; reject invalid JSON instead of saving a broken payload.
    let parsedProperties: Record<string, unknown> | null;
    try {
      parsedProperties = values.propertiesJson.trim() ? JSON.parse(values.propertiesJson) : null;
    } catch {
      notifications.show({
        title: 'Invalid JSON',
        message: 'Properties must be valid JSON',
        color: 'red',
      });
      return;
    }

    setIsSaving(true);
    const response = await updateSectionUIActionPrivate(item.id, {
      position: values.position,
      sectionUICredentialsId: values.sectionUICredentialsId,
      properties: parsedProperties,
    });

    if (response.success && response.data) {
      onUpdated(response.data);
      form.resetDirty();
      notifications.show({ message: 'Saved', color: 'green', position: 'top-right' });
    } else {
      notifications.show({
        title: 'Error',
        message: response.error || 'Failed to save',
        color: 'red',
      });
    }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const response = await deleteSectionUIActionPrivate(item.id);
    if (response.success) {
      notifications.show({ message: 'Deleted successfully', color: 'green', position: 'top-right' });
      onDeleted();
    } else {
      notifications.show({
        title: 'Error',
        message: response.error || 'Failed to delete',
        color: 'red',
      });
      setIsDeleting(false);
      closeDeleteModal();
    }
  };

  const positionValue = form.getValues().position;
  const credentialsId = form.getValues().sectionUICredentialsId;
  const canApplyTemplate = !!validatedCredentials && validatedCredentials.id !== credentialsId;

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Group gap="md">
          <Text size="md" fw={500}>
            Position
          </Text>
          <Select
            value={positionValue.toString()}
            onChange={(value) => {
              if (!value) return;
              form.setFieldValue('position', parseInt(value));
            }}
            data={Array.from({ length: MAX_SECTION_POSITION }, (_, i) => i + 1).map((pos) => ({
              value: pos.toString(),
              label: pos.toString(),
              disabled: usedPositions.includes(pos) && pos !== item.position,
            }))}
            size="sm"
            className={classes.positionSelect}
            error={form.errors.position}
          />
        </Group>
      </Group>

      <TemplateCodeField
        code={templateCode}
        onCodeChange={(code) => {
          setTemplateCode(code);
          if (code !== item.sectionUICredentials?.code) {
            setValidatedCredentials(null);
          }
        }}
        onValidate={handleValidateTemplateCode}
        isValidating={isValidating}
        validatedCredentials={validatedCredentials}
        badgeLabel={`✓ Current Template: ${validatedCredentials?.code ?? ''}`}
        onViewGuide={openGuide}
        extraAction={
          canApplyTemplate && (
            <Button onClick={handleApplyTemplate} color="green" size="sm">
              Apply
            </Button>
          )
        }
      />

      <Stack gap="xs">
        <Text>Properties (JSON)</Text>
        <JSONEditor
          value={form.getValues().propertiesJson}
          onChange={(newValue) => form.setFieldValue('propertiesJson', newValue)}
          height="500px"
        />
      </Stack>

      <Group justify="flex-end" mt="md">
        <Button color="red" variant="outline" onClick={openDeleteModal} loading={isDeleting}>
          Delete
        </Button>
        <Button color="teal" onClick={handleSave} loading={isSaving}>
          Save
        </Button>
      </Group>

      <DeleteConfirmModal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        message="Are you sure you want to delete this item?"
      />

      <PropertyFormatGuideModal
        opened={guideOpened}
        onClose={closeGuide}
        propertyFormat={validatedCredentials?.propertyFormat ?? null}
      />
    </Stack>
  );
}
