import { Group, Title, Button, Text, Progress, Box } from '@mantine/core';
import ReviewItem from '@/components/primitives/review-item/review-item';

export default function ReviewsSection() {
  return (
    <>
      <Group justify="space-between" mb="xl" align="center">
        <Title order={2} c="var(--vinaup-green-brand)" style={{ fontSize: '24px' }}>
          Reviews in Thevietnamtravel
        </Title>
        <Button color="var(--vinaup-green)" radius="md">
          Reviews
        </Button>
      </Group>

      <Box style={{ maxWidth: '600px' }}>
        <Group justify="space-between" mb={8}>
          <Text size="md" fw={500}>Satisfaction</Text>
          <Text size="md" c="var(--vinaup-green)" fw={700}>87%</Text>
        </Group>
        <Progress value={87} color="var(--vinaup-yellow)" size="md" radius={2} mb="xl" />

        <ReviewItem />
      </Box>
    </>
  );
}
