import { Container, Grid, Anchor, Text, Box, Title, Group, Badge, Button, Divider, GridCol } from '@mantine/core';
import classes from './product-detail.module.scss';
import { ProductGallery } from '../../primitives/product-gallery/product-gallery';
import { 
    VinaupCartPlusIcon, 
    VinaupEarthIcon,
    VinaupEyeIcon,
    VinaupCopyIcon,
    VinaupHeartIcon,
    VinaupPlusIcon
} from '@vinaup/ui/cores';

export function ProductDetail() {
    const thumbnails = [
        '/1751241600_Dell5490(1).jpg',
        '/1751241600_Dell5490(1).jpg',
        '/1751241600_Dell5490(1).jpg',
        '/1751241600_Dell5490(1).jpg',
        '/1751241600_Dell5490(1).jpg',
    ];

    return (
        <Container size="xl" pt={{ base: '1rem', sm: '2rem' }}>
            <Box className={classes.productContainer}>
                <Grid gap={{ base: '16px', md: '20px' }}>
                    {/* Left: Product Gallery */}
                    <GridCol span={{ base: 12, md: 6, lg: 6 }}>
                        <ProductGallery images={thumbnails} />
                    </GridCol>

                    {/* Right: Product Info */}
                    <GridCol span={{ base: 12, md: 6, lg: 6 }}>
                        <div className={classes.info}>
                            <Title order={1} className={classes.title}>
                                Dell Latitude 5420 i5 1145G7 8G 256G A1
                            </Title>

                            <Box mb="0.75rem">
                                <Text className={classes.oldPrice} hiddenFrom="sm" mb={4}>10.000.000đ</Text>
                                
                                <Group gap="sm" align="center">
                                    <Text className={classes.newPrice}>29.800.000đ</Text>
                                    <Text className={classes.oldPrice} visibleFrom="sm">10.000.000đ</Text>
                                    <Badge color="red" variant="outline" className={classes.discountBadge}>-16%</Badge>
                                </Group>
                            </Box>

                            <Group gap="xs" mb="md" className={classes.metaInfo}>
                                <Text span size="md">Hàng có sẵn</Text>
                                <Divider orientation="vertical" />
                                <Text span size="md">Hãng sản xuất: <Anchor href="#" className={classes.brandLink}>HP computer</Anchor></Text>
                            </Group>

                            <div className={classes.benefits}>
                                <div className={classes.benefitItem}>
                                    <VinaupEarthIcon size={16} />
                                    <Text size="md">Nhiệt tình giao hàng TPHCM & liên tỉnh</Text>
                                </div>
                                <div className={classes.benefitItem}>
                                    <VinaupEarthIcon size={16} />
                                    <Text size="md">Cam kết hoàn tiền 100% tận tay khách</Text>
                                </div>
                                <div className={classes.benefitItem}>
                                    <VinaupEarthIcon size={16} />
                                    <Text size="md">Chính sách bảo hành tận tâm</Text>
                                </div>
                            </div>

                            <div className={classes.actionButtons}>
                                <Group wrap="nowrap" gap="sm">
                                    <Button variant="outline" color="red" className={classes.cartBtn} p={0}>
                                        <VinaupCartPlusIcon size={26} fill="var(--vinaup-soft-crimson)" />
                                    </Button>
                                    <Button fullWidth color="var(--vinaup-soft-crimson)" className={classes.buyNowBtn} size="md">
                                        Mua ngay
                                    </Button>
                                </Group>

                                <Grid gap="sm">
                                    <GridCol span={6}>
                                        <Button fullWidth variant="filled" className={classes.consultBtn} size="md">
                                            Yêu cầu tư vấn
                                        </Button>
                                    </GridCol>
                                    <GridCol span={6}>
                                        <Button fullWidth variant="filled" className={classes.installmentBtn} size="md">
                                            Mua trả góp
                                        </Button>
                                    </GridCol>
                                </Grid>
                            </div>

                            <Group gap="lg" mt="sm" className={classes.bottomActions}>
                                <Group gap={8} className={classes.actionItem}>
                                    <VinaupEyeIcon size={16} stroke="currentColor" fill="currentColor" /> <Text size="md">01</Text>
                                </Group>
                                <Group gap={8} className={classes.actionItem}>
                                    <VinaupCopyIcon size={16} fill="currentColor" /> <Text size="md">Copy</Text>
                                </Group>
                                <Group gap={8} className={classes.actionItem}>
                                    <VinaupHeartIcon size={16} stroke="currentColor" fill="none" /> <Text size="md">Yêu thích</Text>
                                </Group>
                                <Group gap={8} className={classes.actionItem}>
                                    <VinaupPlusIcon size={18} stroke="currentColor" /> <Text size="md">So sánh</Text>
                                </Group>
                            </Group>
                        </div>
                    </GridCol>
                </Grid>
            </Box>
        </Container>
    );
}
