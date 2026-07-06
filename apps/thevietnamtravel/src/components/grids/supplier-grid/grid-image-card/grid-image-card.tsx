import Image from 'next/image';
import { Text, Group, Box } from '@mantine/core';
import { MdArrowOutward } from 'react-icons/md';
import Link from 'next/link';
import { Route } from 'next';
import classes from './grid-image-card.module.scss';

interface GridImageCardProps {
  title: string;
  imageUrl: string;
  href?: string;
}

export default function GridImageCard({ title, imageUrl, href }: GridImageCardProps) {
  return (
    <Box
      component={Link}
      href={href as Route}
      className={classes.cardWrapper}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className={classes.cardImage}
      />

      <Group className={classes.glassLabel} justify="space-between">
        <Text className={classes.title}>
          {title}
        </Text>
        <MdArrowOutward color="white" size={24} className={classes.cardIcon} />
      </Group>
    </Box>
  );
}