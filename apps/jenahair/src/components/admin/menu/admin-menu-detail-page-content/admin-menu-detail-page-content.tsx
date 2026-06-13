'use client';

import { Grid, GridCol, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { ConfirmModal } from '@vinaup/ui/shared';
import { TreeManager, generateErrorMessage } from '@vinaup/utils';
import { useRouter } from 'next/navigation';
import { use, useMemo, useState } from 'react';

import { updateMenuActionPrivate, deleteMenuActionPrivate } from '@/actions/menu-actions';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { MenuResponse } from '@/interfaces/menu-interfaces';

import { MenuDetailFormValues, toMenuDetailFormValues } from './_form';
import classes from './admin-menu-detail-page-content.module.scss';
import MenuConfigSection from './menu-config-section/menu-config-section';
import MenuInfoSection from './menu-info-section/menu-info-section';

interface AdminMenuDetailPageContentProps {
  currentMenuPromise: Promise<ActionResponse<MenuResponse>>;
  menusPromise: Promise<ActionResponse<MenuResponse[]>>;
  availableSortOrdersPromise: Promise<ActionResponse<number[]>>;
}

export default function AdminMenuDetailPageContent({
  currentMenuPromise,
  menusPromise,
  availableSortOrdersPromise,
}: AdminMenuDetailPageContentProps) {
  const currentMenuResult = use(currentMenuPromise);
  const menusResult = use(menusPromise);
  const availableSortOrdersResult = use(availableSortOrdersPromise);

  if (!currentMenuResult.success || !currentMenuResult.data) {
    return <div>Menu not found</div>;
  }

  const currentMenu = currentMenuResult.data;
  const menusData = menusResult.data ?? [];
  const availableSortOrdersData = availableSortOrdersResult.data ?? [];

  return (
    <AdminMenuDetailPageContentInner
      // Remount on id change so useForm re-initializes to drops unsaved edits when navigate forth and back.
      key={currentMenu.id}
      currentMenu={currentMenu}
      menusData={menusData}
      availableSortOrdersData={availableSortOrdersData}
    />
  );
}

interface AdminMenuDetailPageContentInnerProps {
  currentMenu: MenuResponse;
  menusData: MenuResponse[];
  availableSortOrdersData: number[];
}

function AdminMenuDetailPageContentInner({
  currentMenu,
  menusData,
  availableSortOrdersData,
}: AdminMenuDetailPageContentInnerProps) {
  const form = useForm<MenuDetailFormValues>({
    initialValues: toMenuDetailFormValues(currentMenu),
  });

  const [isSavingAll, setIsSavingAll] = useState<boolean>(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const router = useRouter();

  const menuTreeManager = useMemo(() => {
    if (menusData.length === 0) {
      return null;
    }
    return new TreeManager(menusData);
  }, [menusData]);

  // Filter out current menu and its children from parent options
  const excludedIds = menuTreeManager?.toIds(menuTreeManager?.toFlatList(currentMenu.id) ?? []);
  excludedIds?.add(currentMenu.id);

  const parentOptions = menusData
    .filter((menu) => !excludedIds?.has(menu.id))
    .map((menu) => ({ value: menu.id, label: menu.title }));

  const handleSaveAll = async () => {
    setIsSavingAll(true);
    try {
      const values = form.getValues();
      await updateMenuActionPrivate(currentMenu.id, {
        title: values.title,
        parentId: values.parentId || undefined,
        sortOrder: values.sortOrder,
        customUrl: values.customUrl || undefined,
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
      });
    } finally {
      setIsSavingAll(false);
    }
  };

  const handleDeleteMenu = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteMenuActionPrivate(currentMenu.id);
      if (result.success) {
        router.replace('/adminup/menu');
        notifications.show({
          message: 'Menu has been successfully deleted',
          color: 'green',
          position: 'top-center',
        });
      } else {
        notifications.show({
          title: 'Delete failed',
          message: result.error || 'Failed to delete menu',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Delete failed',
        message: generateErrorMessage(error, 'Failed to delete menu'),
        color: 'red',
      });
    } finally {
      setIsDeleting(false);
      setDeleteModalOpened(false);
    }
  };

  return (
    <div className={classes.menuDetailRoot}>
      <Grid>
        <GridCol span={{ base: 12, sm: 12, md: 7, lg: 7, xl: 8 }}>
          <Stack>
            <MenuInfoSection form={form} parentOptions={parentOptions} />
          </Stack>
        </GridCol>

        <GridCol span={{ base: 12, sm: 12, md: 5, lg: 5, xl: 4 }}>
          <MenuConfigSection
            form={form}
            availableSortOrders={availableSortOrdersData}
            isSaving={isSavingAll}
            onSave={handleSaveAll}
            onExit={() => router.push('/adminup/menu')}
            onDeleteClick={() => setDeleteModalOpened(true)}
          />
        </GridCol>
      </Grid>

      <ConfirmModal
        variant="danger"
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        onConfirm={handleDeleteMenu}
        loading={isDeleting}
        message="Are you sure you want to delete this menu?"
      />
    </div>
  );
}
