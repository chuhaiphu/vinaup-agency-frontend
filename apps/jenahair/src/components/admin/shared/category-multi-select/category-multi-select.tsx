'use client';

import { Group, MultiSelect, MultiSelectProps, Text } from '@mantine/core';
import { TreeManager } from '@vinaup/utils';
import { useMemo } from 'react';
import { FaCheck } from 'react-icons/fa6';

export interface CategoryItem {
  id: string;
  title: string;
  sortOrder: number;
  parent?: { id: string } | null;
}

interface CategoryMultiSelectProps {
  categories: CategoryItem[];
  value: string[];
  onChange: (categoryIds: string[]) => void;
  maxValues?: number;
  placeholder: string;
}

export default function CategoryMultiSelect({
  categories,
  value,
  onChange,
  maxValues = 3,
  placeholder,
}: CategoryMultiSelectProps) {
  const treeManager = useMemo(() => {
    if (categories.length === 0) {
      return null;
    }
    return new TreeManager(categories);
  }, [categories]);

  // category record so renderOption can resolve the full item from the option value (an id)
  const categoryByIdMap: Record<string, CategoryItem> = useMemo(
    () =>
      categories.reduce(
        (acc, category) => {
          acc[category.id] = category;
          return acc;
        },
        {} as Record<string, CategoryItem>,
      ),
    [categories],
  );

  // Walk parent links recursively to build the root→leaf chain for an option
  const getOptionChain = (categoryId: string): CategoryItem[] => {
    const category = categoryByIdMap[categoryId];
    if (!category) return [];
    if (category.parent) {
      return [...getOptionChain(category.parent.id), category];
    }
    return [category];
  };

  const getOptionChainWithoutRoot = (categoryId: string): CategoryItem[] => {
    const parentChain = getOptionChain(categoryId);
    return parentChain.slice(1);
  };

  const renderCategoryOption: MultiSelectProps['renderOption'] = ({ option, checked }) => {
    const parentChain = getOptionChainWithoutRoot(option.value);

    // If has parent(s), show the full chain
    if (parentChain.length > 1) {
      return (
        <Group gap="xs" wrap="nowrap" justify="space-between">
          {checked && <FaCheck size={20} color="gray" />}
          <Group gap="xs" wrap="nowrap">
            {parentChain.map((category, index) => (
              <Group key={category.id} gap="xs" wrap="nowrap">
                <Text
                  size="sm"
                  fw={index === parentChain.length - 1 ? 500 : 400}
                  c={index === parentChain.length - 1 ? undefined : 'dark.3'}
                >
                  {category.title}
                </Text>
                {index < parentChain.length - 1 && (
                  <Text size="sm" c="dark.3" fw={300}>
                    ›
                  </Text>
                )}
              </Group>
            ))}
          </Group>
        </Group>
      );
    }

    // Root category (no parent)
    return (
      <Group gap="sm" justify="space-between">
        {checked && <FaCheck size={20} color="gray" />}
        <Text size="sm" fw={500}>
          {categoryByIdMap[option.value].title}
        </Text>
      </Group>
    );
  };

  return (
    <MultiSelect
      placeholder={value.length < maxValues ? placeholder : ''}
      size="md"
      maxValues={maxValues}
      w={'100%'}
      searchable
      nothingFoundMessage="Not found"
      value={value}
      renderOption={renderCategoryOption}
      data={treeManager?.toFlatListWithoutRoot().map((category) => ({
        value: category.id,
        label: category.title,
      }))}
      onChange={(categoryIds) => {
        if (!categoryIds) return;
        onChange(categoryIds);
      }}
    />
  );
}
