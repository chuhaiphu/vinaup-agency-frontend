import { Container, Grid, GridCol, Box, Title, Text, List, ListItem, Group } from '@mantine/core';
import { VinaupArrowRightIcon } from '@vinaup/ui/cores';
import { generateFormattedPrice } from '@vinaup/utils';

import { ProductResponse } from '@/interfaces/product-interfaces';

import classes from './product-compare.module.scss';

export function ProductCompare({ products }: { products: ProductResponse[] }) {
  return (
    <Container size="xl" py={{ base: '1rem', sm: '2rem' }}>
      <Title order={2} mb="md" className={classes.mainTitle}>
        So sánh sản phẩm
      </Title>

      <Grid gap="20px" align="stretch">
        {products.map((product) => (
          <GridCol key={product.id} span={{ base: 12, sm: 6, md: 3 }}>
            <Box className={classes.card}>
              <Text fw={700} className={classes.productName} mb="sm" lineClamp={2}>
                {product.title}
              </Text>

              <Group gap="xs" mb="lg" align="flex-end">
                <Text fw={700} className={classes.productPrice}>
                  {generateFormattedPrice(product.price)}đ
                </Text>
                <Text td="line-through" className={classes.originalPrice}>
                  {generateFormattedPrice(product.originalPrice)}đ
                </Text>
              </Group>

              <Group gap="sm" mb="md" align="center" wrap="nowrap">
                <VinaupArrowRightIcon size={20} fill="var(--vinaup-blue-link)" />
                <Title order={4} className={classes.sectionTitle}>
                  Cấu hình phần cứng
                </Title>
              </Group>

              {product.specs && (
                <List spacing="xs" className={classes.specList}>
                  <ListItem>
                    <b>CPU:</b> {product.specs.cpu}
                  </ListItem>
                  <ListItem>
                    <b>RAM:</b> {product.specs.ram}
                  </ListItem>
                  <ListItem>
                    <b>Ổ cứng:</b> {product.specs.storage}
                  </ListItem>
                  <ListItem>
                    <b>GPU:</b> {product.specs.gpu}
                  </ListItem>
                  <ListItem>
                    <b>Nguồn:</b> {product.specs.power}
                  </ListItem>
                  <ListItem>
                    <b>Kích thước:</b> {product.specs.dimensions}
                  </ListItem>
                </List>
              )}
            </Box>
          </GridCol>
        ))}
      </Grid>
    </Container>
  );
}
