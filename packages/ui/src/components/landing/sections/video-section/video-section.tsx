'use client';

import { generateEmbededUrl, generateVideoThumbnailUrl } from '@vinaup/utils';
import classes from './video-section.module.scss';
import { useState } from 'react';
import { BsPlayBtnFill } from 'react-icons/bs';

interface VideoPlayerProps {
  url?: string;
  title?: string;
  height?: number | string;
  thumbnailUrl?: string;
}

export function VideoSection({
  url,
  title = 'Embedded Video',
  height,
  thumbnailUrl,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl = generateEmbededUrl(url);

  if (!embedUrl) {
    return null;
  }

  const posterUrl = thumbnailUrl ?? generateVideoThumbnailUrl(url) ?? undefined;

  const autoplayEmbedUrl =
    embedUrl + (embedUrl.includes('?') ? '&autoplay=1' : '?autoplay=1');

  return (
    <div
      className={classes.videoContainer}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      {isPlaying ? (
        <iframe
          loading="lazy"
          src={autoplayEmbedUrl}
          title={title}
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className={classes.thumbnail}
          style={posterUrl ? { backgroundImage: `url(${posterUrl})` } : undefined}
          onClick={() => setIsPlaying(true)}
          aria-label={`Phát video: ${title}`}
        >
          <BsPlayBtnFill size={72} color="red" />
        </button>
      )}
    </div>
  );
}