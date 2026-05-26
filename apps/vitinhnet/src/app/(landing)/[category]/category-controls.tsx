'use client';

import { Button } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import classes from './page.module.scss';
import { CategoryScroll, CategoryScrollItem } from '@/components/landing/primitives/category-scroll/category-scroll';

interface CategoryControlsProps {
    categorySlug: string;
    subCategories: string[];
}

export function CategoryControls({ categorySlug, subCategories }: CategoryControlsProps) {
    const scrollItems: CategoryScrollItem[] = subCategories.map(sub => ({
        label: sub,
        href: `/${categorySlug}`,
    }));

    return (
        <div className={classes.controlsRow}>
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