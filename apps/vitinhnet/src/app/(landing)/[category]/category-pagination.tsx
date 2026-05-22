'use client';

import { Pagination } from '@mantine/core';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { Route } from 'next';
import classes from './category-pagination.module.scss';

interface CategoryPaginationProps {
    totalPages: number;
    currentPage: number;
}

export function CategoryPagination({ totalPages, currentPage }: CategoryPaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`${pathname}?${params.toString()}` as Route, { scroll: true });
    };

    if (totalPages <= 1) return null;

    return (
        <Pagination
            total={totalPages}
            value={currentPage}
            onChange={handlePageChange}
            color="var(--vinaup-blue-link)"
            boundaries={1}
            classNames={{
                control: classes.control,
            }}
        />
    );
}