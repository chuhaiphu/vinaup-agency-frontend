import { Group, Text } from "@mantine/core";
import Link from "next/link";
import classes from "./see-all-link.module.scss";
import { Route } from "next";
import LayoutSquare from "@/components/icons/vinaup-layout-square";

interface SeeAllLinkProps {
  href: string;
  label?: string;
  iconSize?: number;
  color?: string;
}

export function SeeAllLink({
  href,
  label = "All",
  iconSize = 26,
  color = "var(--vinaup-green)",
}: SeeAllLinkProps) {
  return (
    <Link href={href as Route} className={classes.seeAllLinkRoot}>
      <Group gap={8} align="center">
        <Text component="span" className={classes.allLink} style={{ color: color }}>
          {label}
        </Text>
        <LayoutSquare size={iconSize} stroke={color} />
      </Group>
    </Link>
  );
}
