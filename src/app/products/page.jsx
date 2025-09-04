'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  ChevronDown, 
  Star, 
  Heart, 
  ShoppingCart,
  SlidersHorizontal,
  X,
  ArrowUpDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useCartWithHydration } from '@/components/providers/CartProvider'
import { useWishlistWithHydration } from '@/components/providers/WishlistProvider'
import ProductSelectionModal from '@/components/ui/ProductSelectionModal'
import { toast } from '@/store/toast'

// Dummy products data with local images
const DUMMY_PRODUCTS = [
  {
    id: "507f1f77bcf86cd799439011",
    name: "Classic Cotton T-Shirt",
    description: "Comfortable 100% cotton t-shirt perfect for everyday wear. Premium quality fabric with excellent durability.",
    price: 24.99,
    originalPrice: 29.99,
    category: "T-Shirts",
    images: ["/600X400-tshirt-image-1.png"],
    colors: ["White", "Black", "Navy", "Gray"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    featured: true,
    tags: ["casual", "cotton", "basic"]
  },
  {
    id: "507f191e810c19729de860ea",
    name: "Vintage Graphic Hoodie",
    description: "Retro-style hoodie with unique graphic design. Soft fleece interior keeps you warm and comfortable.",
    price: 49.99,
    originalPrice: 59.99,
    category: "Hoodies",
    images: ["/placeholder-image-white.png"],
    colors: ["Black", "Gray", "Navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    featured: true,
    tags: ["vintage", "graphic", "hoodie"]
  },
  {
    id: "507f1f77bcf86cd799439012",
    name: "Slim Fit Jeans",
    description: "Modern slim-fit jeans with stretch fabric for comfort and style. Perfect for both casual and semi-formal occasions.",
    price: 79.99,
    originalPrice: 99.99,
    category: "Jeans",
    images: ["/placeholder-image-white.png"],
    colors: ["Blue", "Black", "Gray"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    rating: 4.3,
    reviewCount: 156,
    inStock: true,
    featured: false,
    tags: ["slim", "stretch", "denim"]
  },
  {
    id: "507f191e810c19729de860eb",
    name: "Floral Summer Dress",
    description: "Light and breezy floral dress perfect for summer days. Flattering silhouette with beautiful print.",
    price: 89.99,
    originalPrice: 109.99,
    category: "Dresses",
    images: ["/placeholder-image-white.png"],
    colors: ["Pink", "Blue", "Yellow"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.6,
    reviewCount: 94,
    inStock: true,
    featured: true,
    tags: ["floral", "summer", "casual"]
  },
  {
    id: "507f1f77bcf86cd799439013",
    name: "Athletic Performance Shorts",
    description: "High-performance shorts with moisture-wicking fabric. Ideal for workouts and active lifestyle.",
    price: 34.99,
    originalPrice: 39.99,
    category: "Shorts",
    images: ["/placeholder-image-white.png"],
    colors: ["Black", "Navy", "Gray", "Red"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.4,
    reviewCount: 67,
    inStock: true,
    featured: false,
    tags: ["athletic", "performance", "workout"]
  },
  {
    id: "507f191e810c19729de860ec",
    name: "Cozy Knit Sweater",
    description: "Soft and warm knit sweater perfect for cooler weather. Classic design with modern comfort.",
    price: 64.99,
    originalPrice: 79.99,
    category: "Sweaters",
    images: ["/placeholder-image-white.png"],
    colors: ["Beige", "Brown", "Navy", "Gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 112,
    inStock: true,
    featured: true,
    tags: ["knit", "cozy", "winter"]
  },
  {
    id: "507f1f77bcf86cd799439014",
    name: "Casual Button-Up Shirt",
    description: "Versatile button-up shirt suitable for both work and casual occasions. Crisp and comfortable.",
    price: 54.99,
    originalPrice: 69.99,
    category: "Shirts",
    images: ["/600X400-tshirt-image-2.png"],
    colors: ["White", "Blue", "Light Blue", "Gray"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.2,
    reviewCount: 78,
    inStock: true,
    featured: false,
    tags: ["button-up", "casual", "professional"]
  },
  {
    id: "507f191e810c19729de860ed",
    name: "Denim Jacket",
    description: "Classic denim jacket with timeless style. Perfect layering piece for any season.",
    price: 89.99,
    originalPrice: 109.99,
    category: "Jackets",
    images: ["/placeholder-image-white.png"],
    colors: ["Blue", "Black", "Light Blue"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.5,
    reviewCount: 143,
    inStock: true,
    featured: true,
    tags: ["denim", "classic", "jacket"]
  },
  {
    id: "507f1f77bcf86cd799439015",
    name: "Yoga Leggings",
    description: "High-waisted yoga leggings with four-way stretch fabric. Comfortable and supportive for all activities.",
    price: 44.99,
    originalPrice: 54.99,
    category: "Activewear",
    images: ["/placeholder-image-white.png"],
    colors: ["Black", "Navy", "Gray", "Purple"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 189,
    inStock: true,
    featured: false,
    tags: ["yoga", "activewear", "stretch"]
  },
  {
    id: "507f191e810c19729de860ee",
    name: "Flannel Pajama Set",
    description: "Soft flannel pajama set for ultimate comfort. Perfect for lounging and sleeping.",
    price: 59.99,
    originalPrice: 74.99,
    category: "Sleepwear",
    images: ["/placeholder-image-white.png"],
    colors: ["Pink", "Blue", "Green", "Purple"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.6,
    reviewCount: 92,
    inStock: true,
    featured: false,
    tags: ["flannel", "pajama", "comfortable"]
  },
  {
    id: "507f1f77bcf86cd799439016",
    name: "Leather Crossbody Bag",
    description: "Genuine leather crossbody bag with adjustable strap. Perfect for everyday use with multiple compartments.",
    price: 124.99,
    originalPrice: 149.99,
    category: "Accessories",
    images: ["/placeholder-image-white.png"],
    colors: ["Brown", "Black", "Tan"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 76,
    inStock: true,
    featured: true,
    tags: ["leather", "bag", "crossbody"]
  },
  {
    id: "507f191e810c19729de860ef",
    name: "Wool Blend Coat",
    description: "Elegant wool blend coat for cold weather. Sophisticated design with excellent warmth retention.",
    price: 199.99,
    originalPrice: 249.99,
    category: "Coats",
    images: ["/600X400-tshirt-image-3.png"],
    colors: ["Black", "Navy", "Camel", "Gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.9,
    reviewCount: 58,
    inStock: true,
    featured: true,
    tags: ["wool", "coat", "winter"]
  }
]

const CATEGORIES = [
  "All",
  "T-Shirts",
  "Hoodies", 
  "Jeans",
  "Dresses",
  "Shorts",
  "Sweaters",
  "Shirts",
  "Jackets",
  "Activewear",
  "Sleepwear",
  "Accessories",
  "Coats"
]

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' }
]

function ProductsPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addItem: addToCart } = useCartWithHydration()
  const { addItem: addToWishlist, isInWishlist } = useWishlistWithHydration()

  const [products, setProducts] = useState(DUMMY_PRODUCTS)
  const [filteredProducts, setFilteredProducts] = useState(DUMMY_PRODUCTS)
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured')
  const [priceRange, setPriceRange] = useState([0, 300])
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [onlyFeatured, setOnlyFeatured] = useState(false)

  // Check for product parameter to auto-open modal
  const productParam = searchParams.get('product')

  // Get unique colors and sizes
  const allColors = [...new Set(products.flatMap(p => p.colors))]
  const allSizes = [...new Set(products.flatMap(p => p.sizes))]

  // Filter and sort products
  const filterProducts = useCallback(() => {
    let filtered = [...products]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => selectedColors.includes(color))
      )
    }

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => selectedSizes.includes(size))
      )
    }

    // Stock filter
    if (onlyInStock) {
      filtered = filtered.filter(product => product.inStock)
    }

    // Featured filter
    if (onlyFeatured) {
      filtered = filtered.filter(product => product.featured)
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case 'newest':
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedCategory, sortBy, priceRange, selectedColors, selectedSizes, onlyInStock, onlyFeatured])

  useEffect(() => {
    filterProducts()
  }, [filterProducts])

  // Auto-open modal for product from URL parameter
  useEffect(() => {
    if (productParam && products.length > 0) {
      const productToShow = products.find(p => p.id === productParam)
      if (productToShow) {
        setSelectedProduct(productToShow)
        setShowModal(true)
        // Clean up URL parameter after opening modal
        const url = new URL(window.location)
        url.searchParams.delete('product')
        window.history.replaceState({}, '', url)
      }
    }
  }, [productParam, products])

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    if (selectedCategory !== 'All') params.set('category', selectedCategory)
    if (sortBy !== 'featured') params.set('sort', sortBy)

    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState({}, '', newUrl)
  }, [searchQuery, selectedCategory, sortBy])

  const handleAddToCart = (product) => {
    setSelectedProduct(product)
    setShowModal(true)
  }

  const handleModalAddToCart = ({ product, size, color, quantity }) => {
    if (!size || !color) {
      toast.error('Please select size and color')
      return
    }

    // Add to cart (local operation, always succeeds)
    addToCart(product, size, color, quantity)
    toast.success(`${product.name} added to cart!`)
  }

  const handleAddToWishlist = (product) => {
    setSelectedProduct(product)
    setShowModal(true)
  }

  const handleModalAddToWishlist = ({ product, size, color }) => {
    if (!size || !color) {
      toast.error('Please select size and color')
      return
    }
    
    const success = addToWishlist(product, size, color)
    if (success) {
      toast.success(`${product.name} added to wishlist!`)
    } else {
      toast.warning('Item is already in your wishlist')
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setSortBy('featured')
    setPriceRange([0, 300])
    setSelectedColors([])
    setSelectedSizes([])
    setOnlyInStock(false)
    setOnlyFeatured(false)
  }

  const ProductCard = ({ product }) => (
    <Card
      className="group overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
      onClick={() => handleAddToCart(product)}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images?.[0] || '/placeholder-image-white.png'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {product.originalPrice > product.price && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            SALE
          </div>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToWishlist(product);
            }}
          >
            <Heart className={`h-4 w-4 ${isInWishlist(product.id, product.sizes[0], product.colors[0]) ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-sm text-gray-900 line-clamp-2">
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-xs text-gray-600">
            ({product.reviewCount})
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-900">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500">{product.category}</span>
        </div>
        
        <div className="flex items-center mt-2 space-x-1">
          {product.colors.slice(0, 4).map((color, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border border-gray-300 ${
                color.toLowerCase() === 'white' ? 'bg-white' :
                color.toLowerCase() === 'black' ? 'bg-black' :
                color.toLowerCase() === 'navy' ? 'bg-blue-900' :
                color.toLowerCase() === 'gray' ? 'bg-gray-500' :
                color.toLowerCase() === 'blue' ? 'bg-blue-500' :
                color.toLowerCase() === 'red' ? 'bg-red-500' :
                color.toLowerCase() === 'green' ? 'bg-green-500' :
                color.toLowerCase() === 'purple' ? 'bg-purple-500' :
                color.toLowerCase() === 'pink' ? 'bg-pink-500' :
                color.toLowerCase() === 'yellow' ? 'bg-yellow-500' :
                color.toLowerCase() === 'brown' ? 'bg-yellow-700' :
                color.toLowerCase() === 'beige' ? 'bg-yellow-100' :
                color.toLowerCase() === 'tan' ? 'bg-yellow-600' :
                color.toLowerCase() === 'camel' ? 'bg-yellow-800' :
                'bg-gray-400'
              }`}
              title={color}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </Card>
  )

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map(category => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-radio text-black"
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="300"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$0</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {allColors.map(color => (
            <label key={color} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={color}
                checked={selectedColors.includes(color)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedColors([...selectedColors, color])
                  } else {
                    setSelectedColors(selectedColors.filter(c => c !== color))
                  }
                }}
                className="form-checkbox text-black"
              />
              <span className="text-sm">{color}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Sizes</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map(size => (
            <label key={size} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={size}
                checked={selectedSizes.includes(size)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedSizes([...selectedSizes, size])
                  } else {
                    setSelectedSizes(selectedSizes.filter(s => s !== size))
                  }
                }}
                className="form-checkbox text-black"
              />
              <span className="text-sm">{size}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="form-checkbox text-black"
          />
          <span className="text-sm">In Stock Only</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={onlyFeatured}
            onChange={(e) => setOnlyFeatured(e.target.checked)}
            className="form-checkbox text-black"
          />
          <span className="text-sm">Featured Only</span>
        </label>
      </div>

      <Button
        variant="outline"
        onClick={clearFilters}
        className="w-full"
      >
        Clear All Filters
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Our Products
          </h1>
          <p className="text-gray-600">
            Discover our amazing collection of high-quality clothing and accessories
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>

              {/* View Mode */}
              <div className="hidden sm:flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <FilterPanel />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Selection Modal */}
      <ProductSelectionModal
        product={selectedProduct}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAddToCart={handleModalAddToCart}
        onAddToWishlist={handleModalAddToWishlist}
      />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  )
} 