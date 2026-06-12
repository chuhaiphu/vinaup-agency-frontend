import { VideoSection } from '@vinaup/ui/landing';

import { getThemeConfigActionPublic } from '@/actions/theme-config-actions';

export async function VideoSectionShowcase() {
  const result = await getThemeConfigActionPublic();
  const socialLinks = result.data?.value ?? [];
  const youtubeItem = socialLinks.find(
    (item) => item.platform.toLowerCase() === 'youtube' && item.isActive,
  );

  return <VideoSection url={youtubeItem?.url ?? ''} />;
}
