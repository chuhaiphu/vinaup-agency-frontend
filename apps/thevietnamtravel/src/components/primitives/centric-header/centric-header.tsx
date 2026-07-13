import { Stack, Title, Text } from "@mantine/core";
import classes from "./centric-header.module.scss";

interface CentricHeaderProps {
  title: string;
  subtitle?: string;
}

export default function CentricHeader({ title, subtitle }: CentricHeaderProps) {
  return (
    <Stack gap={4} mb="1.5rem" align="center" className={classes.centricHeaderRoot}>
      {/* Tiêu đề chính h1 */}
      <Title order={1} className={classes.mainTitle}>
        {title}
      </Title>

      {/* Phụ đề căn giữa */}
      {subtitle && (
        <Text className={classes.mainSubtitle}>
          {subtitle}
        </Text>
      )}
    </Stack>
  );
}