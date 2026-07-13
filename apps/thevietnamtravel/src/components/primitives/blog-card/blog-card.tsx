import { Card, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { Route } from 'next';

import classes from './blog-card.module.scss';

export interface BlogCardProps {
  title: string;
  imageUrl: string;
  href: string;
}

export default function BlogCard({ title, imageUrl, href }: BlogCardProps) {
  return (
    <Card radius="16px" className={classes.blogCardRoot} shadow="sm" withBorder p={0}>
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
        </div>
      </Link>
    </Card>
  );
}
