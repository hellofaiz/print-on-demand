'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

function CheckoutSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)

  const orderId = searchParams.get('orderId')
  const paymentId = searchParams.get('paymentId')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
          </p>

          {/* Order Details */}
          {orderId && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono font-medium">#{orderId.slice(-8).toUpperCase()}</span>
              </div>
              {paymentId && (
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Payment ID:</span>
                  <span className="font-mono font-medium text-xs">{paymentId}</span>
                </div>
              )}
            </div>
          )}

          {/* What's Next */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <Package className="h-4 w-4" />
              What&apos;s Next?
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                You&apos;ll receive an order confirmation email shortly
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                We&apos;ll notify you when your order ships
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Track your order in the &quot;My Orders&quot; section
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full" 
              onClick={() => router.push('/orders')}
            >
              View Order Details
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => router.push('/products')}
            >
              <Home className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </div>

          {/* Support Notice */}
          <p className="text-xs text-gray-500 mt-6">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@podstore.com" className="text-blue-600 hover:underline">
              support@podstore.com
            </a>
          </p>
        </Card>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  )
} 