import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RestaurantList } from './RestaurantList';
import { RestaurantMap } from './RestaurantMap';
import { Search, MapPin, List, Loader2 } from 'lucide-react';

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  priceLevel: number;
  cuisine: string[];
  phone?: string;
  website?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  matchingItems: string[];
  accommodatesRestrictions: string[];
  imageUrl?: string;
}

export function LocationFinder() {
  const [location, setLocation] = useState('');
  const [searchRadius, setSearchRadius] = useState('5');
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Mock restaurant data for demo
  const mockRestaurants: Restaurant[] = [
    {
      id: '1',
      name: 'Green Garden Bistro',
      address: '123 Main St, Downtown',
      distance: '0.8 mi',
      rating: 4.6,
      priceLevel: 2,
      cuisine: ['Healthy', 'Mediterranean', 'Vegetarian'],
      phone: '(555) 123-4567',
      website: 'greengardenbistro.com',
      coordinates: { lat: 40.7589, lng: -73.9851 },
      matchingItems: ['Salmon', 'Quinoa', 'Green Tea'],
      accommodatesRestrictions: ['Gluten-Free Options', 'Allergy-Friendly'],
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      name: 'Ocean Harvest',
      address: '456 Harbor Ave, Waterfront',
      distance: '1.2 mi',
      rating: 4.4,
      priceLevel: 3,
      cuisine: ['Seafood', 'Contemporary'],
      phone: '(555) 987-6543',
      website: 'oceanharvest.com',
      coordinates: { lat: 40.7614, lng: -73.9776 },
      matchingItems: ['Salmon', 'Dark Chocolate'],
      accommodatesRestrictions: ['Shellfish-Free Options'],
      imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      name: 'The Wholesome Table',
      address: '789 Oak Street, Midtown',
      distance: '2.1 mi',
      rating: 4.7,
      priceLevel: 2,
      cuisine: ['Organic', 'Farm-to-Table', 'Gluten-Free'],
      phone: '(555) 456-7890',
      coordinates: { lat: 40.7505, lng: -73.9934 },
      matchingItems: ['Quinoa', 'Fresh Berries', 'Kombucha'],
      accommodatesRestrictions: ['Gluten-Free', 'Allergy-Friendly', 'Dietary Preferences'],
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop'
    },
    {
      id: '4',
      name: 'Zen Tea House',
      address: '321 Peaceful Way, Garden District',
      distance: '1.8 mi',
      rating: 4.3,
      priceLevel: 1,
      cuisine: ['Tea House', 'Light Meals', 'Asian Fusion'],
      phone: '(555) 234-5678',
      coordinates: { lat: 40.7411, lng: -73.9897 },
      matchingItems: ['Green Tea', 'Dark Chocolate'],
      accommodatesRestrictions: ['Dietary Preferences'],
      imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop'
    },
    {
      id: '5',
      name: 'Berry Bliss Cafe',
      address: '654 Sweet Street, Arts Quarter',
      distance: '2.5 mi',
      rating: 4.5,
      priceLevel: 2,
      cuisine: ['Cafe', 'Desserts', 'Brunch'],
      phone: '(555) 345-6789',
      coordinates: { lat: 40.7282, lng: -73.9942 },
      matchingItems: ['Fresh Berries', 'Dark Chocolate', 'Kombucha'],
      accommodatesRestrictions: ['Gluten-Free Options'],
      imageUrl: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop'
    }
  ];

  const getCurrentLocation = () => {
    setLoading(true);
    setLocationError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(coords);
          setLocation(`${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`);
          setLocationError(null);
          // In a real app, you'd reverse geocode this to get a readable address
          setLoading(false);
        },
        (error) => {
          let errorMessage = 'Unable to detect location';
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied. Please enable location services and try again.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
            default:
              errorMessage = 'Unable to detect your location.';
              break;
          }
          
          setLocationError(errorMessage);
          setLoading(false);
          // Use default location for demo
          setLocation('New York, NY');
          setUserLocation({ lat: 40.7589, lng: -73.9851 });
        }
      );
    } else {
      setLocationError('Geolocation not supported by this browser.');
      setLoading(false);
      setLocation('New York, NY');
      setUserLocation({ lat: 40.7589, lng: -73.9851 });
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, this would make an API call to find restaurants
      // based on user's food preferences, location, and restrictions
      setRestaurants(mockRestaurants);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    // Auto-load with current location on component mount
    getCurrentLocation();
  }, []);

  return (
    <div className="space-y-6">
      {/* Search Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Find Restaurants</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex space-x-2 mt-1">
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter city, address, or zip code"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={getCurrentLocation}
                  disabled={loading}
                  className="px-3"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              {locationError && (
                <p className="text-sm text-amber-600 mt-2 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{locationError} Using New York, NY as default.</span>
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="radius">Search Radius</Label>
              <select
                id="radius"
                value={searchRadius}
                onChange={(e) => setSearchRadius(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">1 mile</option>
                <option value="3">3 miles</option>
                <option value="5">5 miles</option>
                <option value="10">10 miles</option>
                <option value="25">25 miles</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-muted-foreground">
              We'll find restaurants that match your food preferences and accommodate your dietary restrictions.
            </p>
            <Button 
              onClick={handleSearch} 
              disabled={loading || !location.trim()}
              className="flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {restaurants.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Found {restaurants.length} Restaurants</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list" className="flex items-center space-x-2">
                  <List className="h-4 w-4" />
                  <span>List View</span>
                </TabsTrigger>
                <TabsTrigger value="map" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Map View</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="mt-6">
                <RestaurantList restaurants={restaurants} />
              </TabsContent>

              <TabsContent value="map" className="mt-6">
                <RestaurantMap 
                  restaurants={restaurants} 
                  userLocation={userLocation}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}