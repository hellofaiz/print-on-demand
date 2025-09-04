'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  ShoppingCart, 
  MapPin, 
  CreditCard, 
  CheckCircle, 
  ArrowLeft,
  Lock,
  Truck,
  Package,
  User,
  Mail,
  Phone,
  Home
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useCartWithHydration } from '@/components/providers/CartProvider'
import ScriptLoader from '@/components/ui/ScriptLoader'
import { toast } from '@/store/toast'
import { formatPrice } from '@/lib/utils'

const SHIPPING_METHODS = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '5-7 business days',
    price: 0,
    icon: Package
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '2-3 business days',
    price: 15.99,
    icon: Truck
  }
]

const PAYMENT_METHODS = [
  {
    id: 'razorpay',
    name: 'Razorpay',
    description: 'Pay with card, UPI, or wallet',
    icon: CreditCard
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Pay when you receive',
    icon: Home
  }
]

export default function CheckoutPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { items, getCartTotal, clearCart } = useCartWithHydration()
  
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [orderCreated, setOrderCreated] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)

  // Form states
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India'
  })

  const [selectedShipping, setSelectedShipping] = useState('standard')
  const [selectedPayment, setSelectedPayment] = useState('razorpay')
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect if not authenticated
  useEffect(() => {
    if (mounted && status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/checkout')
    }
  }, [status, mounted, router])

  // Pre-fill user data
  useEffect(() => {
    if (session?.user) {
      setShippingAddress(prev => ({
        ...prev,
        name: session.user.name || '',
        email: session.user.email || '',
        phone: session.user.phone || ''
      }))
    }
  }, [session])

  // Redirect if cart is empty
  useEffect(() => {
    if (mounted && items.length === 0 && !orderCreated) {
      router.push('/products')
    }
  }, [mounted, items.length, orderCreated, router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateShippingAddress = () => {
    const required = ['name', 'email', 'phone', 'street', 'city', 'state', 'postalCode']
    const missing = required.filter(field => !shippingAddress[field].trim())
    
    if (missing.length > 0) {
      toast.error(`Please fill in: ${missing.join(', ')}`)
      return false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(shippingAddress.email)) {
      toast.error('Please enter a valid email address')
      return false
    }

    // Phone validation
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
    if (!phoneRegex.test(shippingAddress.phone)) {
      toast.error('Please enter a valid phone number')
      return false
    }

    return true
  }

  const calculateTotal = () => {
    const subtotal = getCartTotal()
    const shippingMethod = SHIPPING_METHODS.find(method => method.id === selectedShipping)
    const shipping = shippingMethod?.price || 0
    const tax = subtotal * 0.18 // 18% GST
    return {
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax
    }
  }

  const handleNextStep = () => {
    if (currentStep === 1 && !validateShippingAddress()) {
      return
    }
    
    if (currentStep === 3 && !acceptedTerms) {
      toast.error('Please accept the terms and conditions')
      return
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      handlePlaceOrder()
    }
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      const totals = calculateTotal()
      
      const orderData = {
        cartItems: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          color: item.color,
          name: item.name,
          image: item.image
        })),
        shippingAddress,
        total: totals.total,
        subtotal: totals.subtotal,
        shipping: totals.shipping,
        tax: totals.tax,
        shippingMethod: selectedShipping,
        paymentMethod: selectedPayment
      }

      if (selectedPayment === 'razorpay') {
        await handleRazorpayPayment(orderData)
      } else {
        await handleCODOrder(orderData)
      }
    } catch (error) {
      console.error('Order placement error:', error)
      toast.error('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCODOrder = async (orderData) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        const result = await response.json()
        setOrderId(result.order.id)
        setOrderCreated(true)
        clearCart()
        toast.success('Order placed successfully!')
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Failed to create order')
      }
    } catch (error) {
      console.error('COD order error:', error)
      toast.error('Failed to place order')
    }
  }

  const handleRazorpayPayment = async (orderData) => {
    try {
      // Create Razorpay order
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: orderData.total,
          cartItems: orderData.cartItems,
          shippingAddress: orderData.shippingAddress
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create payment order')
      }

      const { order, orderData: dbOrder } = await response.json()

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_key_here',
        amount: order.amount,
        currency: order.currency,
        name: 'POD Store',
        description: 'Order Payment',
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                orderData: dbOrder,
                cartItems: orderData.cartItems
              }),
            })

            if (verifyResponse.ok) {
              setOrderId(dbOrder.id)
              setOrderCreated(true)
              clearCart()
              toast.success('Payment successful! Order placed.')
            } else {
              toast.error('Payment verification failed')
            }
          } catch (error) {
            console.error('Payment verification error:', error)
            toast.error('Payment verification failed')
          }
        },
        prefill: {
          name: shippingAddress.name,
          email: shippingAddress.email,
          contact: shippingAddress.phone
        },
        theme: {
          color: '#000000'
        }
      }

      if (typeof window !== 'undefined' && window.Razorpay && razorpayLoaded) {
        const rzp = new window.Razorpay(options)
        rzp.open()
      } else {
        toast.error('Payment gateway not available. Please try again.')
      }
    } catch (error) {
      console.error('Razorpay payment error:', error)
      toast.error('Failed to initialize payment')
    }
  }

  // Show loading state while checking authentication
  if (!mounted || status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  // Show nothing if not authenticated (will redirect)
  if (status === 'unauthenticated') {
    return null
  }

  // Show success page if order is created
  if (orderCreated && orderId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Your order #{orderId.slice(-8).toUpperCase()} has been placed successfully.
            </p>
            <div className="space-y-3">
              <Button 
                className="w-full" 
                onClick={() => router.push(`/orders`)}
              >
                View Order Details
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => router.push('/products')}
              >
                Continue Shopping
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  const totals = calculateTotal()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Load Razorpay script */}
      <ScriptLoader 
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
        onError={() => console.error('Failed to load Razorpay')}
      />
      
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
              <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
              <p className="text-gray-600">Complete your purchase</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[
                { step: 1, label: 'Shipping', icon: MapPin },
                { step: 2, label: 'Payment', icon: CreditCard },
                { step: 3, label: 'Review', icon: CheckCircle }
              ].map(({ step, label, icon: Icon }) => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white text-gray-400 border-gray-300'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= step ? 'text-black' : 'text-gray-400'
                  }`}>
                    {label}
                  </span>
                  {step < 3 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      currentStep > step ? 'bg-black' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={shippingAddress.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={shippingAddress.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="h-4 w-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="India">India</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={shippingAddress.street}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter your street address"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter your city"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter your state"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingAddress.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter postal code"
                      required
                    />
                  </div>
                </div>

                {/* Shipping Methods */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Method</h3>
                  <div className="space-y-3">
                    {SHIPPING_METHODS.map((method) => {
                      const Icon = method.icon
                      return (
                        <label
                          key={method.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedShipping === method.id
                              ? 'border-black bg-gray-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <input
                            type="radio"
                            name="shipping"
                            value={method.id}
                            checked={selectedShipping === method.id}
                            onChange={(e) => setSelectedShipping(e.target.value)}
                            className="sr-only"
                          />
                          <Icon className="h-5 w-5 text-gray-600 mr-3" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{method.name}</p>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                          <p className="font-semibold text-gray-900">
                            {method.price === 0 ? 'Free' : formatPrice(method.price)}
                          </p>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </h2>
                
                <div className="space-y-3">
                  {PAYMENT_METHODS.map((method) => {
                    const Icon = method.icon
                    return (
                      <label
                        key={method.id}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedPayment === method.id
                            ? 'border-black bg-gray-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="sr-only"
                        />
                        <Icon className="h-5 w-5 text-gray-600 mr-3" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{method.name}</p>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </label>
                    )
                  })}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-start gap-3">
                  <Lock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Secure Payment</p>
                    <p className="text-sm text-blue-700">
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Review Your Order
                </h2>
                
                {/* Shipping Address Review */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Shipping Address</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-gray-900">{shippingAddress.name}</p>
                    <p className="text-gray-600">{shippingAddress.street}</p>
                    <p className="text-gray-600">
                      {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
                    </p>
                    <p className="text-gray-600">{shippingAddress.country}</p>
                    <p className="text-gray-600 mt-2">
                      {shippingAddress.email} • {shippingAddress.phone}
                    </p>
                  </div>
                </div>

                {/* Payment Method Review */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Method</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-gray-900">
                      {PAYMENT_METHODS.find(method => method.id === selectedPayment)?.name}
                    </p>
                    <p className="text-gray-600">
                      {PAYMENT_METHODS.find(method => method.id === selectedPayment)?.description}
                    </p>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="mb-6">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 form-checkbox text-black"
                    />
                    <span className="text-sm text-gray-600">
                      I agree to the{' '}
                      <a href="/terms" className="text-black hover:underline">
                        Terms and Conditions
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-black hover:underline">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.size} • {item.color} • Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>{formatPrice(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span>{totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (GST 18%):</span>
                  <span>{formatPrice(totals.tax)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg text-gray-900">
                    <span>Total:</span>
                    <span>{formatPrice(totals.total)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <Button
                  className="w-full"
                  onClick={handleNextStep}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  ) : null}
                  {currentStep === 3 ? 'Place Order' : 'Continue'}
                </Button>
                
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={loading}
                  >
                    Back
                  </Button>
                )}
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 text-green-700">
                  <Lock className="h-4 w-4" />
                  <span className="text-sm font-medium">Secure Checkout</span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  SSL encrypted and PCI compliant
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 