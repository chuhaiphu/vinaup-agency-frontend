import {
  JenhairIcon,
  VinaupFacebookIcon,
  VinaupGoogleMapIcon,
  VinaupInstagramIcon,
  VinaupTiktokIcon,
} from '@vinaup/ui/cores';
import { WhatsappIcon } from '@vinaup/ui/cores';
import { StickyHeader, Sidebar, type SidebarNavLink } from '@vinaup/ui/landing';
import { TreeManager } from '@vinaup/utils';
import { validateExternalEndpoint, generateParsedEndpoint } from '@vinaup/utils';
import { cacheLife, cacheTag } from 'next/cache';

import { getAllBlogsActionPublic } from '@/actions/blog-actions';
import { getAllDiariesActionPublic } from '@/actions/diary-actions';
import { getAllMenusActionPublic } from '@/actions/menu-actions';
import { getAllPagesPublicActionPublic } from '@/actions/page-actions';
import { getThemeConfigActionPublic } from '@/actions/theme-config-actions';
import type { MenuResponse } from '@/interfaces/menu-interfaces';

import BlogsDiariesSpotlightSearchContent from './blogs-diaries-spotlight-search-content';
import { StickyHeaderContent } from './sticky-header-content';

const SOCIAL_ICON_MAP: Record<string, { icon: React.ReactNode; label: string }> = {
  googlemap: {
    icon: <VinaupGoogleMapIcon size={30} />,
    label: 'Google Map',
  },
  tiktok: {
    icon: <VinaupTiktokIcon size={30} />,
    label: 'Tiktok',
  },
  facebook: {
    icon: <VinaupFacebookIcon size={30} />,
    label: 'Facebook',
  },
  instagram: {
    icon: <VinaupInstagramIcon size={30} />,
    label: 'Instagram',
  },
  whatsapp: {
    icon: <WhatsappIcon width={36} height={38} />,
    label: 'WhatsApp',
  },
};

function buildNavLinks(flatMenus: MenuResponse[]): SidebarNavLink[] {
  if (!flatMenus.length) return [];

  const root = new TreeManager(flatMenus).getRoot();
  if (!root?.children?.length) return [];

  function toNavLink(menu: MenuResponse): SidebarNavLink {
    const href = generateParsedEndpoint(menu.customUrl);
    return {
      id: menu.id,
      label: menu.title,
      href,
      external: validateExternalEndpoint(href),
      children: menu.children?.length ? menu.children.map(toNavLink) : undefined,
    };
  }

  return root.children.map(toNavLink);
}

export default async function LandingHeader() {
  // The header is cached into the static shell and aggregates five domains.
  // Each must be tagged so a mutation in any of them refreshes the header — a
  // component cache is a separate entry from the actions it calls.
  // → docs/pattern/CACHING-REVALIDATION.md (Rule 1)
  'use cache';
  cacheLife('default');
  cacheTag('theme-config', 'menu', 'blogs', 'diaries', 'pages');
  const [socialLinksResponse, menusResponse, blogsResponse, diariesResponse, pagesResponse] =
    await Promise.all([
      getThemeConfigActionPublic(),
      getAllMenusActionPublic(),
      getAllBlogsActionPublic(),
      getAllDiariesActionPublic(),
      getAllPagesPublicActionPublic(),
    ]);

  const socialLinksData = socialLinksResponse.data?.value ?? [];

  const socialLinks = socialLinksData
    .filter((item) => item.isActive)
    .flatMap((item) => {
      const key = item.platform.toLowerCase();
      const iconConfig = SOCIAL_ICON_MAP[key];
      if (!iconConfig) return [];
      return [{ icon: iconConfig.icon, href: item.url, label: iconConfig.label }];
    });

  const navLinks = buildNavLinks(menusResponse.data ?? []);

  return (
    <>
      <StickyHeader>
        <StickyHeaderContent
          socialLinks={socialLinks}
          logo={<JenhairIcon size={55} fill="var(--vinaup-amber)" />}
          spotlightChildren={
            <BlogsDiariesSpotlightSearchContent
              blogsResponse={blogsResponse.data ?? []}
              diariesResponse={diariesResponse.data ?? []}
              pagesResponse={pagesResponse.data ?? []}
            />
          }
        />
      </StickyHeader>
      <Sidebar navLinks={navLinks} drawerPosition="right" />
    </>
  );
}
