'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export function useAuthStatus() {
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Debug logging in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && mounted) {
      console.log('Auth Status Debug:', {
        session,
        status,
        isAuthenticated: !!session,
        mounted
      })
    }
  }, [session, status, mounted])

  if (!mounted) {
    return {
      session: null,
      status: 'loading',
      isAuthenticated: false,
      isAdmin: false,
      mounted: false
    }
  }

  return {
    session,
    status,
    isAuthenticated: !!session,
    isAdmin: session?.user?.role === 'ADMIN',
    mounted: true
  }
}

export default function AuthProvider({ children }) {
  return children
} 