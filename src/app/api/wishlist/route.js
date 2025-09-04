import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { db } from '@/lib/db'
import { wishlistItemSchema } from '@/lib/validations'
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

    const wishlistItems = await db.wishlist.findMany({
      where: { userId: session.user.id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            stock: true,
            category: true,
            featured: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ wishlistItems })
  } catch (error) {
    console.error('Wishlist fetch error:', error)
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
    const { productId, size, color } = wishlistItemSchema.parse(body)

    // Check if product exists
    const product = await db.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Check if item already exists in wishlist
    const existingWishlistItem = await db.wishlist.findUnique({
      where: {
        userId_productId_size_color: {
          userId: session.user.id,
          productId,
          size,
          color
        }
      }
    })

    if (existingWishlistItem) {
      return NextResponse.json(
        { error: 'Item already in wishlist' },
        { status: 400 }
      )
    }

    // Add to wishlist
    const wishlistItem = await db.wishlist.create({
      data: {
        userId: session.user.id,
        productId,
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
            stock: true,
            category: true,
            featured: true
          }
        }
      }
    })

    return NextResponse.json({
      wishlistItem,
      message: 'Item added to wishlist successfully'
    })
  } catch (error) {
    console.error('Add to wishlist error:', error)
    
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
    const wishlistItemId = searchParams.get('wishlistItemId')

    if (!wishlistItemId) {
      return NextResponse.json(
        { error: 'Wishlist item ID is required' },
        { status: 400 }
      )
    }

    await db.wishlist.delete({
      where: { 
        id: wishlistItemId,
        userId: session.user.id // Ensure user owns this wishlist item
      }
    })

    return NextResponse.json({
      message: 'Item removed from wishlist successfully'
    })
  } catch (error) {
    console.error('Wishlist deletion error:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Wishlist item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 