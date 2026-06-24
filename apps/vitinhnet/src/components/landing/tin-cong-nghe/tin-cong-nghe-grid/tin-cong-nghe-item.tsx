import { Group } from '@mantine/core';
import { VinaupHeartIcon, VinaupEyeIcon } from '@vinaup/ui/cores';
import Image from 'next/image';

import { TechNewsArticleResponse } from '@/interfaces/tech-news-interfaces';
import { formatTwoDigits } from '@/utils/format-two-digits';

import classes from './tin-cong-nghe-item.module.scss';

export default function TinCongNgheItem({ item }: { item: TechNewsArticleResponse }) {
  return (
    <div className={classes.cardWrapper}>
      <div className={classes.imageWrapper}>
        <Image
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          src={item.mainImageUrl || 'https://placehold.co/600x400?text=ViTinhNet'}
          alt={item.title}
          className={classes.image}
        />
      </div>

      <div className={classes.contentWrapper}>
        <h3 className={classes.title} title={item.title}>
          {item.title}
        </h3>

        <Group gap="1rem" mt="auto">
          <Group gap="0.5rem" align="center">
            <VinaupHeartIcon fill="var(--vinaup-soft-crimson, #C44C50)" />
            <span className={classes.metaText}>{formatTwoDigits(item.likes)}</span>
          </Group>
          <Group gap="0.5rem" align="center">
            <VinaupEyeIcon
              stroke="var(--vinaup-soft-crimson, #C44C50)"
              fill="var(--vinaup-soft-crimson, #C44C50)"
            />
            <span className={classes.metaText}>{formatTwoDigits(item.views)}</span>
          </Group>
        </Group>
      </div>
    </div>
  );
}
