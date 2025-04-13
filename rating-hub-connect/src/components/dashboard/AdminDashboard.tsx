
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Store, UserPlus, Users, Search, Star, ArrowUpDown } from 'lucide-react';
import { Store as StoreType } from '@/components/stores/StoreCard';
import { User, UserRole } from '@/context/AuthContext';
import { toast } from 'sonner';

// Mock data for stores
const mockStores: StoreType[] = [
  { id: '1', name: 'Coffee Shop Downtown', address: '123 Main St, Downtown', rating: 4.5, totalRatings: 28, ownerId: '3' },
  { id: '2', name: 'Bookstore Haven', address: '456 Oak Ave, Midtown', rating: 4.8, totalRatings: 52, ownerId: '4' },
  { id: '3', name: 'Tech Gadgets', address: '789 Pine Rd, Uptown', rating: 4.2, totalRatings: 35, ownerId: '5' },
  { id: '4', name: 'Fashion Boutique', address: '321 Elm St, West End', rating: 3.9, totalRatings: 19, ownerId: '6' },
  { id: '5', name: 'Gourmet Grocery', address: '654 Maple Dr, East Side', rating: 4.7, totalRatings: 41, ownerId: '3' },
];

// Mock data for users
const mockUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  { id: '2', name: 'Normal User', email: 'user@example.com', role: 'user' },
  { id: '3', name: 'Store Owner', email: 'store@example.com', role: 'store-owner' },
  { id: '4', name: 'John Doe', email: 'john@example.com', role: 'user' },
  { id: '5', name: 'Jane Smith', email: 'jane@example.com', role: 'store-owner' },
  { id: '6', name: 'Alex Johnson', email: 'alex@example.com', role: 'store-owner' },
];

const AdminDashboard: React.FC = () => {
  // State for new store form
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreAddress, setNewStoreAddress] = useState('');
  const [newStoreOwner, setNewStoreOwner] = useState('');
  const [isStoreDialogOpen, setIsStoreDialogOpen] = useState(false);
  
  // State for new user form
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('user');
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  
  // State for search and filtering
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [storeSearchTerm, setStoreSearchTerm] = useState('');
  const [userSortField, setUserSortField] = useState<'name' | 'email' | 'role'>('name');
  const [userSortDirection, setUserSortDirection] = useState<'asc' | 'desc'>('asc');
  const [storeSortField, setStoreSortField] = useState<'name' | 'address' | 'rating'>('name');
  const [storeSortDirection, setStoreSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Filtered and sorted users
  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
  );
  
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (userSortField === 'name') {
      return userSortDirection === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (userSortField === 'email') {
      return userSortDirection === 'asc' 
        ? a.email.localeCompare(b.email) 
        : b.email.localeCompare(a.email);
    } else {
      return userSortDirection === 'asc'
        ? a.role!.localeCompare(b.role!) 
        : b.role!.localeCompare(a.role!);
    }
  });
  
  // Filtered and sorted stores
  const filteredStores = mockStores.filter(
    (store) =>
      store.name.toLowerCase().includes(storeSearchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(storeSearchTerm.toLowerCase())
  );
  
  const sortedStores = [...filteredStores].sort((a, b) => {
    if (storeSortField === 'name') {
      return storeSortDirection === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (storeSortField === 'address') {
      return storeSortDirection === 'asc' 
        ? a.address.localeCompare(b.address) 
        : b.address.localeCompare(a.address);
    } else {
      return storeSortDirection === 'asc' 
        ? a.rating - b.rating 
        : b.rating - a.rating;
    }
  });
  
  // Sort handlers
  const handleUserSort = (field: 'name' | 'email' | 'role') => {
    const newDirection = userSortField === field && userSortDirection === 'asc' ? 'desc' : 'asc';
    setUserSortField(field);
    setUserSortDirection(newDirection);
  };
  
  const handleStoreSort = (field: 'name' | 'address' | 'rating') => {
    const newDirection = storeSortField === field && storeSortDirection === 'asc' ? 'desc' : 'asc';
    setStoreSortField(field);
    setStoreSortDirection(newDirection);
  };
  
  // Form submission handlers
  const handleAddStore = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newStoreName || !newStoreAddress || !newStoreOwner) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (newStoreName.length < 2 || newStoreName.length > 60) {
      toast.error('Store name must be between 2 and 60 characters');
      return;
    }
    
    if (newStoreAddress.length > 400) {
      toast.error('Address cannot exceed 400 characters');
      return;
    }
    
    // In a real app, this would be an API call
    toast.success(`Store "${newStoreName}" added successfully`);
    
    // Reset form
    setNewStoreName('');
    setNewStoreAddress('');
    setNewStoreOwner('');
    setIsStoreDialogOpen(false);
  };
  
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUserName || !newUserEmail || !newUserRole) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (newUserName.length < 2 || newUserName.length > 60) {
      toast.error('Name must be between 2 and 60 characters');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUserEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // In a real app, this would be an API call
    toast.success(`User "${newUserName}" added successfully`);
    
    // Reset form
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('user');
    setIsUserDialogOpen(false);
  };

  const storeOwners = mockUsers.filter((user) => user.role === 'store-owner');
  
  // Calculate stats for overview
  const totalUsers = mockUsers.length;
  const totalStores = mockStores.length;
  const totalRatings = mockStores.reduce((acc, store) => acc + store.totalRatings, 0);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStores}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ratings</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRatings}</div>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users Management</TabsTrigger>
          <TabsTrigger value="stores">Stores Management</TabsTrigger>
        </TabsList>
        
        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Manage Users</CardTitle>
                <CardDescription>Add, edit, or remove users from the system.</CardDescription>
              </div>
              <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Create a new user account in the system.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddUser} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="User's full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="user@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select 
                        value={newUserRole || undefined} 
                        onValueChange={(value: UserRole) => setNewUserRole(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="store-owner">Store Owner</SelectItem>
                          <SelectItem value="user">Normal User</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add User</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex-grow">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search by name or email..."
                      className="pl-9"
                      value={userSearchTerm}
                      onChange={(e) => setUserSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="cursor-pointer" onClick={() => handleUserSort('name')}>
                          Name
                          <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleUserSort('email')}>
                          Email
                          <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleUserSort('role')}>
                          Role
                          <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedUsers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">
                            No users found
                          </TableCell>
                        </TableRow>
                      ) : (
                        sortedUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <span className="capitalize">{user.role}</span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
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
        
        {/* Stores Tab */}
        <TabsContent value="stores">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Manage Stores</CardTitle>
                <CardDescription>Add, edit, or remove stores from the system.</CardDescription>
              </div>
              <Dialog open={isStoreDialogOpen} onOpenChange={setIsStoreDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Store className="h-4 w-4 mr-2" />
                    Add Store
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Store</DialogTitle>
                    <DialogDescription>
                      Create a new store in the system.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddStore} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Store Name</Label>
                      <Input
                        id="storeName"
                        value={newStoreName}
                        onChange={(e) => setNewStoreName(e.target.value)}
                        placeholder="Enter store name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeAddress">Address</Label>
                      <Input
                        id="storeAddress"
                        value={newStoreAddress}
                        onChange={(e) => setNewStoreAddress(e.target.value)}
                        placeholder="Enter store address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeOwner">Store Owner</Label>
                      <Select 
                        value={newStoreOwner} 
                        onValueChange={setNewStoreOwner}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select owner" />
                        </SelectTrigger>
                        <SelectContent>
                          {storeOwners.map((owner) => (
                            <SelectItem key={owner.id} value={owner.id}>
                              {owner.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Store</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex-grow">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search by name or address..."
                      className="pl-9"
                      value={storeSearchTerm}
                      onChange={(e) => setStoreSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="cursor-pointer" onClick={() => handleStoreSort('name')}>
                          Name
                          <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleStoreSort('address')}>
                          Address
                          <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleStoreSort('rating')}>
                          Rating
                          <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                        </TableHead>
                        <TableHead>Reviews</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedStores.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center">
                            No stores found
                          </TableCell>
                        </TableRow>
                      ) : (
                        sortedStores.map((store) => (
                          <TableRow key={store.id}>
                            <TableCell>{store.name}</TableCell>
                            <TableCell className="max-w-xs truncate">{store.address}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {store.rating.toFixed(1)}
                                <Star className="h-4 w-4 ml-1 text-rating" fill="currentColor" />
                              </div>
                            </TableCell>
                            <TableCell>{store.totalRatings}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
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
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
