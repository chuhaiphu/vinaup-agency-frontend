import { Card, Text, Avatar, Group, Stack } from '@mantine/core';
import { IconBrandWhatsapp, IconClock } from '@tabler/icons-react';
import { VinaupEmailIcon, VinaupLocationIcon } from '@vinaup/ui/cores';
import classes from './contact-seller-card.module.scss';

export interface ContactSellerCardProps {
  name: string;
  avatarUrl: string;
  email: string;
  phone: string;
  location: string;
  workingHours: string;
}

export default function ContactSellerCard({
  name,
  avatarUrl,
  email,
  phone,
  location,
  workingHours,
}: ContactSellerCardProps) {
  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Text className={classes.title} mb="md">
        Contact seller
      </Text>

      <Group gap="sm" mb="xl">
        <Avatar src={avatarUrl} size={62} radius="xl" />
        <Text fw={700} className={classes.name} style={{ flex: 1 }}>
          {name}
        </Text>
      </Group>

      <Stack gap="md">
        <Group wrap="nowrap" align="center" gap="sm">
          <VinaupEmailIcon size={22} fill={"var(--vinaup-green)"} className={classes.icon} />
          <div>
            <Text size="xs" c="dimmed">
              Email
            </Text>
            <Text size="16px" fw={500} className={classes.textValue}>
              {email}
            </Text>
          </div>
        </Group>

        <Group wrap="nowrap" align="center" gap="sm">
          <IconBrandWhatsapp size={22} className={classes.icon} />
          <div>
            <Text size="xs" c="dimmed">
              Phone & Whatsapp
            </Text>
            <Text size="16px" fw={500} className={classes.textValue}>
              {phone}
            </Text>
          </div>
        </Group>

        <Group wrap="nowrap" align="center" gap="sm">
          <VinaupLocationIcon size={22} fill={"var(--vinaup-green)"} className={classes.icon} />
          <div>
            <Text size="xs" c="dimmed">
              Location
            </Text>
            <Text size="16px" fw={500} className={classes.textValue}>
              {location}
            </Text>
          </div>
        </Group>

        <Group wrap="nowrap" align="center" gap="sm">
          <IconClock size={22} className={classes.icon} />
          <div>
            <Text size="xs" c="dimmed">
              Working hours
            </Text>
            <Text size="16px" fw={500} className={classes.textValue}>
              {workingHours}
            </Text>
          </div>
        </Group>
      </Stack>
    </Card>
  );
}
