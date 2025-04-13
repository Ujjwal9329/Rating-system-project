
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { Store as StoreType } from '@/components/stores/StoreCard';
import { Store, Star, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RatingStars from '../stores/RatingStars';

// Mock data for stores
const mockStores: StoreType[] = [
  { id: '1', name: 'Coffee Shop Downtown', address: '123 Main St, Downtown', rating: 4.5, totalRatings: 28 },
  { id: '2', name: 'Bookstore Haven', address: '456 Oak Ave, Midtown', rating: 4.8, totalRatings: 52 },
  { id: '3', name: 'Tech Gadgets', address: '789 Pine Rd, Uptown', rating: 4.2, totalRatings: 35 },
  { id: '4', name: 'Fashion Boutique', address: '321 Elm St, West End', rating: 3.9, totalRatings: 19 },
  { id: '5', name: 'Gourmet Grocery', address: '654 Maple Dr, East Side', rating: 4.7, totalRatings: 41 },
];

// Mock data for user ratings
interface UserRating {
  storeId: string;
  rating: number;
  date: string;
}

const mockUserRatings: UserRating[] = [
  { storeId: '1', rating: 4, date: '2023-05-15' },
  { storeId: '3', rating: 3, date: '2023-06-22' },
];

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [recentlyRated, setRecentlyRated] = useState<(StoreType & { userRating: number })[]>([]);
  const [suggestedStores, setSuggestedStores] = useState<StoreType[]>([]);

  useEffect(() => {
    // Get stores that the user has rated
    const ratedStores = mockStores
      .filter(store => mockUserRatings.some(rating => rating.storeId === store.id))
      .map(store => ({
        ...store,
        userRating: mockUserRatings.find(rating => rating.storeId === store.id)?.rating || 0
      }));
    
    setRecentlyRated(ratedStores);
    
    // Get suggested stores (not rated by the user)
    const notRatedStores = mockStores
      .filter(store => !mockUserRatings.some(rating => rating.storeId === store.id));
    
    setSuggestedStores(notRatedStores);
  }, []);

  const filteredSuggested = suggestedStores.filter(
    store => 
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Welcome back, {user?.name}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Here's an overview of your store ratings and suggestions for new places to rate.</p>
        </CardContent>
      </Card>
      
      {/* Your Ratings */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Ratings</h2>
        {recentlyRated.length === 0 ? (
          <Card>
            <CardContent className="py-4">
              <div className="text-center">
                <p className="text-muted-foreground">You haven't rated any stores yet.</p>
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => navigate('/stores')}
                >
                  Browse Stores to Rate
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {recentlyRated.map((store) => (
              <Card key={store.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{store.name}</h3>
                        <p className="text-sm text-muted-foreground truncate max-w-[250px]">
                          {store.address}
                        </p>
                      </div>
                      <Badge variant="outline">Your Rating</Badge>
                    </div>
                    <div className="mt-2 flex items-center">
                      <RatingStars rating={store.userRating} size={18} />
                    </div>
                  </div>
                  <Separator />
                  <div className="p-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate(`/stores/${store.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Suggested Stores */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Suggested Stores to Rate</h2>
          <Button variant="outline" onClick={() => navigate('/stores')}>
            View All Stores
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search suggested stores..."
            className="pl-9 mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {filteredSuggested.length === 0 ? (
          <Card>
            <CardContent className="py-4">
              <p className="text-center text-muted-foreground">
                No suggested stores found. Try a different search term.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {filteredSuggested.slice(0, 3).map((store) => (
              <Card key={store.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Store className="h-4 w-4 text-blue-500" />
                      <h3 className="font-semibold">{store.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{store.address}</p>
                    <div className="mt-2 flex items-center space-x-1">
                      <Star className="h-4 w-4 text-rating" fill="currentColor" />
                      <span>{store.rating.toFixed(1)}</span>
                      <span className="text-sm text-gray-500">
                        ({store.totalRatings} {store.totalRatings === 1 ? 'rating' : 'ratings'})
                      </span>
                    </div>
                  </div>
                  <Separator />
                  <div className="p-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="w-full"
                      onClick={() => navigate(`/stores/${store.id}`)}
                    >
                      Rate This Store
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
