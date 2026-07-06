import ImageCard from "@/components/primitives/image-card/image-card";
import { IGenericGridItem } from "@/interfaces/grid-interface";
import { Route } from "next";

interface GridItemProps {
  item: IGenericGridItem;
}

export default function GridItem({ item }: GridItemProps) {
  return (
    <ImageCard
      title={item.title}
      imageUrl={item.imageUrl || "/images/image-placeholder.png"}
      href={item.href as Route}
      variant="normal"
      aspectRatio="1 / 1"
    />
  );
}
