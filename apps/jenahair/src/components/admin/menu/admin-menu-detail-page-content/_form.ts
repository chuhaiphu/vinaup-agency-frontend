import { MenuResponse } from '@/interfaces/menu-interfaces';

export interface MenuDetailFormValues {
  title: string;
  parentId: string | null;
  sortOrder: number;
  customUrl: string;
}

export function toMenuDetailFormValues(menu: MenuResponse): MenuDetailFormValues {
  return {
    title: menu.title,
    parentId: menu.parent?.id || null,
    sortOrder: menu.sortOrder || 0,
    customUrl: menu.customUrl || '',
  };
}
