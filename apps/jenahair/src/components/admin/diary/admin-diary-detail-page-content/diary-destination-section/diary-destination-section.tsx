'use client';

import { Grid, GridCol, MultiSelect, Paper, Stack, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { VN_PROVINCES } from '@/constants';

import { DiaryDetailFormValues } from '../_form';
import classes from './diary-destination-section.module.scss';

interface DiaryDestinationSectionProps {
  form: UseFormReturnType<DiaryDetailFormValues>;
  country: string;
}

export default function DiaryDestinationSection({ form, country }: DiaryDestinationSectionProps) {
  const destinations = form.getValues().destinations;

  return (
    <Paper p={'sm'} radius={'md'} classNames={{ root: classes.diaryDestinationSectionRoot }}>
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
