
import React, { useState } from 'react';
import StoreList from '@/components/stores/StoreList';
import { Store as StoreType } from '@/components/stores/StoreCard';

// Mock data for stores
const mockStores: StoreType[] = [
  { id: '1', name: 'Coffee Shop Downtown', address: '123 Main St, Downtown', rating: 4.5, totalRatings: 28 },
  { id: '2', name: 'Bookstore Haven', address: '456 Oak Ave, Midtown', rating: 4.8, totalRatings: 52 },
  { id: '3', name: 'Tech Gadgets', address: '789 Pine Rd, Uptown', rating: 4.2, totalRatings: 35 },
  { id: '4', name: 'Fashion Boutique', address: '321 Elm St, West End', rating: 3.9, totalRatings: 19 },
  { id: '5', name: 'Gourmet Grocery', address: '654 Maple Dr, East Side', rating: 4.7, totalRatings: 41 },
  { id: '6', name: 'Fitness Center', address: '987 Cedar Lane, North Side', rating: 4.4, totalRatings: 33 },
  { id: '7', name: 'Home Decor Store', address: '753 Birch Blvd, South End', rating: 4.1, totalRatings: 25 },
  { id: '8', name: 'Pet Supply Shop', address: '159 Willow Way, Riverside', rating: 4.6, totalRatings: 37 },
];

const Stores = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Browse Stores</h1>
        <p className="text-gray-600">Search, filter, and find the perfect stores to discover and rate.</p>
      </div>
      
      <StoreList stores={mockStores} />
    </div>
  );
};

export default Stores;
