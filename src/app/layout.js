import { Inter } from 'next/font/google'
// import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import SessionProvider from '@/components/providers/SessionProvider'
import ToastProvider from '@/components/providers/ToastProvider'
import CartProvider from '@/components/providers/CartProvider'
import WishlistProvider from '@/components/providers/WishlistProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ToastContainer from '@/components/ui/Toast'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'POD Store - Premium Print on Demand T-Shirts',
  description: 'Discover unique, high-quality print-on-demand T-shirts. Custom designs, premium materials, and fast shipping.',
  keywords: 'print on demand, t-shirts, custom design, apparel, clothing',
  authors: [{ name: 'POD Store' }],
  creator: 'POD Store',
  publisher: 'POD Store',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <SessionProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
              <ToastProvider />
              <ToastContainer />
            </WishlistProvider>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
