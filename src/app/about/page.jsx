'use client'
import React from "react";
import { 
  Users, 
  Award, 
  Palette, 
  Shirt, 
  Heart, 
  Shield, 
  Star,
  Truck,
  RotateCcw,
  CheckCircle,
  Target,
  Eye,
  Zap,
  Globe
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import bgimage from "../../assets/bg-image.png";
import cardImage1 from "../../assets/600X400-tshirt-image-1.png";
import cardImage2 from "../../assets/600X400-tshirt-image-2.png";
import cardImage3 from "../../assets/600X400-tshirt-image-3.png";

const values = [
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Passion for Quality",
    description: "We obsess over every detail, from fabric selection to final stitching, ensuring each piece meets our exacting standards.",
    color: "red"
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "Creative Freedom",
    description: "Your imagination is the only limit. Our design tools and expert team help bring even the wildest ideas to life.",
    color: "purple"
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Customer First",
    description: "Every decision we make is centered around creating the best possible experience for our customers.",
    color: "blue"
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Sustainable Practices",
    description: "We're committed to eco-friendly materials and ethical manufacturing processes that protect our planet.",
    color: "green"
  }
];

const milestones = [
  {
    year: "2019",
    title: "The Beginning",
    description: "Started as a small studio with a big dream: making custom apparel accessible to everyone."
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description: "Launched our online design platform, revolutionizing how customers create custom apparel."
  },
  {
    year: "2021",
    title: "10,000 Happy Customers",
    description: "Reached our first major milestone with 10,000 satisfied customers and 25,000 custom designs."
  },
  {
    year: "2022",
    title: "Quality Certification",
    description: "Achieved ISO quality certification and partnered with premium fabric suppliers."
  },
  {
    year: "2023",
    title: "Expansion & Growth",
    description: "Expanded our team and capabilities, now serving customers across multiple countries."
  },
  {
    year: "2024",
    title: "50,000 Designs & Counting",
    description: "Celebrating over 50,000 unique designs created and countless stories told through fashion."
  }
];

const teamMembers = [
  {
    name: "Arjun Sharma",
    role: "Founder & CEO",
    bio: "Passionate about democratizing custom fashion and empowering creative expression.",
    image: cardImage1
  },
  {
    name: "Priya Patel",
    role: "Lead Designer",
    bio: "15+ years in fashion design, specializing in translating customer visions into reality.",
    image: cardImage2
  },
  {
    name: "Raj Kumar",
    role: "Head of Quality",
    bio: "Ensures every product meets our stringent quality standards before reaching customers.",
    image: cardImage3
  }
];

const stats = [
  { number: "50K+", label: "Designs Created", icon: <Palette className="h-6 w-6" /> },
  { number: "10K+", label: "Happy Customers", icon: <Users className="h-6 w-6" /> },
  { number: "4.9/5", label: "Customer Rating", icon: <Star className="h-6 w-6" /> },
  { number: "5+", label: "Years Experience", icon: <Award className="h-6 w-6" /> }
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About Luixen
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Crafting stories through custom apparel. Empowering creativity. Building connections.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2 text-blue-200">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                <div className="text-sm text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Luixen was born from a simple belief: everyone deserves to wear their story. In 2019, we started as a small studio in Gujarat, India, with a mission to make custom apparel accessible, affordable, and absolutely amazing.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                What began as a passion project has grown into a thriving community of creators, designers, and dreamers. We've helped thousands of customers express their unique personalities through custom t-shirts, hoodies, and more.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Today, we're proud to be at the forefront of the custom apparel revolution, combining cutting-edge technology with traditional craftsmanship to deliver products that exceed expectations.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="bg-blue-50 px-4 py-2 rounded-full">
                  <span className="text-blue-600 font-semibold">Premium Quality</span>
                </div>
                <div className="bg-purple-50 px-4 py-2 rounded-full">
                  <span className="text-purple-600 font-semibold">Custom Design</span>
                </div>
                <div className="bg-green-50 px-4 py-2 rounded-full">
                  <span className="text-green-600 font-semibold">Fast Delivery</span>
                </div>
                <div className="bg-orange-50 px-4 py-2 rounded-full">
                  <span className="text-orange-600 font-semibold">Customer First</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src={bgimage}
                alt="Our story"
                width={600}
                height={400}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Shirt className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">50,000+</div>
                    <div className="text-sm text-gray-600">Custom Designs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To democratize custom apparel by making high-quality, personalized clothing accessible to everyone, everywhere.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To become the world's leading platform for creative expression through custom apparel, inspiring millions to wear their stories.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Promise</h3>
              <p className="text-gray-600">
                Excellence in quality, innovation in design, and unparalleled customer service in every interaction.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className={`text-${value.color}-600 mb-4`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Milestones that shaped our story</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full relative z-10"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind Luixen</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Luixen?</h2>
            <p className="text-xl text-gray-600">What makes us different</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Premium Quality</h3>
              <p className="text-gray-600">
                We use only the finest materials and cutting-edge printing technology to ensure every product exceeds expectations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fast Delivery</h3>
              <p className="text-gray-600">
                Lightning-fast production and shipping ensure you get your custom apparel when you need it most.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <RotateCcw className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Easy Returns</h3>
              <p className="text-gray-600">
                Not satisfied? Our hassle-free return policy ensures you're always happy with your purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Your Story?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of customers who trust Luixen for their custom apparel needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Designing
            </Link>
            <Link href="/contact" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 