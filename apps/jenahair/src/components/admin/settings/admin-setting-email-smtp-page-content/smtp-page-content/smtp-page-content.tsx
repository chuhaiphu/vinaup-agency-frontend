'use client';

import { Divider, Paper, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { generateErrorMessage } from '@vinaup/utils';
import { use } from 'react';
import { useState } from 'react';

import {
  saveSmtpConfigActionPrivate,
  sendTestEmailActionPrivate,
  updateSmtpConfigActionPrivate,
} from '@/actions/smtp-config-actions';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import {
  SmtpConfigResponse,
  CreateSmtpConfigRequest,
  UpdateSmtpConfigRequest,
} from '@/interfaces/smtp-config-interfaces';

import { SmtpFormValues, toSmtpFormValues } from './_form';
import SmtpConfigSection from './smtp-config-section/smtp-config-section';
import classes from './smtp-page-content.module.scss';
import SmtpSenderSection from './smtp-sender-section/smtp-sender-section';

interface SmtpPageContentProps {
  smtpConfigPromise: Promise<ActionResponse<SmtpConfigResponse | null>>;
}

export default function SmtpPageContent({ smtpConfigPromise }: SmtpPageContentProps) {
  const response = use(smtpConfigPromise);
  const smtpConfig = response.data ?? null;

  const form = useForm<SmtpFormValues>({
    initialValues: toSmtpFormValues(smtpConfig),
    validate: {
      host: (value) => (!value ? 'Host is required' : null),
      port: (value) => (!value ? 'Port is required' : null),
      username: (value) => (!value ? 'Username is required' : null),
      fromName: (value) => (!value ? 'From name is required' : null),
      fromEmail: (value) => (!value ? 'From email is required' : null),
    },
  });

  const [isSendingTest, setIsSendingTest] = useState(false);
  const [isSavingAll, setIsSavingAll] = useState(false);

  const handleSaveSmtpConfig = async () => {
    if (form.validate().hasErrors) return;
    const values = form.getValues();

    setIsSavingAll(true);
    try {
      let result: ActionResponse<SmtpConfigResponse>;

      if (smtpConfig?.id) {
        const updatePayload: UpdateSmtpConfigRequest = {
          host: values.host,
          port: Number(values.port),
          username: values.username,
          secure: values.secure,
          fromName: values.fromName,
          fromEmail: values.fromEmail,
          receiveEmail: values.receiveEmail || null,
        };
        if (values.password && values.password.length > 0) {
          updatePayload.password = values.password;
        }
        result = await updateSmtpConfigActionPrivate(smtpConfig.id, updatePayload);
      } else {
        if (!values.password) {
          notifications.show({ message: 'Password is required', color: 'red' });
          return;
        }
        const createPayload: CreateSmtpConfigRequest = {
          host: values.host,
          port: Number(values.port),
          username: values.username,
          password: values.password,
          secure: values.secure,
          fromName: values.fromName,
          fromEmail: values.fromEmail,
          receiveEmail: values.receiveEmail || null,
        };
        result = await saveSmtpConfigActionPrivate(createPayload);
      }

      if (result.success) {
        notifications.show({
          message: 'SMTP configuration saved successfully',
          color: 'green',
          position: 'top-right',
        });
      } else {
        notifications.show({
          message: result.error || 'Failed to save configuration',
          color: 'red',
          position: 'top-right',
        });
      }
    } catch (error) {
      console.error(error);
      notifications.show({ message: 'An unexpected error occurred', color: 'red' });
    } finally {
      setIsSavingAll(false);
    }
  };

  const handleSendTestEmail = async () => {
    const receiveEmail = form.getValues().receiveEmail;
    if (!receiveEmail) {
      notifications.show({
        message: 'Please enter a receive email address',
        color: 'red',
      });
      return;
    }
    setIsSendingTest(true);
    try {
      const result = await sendTestEmailActionPrivate(receiveEmail);
      if (result.success) {
        notifications.show({
          message: 'Test email sent successfully',
          color: 'green',
        });
      } else {
        notifications.show({
          message: result.error || 'Failed to send test email',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        message: generateErrorMessage(error, 'Error sending test email'),
        color: 'red',
      });
    } finally {
      setIsSendingTest(false);
    }
  };

  return (
    <Stack gap={'md'}>
      <Paper radius={'md'} shadow="xs" classNames={{ root: classes.paperBlock }}>
        <Stack p={'sm'} gap={'md'}>
          <SmtpConfigSection form={form} isSaving={isSavingAll} onSave={handleSaveSmtpConfig} />
          <Divider my="sm" />
          <SmtpSenderSection
            form={form}
            isSendingTest={isSendingTest}
            onSendTest={handleSendTestEmail}
          />
        </Stack>
      </Paper>
    </Stack>
  );
}
