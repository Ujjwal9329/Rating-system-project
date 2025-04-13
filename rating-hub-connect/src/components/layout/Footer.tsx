
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:order-2 space-x-6">
            <Link to="/" className="text-gray-500 hover:text-gray-600">Home</Link>
            <Link to="/stores" className="text-gray-500 hover:text-gray-600">Stores</Link>
            <Link to="/about" className="text-gray-500 hover:text-gray-600">About</Link>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} RateMyStore. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
