import { Group, Avatar, Text, Progress } from '@mantine/core';

export interface ReviewItemProps {
  name?: string;
  date?: string;
  content?: string;
  score?: number;
}

export default function ReviewItem({
  name = 'Nguyen Van Teo',
  date = '22/12/26',
  content = 'This Pokémon likes to lick its palms that are sweetened by being soaked in honey. Teddiursa concocts its own honey by blending fruits and pollen collected by Beedrill. Blastoise has water spouts that protrude from its shell. The water',
  score = 75,
}: ReviewItemProps) {
  return (
    <Group align="flex-start" wrap="nowrap" mt="lg">
      <Avatar radius="xl" size="md" />
      <div style={{ flex: 1 }}>
        <Group gap="xs" mb={4}>
          <Text fw={700} size="18px" c="var(--vinaup-green)">{name}</Text>
          <Text size="sm" c="dimmed" fs="italic">({date})</Text>
        </Group>
        <Text size="16px" mb="xs" lh="1.6">
          {content}
        </Text>

        <Group justify="flex-end" mb={4}>
          <Text size="sm" c="var(--vinaup-green)" fw={700}>{score}%</Text>
        </Group>
        <Progress value={score} color="#F5B21A" size="sm" radius={2} />

        <Text size="md" fs="italic" c="var(--vinaup-green)" mt="md" style={{ cursor: 'pointer' }}>
          View more
        </Text>
      </div>
    </Group>
  );
}
