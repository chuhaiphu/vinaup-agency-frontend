'use client';

import Marquee from 'react-fast-marquee';
import { TechNewsArticleResponse } from '@/interfaces/tech-news-interfaces';
import { NewsCard } from './news-card';
import classes from './tech-news.module.scss';

export function TechNewsMarquee({ articles }: { articles: TechNewsArticleResponse[] }) {
  return (
    <Marquee speed={40} pauseOnHover={true} gradient={false}>
      {articles.map((item, index) => (
        <div key={`${item.id}-${index}`} className={classes.newsCardWrapper}>
          <NewsCard item={item} />
        </div>
      ))}
    </Marquee>
  );
}
