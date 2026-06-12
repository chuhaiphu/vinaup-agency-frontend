'use client';

import { Group, Text, Tabs } from '@mantine/core';
import { use } from 'react';

import CustomerContactsTab from '@/components/admin/dashboard/admin-page-tabs/customer-contacts-tab';
import { CustomerContactResponse } from '@/interfaces/customer-contact-interfaces';

import classes from './admin-page-content.module.scss';

interface AdminPageContentProps {
  customerContactsPromise: Promise<CustomerContactResponse[]>;
}

export default function AdminPageContent({ customerContactsPromise }: AdminPageContentProps) {
  const customerContacts = use(customerContactsPromise);
  return (
    <div className={classes.adminPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Dashboard</Text>
      </Group>

      <div className={classes.tabsWrapper}>
        <Tabs defaultValue="customer-contacts">
          <Tabs.List>
            <Tabs.Tab value="customer-contacts">Contacts ({customerContacts.length})</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="customer-contacts" pt="lg">
            <CustomerContactsTab customerContacts={customerContacts} />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}
