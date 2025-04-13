
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, Store, Award, Users, Info, Map } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find and Rate the Best Stores
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Discover top-rated stores in your area and share your own experiences with our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 text-lg px-8 py-6 h-auto">
              <Link to="/stores" className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                Browse Stores
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700 text-lg px-8 py-6 h-auto">
              <Link to="/register" className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Create Account
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About RateMyStore</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We're dedicated to helping consumers make informed decisions while providing businesses with valuable feedback to improve their services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Info className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-700">
                RateMyStore aims to create a transparent ecosystem where shoppers can share authentic experiences, and businesses can leverage customer feedback to enhance their offerings. We believe in the power of community-driven reviews to elevate the shopping experience for everyone.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Join Our Community</h3>
              <p className="text-gray-700">
                Whether you're a shopper wanting to share your experiences or a store owner looking to connect with customers, our platform offers tools to help you engage. Join thousands of users who are already part of our growing community and make your voice heard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-50 p-5 rounded-full mb-6">
                <Store className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Find Stores</h3>
              <p className="text-gray-700">
                Discover local stores with our comprehensive directory and advanced search filters.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-50 p-5 rounded-full mb-6">
                <Star className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Rate & Review</h3>
              <p className="text-gray-700">
                Share your experiences by rating stores and helping others make informed decisions.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-50 p-5 rounded-full mb-6">
                <Award className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Track Favorites</h3>
              <p className="text-gray-700">
                Keep track of your favorite stores and see your rating history in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Our Growing Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md text-center transform hover:-translate-y-1 transition-transform">
              <p className="text-5xl font-bold text-blue-600 mb-3">500+</p>
              <p className="text-xl text-gray-700">Stores Listed</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center transform hover:-translate-y-1 transition-transform">
              <p className="text-5xl font-bold text-blue-600 mb-3">10,000+</p>
              <p className="text-xl text-gray-700">User Ratings</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center transform hover:-translate-y-1 transition-transform">
              <p className="text-5xl font-bold text-blue-600 mb-3">5,000+</p>
              <p className="text-xl text-gray-700">Active Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-500 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join our community today and start discovering and rating the best stores around.
          </p>
          <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-6 h-auto text-lg">
            <Link to="/register" className="flex items-center gap-2">
              Sign Up Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
