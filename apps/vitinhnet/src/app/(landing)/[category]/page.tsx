import { Container, Title, Box, Group, Loader, Center, SimpleGrid } from '@mantine/core';
import { VideoSection } from '@vinaup/ui/landing';
import { Suspense } from 'react';

import { getAllProductsActionPublic } from '@/actions/product-actions';
import { ProductCardV2 } from '@/components/landing/sections/featured-products/product-card-v2';
import { SeoArticle } from '@/components/landing/sections/seo-article/seo-article';
import { CATEGORY_MAP } from '@/constants/category-constants';
import { SEO_ARTICLE_MOCK_HTML } from '@/mocks/seo-article.mock';

import { CategoryControls } from './category-controls';
import { CategoryPagination } from './category-pagination';
import classes from './page.module.scss';

const ITEMS_PER_PAGE = 20;

async function CategoryPageWrapper({
    paramsPromise,
    searchParamsPromise
}: {
    paramsPromise: Promise<{ category: string }>;
    searchParamsPromise: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await paramsPromise;
    const resolvedSearchParams = await searchParamsPromise;

    const categorySlug = resolvedParams.category;

    const formatCategoryName = (slug: string) => {
        return CATEGORY_MAP[slug] || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const categoryName = formatCategoryName(categorySlug);

    const result = await getAllProductsActionPublic({ category: categorySlug });
    const products = result.success && result.data ? result.data : [];

    const totalProducts = products.length;
    const totalPages = Math.max(1, Math.ceil(totalProducts / ITEMS_PER_PAGE));

    let currentPage = 1;
    if (typeof resolvedSearchParams.page === 'string') {
        currentPage = parseInt(resolvedSearchParams.page, 10);
    }

    if (isNaN(currentPage) || currentPage < 1) currentPage = 1;
    if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = products.slice(startIndex, endIndex);

    return (
        <Box className={classes.mainWrapper}>
            <Container size="xl" py={{ base: '1rem', md: '2rem' }}>

                {/* HEADER SECTION */}
                <div className={classes.headerContainer}>
                    <Title className={classes.categoryTitle}>{categoryName}</Title>
                    <CategoryControls
                        categorySlug={resolvedParams.category}
                        subCategories={['Tất cả', 'Laptop HP', 'Laptop Lenovo', 'Laptop Dell', 'Laptop Asus', 'Laptop Acer', 'MacBook', 'Lenovo Thinkpad', 'Laptop HP', 'Laptop Lenovo', 'Laptop Dell']}
                    />
                </div>

                {/* PRODUCT GRID */}
                <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={{ base: '10px', sm: '15px', md: '20px' }}>
                    {currentProducts.map((product) => (
                        <ProductCardV2 key={product.id} product={product} />
                    ))}
                </SimpleGrid>

                {/* PAGINATION */}
                <Group justify="center" mt={{ base: '1rem', md: '2rem' }}>
                    <CategoryPagination totalPages={totalPages} currentPage={currentPage} />
                </Group>
            </Container>

            {/* SEO Content Section */}
            <Box className={classes.seoSection}>
                <Container size="lg" mb={{ base: '1rem', md: '2rem' }}>
                    <SeoArticle contentHtml={SEO_ARTICLE_MOCK_HTML} />
                </Container>

                <Container size="lg" mb={{ base: '1rem', md: '2rem' }}>
                    <VideoSection
                        url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                        title="Vitinhnet PC Video"
                        height="450px"
                    />
                </Container>
            </Box>
        </Box>
    );
}

export default function CategoryPage(
    props: {
        params: Promise<{ category: string }>;
        searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
    }
) {
    return (
        <Suspense fallback={<Center py="3rem"><Loader color="red" /></Center>}>
            <CategoryPageWrapper paramsPromise={props.params} searchParamsPromise={props.searchParams} />
        </Suspense>
    );
}