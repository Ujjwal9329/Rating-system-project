
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Store as StoreIcon, MapPin } from 'lucide-react';
import RatingStars from './RatingStars';

export interface Store {
  id: string;
  name: string;
  address: string;
  rating: number;
  totalRatings: number;
  ownerId?: string;
}

interface StoreCardProps {
  store: Store;
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <StoreIcon className="h-5 w-5 text-blue-500 mr-2" />
            <CardTitle className="text-lg font-semibold">{store.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-start mb-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4 text-gray-500 mr-1 mt-0.5 shrink-0" />
          <span className="line-clamp-2">{store.address}</span>
        </div>
        <div className="flex items-center space-x-2">
          <RatingStars rating={store.rating} size={16} />
          <span className="text-sm text-gray-500">
            ({store.totalRatings} {store.totalRatings === 1 ? 'rating' : 'ratings'})
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={() => navigate(`/stores/${store.id}`)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoreCard;
