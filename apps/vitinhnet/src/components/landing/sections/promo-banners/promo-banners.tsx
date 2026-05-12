import { Container, Grid, Image, GridCol } from '@mantine/core';

export function PromoBanners() {
  return (
    <Container size="xl" w="100%" mt={"2rem"}>
      <Grid gap={20}>
        <GridCol span={{ base: 12, sm: 6 }}>
          <Image 
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1026&auto=format&fit=crop" 
            radius="md" 
            h={200}
            fallbackSrc="https://placehold.co/600x400?text=Banner+1"
            alt="Promo Banner 1"
          />
        </GridCol>
        <GridCol span={{ base: 12, sm: 6 }}>
          <Image 
            src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=987&auto=format&fit=crop" 
            radius="md" 
            h={200}
            fallbackSrc="https://placehold.co/600x400?text=Banner+2"
            alt="Promo Banner 2"
          />
        </GridCol>
      </Grid>
    </Container>
  );
}
