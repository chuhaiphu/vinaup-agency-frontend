'use client';

import { Group, Burger, AppShellHeader } from '@mantine/core';

import { UserSection } from '@/components/admin/layout/user-section/user-section';
import { UserResponse } from '@/interfaces/user-interfaces';
import { useAdminLayoutSiderStore } from '@/libs/zustand/admin-layout-sider-store';

import classes from './dashboard-header.module.scss';

export function DashboardHeader({ userData }: { userData: UserResponse }) {
  const { collapsed, toggle } = useAdminLayoutSiderStore();

  return (
    <AppShellHeader>
      <div className={classes.dashboardHeader}>
        <Group justify="space-between" align="center" h="100%">
          <Burger opened={!collapsed} onClick={toggle} size="sm" />
          <UserSection userData={userData} />
        </Group>
      </div>
    </AppShellHeader>
  );
}
