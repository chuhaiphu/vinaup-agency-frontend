import { Card, Text, Group } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { Route } from 'next';
import { VinaupDirectoryIcon } from '@vinaup/ui/cores';

import classes from './tour-card.module.scss';

export interface TourCardProps {
  id: string | number;
  title: string;
  imageUrl: string;
  price: string;
  href: string;
}

export default function TourCard({ title, imageUrl, price, href }: TourCardProps) {
  return (
    <Card radius="16px" className={classes.tourCard} shadow="sm" withBorder p={0}>
      <Link href={href as Route} className={classes.linkWrapper}>
        <div className={classes.imageWrapper}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className={classes.image}
          />

        </div>

        <div className={classes.content}>
          <Text className={classes.title} lineClamp={2} title={title}>
            {title}
          </Text>

          <Group justify="space-between" align="center" className={classes.footer}>
            <VinaupDirectoryIcon size={20} fill="var(--vinaup-green)" />
            <Text className={classes.price}>{price}</Text>
          </Group>
        </div>
      </Link>
    </Card>
  );
}
