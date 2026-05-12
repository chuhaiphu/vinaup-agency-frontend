'use client';

import { Container, Grid, Title, Text, Box, Timeline } from '@mantine/core';
import { FaHandshake, FaShieldAlt, FaTruck } from 'react-icons/fa';
import { VideoSection } from '@vinaup/ui/landing';
import classes from './commitments.module.scss';

export function Commitments() {
  return (
    <Box className={classes.section}>
      <Container size="xl" w="100%">
        <Grid gap="xl" align="stretch">
          {/* Left Column: Cam Kết */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <div className={classes.contentWrapper}>
              <Title className={classes.title}>Vi Tính Net cam kết</Title>

              <Timeline active={3} bulletSize={40} lineWidth={2} color="var(--brand-red, #d32f2f)">
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
          </Grid.Col>

          {/* Right Column: Video */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <div className={classes.videoWrapper}>
              <VideoSection
                url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                thumbnailUrl="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1600"
              />
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
