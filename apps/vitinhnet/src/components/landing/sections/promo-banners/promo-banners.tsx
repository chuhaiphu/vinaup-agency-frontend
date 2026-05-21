import { Container, Grid, Image, GridCol, AspectRatio } from '@mantine/core';

export function PromoBanners() {
  return (
    <Container size="xl" w="100%" mt={"2rem"}>
      <Grid gap={20}>
        <GridCol span={{ base: 12, sm: 6 }}>
          <AspectRatio ratio={3 / 1}>
            <Image
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1026&auto=format&fit=crop"
              radius="md"
              fallbackSrc="https://placehold.co/600x400?text=Banner+1"
              alt="Promo Banner 1"
              style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)', cursor: 'pointer' }}
            />
          </AspectRatio>

        </GridCol>
        <GridCol span={{ base: 12, sm: 6 }}>
          <AspectRatio ratio={3 / 1}>
            <Image
              src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=987&auto=format&fit=crop"
              radius="md"
              fallbackSrc="https://placehold.co/600x400?text=Banner+2"
              alt="Promo Banner 2"
              style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)', cursor: 'pointer' }}
            />
          </AspectRatio>
        </GridCol>
      </Grid>
    </Container>
  );
}
