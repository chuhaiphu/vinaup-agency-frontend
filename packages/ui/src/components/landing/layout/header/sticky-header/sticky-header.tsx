'use client';

import { useWindowScroll } from '@mantine/hooks';
import { generateClassName } from '@vinaup/utils';

import classes from './sticky-header.module.scss';

export interface StickyHeaderProps {
  children: React.ReactNode;
}

export function StickyHeader({ children }: Readonly<StickyHeaderProps>) {
  const [scroll] = useWindowScroll();
  const isScrolled = scroll.y > 10;

  return (
    <header
      className={generateClassName(classes.stickyHeader, isScrolled ? classes.scrolled : undefined)}
    >
      {children}
    </header>
  );
}
