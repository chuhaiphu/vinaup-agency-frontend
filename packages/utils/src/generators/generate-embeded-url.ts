/**
 * Converts a YouTube or Vimeo share/watch URL into an embeddable iframe URL.
 *
 * @param url - Video URL from YouTube (watch, short, youtu.be) or Vimeo
 * @returns Privacy-enhanced embed URL, or null if the URL is unsupported or invalid
 * @example
 * generateEmbededUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
 * // 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
 *
 * generateEmbededUrl('https://vimeo.com/123456789')
 * // 'https://player.vimeo.com/video/123456789'
 *
 * generateEmbededUrl(null) // null
 */
export function generateEmbededUrl(url: string | null | undefined): string | null {
  try {
    if (!url) {
      return null;
    }
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace('www.', '');

    if (hostname === 'youtube.com' || hostname === 'youtu.be') {
      if (hostname === 'youtu.be') {
        return `https://www.youtube-nocookie.com/embed/${parsed.pathname.slice(1)}`;
      }

      const videoId = parsed.searchParams.get('v');
      if (videoId) {
        return `https://www.youtube-nocookie.com/embed/${videoId}`;
      }

      if (parsed.pathname.startsWith('/embed/')) {
        if (hostname === 'youtube.com' || hostname === 'www.youtube.com') {
          const embedId = parsed.pathname.split('/embed/')[1]?.split('?')[0];
          if (embedId) {
            return `https://www.youtube-nocookie.com/embed/${embedId}${parsed.search}`;
          }
        }
        return url;
      }

      if (parsed.pathname.startsWith('/shorts/')) {
        const shortId = parsed.pathname.split('/shorts/')[1]?.split('?')[0];
        if (shortId) {
          return `https://www.youtube-nocookie.com/embed/${shortId}`;
        }
      }
    }

    if (hostname === 'vimeo.com') {
      const videoId = parsed.pathname.split('/')[1];
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}
