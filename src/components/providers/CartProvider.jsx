'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/store/cart'

export default function CartProvider({ children }) {
  const { items } = useCartStore()

  useEffect(() => {
    // Manually trigger rehydration on client side
    useCartStore.persist.rehydrate()
  }, [])

  return children
}

// Hook to safely use cart with hydration
export function useCartWithHydration() {
  const store = useCartStore()
  
  useEffect(() => {
    // Ensure store is hydrated on mount
    useCartStore.persist.rehydrate()
  }, [])

  return store
} 