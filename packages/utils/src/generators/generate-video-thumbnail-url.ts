/**
 * @param url - Video URL from YouTube (watch, youtu.be, /embed/, /shorts/)
 * @returns YouTube thumbnail URL (i.ytimg.com is a cookieless static host), or null
 * @example
 * generateVideoThumbnailUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
 * // 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
 */
export function generateVideoThumbnailUrl(
  url: string | null | undefined
): string | null {
  try {
    if (!url) {
      return null;
    }
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace('www.', '');

    if (hostname !== 'youtube.com' && hostname !== 'youtu.be') {
      return null;
    }

    // ─── resolve the video id from every YouTube URL shape ─────
    let videoId: string | undefined;
    if (hostname === 'youtu.be') {
      videoId = parsed.pathname.slice(1);
    } else if (parsed.searchParams.get('v')) {
      videoId = parsed.searchParams.get('v') ?? undefined;
    } else if (parsed.pathname.startsWith('/embed/')) {
      videoId = parsed.pathname.split('/embed/')[1]?.split('?')[0];
    } else if (parsed.pathname.startsWith('/shorts/')) {
      videoId = parsed.pathname.split('/shorts/')[1]?.split('?')[0];
    }

    if (!videoId) {
      return null;
    }

    // hqdefault always exists (unlike maxresdefault) and i.ytimg.com sets no cookies.
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  } catch {
    return null;
  }
}
