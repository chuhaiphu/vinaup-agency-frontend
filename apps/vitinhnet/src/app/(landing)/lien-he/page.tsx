'use client';

import React from 'react';
import { Paper, Text, TextInput, Textarea, Title, Flex, Box, Button, Container, Grid, Image, GridCol, AspectRatio } from '@mantine/core';
import { IconMessageDots } from '@tabler/icons-react';
import { VinaupUserIcon, VinaupPhoneIcon, VinaupEmailIcon } from '@vinaup/ui/cores';
import classes from './page.module.scss';

export default function ContactPage() {
  return (
    <Container size="xl" py={{ base: 'md', md: 'xl' }}>
      <Grid gap="20px" align="stretch">
        <GridCol span={{ base: 12, md: 8 }}>
          <Flex direction="column" gap="lg">
            <Box>
              <Title order={2} className={classes.pageTitle}>
                Liên hệ
              </Title>

              <Flex direction="column" gap="xs">
                <Text fw={600} className={classes.contactDetailText} fz="1.375rem">
                  Thông tin liên hệ
                </Text>

                <Text className={classes.contactDetailText}>
                  • <strong>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh
                </Text>

                <Text className={classes.contactDetailText}>
                  • <strong>Điện thoại:</strong> 0123 456 789
                </Text>

                <Text className={classes.contactDetailText}>
                  • <strong>Email:</strong> contact@vinaup.com
                </Text>
              </Flex>
            </Box>

            <Paper radius="md" withBorder p={0} className={classes.formSection}>
              <Flex align="center" className={classes.formSectionHeader}>
                <Title order={4} className={classes.sectionTitle}>
                  Nhập thông tin
                </Title>
              </Flex>

              <Flex direction="column" p={{ base: 8, md: 'md' }} gap="xl">
                <Flex gap="md" align="center">
                  <Box>
                    <VinaupUserIcon size={24} fill="#121212" />
                  </Box>
                  <Box flex={1}>
                    <Text className={classes.inputLabel}>Họ và tên</Text>
                    <TextInput
                      variant="unstyled"
                      placeholder="Nhập họ và tên"
                      classNames={{ input: classes.contactInput }}
                    />
                  </Box>
                </Flex>

                <Flex gap="md" align="center">
                  <Box>
                    <VinaupPhoneIcon size={24} fill="#121212" />
                  </Box>
                  <Box flex={1}>
                    <Text className={classes.inputLabel}>Số điện thoại</Text>
                    <TextInput
                      variant="unstyled"
                      placeholder="Nhập số điện thoại"
                      classNames={{ input: classes.contactInput }}
                    />
                  </Box>
                </Flex>

                <Flex gap="md" align="center">
                  <Box>
                    <VinaupEmailIcon size={24} fill="#121212" />
                  </Box>
                  <Box flex={1}>
                    <Text className={classes.inputLabel}>Email</Text>
                    <TextInput
                      variant="unstyled"
                      placeholder="Nhập địa chỉ email"
                      classNames={{ input: classes.contactInput }}
                    />
                  </Box>
                </Flex>

                <Flex gap="md" align="flex-start">
                  <Box>
                    <IconMessageDots size={30} color="#121212" stroke={2} />
                  </Box>
                  <Box flex={1}>
                    <Text className={classes.inputLabel}>Nội dung</Text>
                    <Textarea
                      variant="unstyled"
                      placeholder="Nhập nội dung bạn cần liên hệ..."
                      classNames={{ input: classes.contactInput }}
                      minRows={2}
                      autosize
                    />
                  </Box>
                </Flex>

                <Flex justify="flex-end">
                  <Button
                    color="var(--vinaup-soft-crimson)"
                    size="md"
                    radius="md"
                    px="xl"
                    className={classes.submitButton}
                  >
                    Gửi liên hệ
                  </Button>
                </Flex>
              </Flex>
            </Paper>
          </Flex>
        </GridCol>

        <GridCol span={{ base: 12, md: 4 }}>
          <Flex direction="column" gap="20px">
            <Paper radius="md" p={0} className={classes.imageSection} style={{ height: 'auto' }}>
              <AspectRatio ratio={1}>
                <Image
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
                  alt="Vinaup Contact"
                  className={classes.contactImage}
                  fit="cover"
                />
              </AspectRatio>
            </Paper>
            <Paper radius="md" p={0} className={classes.imageSection} style={{ height: 'auto' }}>
              <AspectRatio ratio={1}>
                <Image
                  src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=600&auto=format&fit=crop"
                  alt="Vinaup Contact 2"
                  className={classes.contactImage}
                  fit="cover"
                />
              </AspectRatio>
            </Paper>
          </Flex>
        </GridCol>
      </Grid>
    </Container>
  );
}