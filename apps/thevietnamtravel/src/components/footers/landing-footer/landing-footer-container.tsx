'use client';

import { Box, Container, Group, Text } from '@mantine/core';
import classes from './landing-footer.module.scss';
import WhatsAppIcon from '@/components/icons/whatsapp-icon.svg';
import InstagramIcon from '@/components/icons/instagram-icon.svg';
import FacebookIcon from '@/components/icons/facebook-icon.svg';
import TiktokIcon from '@/components/icons/tiktok-icon-2.svg';
import Link from 'next/link';
import { GoHome } from 'react-icons/go';

export default function LandingFooterContainer() {
  return (
    <div className={classes.landingFooter}>
      {/* Top: Connect + Social icons */}
      <div className={classes.top}>
        <Container size="xl" classNames={{ root: classes.footerContainer }}>
          <Group justify="space-between" align="center">
            <Text className={classes.topTitle}>Connect directly with the seller</Text>
            <Group className={classes.socials} gap="md">
              <Link
                href={`https://wa.me/84912711789`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon width={40} height={40} />
              </Link>
              <Link
                href="https://www.tiktok.com/@smashtravelvietnam"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <TiktokIcon width={40} height={40} />
              </Link>
              <Link
                href="https://www.instagram.com/smashtravelvietnam/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <InstagramIcon width={40} height={40} />
              </Link>
              <Link
                href="https://www.facebook.com/smashtravelvietnam/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FacebookIcon width={40} height={40} />
              </Link>
            </Group>
          </Group>
        </Container>
      </div>

      {/* Middle: Brand name */}
      <div className={classes.middle}>
        <Container size="xl" classNames={{ root: classes.footerContainer }}>
          <Box className={classes.brandText}>
            <span className={classes.brandThe}>THE</span>
            <span className={classes.brandVietnamTravel}>VIETNAMTRAVEL</span>
          </Box>
        </Container>
      </div>

      {/* Bottom: Copyright + links */}
      <div className={classes.bottom}>
        <Container size="xl" classNames={{ root: classes.footerContainer }}>
          <Group justify="space-between" align="center">
            <Text className={classes.bottomText}>
              Vietnam Travel © 2026 by VinaUp®
            </Text>
            <Link href="/" className={classes.bottomLink}>
              <Text fz="1.1rem">Travel guides - Home</Text>
              <GoHome size={20} />
            </Link>
          </Group>
        </Container>
      </div>
    </div>
  );
}
