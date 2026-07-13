export interface CreateMenu {
  title: string;
  customUrl?: string;
}

export interface UpdateMenu extends Partial<CreateMenu> {
  title?: string;
  description?: string;
  parentId?: string;
  targetType?: string;
  targetId?: string;
  customUrl?: string;
  sortOrder?: number;
}

export interface MenuResponse {
  id: string;
  title: string;
  description: string | null;
  parent?: MenuResponse | null;
  children?: MenuResponse[];
  targetType: string;
  targetId: string | null;
  customUrl: string | null;
  isRoot: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

