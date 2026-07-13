import { Group } from "@mantine/core";
import classes from "./landing-header.module.scss";
import Link from "next/link";
import LandingDrawer from "@/components/sidebars/landing-drawer/landing-drawer";
import LocationSelector from "@/components/primitives/location-selector/location-selector";
import { Route } from "next";
import { VinaupSupplierIcon } from "@vinaup/ui/cores";

export async function LandingHeader() {
  return (
    <>
      <Group
        justify="space-between"
        align="center"
        className={classes.landingHeaderRoot}
      >
        <Link href="/" className={classes.logoLink}>
          <h1 className={classes.logoTitle}>The Vietnam Travel</h1>
        </Link>

        <Group>
          <Link href={"/suppliers" as Route} className={classes.menuText}>
            Suppliers
            <VinaupSupplierIcon fill="var(--vinaup-green)" size={24} />
          </Link>
          <LocationSelector />
          <LandingDrawer />
        </Group>
      </Group>
    </>
  );
}
