import { Container } from '@mantine/core';

import LandingFooter from '@/components/footers/landing-footer/landing-footer';
import { LandingHeader } from '@/components/headers/landing-header/landing-header';

import classes from './layout.module.scss';
import PopularDestinationsSection from '@/components/primitives/popular-destinations/popular-destinations';
export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={classes.landingLayoutRoot}>
      <Container size="xl" classNames={{ root: classes.landingContainer }}>
        <LandingHeader />
      </Container>
      {children}
      <PopularDestinationsSection />
      <LandingFooter />
    </div>
  );
}