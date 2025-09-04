'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ShopPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to products page
    router.replace('/products')
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Redirecting to Products...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  )
} 