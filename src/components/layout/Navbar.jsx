'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ShoppingCart, Heart, User, Menu, X, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartWithHydration } from '@/components/providers/CartProvider'
import { useWishlistWithHydration } from '@/components/providers/WishlistProvider'
import { useAuthStatus } from '@/components/providers/AuthProvider'
import CartDrawer from '@/components/cart/CartDrawer'
import logo from '../../../public/logo.png'

export default function Navbar() {
  const router = useRouter()
  const { session, status, isAuthenticated, isAdmin } = useAuthStatus()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)
  const { getCartCount, toggleCart } = useCartWithHydration()
  const { getWishlistCount } = useWishlistWithHydration()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-focus search input when opened
  useEffect(() => {
    if (isSearchOpen && mounted) {
      const searchInput = document.querySelector('input[placeholder*="Search products"]')
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100)
      }
    }
  }, [isSearchOpen, mounted])

  // Handle search functionality
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setIsMenuOpen(false)
      setSearchQuery('')
    }
  }

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      setSearchQuery('')
    }
  }

  // Prevent hydration mismatch by not rendering dynamic content until mounted
  const cartCount = mounted ? getCartCount() : 0
  const wishlistCount = mounted ? getWishlistCount() : 0

  const navigation = [
    { name: 'Shop', href: '/products' },
    // { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <Image src="/logo.png" alt="Logo" width={80} height={40} />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Side - Search, Cart, User */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSearch}
                  className="hidden sm:flex"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}

              {/* Wishlist */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push('/wishlist')}
                  className="relative"
                  suppressHydrationWarning
                >
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              )}

              {/* Cart */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleCart}
                  className="relative"
                  suppressHydrationWarning
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              )}

              {/* User Menu */}
              {mounted ? (
                <>
                  {status === 'loading' ? (
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                  ) : isAuthenticated ? (
                    <div className="relative group">
                      <Button variant="ghost" size="icon" className="rounded-full">
                        {session?.user?.image ? (
                          <Image
                            src={session.user.image}
                            alt={session.user.name || 'User'}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                      </Button>
                      
                      {/* Dropdown Menu */}
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 invisible group-hover:visible">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                        <Link
                          href="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          My Orders
                        </Link>
                        {isAdmin && (
                          <Link
                            href="/admin"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={() => signOut()}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="hidden sm:flex items-center space-x-2">
                      <Link href="/auth/signin">
                        <Button variant="ghost" size="sm">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/auth/signup">
                        <Button size="sm">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                // Render placeholder during SSR to match initial client render
                <div className="hidden sm:flex items-center space-x-2">
                  <Button variant="ghost" size="sm" disabled>
                    Sign In
                  </Button>
                  <Button size="sm" disabled>
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              )}
            </div>
          </div>

          {/* Search Bar */}
          {mounted && isSearchOpen && (
            <div className="border-t py-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search products... (Press Enter to search, Esc to close)"
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  autoFocus
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  {searchQuery && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery('')}
                      className="h-6 w-6 p-0 hover:bg-gray-100"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                  <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-gray-100"
                    disabled={!searchQuery.trim()}
                  >
                    <Search className="h-3 w-3" />
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        {mounted && isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-4 space-y-2">
              {/* Mobile Search */}
              <div className="pb-4 border-b">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    {searchQuery && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setSearchQuery('')}
                        className="h-6 w-6 p-0 hover:bg-gray-100"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      type="submit"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-gray-100"
                      disabled={!searchQuery.trim()}
                    >
                      <Search className="h-3 w-3" />
                    </Button>
                  </div>
                </form>
              </div>

              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile User Menu */}
              <div className="pt-4 border-t">
                {status === 'loading' ? (
                  <div className="flex items-center px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse mr-3" />
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                  </div>
                ) : isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center px-3 py-2 text-sm text-gray-700">
                      {session?.user?.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || 'User'}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                      ) : (
                        <User className="h-5 w-5 mr-3" />
                      )}
                      <span className="font-medium">{session?.user?.name || session?.user?.email}</span>
                    </div>
                    
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        Profile
                      </Button>
                    </Link>
                    
                    <Link href="/orders" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        My Orders
                      </Button>
                    </Link>
                    
                    {isAdmin && (
                      <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          Admin Panel
                        </Button>
                      </Link>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        signOut()
                        setIsMenuOpen(false)
                      }}
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {mounted && <CartDrawer />}
    </>
  )
} 