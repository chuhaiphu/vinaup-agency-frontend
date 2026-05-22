'use client';

import { Container, Grid, Group, Stack, Text, Box, Button, Image, GridCol } from '@mantine/core';
import { VinaupGoogleMapIcon, VinaupInstagramIcon, VinaupFacebookIcon, VinaupTiktokIcon, VinaupLocationIcon, VinaupPhoneIcon, VinaupMessageIcon, VinaupTimeIcon } from '@vinaup/ui/cores';
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
                <Box className={classes.tagsWrapper}>
                    <Group className={classes.tagGroup}>
                        {tags.map((tag, index) => (
                            <Button
                                key={index}
                                className={classes.tagButton}
                                radius="md"
                            >
                                {tag}
                            </Button>
                        ))}
                    </Group>
                </Box>

                {/* Primary Info Section */}
                <Grid className={classes.infoSection} align="center" gap={'2rem'}>
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
                        <Stack gap={"1rem"}>
                            <div className={classes.contactItem}>
                                <VinaupLocationIcon size={20} className={classes.contactIcon} fill="#f5f5f5" />
                                <span>19/6/24 Hoàng Xuân Nhị, P. Phú Trung (Gần ngã 4 Lạc Long Quân - Âu Cơ)</span>
                            </div>
                            <div className={classes.contactItem}>
                                <VinaupPhoneIcon size={20} className={classes.contactIcon} fill="#f5f5f5" />
                                <span>Bán hàng & CSKH: 0907 111 106 (Ms An)</span>
                            </div>
                            <div className={classes.contactItem}>
                                <VinaupMessageIcon size={20} className={classes.contactIcon} fill="#f5f5f5" />
                                <span>Đặt hàng online Zalo : 0907 111 106 (Ms An)</span>
                            </div>
                            <div className={classes.contactItem}>
                                <VinaupTimeIcon size={20} className={classes.contactIcon} fill="#f5f5f5" />
                                <span>Thời gian hoạt động : Từ 09h - 18h (T2 - T7)</span>
                            </div>
                        </Stack>
                    </GridCol>
                </Grid>
            </Container>

            {/* Bottom Bar Section */}
            <div className={classes.bottomBar}>
                <Container size="xl" h="100%">
                    <Group gap="0.25rem" justify="space-between" align="center" h="100%" className={classes.bottomContent}>
                        <Text size="lg">Vi tính Net © 2026 by VinaUp</Text>
                        <Group className={classes.socialIcons}>
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