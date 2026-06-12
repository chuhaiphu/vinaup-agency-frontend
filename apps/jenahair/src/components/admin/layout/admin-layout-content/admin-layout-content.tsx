'use client';

import { AppShell, AppShellMain } from '@mantine/core';
import { redirect } from 'next/navigation';
import { use } from 'react';

import { logoutActionPrivate } from '@/actions/auth-actions';
import { DashboardHeader } from '@/components/admin/layout/dashboard-header/dashboard-header';
import DashboardSidebar from '@/components/admin/layout/dashboard-sidebar/dashboard-sidebar';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { UserResponse } from '@/interfaces/user-interfaces';
import { useAdminLayoutSiderStore } from '@/libs/zustand/admin-layout-sider-store';
import { AuthProvider } from '@/providers/auth-provider';

import classes from './admin-layout-content.module.scss';

interface AdminLayoutContentProps {
  children: React.ReactNode;
  userDataPromise: Promise<ActionResponse<UserResponse>>;
}

export default function AdminLayoutContent({ children, userDataPromise }: AdminLayoutContentProps) {
  const userData = use(userDataPromise);
  const { collapsed } = useAdminLayoutSiderStore();

  if (!userData.success || !userData.data) {
    redirect('/login?invalid=1');
  }

  const initialUser = {
    id: userData.data.id,
    name: userData.data.name || '',
    email: userData.data.email,
    role: userData.data.role,
  };

  const handleLogout = async () => {
    await logoutActionPrivate();
  };

  return (
    <AuthProvider initialUser={initialUser} onLogout={handleLogout}>
      <AppShell
        classNames={{ root: classes.adminLayout }}
        layout="alt"
        header={{ height: 56 }}
        navbar={{
          width: '16rem',
          breakpoint: 'sm',
          collapsed: {
            desktop: collapsed,
            mobile: collapsed,
          },
        }}
      >
        <DashboardSidebar userData={initialUser} />
        <DashboardHeader userData={initialUser} />
        <AppShellMain miw={1080} classNames={{ main: classes.mainRoot }}>
          {children}
        </AppShellMain>
      </AppShell>
    </AuthProvider>
  );
}
