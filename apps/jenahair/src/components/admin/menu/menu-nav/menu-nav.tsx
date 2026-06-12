'use client';

import { Paper, Stack, Group, Text } from '@mantine/core';
import { TreeManager } from '@vinaup/utils';
import { Route } from 'next';
import { useParams, useRouter } from 'next/navigation';
import React, { use, useMemo } from 'react';

import { ActionResponse } from '@/interfaces/_base-interfaces';
import { MenuResponse } from '@/interfaces/menu-interfaces';

import classes from './menu-nav.module.scss';

interface MenuNavProps {
  menusDataPromise: Promise<ActionResponse<MenuResponse[]>>;
}

export default function MenuNav({ menusDataPromise }: MenuNavProps) {
  const router = useRouter();
  const { id } = useParams();

  const menusData = use(menusDataPromise);
  const data = menusData.data ?? [];

  const treeManager = useMemo(() => {
    if (data.length === 0) {
      return null;
    }
    return new TreeManager(data);
  }, [data]);

  const isActiveMenu = (menuId: string) => {
    return id === menuId;
  };

  const renderMenuTree = () => {
    const root = treeManager?.getRoot();
    if (!root || !root.children) {
      return null;
    }
    return root.children?.map((child) => renderMenuBar(child, 0));
  };

  const renderMenuBar = (menu: MenuResponse, depth: number = 0): React.ReactNode => {
    return (
      <React.Fragment key={menu.id}>
        <Stack
          key={menu.id}
          className={`${classes.navItem} ${isActiveMenu(menu.id) ? classes.active : ''}`}
          bd={'1px solid #c7c7c7'}
          bdrs={'sm'}
          p={'8px'}
          ml={depth * 16}
          onClick={() => {
            router.push(`/adminup/menu/${menu.id}` as Route);
          }}
        >
          <Group key={menu.id}>
            <Text fw={isActiveMenu(menu.id) ? 'bold' : 'normal'}>{menu.title}</Text>
          </Group>
        </Stack>
        <>{menu.children?.map((child) => renderMenuBar(child, depth + 1))}</>
      </React.Fragment>
    );
  };

  return (
    <Paper p={'sm'} radius={'md'} shadow="xs" withBorder>
      <Stack gap={'xs'}>{renderMenuTree()}</Stack>
    </Paper>
  );
}
