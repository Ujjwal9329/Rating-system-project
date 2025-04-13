
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Store, MapPin, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import RatingStars from '@/components/stores/RatingStars';
import { Store as StoreType } from '@/components/stores/StoreCard';
import { Badge } from '@/components/ui/badge';

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
  userId: string;
  storeId: string;
  rating: number;
}

const mockUserRatings: UserRating[] = [
  { userId: '2', storeId: '1', rating: 4 },
  { userId: '2', storeId: '3', rating: 3 },
];

const StoreDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [store, setStore] = useState<StoreType | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundStore = mockStores.find((s) => s.id === id);
    if (foundStore) {
      setStore(foundStore);

      // Check if the user has already rated this store
      if (isAuthenticated && user) {
        const existingRating = mockUserRatings.find(
          (r) => r.userId === user.id && r.storeId === id
        );
        if (existingRating) {
          setUserRating(existingRating.rating);
        }
      }
    } else {
      // Store not found, navigate back
      toast.error('Store not found');
      navigate('/stores');
    }
  }, [id, user, isAuthenticated]);

  const handleRatingChange = (rating: number) => {
    if (!isAuthenticated) {
      toast.error('Please login to rate stores');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setUserRating(rating);
      
      // In a real app, this would be an API call to update the rating
      toast.success(`Your ${userRating > 0 ? 'updated' : 'new'} rating has been submitted!`);
      setIsSubmitting(false);
    }, 500);
  };

  if (!store) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-8" onClick={() => navigate('/stores')}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Stores
      </Button>
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center">
            <Store className="h-5 w-5 text-blue-500 mr-2" />
            <CardTitle>{store.name}</CardTitle>
          </div>
          <CardDescription className="flex items-center mt-2">
            <MapPin className="h-4 w-4 mr-1" />
            {store.address}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Overall Rating</span>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">{store.rating.toFixed(1)}</span>
                <RatingStars rating={store.rating} size={20} />
                <span className="ml-2 text-sm text-gray-500">
                  ({store.totalRatings} {store.totalRatings === 1 ? 'rating' : 'ratings'})
                </span>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Your Rating</h3>
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <RatingStars
                    rating={userRating}
                    size={28}
                    interactive={!isSubmitting}
                    onRatingChange={handleRatingChange}
                  />
                  {userRating > 0 && (
                    <Badge variant="outline" className="ml-4">
                      Your rating: {userRating}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {userRating > 0
                    ? 'Thanks for your rating! Click on a star to update it.'
                    : 'Click on a star to rate this store.'}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-500 mb-2">
                  Please log in to rate this store.
                </p>
                <Button onClick={() => navigate('/login')}>Log In to Rate</Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t flex justify-between">
          <Button variant="outline" onClick={() => navigate('/stores')}>
            View All Stores
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StoreDetail;
