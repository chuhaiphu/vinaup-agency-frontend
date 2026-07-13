"use client";
import { useState } from "react";
import { ActionIcon, UnstyledButton, Popover, Text } from "@mantine/core";
import { VN_PROVINCES } from "@/constants";
import { useRouter } from "next/navigation";
import { Route } from "next";
import classes from "./location-selector.module.scss";
import { VinaupLocationIcon } from '@vinaup/ui/cores';

export default function LocationSelector() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const handleSelect = (province: string) => {
    const current = new Set(selected);
    if (current.has(province)) {
      current.delete(province);
    } else {
      current.add(province);
    }
    const newSelected = Array.from(current);
    setSelected(newSelected);

    const params = new URLSearchParams();
    if (newSelected.length > 0) {
      params.set("destinations", newSelected.join(","));
    }
    const queryString = params.toString();
    router.push(`/blogs${queryString ? `?${queryString}` : ""}` as Route);
  };

  return (
    <Popover
      width="target"
      position="bottom"
      offset={12}
      shadow="md"
      classNames={{ dropdown: classes.popoverDropdown }}
    >
      <Popover.Target>
        <ActionIcon
          variant="light"
          color="light"
          size="xl"
          radius="xl"
          className={classes.locationSelectorRoot}
          aria-label="Select destinations"
        >
          <VinaupLocationIcon size={26} fill="var(--vinaup-green)" />
        </ActionIcon>
      </Popover.Target>

      <Popover.Dropdown>
        <Text fw={600} size="lg" className={classes.dropdownTitle}>
          Destinations
        </Text>

        <div className={classes.dropdownContainer}>
          {VN_PROVINCES.map((province) => {
            const isSelected = selected.includes(province);
            return (
              <UnstyledButton
                key={province}
                onClick={() => handleSelect(province)}
                className={`${classes.provinceButton} ${isSelected ? classes.selected : ""}`}
              >
                {province}
              </UnstyledButton>
            );
          })}
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}