'use client';

import { Container, Grid, Title, Text, Box, Timeline, GridCol } from '@mantine/core';
import { VideoSection } from '@vinaup/ui/landing';
import { FaHandshake, FaShieldAlt, FaTruck } from 'react-icons/fa';

import classes from './commitments.module.scss';

export function Commitments() {
  return (
    <Box className={classes.section} py={{ base: '1rem', sm: '2rem' }}>
      <Container size="xl" w="100%">
        <Grid gap={{ base: '1rem', sm: '1.25rem' }} align="stretch">
          {/* Left Column: Cam Kết */}
          <GridCol span={{ base: 12, md: 6 }}>
            <div className={classes.contentWrapper}>
              <Title className={classes.title}>Vi Tính Net cam kết</Title>

              <Timeline
                active={3}
                bulletSize={40}
                lineWidth={4}
                classNames={{
                  itemBullet: classes.itemBullet,
                  item: classes.item
                }}
              >
                <Timeline.Item
                  bullet={<FaHandshake size={20} />}
                  title={<Text className={classes.itemTitle}>Đối Tác Tin Cậy</Text>}
                >
                  <Text className={classes.itemDesc}>
                    Chế độ chính sách tốt nhất cho đại lý 34 tỉnh thành
                  </Text>
                </Timeline.Item>

                <Timeline.Item
                  bullet={<FaShieldAlt size={20} />}
                  title={<Text className={classes.itemTitle}>Cam Kết Chính Hãng</Text>}
                >
                  <Text className={classes.itemDesc}>
                    Chúng tôi cam kết hoàn tiền 110% nếu phát hiện không phải hàng chính hãng Dell, Hp.
                  </Text>
                </Timeline.Item>

                <Timeline.Item
                  bullet={<FaTruck size={20} />}
                  title={<Text className={classes.itemTitle}>Dịch Vụ Tận Tâm</Text>}
                >
                  <Text className={classes.itemDesc}>
                    Nhiệt tình giao hàng và nhận hàng bảo hành từ tỉnh xa
                  </Text>
                </Timeline.Item>
              </Timeline>
            </div>
          </GridCol>

          {/* Right Column: Video */}
          <GridCol span={{ base: 12, md: 6 }}>
            <div className={classes.videoWrapper}>
              <VideoSection
                url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                height="100%"
              />
            </div>
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
}