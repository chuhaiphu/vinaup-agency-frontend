'use client';

import { Container, Avatar, Button, Text, Modal, Box, LoadingOverlay, Grid, GridCol } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconUser, IconReceipt, IconLogout, IconShieldCheck } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

import {
  getCustomerProfileActionPrivate,
  updateCustomerProfileActionPrivate,
} from '@/actions/customer-actions';
import { CustomerProfile } from '@/interfaces/customer-interfaces';

import classes from './page.module.scss';
import { ProfileTab } from './profile-tab';
import { PurchaseHistoryTab } from './purchase-history-tab';
import { WarrantyTab } from './warranty-tab';

type ActiveTab = 'profile' | 'history' | 'warranty';

export default function UserAccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<CustomerProfile | null>(null);

  const form = useForm({
    initialValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      province: '',
      deliveryAddress: '',
    },
    validate: {
      fullName: (value) => (value.trim().length > 0 ? null : 'Vui lòng nhập họ và tên'),
      phoneNumber: (value) =>
        /^[0-9]{10,11}$/.test(value.trim())
          ? null
          : 'Số điện thoại không hợp lệ (yêu cầu 10-11 số)',
      email: (value) =>
        !value || /^\S+@\S+\.\S+$/.test(value) ? null : 'Địa chỉ email không hợp lệ',
    },
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await getCustomerProfileActionPrivate();
        if (response.success && response.data) {
          setUserProfile(response.data);
          form.setValues({
            fullName: response.data.fullName || '',
            phoneNumber: response.data.phoneNumber || '',
            email: response.data.email || '',
            province: response.data.province || '',
            deliveryAddress: response.data.deliveryAddress || '',
          });
        } else {
          notifications.show({
            title: 'Lỗi',
            message: response.error || 'Không thể tải thông tin tài khoản',
            color: 'red',
          });
        }
      } catch (err) {
        console.error(err);
        notifications.show({
          title: 'Lỗi',
          message: 'Đã xảy ra lỗi khi kết nối hệ thống',
          color: 'red',
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateProfile = async (values: typeof form.values) => {
    startTransition(async () => {
      try {
        const response = await updateCustomerProfileActionPrivate(values);
        if (response.success && response.data) {
          setUserProfile(response.data);
          notifications.show({
            title: 'Thành công',
            message: 'Thông tin tài khoản đã được lưu thay đổi',
            color: 'green',
          });
        } else {
          notifications.show({
            title: 'Thất bại',
            message: response.error || 'Không thể lưu thay đổi',
            color: 'red',
          });
        }
      } catch (err) {
        console.error(err);
        notifications.show({
          title: 'Lỗi',
          message: 'Đã xảy ra lỗi khi gửi yêu cầu',
          color: 'red',
        });
      }
    });
  };

  const handleLogout = () => {
    setLogoutModalOpen(false);
    notifications.show({
      title: 'Đăng xuất thành công',
      message: 'Hẹn gặp lại quý khách!',
      color: 'blue',
    });
    router.push('/');
  };

  return (
    <Box className={classes.profileRoot}>
      <Container size="xl" className={classes.profileContainer}>
        <Grid gap="lg" align="flex-start">
          <GridCol span={{ base: 12, md: 4, lg: 3 }}>
            <Box className={classes.sidebarCard}>
              <Box className={classes.userInfoSection}>
                <Avatar
                  src={userProfile?.avatar}
                  alt={userProfile?.fullName || 'User Avatar'}
                  size={54}
                  radius="xl"
                  className={classes.userAvatar}
                >
                  {userProfile?.fullName ? userProfile.fullName.charAt(0) : <IconUser />}
                </Avatar>
                <Text className={classes.userName}>{userProfile?.fullName || 'Khách hàng'}</Text>
              </Box>

              <Box className={classes.sidebarMenu}>
                <button
                  type="button"
                  className={`${classes.menuItem} ${activeTab === 'profile' ? classes.menuItemActive : ''
                    }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <IconUser size={18} />
                  Thông tin tài khoản
                </button>

                <button
                  type="button"
                  className={`${classes.menuItem} ${activeTab === 'history' ? classes.menuItemActive : ''
                    }`}
                  onClick={() => setActiveTab('history')}
                >
                  <IconReceipt size={18} />
                  Lịch sử mua hàng
                </button>

                <button
                  type="button"
                  className={`${classes.menuItem} ${activeTab === 'warranty' ? classes.menuItemActive : ''
                    }`}
                  onClick={() => setActiveTab('warranty')}
                >
                  <IconShieldCheck size={18} />
                  Thời hạn bảo hành
                </button>

                <button
                  type="button"
                  className={`${classes.menuItem} ${classes.logoutItem}`}
                  onClick={() => setLogoutModalOpen(true)}
                >
                  <IconLogout size={18} />
                  Đăng xuất
                </button>
              </Box>
            </Box>
          </GridCol>

          <GridCol span={{ base: 12, md: 8, lg: 9 }}>
            <Box className={classes.contentCard} style={{ position: 'relative' }}>
              <LoadingOverlay
                visible={isLoading}
                zIndex={10}
                overlayProps={{ radius: 'sm', blur: 1 }}
              />

              {activeTab === 'profile' && (
                <ProfileTab form={form} isPending={isPending} onSubmit={handleUpdateProfile} />
              )}
              {activeTab === 'history' && <PurchaseHistoryTab />}
              {activeTab === 'warranty' && <WarrantyTab />}
            </Box>
          </GridCol>
        </Grid>
      </Container>

      <Modal
        opened={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        title="Xác nhận đăng xuất"
        centered
      >
        <Text className={classes.modalText} mb="lg">
          Bạn có chắc chắn muốn đăng xuất khỏi tài khoản của mình?
        </Text>
        <Box style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button
            className={classes.modalButton}
            variant="outline"
            onClick={() => setLogoutModalOpen(false)}
          >
            Hủy
          </Button>
          <Button className={classes.modalButton} color="red" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
