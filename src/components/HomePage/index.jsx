'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Star,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
  Users,
  Award,
  Palette,
  Shirt
} from "lucide-react";
import bgimage from '../../assets/bg-image.png';
import cardImage1 from "../../assets/600X400-tshirt-image-1.png";
import cardImage2 from "../../assets/600X400-tshirt-image-2.png";
import cardImage3 from "../../assets/600X400-tshirt-image-3.png";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Dummy product data
const featuredProducts = [
  {
    id: "507f1f77bcf86cd799439011",
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image: cardImage1,
    rating: 4.8,
    reviews: 124,
    colors: ["black", "white", "navy", "gray"],
    badge: "Best Seller"
  },
  {
    id: "507f191e810c19729de860ea",
    name: "Custom Design Hoodie",
    price: 49.99,
    originalPrice: 59.99,
    image: cardImage2,
    rating: 4.9,
    reviews: 89,
    colors: ["black", "white", "red"],
    badge: "New"
  },
  {
    id: "507f1f77bcf86cd799439012",
    name: "Vintage Style Tank Top",
    price: 24.99,
    originalPrice: 29.99,
    image: cardImage3,
    rating: 4.7,
    reviews: 156,
    colors: ["white", "gray", "beige"],
    badge: "Sale"
  },
  {
    id: "507f191e810c19729de860eb",
    name: "Long Sleeve Tee",
    price: 34.99,
    originalPrice: 44.99,
    image: cardImage1,
    rating: 4.6,
    reviews: 78,
    colors: ["black", "navy", "white"],
    badge: "Popular"
  }
];

const categories = [
  { name: "T-Shirts", count: 150, image: cardImage1 },
  { name: "Hoodies", count: 85, image: cardImage2 },
  { name: "Tank Tops", count: 67, image: cardImage3 },
  { name: "Long Sleeves", count: 92, image: cardImage1 }
];

const testimonials = [
  {
    id: "507f1f77bcf86cd799439011",
    name: "Sarah Johnson",
    rating: 5,
    comment: "Amazing quality and perfect fit! The custom design came out exactly as I wanted.",
    location: "New York"
  },
  {
    id: "507f191e810c19729de860ea",
    name: "Mike Chen",
    rating: 5,
    comment: "Fast shipping and excellent customer service. Will definitely order again!",
    location: "California"
  },
  {
    id: "507f1f77bcf86cd799439012",
    name: "Emily Davis",
    rating: 5,
    comment: "Love the fabric quality and the design tool is so easy to use. Highly recommended!",
    location: "Texas"
  }
];

export default function HomePage() {
  const router = useRouter();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
   
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert("Thank you for subscribing!");
    setEmail("");
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src={bgimage}
          alt="Fashion hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Design Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Perfect Style
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Create custom apparel that tells your story. Premium quality, unlimited creativity, fast delivery.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => router.push("/custom-tshirt-editor")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Designing
            </button>
            <button
              onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            >
              Shop Collection
            </button>
          </div>
          
          <div className="mt-12 flex justify-center items-center space-x-8 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm opacity-80">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm opacity-80">Designs Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">4.9</div>
              <div className="text-sm opacity-80">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">Free shipping on orders over $50</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600 text-sm">Premium materials & craftsmanship</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600 text-sm">30-day hassle-free returns</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Custom Design</h3>
              <p className="text-gray-600 text-sm">Unlimited design possibilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Discover our most popular designs</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <div className="relative w-full h-64">
                    <Image
                      src={product.images?.[0] || '/placeholder-image-white.png'}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  {product.badge && (
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      product.badge === 'Sale' ? 'bg-red-500 text-white' :
                      product.badge === 'New' ? 'bg-green-500 text-white' :
                      product.badge === 'Best Seller' ? 'bg-blue-500 text-white' :
                      'bg-purple-500 text-white'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                      Quick View
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className={`w-6 h-6 rounded-full border-2 border-gray-300 ${
                            color === 'black' ? 'bg-black' :
                            color === 'white' ? 'bg-white' :
                            color === 'navy' ? 'bg-blue-900' :
                            color === 'gray' ? 'bg-gray-500' :
                            color === 'red' ? 'bg-red-500' :
                            color === 'beige' ? 'bg-yellow-100' :
                            'bg-gray-400'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <button 
                      onClick={() => router.push("/products")}
                      className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                      title="View Product"
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => router.push("/custom-tshirt-editor")}
              className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Luixen, we believe that fashion is more than just clothing—it's a powerful form of self-expression. 
                Founded with a passion for quality and creativity, we've made it our mission to help you tell your unique story through custom apparel.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Every piece we create is crafted with premium materials and attention to detail, ensuring that your vision comes to life exactly as you imagined it.
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">5 Years</div>
                  <div className="text-sm text-gray-600">Experience</div>
                </div>
                <div className="text-center">
                  <Shirt className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Items Sold</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative w-full h-96">
                <Image
                  src={bgimage}
                  alt="About Luixen"
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Quality Guaranteed</div>
                    <div className="text-sm text-gray-600">Premium materials only</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real reviews from real customers</p>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-700 mb-6 italic">
                  "{testimonials[currentTestimonial].comment}"
                </blockquote>
                <div className="font-semibold text-gray-900 text-lg">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-gray-600">
                  {testimonials[currentTestimonial].location}
                </div>
              </div>
            </div>
            
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentTestimonial ? 'bg-gray-900' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Create Something Amazing?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of happy customers who have brought their ideas to life with our custom design platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/custom-tshirt-editor")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Start Designing Now
            </button>
            <Link
              href="/contact"
              className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
