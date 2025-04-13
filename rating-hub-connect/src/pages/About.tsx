
import React from 'react';
import { Store, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">About RateMyStore</h1>
        
        <section className="bg-white shadow-md rounded-lg p-8 mb-10">
          <div className="flex items-center mb-6">
            <Store className="h-12 w-12 text-blue-500 mr-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            RateMyStore is dedicated to creating a transparent ecosystem where consumers can make informed decisions 
            and businesses can receive genuine feedback. We believe in the power of community-driven reviews to 
            improve local shopping experiences.
          </p>
        </section>
        
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white shadow-md rounded-lg p-8">
            <div className="flex items-center mb-6">
              <Users className="h-10 w-10 text-blue-500 mr-4" />
              <h2 className="text-2xl font-semibold text-gray-800">For Consumers</h2>
            </div>
            <p className="text-gray-700">
              Discover top-rated local stores, read authentic reviews, and share your own experiences 
              to help fellow shoppers make better choices.
            </p>
          </section>
          
          <section className="bg-white shadow-md rounded-lg p-8">
            <div className="flex items-center mb-6">
              <Award className="h-10 w-10 text-blue-500 mr-4" />
              <h2 className="text-2xl font-semibold text-gray-800">For Businesses</h2>
            </div>
            <p className="text-gray-700">
              Gain valuable insights from customer feedback, improve your services, 
              and showcase your commitment to customer satisfaction.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
