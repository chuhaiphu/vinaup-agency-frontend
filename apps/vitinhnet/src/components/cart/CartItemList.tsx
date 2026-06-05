'use client';

import { useState } from 'react';
import {
  Box,
  Checkbox,
  Flex,
  Text,
  ActionIcon,
  Divider,
} from '@mantine/core';
import { IconTrash, IconMinus, IconPlus } from '@tabler/icons-react';
import { VinaupCartIcon } from '@vinaup/ui/cores';
import { useCartStore } from '@/stores/cart-store';
import classes from './CartItemList.module.scss';
import Image from 'next/image';

export const CartItemList = () => {
  const { items, toggleAllSelection, toggleItemSelection, updateQuantity, removeItem } = useCartStore();
  const [manualInputIds, setManualInputIds] = useState<string[]>([]);

  const allSelected = items.length > 0 && items.every((item) => item.isSelected);
  const someSelected = items.some((item) => item.isSelected) && !allSelected;

  const handleToggleAll = () => {
    toggleAllSelection(!allSelected);
  };

  return (
    <Box>
      <Box className={classes.cartListContainer}>
        {/* Header Giỏ Hàng */}
        <Flex align="center" justify="space-between" className={classes.cartListHeader}>
          <Checkbox
            classNames={{
              body: classes.checkboxBody,
              label: classes.checkboxLabel
            }}
            label={<Text className={classes.cartTitle}>Giỏ hàng</Text>}
            checked={allSelected}
            indeterminate={someSelected}
            onChange={handleToggleAll}
            color="#C44C50"
            radius="xs"
          />
          <ActionIcon
            variant="transparent"
            color="dark"
            onClick={() => items.forEach(item => { if (item.isSelected) removeItem(item.id); })}
          >
            <IconTrash size={20} stroke={1.5} />
          </ActionIcon>
        </Flex>

        {/* Danh Sách Sản Phẩm */}
        <Flex direction="column">
          {items.map((item, index) => (
            <Box key={item.id}>
              {/* ĐỔI align THÀNH RESPONSIVE ĐỂ Ở MOBILE NÓ CĂN LÊN TRÊN */}
              <Flex className={classes.cartItemRow} align={{ base: 'flex-start', md: 'center' }} gap="md">

                <Checkbox
                  mt={{ base: 4, md: 0 }} // Đẩy checkbox xuống 1 xíu ở mobile cho bằng với chữ
                  checked={item.isSelected}
                  onChange={(e) => toggleItemSelection(item.id, e.currentTarget.checked)}
                  color="#C44C50"
                  radius="xs"
                />

                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  unoptimized
                  className={classes.cartImage}
                />

                {/* ĐÂY LÀ KHỐI RESPONSIVE QUAN TRỌNG NHẤT */}
                <Flex
                  flex={1}
                  direction={{ base: 'column', md: 'row' }}
                  align={{ base: 'flex-start', md: 'center' }}
                  gap={{ base: 'xs', md: 'md' }}
                >
                  <Box flex={1}>
                    <Text className={classes.productName} lineClamp={2}>
                      {item.name}
                    </Text>
                  </Box>

                  <Text className={classes.priceText}>
                    {item.price.toLocaleString('vi-VN')} đ
                  </Text>

                  <Flex align="center" gap="xs" className={classes.quantityControl}>
                    <VinaupCartIcon size={16} fill="#6D6E72" />
                    <Text className={classes.quantityText}>{item.quantity}</Text>
                    <ActionIcon size="sm" variant="transparent" c="var(--vinaup-blue-link)" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                      <IconMinus size={16} stroke={1.5} />
                    </ActionIcon>
                    <Divider orientation="vertical" />
                    <ActionIcon size="sm" variant="transparent" c="var(--vinaup-blue-link)" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <IconPlus size={16} stroke={1.5} />
                    </ActionIcon>
                  </Flex>
                </Flex>

                <ActionIcon
                  variant="transparent"
                  color="dark"
                  onClick={() => removeItem(item.id)}
                  mt={{ base: 2, md: 0 }} // Đẩy icon thùng rác xuống 1 xíu ở mobile
                >
                  <IconTrash size={20} stroke={1.5} />
                </ActionIcon>

              </Flex>
              {index < items.length - 1 && <Divider color="gray.2" />}
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};