import { Image, Text, AspectRatio } from '@mantine/core';
import { VinaupHeartIcon, VinaupEyeIcon } from '@vinaup/ui/cores';

import { TechNewsArticleResponse } from '@/interfaces/tech-news-interfaces';

import classes from './tech-news.module.scss';

export function NewsCard({ item }: { item: TechNewsArticleResponse }) {
    return (
        <div className={classes.newsCard}>
            <div className={classes.imageWrapper}>
                <AspectRatio ratio={4 / 3}>
                    <Image
                        src={item.mainImageUrl}
                        alt={item.title}
                        fit="cover"
                        radius="sm"
                        fallbackSrc="https://placehold.co/400x300?text=News"
                    />
                </AspectRatio>
            </div>

            <div className={classes.cardContent}>
                <Text className={classes.cardTitle}>{item.title}</Text>

                <div className={classes.metaInfo}>
                    <div className={classes.metaItem}>
                        <VinaupHeartIcon size={16} className={classes.heartIcon} fill={"var(--vinaup-soft-crimson)"} />
                        <span>{item.likes.toString().padStart(2, '0')}</span>
                    </div>
                    <div className={classes.metaItem}>
                        <VinaupEyeIcon size={18} className={classes.eyeIcon} fill={"var(--vinaup-soft-crimson)"} stroke={"var(--vinaup-soft-crimson)"} />
                        <span>{item.views.toString().padStart(2, '0')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
