import ImageCard from "@/components/primitives/image-card/image-card";
import { GenericGridItem } from "@/interfaces/grid-interfaces";
import { Route } from "next";

interface GridItemProps {
  item: GenericGridItem;
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
