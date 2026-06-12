'use client';

import { AppShellNavbar, Text, Group } from '@mantine/core';
import { VinaupHomeIcon as HomeIcon } from '@vinaup/ui/cores';
import React, { useMemo } from 'react';
import { GoDot, GoDotFill } from 'react-icons/go';

import { VersionSection } from '@/components/landing/sections/version-section/version-section';
import { UserResponse } from '@/interfaces/user-interfaces';

import { NavItemProps } from './dashboard-nav/_props';
import { DashboardNav } from './dashboard-nav/dashboard-nav';
import classes from './dashboard-sidebar.module.scss';

interface DashboardSidebarProps {
  userData: UserResponse;
}

export default function DashboardSidebar({ userData }: DashboardSidebarProps) {
  const navItems: NavItemProps[] = useMemo(() => {
    const items: NavItemProps[] = [
      {
        key: 'admin',
        label: 'Admin Home',
        path: '/adminup',
        rightSection: <HomeIcon size={20} />,
        rightSectionActive: <HomeIcon size={20} stroke="var(--vinaup-yellow)" />,
        isRoot: true,
      },
      {
        key: 'blog',
        label: 'Blog',
        path: '/adminup/blog',
        defaultOpened: true,
        childrens: [
          {
            key: 'all-blogs',
            label: 'All Blogs',
            path: '/adminup/blog',
          },
          {
            key: 'blog-categories',
            label: 'Blog Categories',
            path: '/adminup/blog-category',
          },
        ],
      },
      {
        key: 'diary',
        label: 'Diary',
        path: '/adminup/diary',
        defaultOpened: true,
        childrens: [
          {
            key: 'all-diaries',
            label: 'All Diaries',
            path: '/adminup/diary',
          },
          {
            key: 'diary-categories',
            label: 'Diary Categories',
            path: '/adminup/diary-category',
          },
        ],
      },
      {
        key: 'page',
        label: 'Pages',
        rightSection: <GoDot size={24} />,
        rightSectionActive: <GoDotFill color="var(--vinaup-yellow)" size={24} />,
        path: '/adminup/page',
      },
      {
        key: 'section-ui',
        label: 'Section UI',
        path: '/adminup/section-ui',
        rightSection: <GoDot size={24} />,
        rightSectionActive: <GoDotFill color="var(--vinaup-yellow)" size={24} />,
      },
      {
        key: 'control-panel',
        label: 'Control Panel',
        path: '/adminup/menu',
        defaultOpened: true,
        childrens: [
          {
            key: 'menu',
            label: 'Menu',
            path: '/adminup/menu',
          },
          {
            key: 'media',
            label: 'Media',
            path: '/adminup/media',
          },
          {
            key: 'theme',
            label: 'Theme',
            path: '/adminup/theme',
          },
        ],
      },
      {
        key: 'setting',
        label: 'Settings',
        rightSection: <GoDot size={24} />,
        rightSectionActive: <GoDotFill color="var(--vinaup-yellow)" size={24} />,
        path: '/adminup/setting',
      },
    ];
    // Add User Management menu only for superadmin
    if (userData.role === 'supadmin') {
      items.push({
        key: 'user',
        label: 'Users',
        rightSection: <GoDot size={24} />,
        rightSectionActive: <GoDotFill color="var(--vinaup-yellow)" size={24} />,
        path: '/adminup/user',
      });
    }

    return items;
  }, [userData.role]);

  return (
    <AppShellNavbar classNames={{ navbar: classes.dashboardSidebarRoot }}>
      <div className={classes.dashboardSidebarContainer}>
        <div className={classes.containerTop}>
          <Group justify="space-between" align="center" pr="md">
            <Text className={classes.logoText}>Jena Hair</Text>
          </Group>
          <DashboardNav navItems={navItems} />
        </div>
        <div className={classes.containerBottom}>
          <VersionSection />
        </div>
      </div>
    </AppShellNavbar>
  );
}
