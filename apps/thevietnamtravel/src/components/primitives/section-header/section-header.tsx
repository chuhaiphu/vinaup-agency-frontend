import { Group, Stack, Title, Text } from "@mantine/core";
import classes from "./section-header.module.scss";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  rightSection?: React.ReactNode;
  titleColor?: string;
  subTitleColor?: string;
}

export function SectionHeader({ title, titleColor, subtitle, subTitleColor, rightSection }: SectionHeaderProps) {
  return (
    <Stack gap={4} mb="1.5rem" className={classes.sectionHeaderRoot}>
      {/* Title and Right Section */}
      <Group justify="space-between" align="center">
        <Title order={2} className={classes.title} style={{ color: titleColor || 'var(--vinaup-green)' }}>
          {title}
        </Title>

        {rightSection && (
          <div className={classes.rightSection}>
            {rightSection}
          </div>
        )}
      </Group>

      {/* Subtitle */}
      {subtitle && (
        <Text className={classes.subtitle} style={{ color: subTitleColor || 'var(--vinaup-text)' }}>
          {subtitle}
        </Text>
      )}
    </Stack>
  );
}