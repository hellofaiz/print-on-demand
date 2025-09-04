import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { db } from '@/lib/db'
import { cartItemSchema } from '@/lib/validations'
import { authOptions } from '@/lib/auth'

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const cartItems = await db.cart.findMany({
      where: { userId: session.user.id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            stock: true
          }
        }
      }
    })

    return NextResponse.json({ cartItems })
  } catch (error) {
    console.error('Cart fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

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
    const { productId, quantity, size, color } = cartItemSchema.parse(body)

    // Check if product exists and has sufficient stock
    const product = await db.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    if (product.stock < quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock' },
        { status: 400 }
      )
    }

    // Check if item already exists in cart
    const existingCartItem = await db.cart.findUnique({
      where: {
        userId_productId_size_color: {
          userId: session.user.id,
          productId,
          size,
          color
        }
      }
    })

    let cartItem

    if (existingCartItem) {
      // Update quantity
      cartItem = await db.cart.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              images: true,
              stock: true
            }
          }
        }
      })
    } else {
      // Create new cart item
      cartItem = await db.cart.create({
        data: {
          userId: session.user.id,
          productId,
          quantity,
          size,
          color
        },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              images: true,
              stock: true
            }
          }
        }
      })
    }

    return NextResponse.json({
      cartItem,
      message: 'Item added to cart successfully'
    })
  } catch (error) {
    console.error('Add to cart error:', error)
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { cartItemId, quantity } = body

    if (quantity <= 0) {
      return NextResponse.json(
        { error: 'Quantity must be greater than 0' },
        { status: 400 }
      )
    }

    const cartItem = await db.cart.update({
      where: { 
        id: cartItemId,
        userId: session.user.id // Ensure user owns this cart item
      },
      data: { quantity },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            stock: true
          }
        }
      }
    })

    return NextResponse.json({
      cartItem,
      message: 'Cart item updated successfully'
    })
  } catch (error) {
    console.error('Cart update error:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const cartItemId = searchParams.get('cartItemId')

    if (!cartItemId) {
      return NextResponse.json(
        { error: 'Cart item ID is required' },
        { status: 400 }
      )
    }

    await db.cart.delete({
      where: { 
        id: cartItemId,
        userId: session.user.id // Ensure user owns this cart item
      }
    })

    return NextResponse.json({
      message: 'Item removed from cart successfully'
    })
  } catch (error) {
    console.error('Cart deletion error:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 