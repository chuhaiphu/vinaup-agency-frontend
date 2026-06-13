'use client';

import { ActionIcon, Button, Box } from '@mantine/core';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';
import { generateClassName } from '@vinaup/utils';
import { Route } from 'next';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

import classes from './category-scroll.module.scss';

export interface CategoryScrollItem {
    label: string;
    href: string;
    className?: string;
    isActive?: boolean;
}

export interface CategoryScrollProps {
    items: CategoryScrollItem[];
    wrapperClassName?: string;
    containerClassName?: string;
    itemClassName?: string;
    scrollStep?: number;
}

export function CategoryScroll({
    items,
    wrapperClassName,
    containerClassName,
    itemClassName,
    scrollStep = 200,
}: CategoryScrollProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const updateArrows = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        updateArrows();
        window.addEventListener('resize', updateArrows);
        return () => window.removeEventListener('resize', updateArrows);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(updateArrows, 100);
        return () => clearTimeout(timeout);
    }, [items]);

    const handleScrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -scrollStep, behavior: 'smooth' });
        }
    };

    const handleScrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: scrollStep, behavior: 'smooth' });
        }
    };

    return (
        <Box className={generateClassName(classes.scrollWrapper, wrapperClassName)}>
            {showLeftArrow && (
                <ActionIcon
                    variant="subtle"
                    className={classes.scrollButton}
                    onClick={handleScrollLeft}
                    size={30}
                >
                    <IconChevronLeft size={18} />
                </ActionIcon>
            )}

            <div className={generateClassName(classes.scrollContainer, containerClassName)} ref={scrollRef} onScroll={updateArrows}>
                {items.map((item, idx) => (
                    <Button
                        component={Link}
                        href={item.href as Route}
                        key={idx}
                        variant={item.isActive ? 'filled' : 'default'}
                        color={item.isActive ? 'red' : undefined}
                        size="sm"
                        className={generateClassName(classes.categoryPill, itemClassName, item.className)}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>

            {showRightArrow && (
                <ActionIcon
                    variant="subtle"
                    className={classes.scrollButton}
                    onClick={handleScrollRight}
                    size={30}
                >
                    <IconChevronRight size={18} />
                </ActionIcon>
            )}
        </Box>
    );
}
