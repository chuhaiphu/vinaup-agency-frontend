'use client';
import { ActionIcon, Group, Popover } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { EntitiesTable, EntitiesTableColumnProps } from '@vinaup/ui/admin';
import { ConfirmModal } from '@vinaup/ui/shared';
import { generateErrorMessage } from '@vinaup/utils';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { use, useState } from 'react';
import { GrTrash } from 'react-icons/gr';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { SlOptionsVertical } from 'react-icons/sl';
import { TbEdit } from 'react-icons/tb';

import { deletePageActionPrivate } from '@/actions/page-actions';
import { PageTypeDisplayMap, StatusDisplayMap } from '@/constants';
import { PageResponse } from '@/interfaces/page-interfaces';

import classes from './pages-table.module.scss';

interface PagesTableProps {
  pagesDataPromise: Promise<PageResponse[]>;
}

export default function PagesTable({ pagesDataPromise }: PagesTableProps) {
  const pagesData = use(pagesDataPromise);
  const router = useRouter();
  const [datePickerOpened, setDatePickerOpened] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | string | null>(null);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);

  const handleDeletePage = async () => {
    if (!selectedPageId) return;

    setIsDeleting(true);
    try {
      const result = await deletePageActionPrivate(selectedPageId);
      if (result.success) {
        notifications.show({
          message: 'Page has been successfully deleted',
          color: 'green',
          position: 'top-center',
        });
        router.refresh();
      } else {
        notifications.show({
          title: 'Delete failed',
          message: result.error || 'Failed to delete page',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Delete failed',
        message: generateErrorMessage(error, 'Failed to delete page'),
        color: 'red',
      });
    } finally {
      setIsDeleting(false);
      setDeleteModalOpened(false);
      setSelectedPageId(null);
    }
  };

  const columns: EntitiesTableColumnProps<PageResponse>[] = [
    {
      key: 'date',
      width: '5%',
      headerAlign: 'left',
      header: (
        <Popover opened={datePickerOpened} onChange={setDatePickerOpened} position="bottom-start">
          <Popover.Target>
            <ActionIcon variant="transparent" onClick={() => setDatePickerOpened((o) => !o)}>
              <MdOutlineCalendarMonth size={24} color="#01426e" />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <DatePicker value={selectedDate} onChange={(value) => setSelectedDate(value)} />
          </Popover.Dropdown>
        </Popover>
      ),
      render: ({ entity }) => <>{dayjs(entity.createdAt).format('DD/MM')}</>,
    },
    {
      key: 'title',
      width: '30%',
      header: 'Title',
      render: ({ entity }) => <>{entity.title || '(No title)'}</>,
    },
    {
      key: 'type',
      width: '15%',
      headerAlign: 'left',
      cellAlign: 'left',
      header: 'Type',
      render: ({ entity }) => <>{PageTypeDisplayMap[entity.type] || '-'}</>,
    },
    {
      key: 'creator',
      width: '15%',
      headerAlign: 'left',
      cellAlign: 'left',
      header: 'Author',
      render: ({ entity }) => {
        return <>{entity?.createdBy?.name}</>;
      },
    },
    {
      key: 'status',
      width: '10%',
      header: 'Status',
      render: ({ entity }) => StatusDisplayMap[entity.visibility],
    },
    {
      key: 'actions',
      width: '10%',
      headerAlign: 'right',
      header: (
        <div className={`${classes.columnHeaderContent} ${classes.actionColumnHeaderContent}`}>
          <ActionIcon variant="transparent">
            <SlOptionsVertical size={24} color="#01426e" />
          </ActionIcon>
        </div>
      ),
      cellAlign: 'right',
      render: ({ entity }) => (
        <Group gap="xs" justify="flex-end">
          <ActionIcon
            variant="transparent"
            onClick={() => {
              setSelectedPageId(entity.id);
              setDeleteModalOpened(true);
            }}
          >
            <GrTrash size={20} color="#01426e" />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            onClick={() => router.push(`/adminup/page/${entity.id}`)}
          >
            <TbEdit size={24} color="#01426e" />
          </ActionIcon>
        </Group>
      ),
    },
  ];

  return (
    <>
      <EntitiesTable<PageResponse>
        data={pagesData}
        loading={false}
        columns={columns}
        classNames={{
          wrapper: classes.tableWrapper,
          table: {
            table: classes.table,
            thead: classes.thead,
            tbody: classes.tbody,
            tr: classes.tr,
            th: classes.th,
            td: classes.td,
          },
        }}
      />
      <ConfirmModal
        variant="danger"
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        onConfirm={handleDeletePage}
        loading={isDeleting}
      />
    </>
  );
}
