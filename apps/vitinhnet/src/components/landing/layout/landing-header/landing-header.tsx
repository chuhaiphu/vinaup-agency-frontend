'use client';

import { Container, Group, TextInput, ActionIcon, Indicator, Box } from '@mantine/core';
import { MenuSquareIcon, VinaupCartIcon, VinaupMessengerIcon, VinaupUserIcon, VinaupZaloRectangleIcon } from '@vinaup/ui/cores';
import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';

import { useCartStore } from '@/stores/cart-store';

import classes from './landing-header.module.scss';

const NAV_LINKS = [
    { label: 'Laptop nhập khẩu', href: '/laptop-nhap-khau' },
    { label: 'Máy tính đồng bộ', href: '/may-tinh-dong-bo' },
    { label: 'Màn hình máy tính', href: '/man-hinh' },
    { label: 'Máy in', href: '/may-in' },
    { label: 'Linh kiện máy tính', href: '/linh-kien' },
    { label: 'PCNet Máy Tính Net', href: '/pcnet' },
];

function NavigationMenu() {
    const pathname = usePathname();

    if (pathname !== '/') return null;

    return (
        <nav className={classes.navSection}>
            <Container size="xl">
                <div className={classes.navLinks}>
                    {NAV_LINKS.map((link) => (
                        <Link key={link.label} href={link.href as Route} className={classes.navLink}>
                            {link.label}
                        </Link>
                    ))}
                </div>
            </Container>
        </nav>
    );
}

export default function LandingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { items: cartItems } = useCartStore();

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 200) {
                        setIsScrolled(true);
                    } else if (window.scrollY < 50) {
                        setIsScrolled(false);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Box component="header" className={classes.header}>
                <div className={`${classes.topSection} ${isScrolled ? classes.scrolled : ''}`}>
                    <Container size="xl" h="100%">
                        <div className={classes.topContainer} >
                            {/* Logo */}
                            <Link href="/" className={classes.logoSection} aria-label="Vi Tinh Net - Trang chủ" title="Về trang chủ">
                                <Image
                                    src="/logo-vitinhnet-den.png"
                                    alt="Vi Tính Net Logo"
                                    width={220}
                                    height={50}
                                    className={classes.logoDesktop}
                                    style={{ objectFit: 'contain' }}
                                    priority
                                />
                                <Image
                                    src="/logo-vitinhnet-tron.png"
                                    alt="Vi Tính Net Icon"
                                    width={60}
                                    height={60}
                                    className={classes.logoMobile}
                                    style={{ objectFit: 'contain' }}
                                    priority
                                />
                            </Link>
                            {/* Search Bar */}
                            <TextInput
                                className={classes.searchBarWrapper}
                                classNames={{
                                    input: classes.searchInput,
                                    section: classes.searchSection,
                                }}
                                placeholder="Tìm mua máy tính cũ // Bạn cần cấu hình gì?"
                                radius="xl"
                                rightSectionWidth={40}
                                rightSection={
                                    <ActionIcon className={classes.searchButton} variant="filled">
                                        <IoSearch size={20} />
                                    </ActionIcon>
                                }
                            />
                            {/* Icons Area */}
                            <Group gap="md" wrap="nowrap" className={classes.iconGroup}>
                                <ActionIcon size="lg" w="auto" variant="transparent" className={`${classes.actionIcon}`}>
                                    <VinaupMessengerIcon size={28} fill='var(--vinaup-blue-link)' />
                                </ActionIcon>
                                <ActionIcon size="lg" w="auto" variant="transparent" className={`${classes.actionIcon}`}>
                                    <VinaupZaloRectangleIcon size={28} fill='var(--vinaup-blue-link)' />
                                </ActionIcon>
                                <Indicator inline label={cartItems.length} size={16} color="red" offset={4} disabled={cartItems.length === 0}>
                                    <ActionIcon component={Link} href={"/gio-hang" as Route} size="lg" variant="transparent" className={classes.actionIcon}>
                                        <VinaupCartIcon size={28} fill='var(--vinaup-blue-link)' />
                                    </ActionIcon>
                                </Indicator>
                                <ActionIcon size="lg" variant="transparent" className={`${classes.actionIcon}`}>
                                    <VinaupUserIcon size={28} fill='var(--vinaup-blue-link)' />
                                </ActionIcon>
                                <ActionIcon size="lg" variant="transparent" className={classes.actionIcon}>
                                    <MenuSquareIcon size={28} fill='var(--vinaup-blue-link)' />
                                </ActionIcon>
                            </Group>
                        </div>
                    </Container>
                </div>
            </Box>
            <Suspense fallback={null}>
                <NavigationMenu />
            </Suspense>
        </>
    );
}