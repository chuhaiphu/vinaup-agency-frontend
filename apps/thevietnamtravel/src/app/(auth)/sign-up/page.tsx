'use client';

import { Container, Text, Anchor, Box } from '@mantine/core';
import Link from 'next/link';
import classes from './page.module.scss';

export default function SignUpPage() {
  return (
    <>
      <div className={classes.banner}>
        <h1>Đăng ký</h1>
      </div>

      <Container size="sm" className={classes.contentWrapper}>
        <Box className={classes.instructionText}>
          <Text fw={700} mb={4}>Chỉ nhận đăng ký dành cho Công ty du lịch người Việt Nam:</Text>
          <Text>
            Để đăng ký bạn liên hệ thông qua qua link{' '}
            <Anchor href="https://fb.com/thevietnamtravel" target="_blank" c="blue">
              fb.com/thevietnamtravel
            </Anchor>
          </Text>
        </Box>

        <ul className={classes.list}>
          <li>
            <Text span fw={700}>1. Đăng ký tổ chức: </Text>
            Là gửi thông tin cty / tổ chức qua chat
          </li>
          <li>
            <Text span fw={700}>2. Đăng ký nhân viên seller: </Text>
            Là gửi thông tin sau
            <ul>
              <li>- Họ tên: ---</li>
              <li>- Email: ---</li>
              <li>- Số điện thoại: ---</li>
              <li>- Tên tổ chức: ---</li>
            </ul>
          </li>
        </ul>

        <Text className={classes.noteText}>
          Admin xác nhận hợp lệ, thì thông tin đăng nhập sẽ gửi qua email đến bạn
        </Text>

        <Text className={classes.noteText}>
          *Nhân viên seller được chủ động up bài viết tour và nhận liên hệ trực tiếp từ khách hàng
        </Text>

        <div className={classes.thankYouText}>
          <Text>“Cám ơn bạn đã tham gia đồng hành thịnh vượng cùng </Text>
          <Text>
            <Anchor component={Link} href="/" c="blue">
              The Vietnam Travel
            </Anchor>
            {' '}”
          </Text>
        </div>
      </Container>
    </>
  );
}
