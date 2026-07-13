import { Card, Text, Group } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { Route } from 'next';
import { VinaupSupplierIcon } from '@vinaup/ui/cores';

import classes from './tour-card.module.scss';

export interface TourCardProps {
  id: string | number;
  title: string;
  imageUrl?: string;
  mainImageUrl?: string;
  price: string | number;
  originalPrice?: string | number;
  href?: string;
}

export default function TourCard({ title, imageUrl, mainImageUrl, price, originalPrice, href }: TourCardProps) {
  const displayPrice = typeof price === 'number' ? `đ ${price.toLocaleString('vi-VN')}` : price;
  const displayOriginalPrice = typeof originalPrice === 'number' ? originalPrice.toLocaleString('vi-VN') : originalPrice;
  const imageSrc = imageUrl || mainImageUrl || '';
  
  return (
    <Card radius="16px" className={classes.tourCardRoot} shadow="sm" withBorder p={0}>
      <Link href={(href || '#') as Route} className={classes.linkWrapper}>
        <div className={classes.imageWrapper}>
          <Image
            src={imageSrc}
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

          <Group justify="space-between" align="flex-end" className={classes.footer}>
            <VinaupSupplierIcon size={24} fill="var(--vinaup-green)" />
            <div className={classes.priceWrapper}>
              <Text className={classes.price}>{displayPrice}</Text>
              {displayOriginalPrice && (
                <Text className={classes.originalPrice}>{displayOriginalPrice}</Text>
              )}
            </div>
          </Group>
        </div>
      </Link>
    </Card>
  );
}
