import {
  Paper,
  Text,
  Title,
  Flex,
  Box,
  Container,
  Grid,
  Image,
  GridCol,
  AspectRatio,
} from '@mantine/core';

import { ContactForm } from './contact-form';
import classes from './page.module.scss';

export default function ContactPage() {
  return (
    <Container size="xl" py={{ base: 'md', md: 'xl' }}>
      <Flex direction="column" gap="md">
        <Paper radius="md" p={{ base: 8, md: 'md' }} bg="white" shadow="sm" withBorder>
          <Title order={2} className={classes.pageTitle} mb={0}>
            Liên hệ
          </Title>
        </Paper>

        <Paper radius="md" p={{ base: 8, md: 'lg' }} bg="white" shadow="sm" withBorder>
          <Grid gap="20px" align="stretch">
            <GridCol span={{ base: 12, md: 8 }}>
              <Flex direction="column" gap="lg">
                <Box>
                  <Flex direction="column" gap="xs">
                    <Text fw={600} className={classes.contactDetailText} fz="1.375rem">
                      Thông tin liên hệ
                    </Text>

                    <Text className={classes.contactDetailText}>
                      • <strong>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh
                    </Text>

                    <Text className={classes.contactDetailText}>
                      • <strong>Điện thoại:</strong> 0123 456 789
                    </Text>

                    <Text className={classes.contactDetailText}>
                      • <strong>Email:</strong> contact@vinaup.com
                    </Text>
                  </Flex>
                </Box>

                <ContactForm />
              </Flex>
            </GridCol>

            <GridCol span={{ base: 12, md: 4 }}>
              <Flex direction="column" gap="20px">
                <Paper radius="md" p={0} className={classes.imageSection} style={{ height: 'auto' }}>
                  <AspectRatio ratio={1}>
                    <Image
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
                      alt="Vinaup Contact"
                      className={classes.contactImage}
                      fit="cover"
                    />
                  </AspectRatio>
                </Paper>
                <Paper radius="md" p={0} className={classes.imageSection} style={{ height: 'auto' }}>
                  <AspectRatio ratio={1}>
                    <Image
                      src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=600&auto=format&fit=crop"
                      alt="Vinaup Contact 2"
                      className={classes.contactImage}
                      fit="cover"
                    />
                  </AspectRatio>
                </Paper>
              </Flex>
            </GridCol>
          </Grid>
        </Paper>
      </Flex>
    </Container>
  );
}
