'use client';
import { Button, Group, Paper, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { generateErrorMessage } from '@vinaup/utils';
import { Route } from 'next';
import Link from 'next/link';
import { use } from 'react';
import { useState } from 'react';
import { HiOutlineEye } from 'react-icons/hi';

import { updateAppConfigActionPrivate } from '@/actions/app-config-actions';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { AppConfigResponse } from '@/interfaces/app-config-interfaces';

import classes from './admin-setting-seo-page-content.module.scss';

interface AdminSettingSeoPageContentProps {
  appConfigPromise: Promise<ActionResponse<AppConfigResponse>>;
}

export default function AdminSettingSeoPageContent({
  appConfigPromise,
}: AdminSettingSeoPageContentProps) {
  const appConfigResponse = use(appConfigPromise);
  const appConfig = appConfigResponse.data;

  const [siteName, setSiteName] = useState(appConfig?.siteName || '');
  const [title, setTitle] = useState(appConfig?.websiteTitle || '');
  const [description, setDescription] = useState(appConfig?.websiteDescription || '');
  const [isSavingAll, setIsSavingAll] = useState(false);

  const handleSaveAll = async () => {
    setIsSavingAll(true);
    try {
      await updateAppConfigActionPrivate({
        siteName,
        websiteTitle: title,
        websiteDescription: description,
      });
      notifications.show({
        message: 'Saved successfully',
        color: 'green',
        position: 'top-right',
        autoClose: 1500,
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: generateErrorMessage(error, 'Unknown error'),
        color: 'red',
        position: 'top-right',
        autoClose: 1500,
      });
    } finally {
      setIsSavingAll(false);
    }
  };

  return (
    <Stack gap={'md'}>
      <Paper radius={'md'} shadow="xs" classNames={{ root: classes.paperBlock }}>
        <Stack p={'sm'} gap={'md'}>
          <Group justify="space-between" wrap="nowrap">
            <Text size="lg" fw={500}>
              SEO Basic Information
            </Text>
            <Button
              loading={isSavingAll}
              onClick={handleSaveAll}
              variant="filled"
              color="teal"
              size="sm"
            >
              Save
            </Button>
          </Group>
          <Stack gap={2}>
            <Group justify="space-between" wrap="nowrap">
              <Text size="lg">Site name</Text>
            </Group>
            <TextInput
              size="md"
              value={siteName}
              placeholder="Brand name shown in Google search (e.g. Jena Hair)"
              maxLength={60}
              onChange={(e) => {
                setSiteName(e.target.value);
              }}
            />
          </Stack>
          <Stack gap={2}>
            <Group justify="space-between" wrap="nowrap">
              <Text size="lg">Site title</Text>
            </Group>
            <TextInput
              size="md"
              value={title}
              placeholder="A title under 100 characters"
              maxLength={100}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Stack>
          <Stack gap={2}>
            <Group justify="space-between" wrap="nowrap">
              <Text size="lg">Description</Text>
            </Group>
            <Textarea
              size="md"
              value={description}
              placeholder="A description under 300 characters"
              maxLength={300}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Stack>
        </Stack>
      </Paper>
      <Paper radius={'md'} shadow="xs" classNames={{ root: classes.paperBlock }}>
        <Group justify="space-between" wrap="nowrap" p={'sm'} gap={'md'}>
          <Stack gap={2}>
            <Text size="lg">Sitemap.xml</Text>
            <Text c="dimmed">Activated</Text>
          </Stack>
          <Link href={'/sitemap.xml' as Route} target="_blank">
            <HiOutlineEye color="black" size={28} />
          </Link>
        </Group>
      </Paper>
      <Paper radius={'md'} shadow="xs" classNames={{ root: classes.paperBlock }}>
        <Group justify="space-between" wrap="nowrap" p={'sm'} gap={'md'}>
          <Stack gap={2}>
            <Text size="lg">Robots.txt</Text>
            <Text c="dimmed">Activated</Text>
          </Stack>
          <Link href={'/robots.txt' as Route} target="_blank">
            <HiOutlineEye color="black" size={28} />
          </Link>
        </Group>
      </Paper>
    </Stack>
  );
}
