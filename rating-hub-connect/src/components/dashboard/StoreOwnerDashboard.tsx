
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, Star, Search, ArrowUpDown, Users } from 'lucide-react';
import RatingStars from '../stores/RatingStars';
import { Store as StoreType } from '../stores/StoreCard';
import { Badge } from '@/components/ui/badge';

// Mock data for owner's stores
const mockOwnerStores: StoreType[] = [
  { id: '1', name: 'Coffee Shop Downtown', address: '123 Main St, Downtown', rating: 4.5, totalRatings: 28, ownerId: '3' },
  { id: '5', name: 'Gourmet Grocery', address: '654 Maple Dr, East Side', rating: 4.7, totalRatings: 41, ownerId: '3' },
];

// Mock data for ratings
interface RatingWithUser {
  id: string;
  storeId: string;
  userId: string;
  userName: string;
  rating: number;
  date: string;
}

const mockRatings: RatingWithUser[] = [
  { id: '1', storeId: '1', userId: '2', userName: 'John Doe', rating: 5, date: '2023-07-12' },
  { id: '2', storeId: '1', userId: '4', userName: 'Alice Smith', rating: 4, date: '2023-07-15' },
  { id: '3', storeId: '1', userId: '5', userName: 'Bob Johnson', rating: 5, date: '2023-08-01' },
  { id: '4', storeId: '1', userId: '6', userName: 'Emma Brown', rating: 4, date: '2023-08-05' },
  { id: '5', storeId: '5', userId: '2', userName: 'John Doe', rating: 5, date: '2023-06-20' },
  { id: '6', storeId: '5', userId: '4', userName: 'Alice Smith', rating: 5, date: '2023-07-01' },
  { id: '7', storeId: '5', userId: '5', userName: 'Bob Johnson', rating: 4, date: '2023-07-20' },
  { id: '8', storeId: '5', userId: '7', userName: 'Sarah Wilson', rating: 5, date: '2023-07-25' },
  { id: '9', storeId: '5', userId: '8', userName: 'Michael Lee', rating: 4, date: '2023-08-02' },
];

const StoreOwnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeStore, setActiveStore] = useState<string>(mockOwnerStores[0]?.id || '');
  const [nameSearch, setNameSearch] = useState('');
  const [sortField, setSortField] = useState<'userName' | 'rating' | 'date'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Get the currently active store
  const currentStore = mockOwnerStores.find(store => store.id === activeStore);
  
  // Get ratings for the current store
  const storeRatings = mockRatings.filter(rating => rating.storeId === activeStore);
  
  // Filter ratings by user name
  const filteredRatings = storeRatings.filter(
    rating => rating.userName.toLowerCase().includes(nameSearch.toLowerCase())
  );
  
  // Sort ratings
  const sortedRatings = [...filteredRatings].sort((a, b) => {
    if (sortField === 'userName') {
      return sortDirection === 'asc' 
        ? a.userName.localeCompare(b.userName) 
        : b.userName.localeCompare(a.userName);
    } else if (sortField === 'rating') {
      return sortDirection === 'asc' 
        ? a.rating - b.rating 
        : b.rating - a.rating;
    } else {
      return sortDirection === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime() 
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  // Handle sort toggle
  const handleSort = (field: 'userName' | 'rating' | 'date') => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
  };
  
  // Calculate statistics for the current store
  const averageRating = currentStore?.rating || 0;
  const totalRatings = currentStore?.totalRatings || 0;
  const rating5Star = storeRatings.filter(r => r.rating === 5).length;
  const rating4Star = storeRatings.filter(r => r.rating === 4).length;
  const rating3Star = storeRatings.filter(r => r.rating === 3).length;
  const rating2Star = storeRatings.filter(r => r.rating === 2).length;
  const rating1Star = storeRatings.filter(r => r.rating === 1).length;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Store Owner Dashboard</CardTitle>
          <CardDescription>
            Welcome back, {user?.name}! Here you can manage your stores and view ratings.
          </CardDescription>
        </CardHeader>
      </Card>
      
      {/* Store Selector */}
      <div className="flex overflow-auto pb-2 space-x-2">
        {mockOwnerStores.map((store) => (
          <Button
            key={store.id}
            variant={activeStore === store.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveStore(store.id)}
            className="whitespace-nowrap"
          >
            {store.name}
          </Button>
        ))}
      </div>
      
      {currentStore ? (
        <>
          {/* Store Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-rating" fill="currentColor" />
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
                  <RatingStars rating={averageRating} size={16} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalRatings}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Store Location</CardTitle>
                <Store className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium truncate">{currentStore.address}</div>
              </CardContent>
            </Card>
          </div>
          
          {/* Rating Details */}
          <Tabs defaultValue="reviews" className="space-y-4">
            <TabsList>
              <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
              <TabsTrigger value="analytics">Rating Analytics</TabsTrigger>
            </TabsList>
            
            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>
                    See what customers are saying about your store.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-grow">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="Search by customer name..."
                          className="pl-9"
                          value={nameSearch}
                          onChange={(e) => setNameSearch(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead 
                              className="cursor-pointer" 
                              onClick={() => handleSort('userName')}
                            >
                              Customer Name
                              <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                            </TableHead>
                            <TableHead 
                              className="cursor-pointer" 
                              onClick={() => handleSort('rating')}
                            >
                              Rating
                              <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                            </TableHead>
                            <TableHead 
                              className="cursor-pointer" 
                              onClick={() => handleSort('date')}
                            >
                              Date
                              <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sortedRatings.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={3} className="text-center">
                                No reviews found
                              </TableCell>
                            </TableRow>
                          ) : (
                            sortedRatings.map((rating) => (
                              <TableRow key={rating.id}>
                                <TableCell>{rating.userName}</TableCell>
                                <TableCell>
                                  <RatingStars rating={rating.rating} size={16} />
                                </TableCell>
                                <TableCell>
                                  {new Date(rating.date).toLocaleDateString()}
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Rating Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of ratings by star level.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { stars: 5, count: rating5Star },
                      { stars: 4, count: rating4Star },
                      { stars: 3, count: rating3Star },
                      { stars: 2, count: rating2Star },
                      { stars: 1, count: rating1Star },
                    ].map((item) => {
                      const percentage = totalRatings > 0 
                        ? Math.round((item.count / totalRatings) * 100) 
                        : 0;
                      
                      return (
                        <div key={item.stars} className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 w-24">
                            <span>{item.stars}</span>
                            <Star className="h-4 w-4 text-rating" fill="currentColor" />
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>{item.count}</span>
                            <Badge variant="outline">{percentage}%</Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <Card>
          <CardContent className="py-10">
            <p className="text-center text-muted-foreground">
              No stores found. Please contact an administrator to add your store.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StoreOwnerDashboard;
