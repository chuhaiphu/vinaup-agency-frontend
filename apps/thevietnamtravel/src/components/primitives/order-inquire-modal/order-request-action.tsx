'use client';

import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import OrderInquireModal from './order-inquire-modal';

export default function OrderRequestAction() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button color="var(--vinaup-green)" radius="xl" size="sm" onClick={open}>
        Order Request
      </Button>
      <OrderInquireModal opened={opened} onClose={close} />
    </>
  );
}
