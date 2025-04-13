
import React, { useState } from 'react';
import StoreCard, { Store } from './StoreCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowUpDown } from 'lucide-react';

interface StoreListProps {
  stores: Store[];
}

const StoreList: React.FC<StoreListProps> = ({ stores: initialStores }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stores, setStores] = useState<Store[]>(initialStores);
  const [sortField, setSortField] = useState<'name' | 'rating'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = initialStores.filter(
      (store) =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setStores(filtered);
  };

  const handleSort = (field: 'name' | 'rating') => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);

    const sorted = [...stores].sort((a, b) => {
      if (field === 'name') {
        return newDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return newDirection === 'asc' ? a.rating - b.rating : b.rating - a.rating;
      }
    });

    setStores(sorted);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex w-full md:w-2/3 space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search by name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSort('name')}
            className="flex items-center"
          >
            Name
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSort('rating')}
            className="flex items-center"
          >
            Rating
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>

      {stores.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No stores found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default StoreList;
