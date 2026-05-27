'use client';

import { Button } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import classes from './page.module.scss';
import { CategoryScroll, CategoryScrollItem } from '@/components/landing/primitives/category-scroll/category-scroll';
import { VinaupArrowRightIcon } from '@vinaup/ui/cores'; // Thêm import icon
import Link from 'next/link'; // Thêm import Link

interface CategoryControlsProps {
    categorySlug: string;
    subCategories: string[];
}

export function CategoryControls({ categorySlug, subCategories }: CategoryControlsProps) {
    const filteredSubCategories = subCategories.filter(sub => sub !== 'Tất cả');

    const scrollItems: CategoryScrollItem[] = filteredSubCategories.map(sub => ({
        label: sub,
        href: `/${categorySlug}`,
    }));

    return (
        <div className={classes.controlsRow}>
            <Link
                href={`/${categorySlug}`}
                className={classes.viewAllIconBtn}
                title="Tất cả"
            >
                <VinaupArrowRightIcon className={classes.vAllSvg} fill="#0E54C9"/>
            </Link>

            <CategoryScroll
                items={scrollItems}
                wrapperClassName={classes.scrollWrapper}
                containerClassName={classes.subCategoriesWrapper}
                itemClassName={classes.subCategoryPill}
            />

            <div className={classes.filterWrapper}>
                <Button
                    variant="default"
                    size="sm"
                    className={classes.filterButton}
                    leftSection={<IconFilter size={18} stroke={1.5} />}
                >
                    Bộ lọc
                </Button>
            </div>
        </div>
    );
}