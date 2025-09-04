'use client'

import { useEffect } from 'react'
import { useWishlistStore } from '@/store/wishlist'

export default function WishlistProvider({ children }) {
  const { items } = useWishlistStore()

  useEffect(() => {
    // Manually trigger rehydration on client side
    useWishlistStore.persist.rehydrate()
  }, [])

  return children
}

// Hook to safely use wishlist with hydration
export function useWishlistWithHydration() {
  const store = useWishlistStore()
  
  useEffect(() => {
    // Ensure store is hydrated on mount
    useWishlistStore.persist.rehydrate()
  }, [])

  return store
} 