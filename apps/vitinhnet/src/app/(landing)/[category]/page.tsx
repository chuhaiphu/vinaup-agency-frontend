import { Suspense } from 'react';
import { Container, Title, Box, Group, Loader, Center } from '@mantine/core';
import { ProductCardV2, Product } from '@/components/landing/sections/featured-products/product-card-v2';
import classes from './page.module.scss';
import { CategoryControls } from './category-controls';
import { CategoryPagination } from './category-pagination';
import { SeoArticle } from '@/components/landing/sections/seo-article/seo-article';
import { VideoSection } from '@vinaup/ui/landing';
import { SEO_ARTICLE_MOCK_HTML } from '@/mocks/seo-article.mock';

const MOCK_PRODUCTS: Product[] = Array(90).fill(null).map((_, index) => ({
    id: index.toString(),
    title: 'Dell Latitude 5420 i5 1145G7 8G 256G 14" A1',
    image: '1751241600_Dell5490(1).jpg',
    oldPrice: '24.800.000đ',
    newPrice: '22.800.000đ',
    isTrending: true,
}));

const CATEGORY_MAP: Record<string, string> = {
    'laptop-nhap-khau': 'Laptop Nhập Khẩu',
    'may-tinh-dong-bo': 'Máy Tính Đồng Bộ',
    'man-hinh': 'Màn Hình Máy Tính',
    'may-in': 'Máy In',
    'linh-kien': 'Linh Kiện Máy Tính',
    'pcnet': 'PCNet Máy Tính Net',
};

async function CategoryPageWrapper({ 
    paramsPromise,
    searchParamsPromise 
}: { 
    paramsPromise: Promise<{ category: string }>;
    searchParamsPromise: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await paramsPromise;
    const resolvedSearchParams = await searchParamsPromise;

    const formatCategoryName = (slug: string) => {
        return CATEGORY_MAP[slug] || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const categoryName = formatCategoryName(resolvedParams.category);

    const ITEMS_PER_PAGE = 20;
    const totalProducts = MOCK_PRODUCTS.length;
    const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

    let currentPage = 1;
    if (typeof resolvedSearchParams.page === 'string') {
        currentPage = parseInt(resolvedSearchParams.page, 10);
    }

    if (isNaN(currentPage) || currentPage < 1) currentPage = 1;
    if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = MOCK_PRODUCTS.slice(startIndex, endIndex);

    return (
        <Box className={classes.mainWrapper}>
            <Container size="xl" py={"2rem"}>

                {/* HEADER SECTION */}
                <div className={classes.headerContainer}>
                    <Title className={classes.categoryTitle}>{categoryName}</Title>
                    <CategoryControls
                        categorySlug={resolvedParams.category}
                        subCategories={['Laptop HP', 'Laptop Lenovo', 'Laptop Dell', 'Laptop Asus', 'Laptop Acer', 'MacBook', 'Lenovo Thinkpad', 'Laptop HP', 'Laptop Lenovo', 'Laptop Dell']}
                    />
                </div>

                {/* PRODUCT GRID */}
                <div className={classes.productGrid}>
                    {currentProducts.map((product, idx) => (
                        <div key={idx} className={classes.gridItem}>
                            <ProductCardV2 product={product} />
                        </div>
                    ))}
                </div>

                {/* PAGINATION */}
                <Group justify="center" mt="2rem">
                    <CategoryPagination totalPages={totalPages} currentPage={currentPage} />
                </Group>
            </Container>

            {/* SEO Content Section */}
            <Box className={classes.seoSection}>
                <Container size="lg" mb="2rem">
                    <SeoArticle contentHtml={SEO_ARTICLE_MOCK_HTML} />
                </Container>

                <Container size="lg" mb="2rem">
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