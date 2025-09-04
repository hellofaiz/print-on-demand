'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useWishlistWithHydration } from '@/components/providers/WishlistProvider'
import { toast } from '@/store/toast'

export default function ProfilePage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const { getWishlistCount } = useWishlistWithHydration()
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [stats, setStats] = useState({
    totalOrders: 0,
    wishlistItems: 0,
    memberSince: new Date().getFullYear()
  })

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    image: ''
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        phone: session.user.phone || '',
        image: session.user.image || ''
      })
    }
  }, [session])

  // Redirect if not authenticated
  useEffect(() => {
    if (mounted && status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, mounted, router])

  // Fetch user stats
  useEffect(() => {
    if (session?.user && mounted) {
      fetchUserStats()
    }
  }, [session, mounted, fetchUserStats])

  // Update wishlist count when it changes
  useEffect(() => {
    if (mounted) {
      setStats(prev => ({
        ...prev,
        wishlistItems: getWishlistCount()
      }))
    }
  }, [getWishlistCount, mounted])

  const fetchUserStats = useCallback(async () => {
    try {
      const response = await fetch('/api/orders')
      if (response.ok) {
        const data = await response.json()
        const wishlistCount = getWishlistCount()
        const memberSince = session?.user?.createdAt
          ? new Date(session.user.createdAt).getFullYear()
          : new Date().getFullYear()

        setStats({
          totalOrders: data.orders?.length || 0,
          wishlistItems: wishlistCount,
          memberSince
        })
      }
    } catch (error) {
      console.error('Error fetching user stats:', error)
    }
  }, [getWishlistCount, session, setStats])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const updatedUser = await response.json()
        
        // Update the session with new data
        await update({
          ...session,
          user: {
            ...session.user,
            ...updatedUser.user
          }
        })

        setEditing(false)
        toast.success('Profile updated successfully!')
        
        // Refresh stats after profile update
        fetchUserStats()
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Failed to update profile')
      }
    } catch (error) {
      console.error('Profile update error:', error)
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: session?.user?.name || '',
      email: session?.user?.email || '',
      phone: session?.user?.phone || '',
      image: session?.user?.image || ''
    })
    setEditing(false)
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
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600">Manage your account information</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
              {!editing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Profile Image */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  {formData.image ? (
                    <Image
                      src={formData.image}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                      <User className="h-8 w-8 text-gray-500" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {session?.user?.name || 'User'}
                  </h3>
                                     <p className="text-sm text-gray-500">
                     Member since {stats.memberSince}
                   </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Full Name
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{formData.name || 'Not provided'}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email Address
                  </label>
                  <p className="text-gray-900 py-2 bg-gray-50 px-3 rounded-md">
                    {formData.email}
                    <span className="text-xs text-gray-500 ml-2">(Cannot be changed)</span>
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Phone Number
                  </label>
                  {editing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{formData.phone || 'Not provided'}</p>
                  )}
                </div>

                {/* Account Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <p className="text-gray-900 py-2 bg-gray-50 px-3 rounded-md">
                    {session?.user?.role === 'ADMIN' ? 'Administrator' : 'Customer'}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Account Statistics */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-xl font-semibold text-gray-900">{stats.totalOrders}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Wishlist Items</p>
                    <p className="text-xl font-semibold text-gray-900">{stats.wishlistItems}</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="text-xl font-semibold text-gray-900">{stats.memberSince}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 px-6 justify-start"
                onClick={() => router.push('/orders')}
              >
                <Calendar className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p className="font-medium">View Orders</p>
                  <p className="text-sm text-gray-500">Check your order history</p>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto py-4 px-6 justify-start"
                onClick={() => router.push('/wishlist')}
              >
                <MapPin className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p className="font-medium">Wishlist</p>
                  <p className="text-sm text-gray-500">View saved items</p>
                </div>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 