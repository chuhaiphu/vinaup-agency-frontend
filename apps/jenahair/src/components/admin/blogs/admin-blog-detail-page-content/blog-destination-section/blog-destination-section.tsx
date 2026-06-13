'use client';

import { Grid, GridCol, MultiSelect, Paper, Stack, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { VN_PROVINCES } from '@/constants';

import { BlogDetailFormValues } from '../_form';
import classes from './blog-destination-section.module.scss';

interface BlogDestinationSectionProps {
  form: UseFormReturnType<BlogDetailFormValues>;
  country: string;
}

export default function BlogDestinationSection({ form, country }: BlogDestinationSectionProps) {
  const destinations = form.getValues().destinations;

  return (
    <Paper p={'sm'} radius={'md'} classNames={{ root: classes.blogDestinationSectionRoot }}>
      <Grid>
        <GridCol span={6}>
          <Stack gap={'xs'}>
            <Text>Country</Text>
            <TextInput
              size="md"
              classNames={{
                input: classes.countryInput,
              }}
              value={country}
              disabled
            />
          </Stack>
        </GridCol>
        <GridCol span={6}>
          <Stack gap={'xs'}>
            <Text>Destination</Text>
            <MultiSelect
              maxValues={3}
              size="md"
              hidePickedOptions
              data={VN_PROVINCES.map((p) => ({ value: p, label: p }))}
              placeholder={destinations.length < 3 ? 'Select up to 3 destinations' : ''}
              searchable
              nothingFoundMessage="Not found"
              {...form.getInputProps('destinations')}
            />
          </Stack>
        </GridCol>
      </Grid>
    </Paper>
  );
}
