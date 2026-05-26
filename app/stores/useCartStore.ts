import type { ICartItem, IProduct } from '@/types/product'
import { create } from 'zustand'

interface CartState {
  items: ICartItem[]
  addItem: (product: IProduct) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],

  addItem: (product) => {
    const items = get().items
    const existing = items.find((i) => i.product.id === product.id)
    if (existing) {
      set({
        items: items.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      })
    } else {
      set({ items: [...items, { product, quantity: 1 }] })
    }
  },

  removeItem: (productId) => set({ items: get().items.filter((i) => i.product.id !== productId) }),

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId)
    } else {
      set({
        items: get().items.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
      })
    }
  },

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalPrice: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
}))
