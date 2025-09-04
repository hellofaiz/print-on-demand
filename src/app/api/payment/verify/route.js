import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import crypto from 'crypto'
import { db } from '@/lib/db'
import { authOptions } from '@/lib/auth'

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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId, cartItems } = body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !dbOrderId) {
      return NextResponse.json(
        { error: 'Missing required payment verification data' },
        { status: 400 }
      )
    }

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex')

    if (razorpay_signature !== expectedSign) {
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      )
    }

    // Start transaction
    const result = await db.$transaction(async (tx) => {
      // Update order status
      const order = await tx.order.update({
        where: { id: dbOrderId },
        data: {
          paymentStatus: 'COMPLETED',
          status: 'PROCESSING',
          paymentId: razorpay_payment_id,
        }
      })

      // Create order items if cartItems provided
      if (cartItems && cartItems.length > 0) {
        const orderItems = cartItems.map(item => ({
          orderId: dbOrderId,
          productId: item.productId || item.product.id,
          quantity: item.quantity,
          price: item.product?.price || item.price,
          size: item.size,
          color: item.color,
        }))

        await tx.orderItem.createMany({
          data: orderItems
        })

        // Update product stock
        for (const item of cartItems) {
          await tx.product.update({
            where: { id: item.productId || item.product.id },
            data: {
              stock: {
                decrement: item.quantity
              }
            }
          })
        }

        // Clear user's cart
        await tx.cart.deleteMany({
          where: { userId: session.user.id }
        })
      }

      return order
    })

    return NextResponse.json({
      success: true,
      order: result,
      message: 'Payment verified successfully'
    })
  } catch (error) {
    console.error('Payment verification error:', error)

    // If payment was successful but database update failed, log for manual review
    if (error.message.includes('Transaction')) {
      console.error('CRITICAL: Payment successful but order update failed:', {
        razorpay_payment_id: body?.razorpay_payment_id,
        dbOrderId: body?.dbOrderId,
        userId: session?.user?.id,
        error: error.message
      })
    }

    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
} 