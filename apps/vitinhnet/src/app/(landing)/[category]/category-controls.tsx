'use client';

import { useRef, useState, useEffect } from 'react';
import { ActionIcon } from '@mantine/core';
import { IconChevronRight, IconChevronLeft, IconFilter } from '@tabler/icons-react';
import Link from 'next/link';
import { Route } from 'next';
import classes from './page.module.scss';

interface CategoryControlsProps {
    categorySlug: string;
    subCategories: string[];
}

export function CategoryControls({ categorySlug, subCategories }: CategoryControlsProps) {
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

    // Also run updateArrows when subCategories change or mount is finished
    useEffect(() => {
        // Small timeout to ensure DOM has painted the pills before calculating width
        const timeout = setTimeout(updateArrows, 100);
        return () => clearTimeout(timeout);
    }, [subCategories]);

    const handleScrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const handleScrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    return (
        <div className={classes.controlsRow}>
            <div className={classes.scrollWrapper}>
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
                
                <div className={classes.subCategoriesWrapper} ref={scrollRef} onScroll={updateArrows}>
                    {subCategories.map((sub, idx) => (
                        <Link href={`/${categorySlug}` as Route} key={idx} className={classes.subCategoryPill}>
                            {sub}
                        </Link>
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
            </div>

            <div className={classes.filterWrapper}>
                <div className={classes.filterBox}>
                    <IconFilter size={18} stroke={1.5} /> Bộ lọc
                </div>
            </div>
        </div>
    );
}