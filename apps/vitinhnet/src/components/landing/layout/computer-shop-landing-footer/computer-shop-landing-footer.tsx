'use client';

import { Container, Grid, Group, Stack, Text, Box, Button, Image, GridCol } from '@mantine/core';
import { IconMapPin, IconPhone, IconMessageCircle, IconClock } from '@tabler/icons-react';
import { VinaupGoogleMapIcon, VinaupInstagramIcon, VinaupFacebookIcon, VinaupTiktokIcon } from '@vinaup/ui/cores';
import classes from './computer-shop-landing-footer.module.scss';
import Link from 'next/link';

const tags = [
    'Máy vi tính văn phòng', 'Laptop giá rẻ', 'Laptop Dell cũ', 'Laptop HP cũ',
    'Máy vi tính văn phòng', 'Laptop Dell cũ', 'Laptop giá rẻ', 'Máy vi tính văn phòng',
    'Máy vi tính văn phòng', 'Laptop HP cũ', 'Máy vi tính văn phòng', 'Laptop Dell cũ'
];

export function ComputerShopLandingFooter() {
    return (
        <Box component="footer" className={classes.footer}>
            <Container size="xl">
                {/* Tags Section */}
                <Box className={classes.tagsWrapper} visibleFrom="xs">
                    <Group gap="md" justify="center">
                        {tags.map((tag, index) => (
                            <Button
                                key={index}
                                className={classes.tagButton}
                                size="md"
                                radius="md"
                            >
                                {tag}
                            </Button>
                        ))}
                    </Group>
                </Box>

                {/* Primary Info Section */}
                <Grid className={classes.infoSection} align="center" gap={{ base: 40, md: 50 }}>
                    <GridCol span={{ base: 12, md: 5 }}>
                        <div className={classes.logoWrapper}>
                            <Image
                                src="/vitinhnet-trangdai.png"
                                alt="Vi Tinh Net Logo"
                                w={{ base: "80%", md: "100%" }}
                                fit="contain"
                            />
                            <div className={classes.subLinks}>
                                <Text component={Link} href="https://vitinhnet.com" target="_blank">vitinhnet.com</Text>
                                <Text component={Link} href="https://vitinhlugia.com" target="_blank">Vitinhlugia.com</Text>
                            </div>
                        </div>
                    </GridCol>

                    <GridCol span={{ base: 12, md: 7 }}>
                        <Stack gap="xs">
                            <div className={classes.contactItem}>
                                <IconMapPin size={20} className={classes.contactIcon} />
                                <Text>19/6/24 Hoàng Xuân Nhị, P. Phú Trung (Gần ngã 4 Lạc Long Quân - Âu Cơ)</Text>
                            </div>
                            <div className={classes.contactItem}>
                                <IconPhone size={20} className={classes.contactIcon} />
                                <Text>Bán hàng & CSKH: 0907 111 106 (Ms An)</Text>
                            </div>
                            <div className={classes.contactItem}>
                                <IconMessageCircle size={20} className={classes.contactIcon} />
                                <Text>Đặt hàng online Zalo : 0907 111 106 (Ms An)</Text>
                            </div>
                            <div className={classes.contactItem}>
                                <IconClock size={20} className={classes.contactIcon} />
                                <Text>Thời gian hoạt động : Từ 09h - 18h (T2 - T7)</Text>
                            </div>
                        </Stack>
                    </GridCol>
                </Grid>
            </Container>

            {/* Bottom Bar Section */}
            <div className={classes.bottomBar}>
                <Container size="xl" h="100%">
                    <Group justify="space-between" align="center" h="100%">
                        <Text size="lg">Vi tính Net © 2026 by VinaUp</Text>
                        <Group gap={20} className={classes.socialIcons}>
                            <Link href="#" className={classes.socialIcon} aria-label="Google Maps">
                                <VinaupGoogleMapIcon size={34} fill="currentColor" />
                            </Link>
                            <Link href="#" className={classes.socialIcon} aria-label="Instagram">
                                <VinaupInstagramIcon size={34} fill="currentColor" />
                            </Link>
                            <Link href="#" className={classes.socialIcon} aria-label="Facebook">
                                <VinaupFacebookIcon size={34} fill="currentColor" />
                            </Link>
                            <Link href="#" className={classes.socialIcon} aria-label="TikTok">
                                <VinaupTiktokIcon size={34} fill="currentColor" />
                            </Link>
                        </Group>
                    </Group>
                </Container>
            </div>
        </Box>
    );
}