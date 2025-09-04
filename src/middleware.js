import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Admin routes - require ADMIN role
        if (pathname.startsWith('/admin')) {
          return token?.role === 'ADMIN'
        }
        
        // Protected routes - require any valid token
        if (pathname.startsWith('/profile') || 
            pathname.startsWith('/orders') || 
            pathname.startsWith('/checkout')) {
          return !!token
        }
        
        // Public routes
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/profile/:path*',
    '/orders/:path*',
    '/checkout/:path*'
  ]
} 