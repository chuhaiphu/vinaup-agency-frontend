"use client";

import GridCarousel from "@/components/primitives/grid-carousel/grid-carousel";
import { GenericGridItem } from "@/interfaces/grid-interfaces";
import GridItem from "@/components/grids/items-grid/grid-item/grid-item";

interface ItemsGridProps<T extends GenericGridItem> {
  title: string;
  subtitle?: string;
  data: T[];
  rows?: number;
}

export default function ItemGrid<T extends GenericGridItem>({
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
