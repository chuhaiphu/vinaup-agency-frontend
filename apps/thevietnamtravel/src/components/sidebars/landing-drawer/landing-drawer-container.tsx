'use client';

import { ActionIcon, Stack } from "@mantine/core";
import { MenuSquareIcon } from "@vinaup/ui/cores";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import Link from "next/link";
import { Route } from "next";
import classes from "./landing-drawer.module.scss";
import { IMenuResponse } from "@/interfaces/menu-interface";
import HomeIcon from "@/components/icons/vinaup-home-icon";
import React, { useMemo } from "react";

export default function LandingDrawerContainer() {
  const [opened, { open, close }] = useDisclosure(false);

  // Get URL for a menu item
  const getMenuUrl = (menu: IMenuResponse): string => {
    if (menu.targetType === "custom-url" && menu.customUrl) {
      if (menu.customUrl === "") {
        return "/";
      }
      // If customUrl doesn't start with http:// or https://, add https://
      if (!menu.customUrl.startsWith("http://") && !menu.customUrl.startsWith("https://")) {
        return `https://${menu.customUrl}`;
      }
      return menu.customUrl;
    }
    return "/";
  };

  const renderMenuItem = (menu: IMenuResponse, depth: number = 0, isRootChildren: boolean): React.ReactNode => {
    const url = getMenuUrl(menu);
    const hasChildren = menu.children && menu.children.length > 0;
    const isCustomUrl = menu.targetType === "custom-url" && menu.customUrl && menu.customUrl !== "";

    return (
      <div key={menu.id}>
        {isCustomUrl ? (
          <a
            onClick={close}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              paddingLeft: depth > 0 ? `${depth * 16 + 12}px` : "12px",
            }}
            className={`${classes.menuLink} ${classes.menuItem}`}
          >
            <span className={!isRootChildren ? classes.menuLabel : classes.menuLabelParent}>
              {menu.title}
            </span>
          </a>
        ) : (
          <Link
            onClick={close}
            href={url as Route}
            style={{
              paddingLeft: depth > 0 ? `${depth * 16 + 12}px` : "12px",
            }}
            className={`${classes.menuLink} ${classes.menuItem}`}
          >
            <span className={!hasChildren ? classes.menuLabel : classes.menuLabelParent}>
              {menu.title}
            </span>
          </Link>
        )}
        {hasChildren && (
          <Stack gap={0}>
            {menu.children?.map((child) => renderMenuItem(child, depth + 1, false))}
          </Stack>
        )}
      </div>
    );
  };

  return (
    <>
      <ActionIcon variant="transparent" onClick={open} aria-label="Open menu">
        <MenuSquareIcon size={28} fill="var(--vinaup-green)" />
      </ActionIcon>
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Link onClick={close} href="/" className={classes.homeLink}>
            <HomeIcon size={20} stroke="black" />
            <span>Home</span>
          </Link>
        }
        position="right"
        size={"xs"}
        offset={8}
      >
        <div className={classes.divider} />
      </Drawer>
    </>
  );
}

