'use client'
import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  Headphones,
  Award,
  CheckCircle
} from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white ">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Have questions about custom designs? Need help with your order? Our team is here to help you create something amazing.
          </p>
          <div className="flex justify-center items-center space-x-8 text-white">
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm opacity-90">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">&lt;2hrs</div>
              <div className="text-sm opacity-90">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">99%</div>
              <div className="text-sm opacity-90">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Call Us</h3>
              <p className="text-gray-600 mb-4">Speak directly with our design experts</p>
              <a href="tel:+917567350755" className="text-blue-600 hover:text-blue-700 font-semibold">
                +91 7567350755
              </a>
              <p className="text-sm text-gray-500 mt-2">Mon-Sat 9AM-8PM IST</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Email Us</h3>
              <p className="text-gray-600 mb-4">Get detailed responses to your queries</p>
              <a href="mailto:luixenfashion@gmail.com" className="text-purple-600 hover:text-purple-700 font-semibold">
                luixenfashion@gmail.com
              </a>
              <p className="text-sm text-gray-500 mt-2">Response within 2 hours</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">WhatsApp</h3>
              <p className="text-gray-600 mb-4">Chat with us for instant support</p>
              <a href="https://wa.me/917567350755" className="text-green-600 hover:text-green-700 font-semibold" target="_blank" rel="noopener noreferrer">
                +91 7567350755
              </a>
              <p className="text-sm text-gray-500 mt-2">Available 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Whether you have questions about our design process, need help with a custom order, or want to discuss bulk orders, we&apos;re here to help.
              </p>

              {isSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <p className="text-green-800 font-medium">Message sent successfully! We&apos;ll get back to you soon.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-300"
                  >
                    <option value="">Select a subject</option>
                    <option value="design-help">Design Help & Questions</option>
                    <option value="order-inquiry">Order Inquiry</option>
                    <option value="bulk-order">Bulk Orders</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-300 resize-y"
                    placeholder="Tell us about your project, questions, or how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <p className="text-gray-600 mb-8">
                Ready to bring your ideas to life? Get in touch with our team of experts who are passionate about creating amazing custom apparel.
              </p>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Our Location</h3>
                    <p className="text-gray-600">
                      123 Design Street, Creative District<br />
                      Ahmedabad, Gujarat 380001, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 8:00 PM IST</p>
                      <p>Saturday: 10:00 AM - 6:00 PM IST</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Headphones className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                    <p className="text-gray-600">
                      Our support team is available around the clock to help you with any questions or concerns.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com/luixenfashion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-3 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                  >
                    <FaInstagram className="h-6 w-6" />
                  </a>
                  <a
                    href="mailto:luixenfashion@gmail.com"
                    className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    <IoIosMail className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How long does it take to create a custom design?</h3>
              <p className="text-gray-600">
                Most custom designs are completed within 2-3 business days. Complex designs may take up to 5 business days.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Do you offer bulk discounts?</h3>
              <p className="text-gray-600">
                Yes! We offer attractive discounts for bulk orders. Contact us for custom pricing based on your quantity needs.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What file formats do you accept?</h3>
              <p className="text-gray-600">
                We accept PNG, JPG, PDF, AI, and PSD files. For best results, provide high-resolution images (300 DPI or higher).
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Can I see a proof before production?</h3>
              <p className="text-gray-600">
                Absolutely! We provide digital proofs for all custom orders before going into production.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact; 