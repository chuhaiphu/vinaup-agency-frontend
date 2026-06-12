export type ActionType = 'CREATE' | 'UPDATE' | 'DELETE';

export interface ActionLog {
  id: string;
  userId: string | null;
  action: ActionType;
  entityType: string;
  entityId: string;
  ipAddress: string | null;
  createdAt: Date;
}

export interface CreateActionLogRequest {
  userId?: string | null;
  action: ActionType;
  entityType: string;
  entityId: string;
  ipAddress?: string | null;
}
