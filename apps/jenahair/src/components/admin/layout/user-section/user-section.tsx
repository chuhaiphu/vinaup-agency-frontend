'use client';

import {
  Avatar,
  Menu,
  UnstyledButton,
  Group,
  Text,
  MenuItem,
  MenuTarget,
  MenuDropdown,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import { FiUser, FiLogOut } from 'react-icons/fi';

import { UserResponse } from '@/interfaces/user-interfaces';
import { useAuthContext } from '@/providers/auth-provider';

import classes from './user-section.module.scss';

export function UserSection({ userData }: { userData: UserResponse }) {
  const router = useRouter();
  const { logout } = useAuthContext();
  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleUserDetail = () => {
    router.push(`/adminup/user/${userData.id}`);
  };

  // Get first letter of email for avatar
  const avatarLetter = userData.email?.charAt(0).toUpperCase() || 'U';

  return (
    <Menu position="bottom" trigger="hover" openDelay={100} closeDelay={400}>
      <MenuTarget>
        <UnstyledButton className={classes.userButton}>
          <Group gap={8}>
            <Avatar radius="xl" size={36} color="cyan">
              {avatarLetter}
            </Avatar>
            <Text className={classes.userName} size="sm" fw={500}>
              {userData.name}
            </Text>
          </Group>
        </UnstyledButton>
      </MenuTarget>

      <MenuDropdown>
        <MenuItem
          w={'100%'}
          onClick={handleUserDetail}
          className={classes.menuItem}
          leftSection={<FiUser size={16} />}
        >
          User Detail
        </MenuItem>
        <MenuItem
          w={'100%'}
          onClick={handleLogout}
          className={classes.logoutItem}
          leftSection={<FiLogOut size={16} />}
        >
          Logout
        </MenuItem>
      </MenuDropdown>
    </Menu>
  );
}
