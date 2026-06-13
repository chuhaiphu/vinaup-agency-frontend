'use client';

import { ActionIcon, Group, Paper, Stack, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { VinaupPenIcon as PenIcon } from '@vinaup/ui/cores';
import { CopyToClipboard } from '@vinaup/ui/shared';
import { generateSanitizedEndpoint } from '@vinaup/utils';
import { useRef } from 'react';

import { SITE_BASE_URL } from '@/constants';

import { PageDetailFormValues } from '../_form';
import classes from './page-title-section.module.scss';

interface PageTitleSectionProps {
  form: UseFormReturnType<PageDetailFormValues>;
}

export default function PageTitleSection({ form }: PageTitleSectionProps) {
  const endpointInputRef = useRef<HTMLInputElement>(null);

  const handleFocusAndSelectInput = () => {
    if (endpointInputRef.current) {
      endpointInputRef.current.focus();
      endpointInputRef.current.select();
    }
  };

  const endpoint = form.getValues().endpoint;
  const url = `${SITE_BASE_URL}/${endpoint}`;

  return (
    <Paper p={'sm'} radius={'md'} classNames={{ root: classes.pageTitleSectionRoot }}>
      <Stack gap={'xs'}>
        <Text>Title</Text>
        <TextInput
          size="md"
          placeholder="A title under 100 characters"
          maxLength={100}
          {...form.getInputProps('title')}
        />
        <Group gap={'xs'} justify="space-between" wrap="nowrap">
          <Group gap={0} wrap="nowrap" className={classes.urlGroup}>
            <Group gap={4}>
              <Text size="md" c="dark.3">
                Custom URL:
              </Text>
              <Text size="md">jenahair.com/</Text>
            </Group>
            <Group gap={0}>
              <TextInput
                ref={endpointInputRef}
                classNames={{ input: classes.endpointInput }}
                variant="unstyled"
                value={endpoint}
                onChange={(e) => {
                  // The endpoint is part of the public URL — sanitize while typing
                  form.setFieldValue('endpoint', generateSanitizedEndpoint(e.target.value));
                }}
              />
              <ActionIcon size="md" variant="transparent" onClick={handleFocusAndSelectInput}>
                <PenIcon width={24} height={24} />
              </ActionIcon>
            </Group>
          </Group>
          <Group gap={'xs'}>
            <Text size="sm" className={classes.linkText} onClick={() => window.open(url, '_blank')}>
              View
            </Text>
            <CopyToClipboard
              content={url}
              notification={{
                title: 'Link copied',
                message: 'Link has been copied to clipboard',
                position: 'top-right',
                autoClose: 900,
              }}
            >
              <Text size="sm" className={classes.linkText}>
                Copy link
              </Text>
            </CopyToClipboard>
          </Group>
        </Group>
      </Stack>
    </Paper>
  );
}
