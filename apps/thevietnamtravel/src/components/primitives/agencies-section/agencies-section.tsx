"use client";

import { Box, Stack } from "@mantine/core";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { PARTNER_LOGOS } from "@/mocks/partner-mock-logo";
import classes from "./agencies-section.module.scss";

export default function AgenciesSection() {
  return (
    <Stack gap="xl" className={classes.sectionWrapper}>
      {/* Hàng 1 */}
      <Marquee
        direction="right"
        speed={50}
        pauseOnHover={true}
        autoFill={true}
      >
        {PARTNER_LOGOS.map((logo, index) => (
          <Box key={`r1-${index}`} className={classes.logoItem}>
            <Image
              src={logo.url}
              alt="Partner"
              width={250}
              height={100}
              className={classes.partnerImage}
            />
          </Box>
        ))}
      </Marquee>

      {/* Hàng 2 */}
      <Marquee
        direction="left"
        speed={50}
        pauseOnHover={true}
        autoFill={true}
      >
        {PARTNER_LOGOS.map((logo, index) => (
          <Box key={`r2-${index}`} className={classes.logoItem}>
            <Image
              src={logo.url}
              alt="Partner"
              width={250}
              height={100}
              className={classes.partnerImage}
            />
          </Box>
        ))}
      </Marquee>
    </Stack>
  );
}