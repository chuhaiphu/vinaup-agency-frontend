import { Container } from '@mantine/core';

import ChannelInfoSection from '@/components/channel-info/channel-info';
import ItemGrid from '@/components/grids/items-grid/item-grid';
import SupplierGrid from '@/components/grids/supplier-grid/supplier-grid';
import AgenciesSection from '@/components/primitives/agencies-section/agencies-section';
import { LandingCarousel } from '@/components/primitives/landing-carousel/landing-carousel';
import ParallaxSection from '@/components/primitives/parallax-section/parallax-section';
import { SectionHeader } from '@/components/primitives/section-header/section-header';
import { SeeAllLink } from '@/components/primitives/see-all-link/see-all-link';
import { MOCK_SLIDES } from '@/mocks/landing-mock-data';
import { MOCK_SUPPLIER_GRID_ITEMS } from '@/mocks/supplier-mock-data';
import { MOCK_TOUR_GRID_ITEMS } from '@/mocks/tour-grid-data';

import classes from './page.module.scss';

export default async function LandingPage() {
  return (
    <>
      <Container size="xl" classNames={{ root: classes.landingPageRoot }}>
        <LandingCarousel slides={MOCK_SLIDES} />

        <SupplierGrid
          title="Vietnam travel suppliers"
          subtitle="Providing information about local tourism services in Vietnam: Tours, restaurants, attractions... recommended directly by sales staff from the providers."
          data={MOCK_SUPPLIER_GRID_ITEMS}
        />

        <ItemGrid
          title="Vietnam Travel Types"
          subtitle="Welcome to website, where we showcase a wide variety of tours offered by carefully selected and trusted travel agents."
          data={MOCK_TOUR_GRID_ITEMS}
        />

        {/* <Ads imageUrl="/mock-images/mock-ads.jpg" alt="Ads" /> */}
      </Container>

      <Container
        size="xl"
        classNames={{ root: classes.landingPageRoot }}
        pt={'3rem'}
      >
        <SectionHeader
          title="The best Vietnam Agencies"
          subtitle="These are well thought of travel companies that we have verified"
          rightSection={<SeeAllLink href="/agencies" />}
        />
      </Container>

      <AgenciesSection />

      <ParallaxSection
        backgroundImage="/mock-images/z6005041616453_ab9be89ca94e5e8d8caff5c6cbd85233-1.jpg"
        overlayOpacity={0.6}
        py={"0"}
        mt={"3rem"}
      >
        <Container
          size="xl"
          py={'3rem'}
          classNames={{ root: classes.landingPageRoot }}
        >
          <SectionHeader
            title="Vietnam Travel Channel"
            subtitle="The travel services offered on this website include a wide range of interconnected and linked options."
            rightSection={
              <SeeAllLink
                href="/channel"
                color="var(--vinaup-green-light)"
              />
            }
            titleColor="var(--vinaup-green-light)"
            subTitleColor="var(--vinaup-white)"
          />
          <ChannelInfoSection />
        </Container>
      </ParallaxSection>
    </>
  );
}
