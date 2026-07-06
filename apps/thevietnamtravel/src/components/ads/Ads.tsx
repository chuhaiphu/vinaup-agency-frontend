'use client'

import React from "react";
import classes from "./Ads.module.scss";
import Image from "next/image";

interface AdsProps {
  imageUrl?: string;
  height?: number | string;
  alt?: string;
}

const Ads: React.FC<AdsProps> = ({
  imageUrl = "https://images.pexels.com/photos/7276781/pexels-photo-7276781.jpeg?auto=compress&fit=crop&w=1200&q=80",
  alt = "Advertisement"
}) => {
  return (
    <section className={classes.adsContainer}>
      <span className={classes.adsLabel}>Ads</span>
      <Image
        src={imageUrl}
        alt={alt}
        className={classes.adsImage}
        loading="lazy"
        fill
      />
    </section>
  );
};

export default Ads;
