'use client';

import { useWindowScroll } from '@mantine/hooks';
import { generateClassName } from '@vinaup/utils';

import classes from './sticky-header.module.scss';

export interface StickyHeaderProps {
  children: React.ReactNode;
  className?: string;
  scrolledClassName?: string;
}

export function StickyHeader({ children, className, scrolledClassName }: Readonly<StickyHeaderProps>) {
  const [scroll] = useWindowScroll();
  const isScrolled = scroll.y > 10;

  return (
    <header
      className={generateClassName(
        classes.stickyHeader,
        className,
        isScrolled ? classes.scrolled : undefined,
        isScrolled ? scrolledClassName : undefined
      )}
    >
      {children}
    </header>
  );


}
