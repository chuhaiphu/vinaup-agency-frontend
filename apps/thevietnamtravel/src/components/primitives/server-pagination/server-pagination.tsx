'use client';

import { Pagination } from '@mantine/core';
import type { Route } from 'next';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import classes from './server-pagination.module.scss';

interface ServerPaginationProps {
  totalPages: number;
  currentPage: number;
  color?: string;
}

export default function ServerPagination({ totalPages, currentPage, color }: ServerPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}` as Route, { scroll: true });
  };

  return (
    <Pagination
      total={totalPages}
      value={currentPage}
      onChange={handlePageChange}
      color={color || "var(--vinaup-green)"}
      boundaries={1}
      classNames={{
        root: classes.root,
        control: classes.control,
      }}
    />
  );
}
