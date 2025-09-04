import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (product, size, color, quantity = 1) => {
        const items = get().items
        const existingItemIndex = items.findIndex(
          item => 
            item.id === product.id && 
            item.size === size && 
            item.color === color
        )

        if (existingItemIndex > -1) {
          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantity += quantity
          set({ items: updatedItems })
        } else {
          const newItem = {
            id: String(product.id),
            name: product.name,
            price: product.price,
            image: product.images ? product.images[0] : product.image,
            size,
            color,
            quantity,
          }
          set({ items: [...items, newItem] })
        }
      },

      removeItem: (productId, size, color) => {
        set({
          items: get().items.filter(
            item => !(item.id === productId && item.size === size && item.color === color)
          )
        })
      },

      updateQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color)
          return
        }

        const items = get().items
        const itemIndex = items.findIndex(
          item => 
            item.id === productId && 
            item.size === size && 
            item.color === color
        )

        if (itemIndex > -1) {
          const updatedItems = [...items]
          updatedItems[itemIndex].quantity = quantity
          set({ items: updatedItems })
        }
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set({ isOpen: !get().isOpen }),

      getCartTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },

      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },

      // Helper method to check if cart has items
      hasItems: () => {
        return get().items.length > 0
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      skipHydration: true,
    }
  )
) 