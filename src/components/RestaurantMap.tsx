import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { Restaurant } from './LocationFinder';
import { MapPin, Star, Phone, Globe, Navigation } from 'lucide-react';

interface RestaurantMapProps {
  restaurants: Restaurant[];
  userLocation: {lat: number, lng: number} | null;
}

export function RestaurantMap({ restaurants, userLocation }: RestaurantMapProps) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  // For demo purposes, we'll create a visual map using CSS
  // In a real app, you'd integrate with Google Maps, Mapbox, or similar
  const mapStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='%23e5e7eb' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`,
    backgroundColor: '#f9fafb'
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleWebsite = (website: string) => {
    const url = website.startsWith('http') ? website : `https://${website}`;
    window.open(url, '_blank');
  };

  const handleDirections = (restaurant: Restaurant) => {
    const address = encodeURIComponent(restaurant.address);
    window.open(`https://maps.google.com?q=${address}`, '_blank');
  };

  const getPriceLevelDisplay = (level: number) => {
    return '$'.repeat(level) + '·'.repeat(4 - level);
  };

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: '400px' }}>
        <div 
          className="w-full h-full relative"
          style={mapStyle}
        >
          {/* User Location Marker */}
          {userLocation && (
            <div 
              className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: '50%',
                top: '50%'
              }}
            >
              <div className="relative">
                <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                <div className="absolute inset-0 w-4 h-4 bg-blue-600 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
          )}

          {/* Restaurant Markers */}
          {restaurants.map((restaurant, index) => {
            // Position markers around the user location for demo
            const positions = [
              { left: '40%', top: '30%' },
              { left: '60%', top: '40%' },
              { left: '35%', top: '60%' },
              { left: '65%', top: '25%' },
              { left: '45%', top: '70%' }
            ];
            const position = positions[index % positions.length];

            return (
              <div
                key={restaurant.id}
                className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={position}
                onClick={() => setSelectedRestaurant(restaurant)}
              >
                <div className={`relative ${selectedRestaurant?.id === restaurant.id ? 'scale-110' : ''} transition-transform`}>
                  <div className="w-8 h-8 bg-red-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-white fill-white" />
                  </div>
                  {/* Restaurant label */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap">
                    {restaurant.name}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Map Legend */}
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 text-sm">
            <h4 className="font-medium mb-2">Legend</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-xs">Your Location</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="text-xs">Restaurants</span>
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <Button size="sm" variant="outline" className="bg-white">+</Button>
            <Button size="sm" variant="outline" className="bg-white">-</Button>
          </div>
        </div>
      </div>

      {/* Selected Restaurant Details */}
      {selectedRestaurant && (
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold">{selectedRestaurant.name}</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{selectedRestaurant.rating}</span>
                  </div>
                  <span>{getPriceLevelDisplay(selectedRestaurant.priceLevel)}</span>
                  <span>{selectedRestaurant.distance}</span>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedRestaurant(null)}
              >
                ×
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-3">{selectedRestaurant.address}</p>

            {/* Cuisine Types */}
            <div className="flex flex-wrap gap-1 mb-3">
              {selectedRestaurant.cuisine.map((type, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {type}
                </Badge>
              ))}
            </div>

            {/* Matching Items */}
            {selectedRestaurant.matchingItems.length > 0 && (
              <div className="mb-3">
                <p className="text-sm font-medium text-green-700 mb-1">Matches your preferences:</p>
                <div className="flex flex-wrap gap-1">
                  {selectedRestaurant.matchingItems.map((item, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-800">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={() => handleDirections(selectedRestaurant)}
                className="flex items-center space-x-1"
              >
                <Navigation className="h-4 w-4" />
                <span>Directions</span>
              </Button>

              {selectedRestaurant.phone && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCall(selectedRestaurant.phone!)}
                  className="flex items-center space-x-1"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call</span>
                </Button>
              )}

              {selectedRestaurant.website && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleWebsite(selectedRestaurant.website!)}
                  className="flex items-center space-x-1"
                >
                  <Globe className="h-4 w-4" />
                  <span>Website</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Restaurant List for Quick Access */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-medium mb-3">Quick Access</h4>
          <div className="space-y-2">
            {restaurants.map((restaurant) => (
              <button
                key={restaurant.id}
                onClick={() => setSelectedRestaurant(restaurant)}
                className={`w-full text-left p-2 rounded-lg border transition-colors ${
                  selectedRestaurant?.id === restaurant.id
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{restaurant.name}</p>
                    <p className="text-xs text-muted-foreground">{restaurant.distance}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{restaurant.rating}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}