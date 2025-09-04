'use client'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  RotateCcw,
  Heart
} from "lucide-react";
import { IoIosMail } from "react-icons/io";
import { useRouter } from "next/navigation";

function Footer() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleAboutUsClick = (e) => {
    e.preventDefault();
    // For app router, we need to navigate to the page first, then scroll
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // If not on homepage, navigate to homepage with hash
      router.push("/#about");
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated with Luixen</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive designs, special offers, and fashion tips delivered to your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/25"
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap"
              >
                Subscribe Now
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6">Luixen</h3>
            <p className="text-gray-300 leading-relaxed">
              Premium custom apparel that tells your story. Express yourself through quality fashion designed by you.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">123 Fashion Street, Style City, SC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:luixenfashion@gmail.com" className="text-gray-300 hover:text-white transition-colors duration-300">
                  luixenfashion@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/custom-tshirt-editor" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Custom T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/custom-tshirt-editor" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Hoodies & Sweatshirts
                </Link>
              </li>
              <li>
                <Link href="/custom-tshirt-editor" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Tank Tops
                </Link>
              </li>
              <li>
                <Link href="/custom-tshirt-editor" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Long Sleeves
                </Link>
              </li>
              <li>
                <Link href="/custom-tshirt-editor" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Design Studio
                </Link>
              </li>
              <li>
                <Link href="/custom-tshirt-editor" className="text-gray-300 hover:text-white transition-colors duration-300">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={handleAboutUsClick}
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Connect With Us</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Sustainability
                </Link>
              </li>
            </ul>
            
            <div>
              <h5 className="font-semibold mb-4">Follow Us</h5>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/luixenfashion?igsh=MW56c3NkbDI4ZHVydg=="
                  className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a
                  href="mailto:luixenfashion@gmail.com"
                  className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoIosMail className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Features Bar */}
        <div className="border-t border-gray-800 pt-12 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-full">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold">Free Shipping</div>
                <div className="text-sm text-gray-400">On orders over $50</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-full">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold">Secure Payment</div>
                <div className="text-sm text-gray-400">100% protected</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 p-2 rounded-full">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold">Easy Returns</div>
                <div className="text-sm text-gray-400">30-day policy</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 p-2 rounded-full">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold">Made with Love</div>
                <div className="text-sm text-gray-400">Premium quality</div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Luixen. All rights reserved. | 
                <span className="ml-1">Crafted with ❤️ for fashion lovers</span>
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">We Accept:</span>
              <div className="flex space-x-2">
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-blue-600 font-bold text-xs">VISA</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-blue-600 font-bold text-xs">MC</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-blue-600 font-bold text-xs">AMEX</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-blue-600 font-bold text-xs">PYPL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
