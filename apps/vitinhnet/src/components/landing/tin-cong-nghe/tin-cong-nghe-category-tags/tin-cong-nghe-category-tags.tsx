'use client';
import { Route } from 'next';
import Link from 'next/link';
import { MOCK_CATEGORIES } from '../../../../mocks/tech-news-data.mock';
import classes from './tin-cong-nghe-category-tags.module.scss';
import { CategoryScroll, CategoryScrollItem } from '@/components/landing/primitives/category-scroll/category-scroll';
import { VinaupArrowRightIcon } from '@vinaup/ui/cores';

export default function TinCongNgheCategoryTags({
    activeEndpoint = '',
}: {
    activeEndpoint?: string;
}) {
    const filteredCategories = MOCK_CATEGORIES.filter(cat => cat.title !== 'Tất cả');

    const scrollItems: CategoryScrollItem[] = filteredCategories.map(category => ({
        label: category.title,
        href: category.endpoint ? `/tin-cong-nghe/${category.endpoint}` : '/tin-cong-nghe',
        isActive: category.endpoint === activeEndpoint
    }));

    return (
        <div className={classes.controlsRow}>
            <Link
                href={`/tin-cong-nghe` as Route}
                className={classes.viewAllIconBtn}
                data-active={activeEndpoint === ''}
                title="Tất cả"
            >
                <VinaupArrowRightIcon 
                  className={classes.vAllSvg} 
                  fill={activeEndpoint === '' ? 'var(--vinaup-blue-link, #0E54C9)' : '#333'}
                />
            </Link>

            <CategoryScroll
                items={scrollItems}
                wrapperClassName={classes.scrollWrapper}
                containerClassName={classes.subCategoriesWrapper}
                itemClassName={classes.subCategoryPill}
            />
        </div>
    );
}
