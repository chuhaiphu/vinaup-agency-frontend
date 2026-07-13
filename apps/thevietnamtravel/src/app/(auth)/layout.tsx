'use client';

import { Container, Title, Anchor } from '@mantine/core';
import { VinaupHomeIconV2 } from '@vinaup/ui/cores';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';
import classes from './layout.module.scss';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isSignUp = pathname?.includes('sign-up');

  return (
    <div className={classes.authLayoutRoot}>
      <header className={classes.header}>
        <Container size="xl" h="100%">
          <div className={classes.headerInner}>
            <div className={classes.headerLeft}>
              <Link href="/">
                <VinaupHomeIconV2 size={32} fill="var(--vinaup-green)" />
              </Link>
            </div>

            <Title order={3} c="var(--vinaup-green)" fw={700} className={classes.headerTitle}>
              The Vietnam Travel
            </Title>

            <div className={classes.headerRight}>
              {isSignUp ? (
                <Anchor component={Link} href={"/login" as Route} c="var(--vinaup-green)" fw={500} underline="never" className={classes.authLink}>
                  Đăng Nhập
                </Anchor>
              ) : (
                <Anchor component={Link} href={"/sign-up" as Route} c="var(--vinaup-green)" fw={500} underline="never" className={classes.authLink}>
                  Đăng Ký
                </Anchor>
              )}
            </div>
          </div>
        </Container>
      </header>

      <main className={classes.mainContent}>
        {children}
      </main>
    </div>
  );
}
