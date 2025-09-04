'use client'

import { useState } from 'react'
import { X, ShoppingCart, Heart } from 'lucide-react'
import { Button } from './button'
import { formatPrice } from '@/lib/utils'

export default function ProductSelectionModal({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart, 
  onAddToWishlist,
  showAddToWishlist = true 
}) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '')
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '')
  const [quantity, setQuantity] = useState(1)

  if (!isOpen || !product) return null

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      // Let the parent component handle the validation message
      return
    }
    
    onAddToCart({
      product,
      size: selectedSize,
      color: selectedColor,
      quantity
    })
    onClose()
  }

  const handleAddToWishlist = () => {
    if (!selectedSize || !selectedColor) {
      // Let the parent component handle the validation message
      return
    }
    
    onAddToWishlist({
      product,
      size: selectedSize,
      color: selectedColor
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Select Options</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Product Info */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-shrink-0">
              <img
                src={product.images?.[0] || '/placeholder-image-white.png'}
                alt={product.name}
                className="w-full md:w-48 h-48 object-cover rounded-lg"
              />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {product.inStock ? (
                <span className="text-green-600 text-sm">In Stock</span>
              ) : (
                <span className="text-red-600 text-sm">Out of Stock</span>
              )}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`p-2 border rounded-md text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-2 border rounded-md text-sm font-medium transition-colors ${
                    selectedColor === color
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                -
              </button>
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAddToCart}
              className="flex-1 h-12"
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            
            {showAddToWishlist && (
              <Button
                variant="outline"
                onClick={handleAddToWishlist}
                className="flex-1 h-12"
              >
                <Heart className="h-5 w-5 mr-2" />
                Add to Wishlist
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 