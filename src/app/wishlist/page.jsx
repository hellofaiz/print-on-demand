'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Heart, ShoppingCart, X, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useWishlistWithHydration } from '@/components/providers/WishlistProvider'
import { useCartWithHydration } from '@/components/providers/CartProvider'
import { toast } from '@/store/toast'
import { formatPrice } from '@/lib/utils'

export default function WishlistPage() {
  const router = useRouter()
  const { items, removeItem, clearWishlist } = useWishlistWithHydration()
  const { addItem: addToCart } = useCartWithHydration()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddToCart = (item) => {
    const success = addToCart(item, item.size, item.color, 1)
    if (success) {
      toast.success(`${item.name} added to cart!`)
      // Remove from wishlist after adding to cart
      removeItem(item.id, item.size, item.color)
    } else {
      toast.error('Failed to add item to cart')
    }
  }

  const handleRemoveFromWishlist = (item) => {
    removeItem(item.id, item.size, item.color)
    toast.success(`${item.name} removed from wishlist`)
  }

  const handleClearWishlist = () => {
    if (confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist()
      toast.success('Wishlist cleared')
    }
  }

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="h-10 w-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600">
                {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
          </div>

          {items.length > 0 && (
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={handleClearWishlist}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Clear Wishlist
              </Button>
            </div>
          )}
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-white rounded-full p-6 mb-6 shadow-lg">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              Start adding items to your wishlist by clicking the heart icon on products you love.
            </p>
            <Button onClick={() => router.push('/products')}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <Card key={`${item.id}-${item.size}-${item.color}`} className="overflow-hidden group">
                <div className="relative aspect-square">
                  <Image
                    src={item.images?.[0] || '/placeholder-image-white.png'}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  
                  {/* Remove from wishlist button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFromWishlist(item)}
                    className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white/90 text-red-500 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  {/* Out of stock overlay */}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-900">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{item.category}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Size:</span> {item.size}
                      <span className="mx-2">•</span>
                      <span className="font-medium">Color:</span> {item.color}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 h-10"
                      disabled={!item.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveFromWishlist(item)}
                      className="h-10 w-10 text-red-500 hover:text-red-600"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 