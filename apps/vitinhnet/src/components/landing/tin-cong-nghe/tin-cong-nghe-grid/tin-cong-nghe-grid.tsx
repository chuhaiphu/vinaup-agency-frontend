'use client';
import { Grid, GridCol, Pagination, Text } from '@mantine/core';
import { Route } from 'next';
import Link from 'next/link';
import { useState } from 'react';

import { TechNewsArticleResponse } from '@/interfaces/tech-news-interfaces';

import classes from './tin-cong-nghe-grid.module.scss';
import TinCongNgheItem from './tin-cong-nghe-item';


export default function TinCongNgheGrid({
    blogs,
    pageSize = 16,
}: {
    blogs: TechNewsArticleResponse[];
    pageSize?: number;
}) {
    const [page, setPage] = useState(1);

    if (!blogs || blogs.length === 0) {
        return (
            <Text c="dimmed" fz="xl" ta="center" mt="xl">
                Không có bài viết nào
            </Text>
        );
    }

    const total = blogs.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;
    const paginated = blogs.slice(start, start + pageSize);

    return (
        <div>
            <Grid mt="lg" mb="md" gap="20px">
                {paginated.map((item) => (
                    <GridCol span={{ base: 12, lg: 6 }} key={item.id}>
                        <Link href={`/tin-cong-nghe/${item.endpoint}` as Route} className={classes.link}>
                            <TinCongNgheItem item={item} />
                        </Link>
                    </GridCol>
                ))}
            </Grid>
            {totalPages > 1 && (
                <div className={classes.paginationWrapper}>
                    <Pagination
                        total={totalPages}
                        value={page}
                        onChange={setPage}
                        color="var(--vinaup-blue-link, #0E54C9)"
                        classNames={{
                            control: classes.control,
                        }}
                    />
                </div>
            )}
        </div>
    );
}
