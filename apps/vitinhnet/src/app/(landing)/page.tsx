import { getAllProductsActionPublic } from '@/actions/product-actions';
import { getAllTechNewsActionPublic } from '@/actions/tech-news-actions';
import { Commitments } from '@/components/landing/sections/commitments/commitments';
import { FeaturedProducts } from '@/components/landing/sections/featured-products/featured-products';
import { HeroSection } from '@/components/landing/sections/hero-section/hero-section';
import { PromoBanners } from '@/components/landing/sections/promo-banners/promo-banners';
import { TechNews } from '@/components/landing/sections/tech-news/tech-news';

export default async function Home() {
  const [productsResult, techNewsResult] = await Promise.all([
    getAllProductsActionPublic(),
    getAllTechNewsActionPublic(),
  ]);
  const featuredProducts = (productsResult.data ?? []).slice(0, 10);
  const techNewsArticles = techNewsResult.data ?? [];

  return (
    <div>
      <HeroSection />
      <PromoBanners />
      <FeaturedProducts products={featuredProducts} />
      <FeaturedProducts products={featuredProducts} />
      <FeaturedProducts products={featuredProducts} />
      <TechNews articles={techNewsArticles} />
      <Commitments />
    </div>
  );
}
