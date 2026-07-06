"use client";

import GridCarousel from "@/components/primitives/grid-carousel/grid-carousel";
import { IGenericGridItem } from "@/interfaces/grid-interface";
import GridItem from "@/components/grids/items-grid/grid-item/grid-item";

interface ItemsGridProps<T extends IGenericGridItem> {
  title: string;
  subtitle?: string;
  data: T[];
  rows?: number;
}

export default function ItemGrid<T extends IGenericGridItem>({
  title,
  subtitle,
  data,
  rows = 2
}: ItemsGridProps<T>) {
  return (
    <div style={{ paddingTop: "3rem" }}>
      <GridCarousel
        title={title}
        subtitle={subtitle}
        data={data}
        rows={rows}
        renderItem={(item) => <GridItem key={item.id} item={item} />}
      />
    </div>
  );
}
