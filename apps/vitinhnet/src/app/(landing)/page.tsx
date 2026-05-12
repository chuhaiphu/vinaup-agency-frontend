import { HeroSection } from '@/components/landing/sections/hero-section/hero-section';
import { PromoBanners } from '@/components/landing/sections/promo-banners/promo-banners';
import { FeaturedProducts } from '@/components/landing/sections/featured-products/featured-products';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PromoBanners />
      <FeaturedProducts />
      <FeaturedProducts />
      <FeaturedProducts />
    </div>
  );
}
