import { CreateMenuRequest, MenuResponse, UpdateMenuRequest } from '@/interfaces/menu-interfaces';

import { apiPrivate, apiPublic } from './_base';

// ==================== PUBLIC ROUTES ====================

export async function getRootMenusApiPublic() {
  return apiPublic<MenuResponse[]>('/menus/roots', {
    method: 'GET',
  });
}

// ==================== ADMIN ROUTES ====================

export async function createMenuApiPrivate(data: CreateMenuRequest) {
  return apiPrivate<MenuResponse>('/menus/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllMenusApiPublic() {
  return apiPublic<MenuResponse[]>('/menus', {
    method: 'GET',
  });
}

export async function getAllMenusAdminApiPrivate() {
  return apiPrivate<MenuResponse[]>('/menus/admin', {
    method: 'GET',
  });
}

export async function getAvailableSortOrdersApiPrivate(parentId: string) {
  return apiPrivate<number[]>(`/menus/admin/available-sort-orders/${parentId}`, {
    method: 'GET',
  });
}

export async function getMenuByIdApiPrivate(id: string) {
  return apiPrivate<MenuResponse>(`/menus/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateMenuApiPrivate(id: string, data: UpdateMenuRequest) {
  return apiPrivate<MenuResponse>(`/menus/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteMenuApiPrivate(id: string) {
  return apiPrivate<void>(`/menus/admin/${id}`, {
    method: 'DELETE',
  });
}
