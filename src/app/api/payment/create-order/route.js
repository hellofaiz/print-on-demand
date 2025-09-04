import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import Razorpay from 'razorpay'
import { db } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { generateOrderId } from '@/lib/utils'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { amount, currency = 'INR', shippingAddress } = body

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    if (!shippingAddress) {
      return NextResponse.json(
        { error: 'Shipping address is required' },
        { status: 400 }
      )
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt: generateOrderId(),
      notes: {
        userId: session.user.id,
        userEmail: session.user.email,
      }
    }

    const razorpayOrder = await razorpay.orders.create(options)

    // Create order in database
    const order = await db.order.create({
      data: {
        userId: session.user.id,
        total: amount,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        paymentId: razorpayOrder.id,
        shippingAddress: shippingAddress,
      }
    })

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      dbOrderId: order.id,
      key: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error('Payment order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    )
  }
} 