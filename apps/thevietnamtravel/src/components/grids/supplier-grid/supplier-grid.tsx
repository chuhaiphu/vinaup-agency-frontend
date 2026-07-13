'use client'

import { Grid, GridCol } from '@mantine/core';
import CentricHeader from '@/components/primitives/centric-header/centric-header';
import GridImageCard from './grid-image-card/grid-image-card';
import { GenericGridItem } from '@/interfaces/grid-interfaces';

interface SupplierGridProps {
  title: string;
  subtitle?: string;
  data: GenericGridItem[];
}

export default function SupplierGrid({ title, subtitle, data }: SupplierGridProps) {
  return (
    <div style={{ paddingTop: "3rem" }}>
      {/* Tiêu đề chính H1 căn giữa */}
      <CentricHeader title={title} subtitle={subtitle} />

      {/* Lưới tĩnh 4 cột */}
      <Grid gutter={{ base: 15, sm: 20, md: 20 }} justify="center">
        {data.map((item) => (
          <GridCol key={item.id} span={{ base: 6, sm: 6, md: 3 }}>
            <GridImageCard
              title={item.title}
              imageUrl={item.imageUrl || "/images/placeholder.png"}
              href={item.href}
            />
          </GridCol>
        ))}
      </Grid>
    </div>
  );
}