'use client';

import { useState } from 'react';
import { Button } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import classes from './seo-article.module.scss';
import clsx from 'clsx';

interface SeoArticleProps {
    contentHtml: string;
}

export function SeoArticle({ contentHtml }: SeoArticleProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={classes.wrapper}>
            <div className={clsx(classes.contentContainer, { [classes.expanded]: isExpanded })}>
                {/* Render HTML content safely */}
                <div 
                    className={classes.content} 
                    dangerouslySetInnerHTML={{ __html: contentHtml }} 
                />
                {!isExpanded && <div className={classes.overlayGradient} />}
            </div>
            
            <div className={classes.actionContainer}>
                <Button 
                    variant="default" 
                    radius="xl"
                    className={classes.toggleBtn}
                    onClick={() => setIsExpanded(!isExpanded)}
                    rightSection={isExpanded ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                >
                    {isExpanded ? 'Thu gọn' : 'Xem tiếp'}
                </Button>
            </div>
        </div>
    );
}