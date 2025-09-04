import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, size, color) => {
        const items = get().items
        const existingItemIndex = items.findIndex(
          item => 
            item.id === product.id && 
            item.size === size && 
            item.color === color
        )

        if (existingItemIndex === -1) {
          const newItem = {
            id: String(product.id),
            name: product.name,
            price: product.price,
            image: product.images ? product.images[0] : product.image,
            size,
            color,
            category: product.category,
            originalPrice: product.originalPrice,
            inStock: product.inStock,
            addedAt: new Date().toISOString()
          }
          set({ items: [...items, newItem] })
          return true // Item added
        }
        return false // Item already exists
      },

      removeItem: (productId, size, color) => {
        set({
          items: get().items.filter(
            item => !(item.id === productId && item.size === size && item.color === color)
          )
        })
      },

      isInWishlist: (productId, size, color) => {
        return get().items.some(
          item => item.id === productId && item.size === size && item.color === color
        )
      },

      clearWishlist: () => set({ items: [] }),

      getWishlistCount: () => {
        return get().items.length
      },

      moveToCart: (productId, size, color, addToCartFn) => {
        const items = get().items
        const item = items.find(
          item => item.id === productId && item.size === size && item.color === color
        )
        
        if (item) {
          // Add to cart
          addToCartFn(item, size, color, 1)
          // Remove from wishlist
          get().removeItem(productId, size, color)
        }
      }
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      skipHydration: true,
    }
  )
) 