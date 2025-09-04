'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ShoppingCart, Heart, ChevronLeft, ChevronRight, Star, Truck, Shield, RotateCcw } from 'lucide-react'
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)

  // Update state when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || '')
      setSelectedColor(product.colors?.[0] || '')
      setQuantity(1)
      setCurrentImageIndex(0)
      setSelectedImage(0)
    }
  }, [product])

  // Get all images (fallback to placeholder if no images)
  const productImages = product?.images?.length > 0
    ? product.images
    : ['/placeholder-image-white.png']

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    )
  }

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
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Add to Cart</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)]">
          {/* Left Section - Image Carousel */}
          <div className="lg:w-1/2 p-6 lg:flex-shrink-0">
            <div className="sticky top-0">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
                {/* Main Image */}
                <Image
                  src={productImages[currentImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                />

                {/* Navigation Arrows */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-200 z-10"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-200 z-10"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                {productImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentImageIndex
                            ? 'bg-white shadow-lg'
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="flex space-x-3 mt-4 overflow-x-auto pb-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentImageIndex
                          ? 'border-blue-500 shadow-md'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Product Configuration */}
          <div className="lg:w-1/2 lg:border-l lg:border-gray-100 flex flex-col">
            <div className="p-6 lg:flex-1 lg:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="space-y-6">
              {/* Product Info */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-current text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center mb-6">
                  {product.inStock ? (
                    <div className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">In Stock</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">Out of Stock</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Size: <span className="font-normal text-gray-600">{selectedSize || 'Select size'}</span>
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 border-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        selectedSize === size
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Color: <span className="font-normal text-gray-600">{selectedColor || 'Select color'}</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`p-3 border-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        selectedColor === color
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-50 rounded-l-xl transition-colors duration-200"
                    >
                      -
                    </button>
                    <span className="px-4 py-3 font-semibold text-gray-900 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-50 rounded-r-xl transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    {quantity} × {formatPrice(product.price)} = {formatPrice(product.price * quantity)}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
                <div className="text-center">
                  <Truck className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <span className="text-xs text-gray-600">Free Shipping</span>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <span className="text-xs text-gray-600">2 Year Warranty</span>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <span className="text-xs text-gray-600">Easy Returns</span>
                </div>
              </div>

              {/* Action Buttons */}
              </div>
            </div>

            {/* Sticky Action Buttons */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 mt-6 lg:mt-0">
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={!product.inStock || !selectedSize || !selectedColor}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart • {formatPrice(product.price * quantity)}
                </Button>

                {showAddToWishlist && (
                  <Button
                    variant="outline"
                    onClick={handleAddToWishlist}
                    className="w-full h-14 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-semibold transition-all duration-200"
                    disabled={!selectedSize || !selectedColor}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Add to Wishlist
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 