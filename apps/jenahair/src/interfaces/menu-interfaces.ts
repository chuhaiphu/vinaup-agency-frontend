export interface CreateMenuRequest {
  title: string;
  customUrl?: string;
}

export interface UpdateMenuRequest extends Partial<CreateMenuRequest> {
  title?: string;
  description?: string;
  parentId?: string;
  customUrl?: string;
  sortOrder?: number;
}

export interface MenuResponse {
  id: string;
  title: string;
  description: string | null;
  parent?: MenuResponse | null;
  children?: MenuResponse[];
  customUrl: string | null;
  isRoot: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
