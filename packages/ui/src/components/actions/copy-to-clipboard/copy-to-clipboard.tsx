'use client';
import { UnstyledButton } from '@mantine/core';
import { notifications, type NotificationData } from '@mantine/notifications';

interface CopyToClipboardProps {
  content: string;
  children: React.ReactNode;
  // Override the toast — defaults to the generic "copied" notification below.
  notification?: Partial<NotificationData>;
}

export function CopyToClipboard({ content, children, notification }: CopyToClipboardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    notifications.show({
      title: 'Copy thành công',
      message: content,
      color: 'green',
      ...notification,
    });
  };
  return <UnstyledButton onClick={handleCopy}>{children}</UnstyledButton>;
}
