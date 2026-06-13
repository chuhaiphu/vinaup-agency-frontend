'use client';

import { Group, MantineSpacing, Paper, Stack, Text, TextInput } from '@mantine/core';
import { generateStrippedHtml } from '@vinaup/utils';
import dayjs from 'dayjs';

import classes from './seo-preview-section.module.scss';

interface SeoPreviewSectionProps {
  title: string;
  contentHtml: string;
  url: string;
  updatedAt: Date | string;
  mt?: MantineSpacing;
}

export default function SeoPreviewSection({
  title,
  contentHtml,
  url,
  updatedAt,
  mt,
}: SeoPreviewSectionProps) {
  // Read-only previews derived from the live form values — not editable state
  const seoTitle = title ? generateStrippedHtml(title, 100) : '';
  const seoContent = contentHtml ? generateStrippedHtml(contentHtml, 300) : '';

  return (
    <Paper
      p={'md'}
      radius={'md'}
      mt={mt}
      withBorder
      classNames={{ root: classes.seoPreviewSectionRoot }}
      bg={'var(--vinaup-soft-gray)'}
    >
      <Stack gap={4}>
        <div className={classes.seoBlockTitle}>
          <b>S</b>earch <b>E</b>ngine <b>O</b>ptimization
        </div>
        <div className={classes.seoDivider} />
        <Stack gap={4}>
          <Text component="a" href={url} target="_blank" size="lg" fw={500} c={'var(--vinaup-teal)'}>
            {seoTitle || title}
          </Text>
          <Text component="a" href={url} target="_blank" size="md" c={'var(--vinaup-blue-link)'}>
            {url}
          </Text>
          <Text size="sm">{dayjs(updatedAt).format('MMM DD, YYYY')}</Text>
          <div
            dangerouslySetInnerHTML={{ __html: seoContent || '' }}
            className={classes.htmlDescription}
          ></div>
        </Stack>
        <div className={classes.seoDivider} />
        <Stack gap={4}>
          <Group justify="space-between" align="center">
            <Text size="md" fw={500}>
              Seo title
            </Text>
          </Group>
          <TextInput
            classNames={{
              input: classes.seoTextInput,
            }}
            size="md"
            placeholder="Name title (Suggest < 72 characters)"
            value={seoTitle}
            readOnly
            disabled
          />
        </Stack>
        <div className={classes.seoDivider} />
        <Stack gap={4}>
          <Text size="md" fw={500}>
            Seo description
          </Text>
          <TextInput
            classNames={{
              input: classes.seoTextInput,
            }}
            size="md"
            placeholder="..."
            value={seoContent}
            readOnly
            disabled
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
