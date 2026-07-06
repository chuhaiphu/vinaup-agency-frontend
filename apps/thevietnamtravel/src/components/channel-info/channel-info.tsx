'use client';

import { Grid, Stack, Text, Title, Box, Center, GridCol } from '@mantine/core';
import Image from 'next/image';
import classes from './channel-info.module.scss';
import LogoIcon from '@/app/favicon.ico';

const SERVICES = [
  {
    title: 'Local travel seller',
    description: 'Local travel agencies are verified by tourism authorities, which gives travelers peace of mind when contacting them to purchase tickets.'
  },
  {
    title: 'Visa & airport',
    description: 'We offer airport pick-up and drop-off services at Vietnamese international airports, expedited passport processing, and other airport support services.'
  },
  {
    title: 'Car rental',
    description: 'Many types of tourist vehicles. Many companies offer tourist vehicle rentals.'
  }
];

export default function ChannelInfoSection() {

  return (
    <Box component="section">
      <Grid align="center">
        {/* Cột trái (Nội dung) */}
        <GridCol span={{ base: 12, md: 8 }}>
          <Stack gap="xl" style={{ maxWidth: '800px' }}>
            <Stack gap={40}>
              {SERVICES.map((service, index) => (
                <Box key={index}>
                  <Title order={3} className={classes.serviceTitle} mb={8}>
                    {service.title}
                  </Title>
                  <Text className={classes.serviceDesc}>
                    {service.description}
                  </Text>
                </Box>
              ))}
            </Stack>
          </Stack>
        </GridCol>

        {/* Cột phải (Hình ảnh) */}
        <GridCol span={{ base: 12, md: 4 }}>
          {/* <Box 
            component={Link}
            href="#"
            className={classes.imageWrapper} 
            style={{ aspectRatio: imageAspectRatio }}
          >
            <Image
              src="/mock-images/z6005041616453_ab9be89ca94e5e8d8caff5c6cbd85233-1.jpg"
              alt="Vietnam travel agencies"
              fill
              sizes="(max-width: 768px) 100vw, 25vw" //Để tối ưu hiệu năng
              className={classes.mainImage}
            />
            
            <Group className={classes.imageLabel} justify="space-between">
              <Text fw={400} size="xl" c="white">Vietnam agencies</Text>
              <MdArrowOutward color="white" size={24} />
            </Group>
          </Box> */}
          <Center h="100%">
            <Box className={classes.logoWrapper}>
              <Image
                src={LogoIcon}
                alt="LogoIcon"
                width={450}
                height={450}
                priority
                className={classes.logoImage}
              />
            </Box>
          </Center>
        </GridCol>
      </Grid>
    </Box>
  );
}