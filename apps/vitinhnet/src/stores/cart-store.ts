import { create } from 'zustand';

import { CartItem } from '@/interfaces/cart-interfaces';

interface CartState {
  items: CartItem[];
  discount: number;
  shippingFee: number;
  // Actions
  updateQuantity: (id: string, quantity: number) => void;
  toggleItemSelection: (id: string, isSelected: boolean) => void;
  toggleAllSelection: (isSelected: boolean) => void;
  removeItem: (id: string) => void;
  // Computed (these can just be getter functions inside the store or simple hooks)
  getTotalSelectedItems: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
}

const mockItems: CartItem[] = [
  {
    id: 'hp-1',
    name: 'HP 600/800 G5 SFF i3 9100 8G 256G A1',
    price: 14900000,
    originalPrice: 16800000,
    quantity: 1,
    image: 'https://placehold.co/100', // Mock image
    isSelected: true,
  },
  {
    id: 'hp-2',
    name: 'HP 600/800 G5 SFF i3 9100 8G 256G A1',
    price: 14900000,
    originalPrice: 16800000,
    quantity: 1,
    image: 'https://placehold.co/100',
    isSelected: true,
  },
  {
    id: 'hp-3',
    name: 'HP 600/800 G5 SFF i3 9100 8G 256G A1',
    price: 14900000,
    originalPrice: 16800000,
    quantity: 1,
    image: 'https://placehold.co/100',
    isSelected: true,
  },
];

export const useCartStore = create<CartState>((set, get) => ({
  items: mockItems,
  discount: 600000,
  shippingFee: 600000,
  
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    })),

  toggleItemSelection: (id, isSelected) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, isSelected } : item)),
    })),

  toggleAllSelection: (isSelected) =>
    set((state) => ({
      items: state.items.map((item) => ({ ...item, isSelected })),
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  getTotalSelectedItems: () => {
    return get().items.filter((item) => item.isSelected).length;
  },

  getSubtotal: () => {
    return get()
      .items.filter((item) => item.isSelected)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal - get().discount + get().shippingFee;
  },
}));
