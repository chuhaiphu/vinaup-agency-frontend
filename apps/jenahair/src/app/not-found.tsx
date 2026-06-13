import { Container, Title, Text, Stack, Center } from '@mantine/core';
import Link from 'next/link';

import classes from './not-found.module.scss';

export default function NotFound() {
  return (
    <Container size="md" py="xl">
      <Center className={classes.notFoundRoot}>
        <Stack align="center" gap="lg">
          <Title order={2} ta="center">
            Page Not Found
          </Title>
          <Text size="lg" c="dimmed" ta="center" maw={500}>
            The page you are looking for does not exist or has been moved.
          </Text>
          <Link href="/">Go Back Home</Link>
        </Stack>
      </Center>
    </Container>
  );
}
