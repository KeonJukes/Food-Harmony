import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { Restaurant } from './LocationFinder';
import { Star, MapPin, Phone, Globe, Utensils } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RestaurantListProps {
  restaurants: Restaurant[];
}

export function RestaurantList({ restaurants }: RestaurantListProps) {
  const getPriceLevelDisplay = (level: number) => {
    return '$'.repeat(level) + '·'.repeat(4 - level);
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

  return (
    <div className="space-y-4">
      {restaurants.map((restaurant) => (
        <Card key={restaurant.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="md:flex">
              {/* Restaurant Image */}
              <div className="md:w-1/3">
                <ImageWithFallback
                  src={restaurant.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'}
                  alt={restaurant.name}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>

              {/* Restaurant Details */}
              <div className="md:w-2/3 p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{restaurant.rating}</span>
                      </div>
                      <span>{getPriceLevelDisplay(restaurant.priceLevel)}</span>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{restaurant.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{restaurant.address}</p>

                {/* Cuisine Types */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {restaurant.cuisine.map((type, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>

                {/* Matching Items */}
                {restaurant.matchingItems.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-green-700 mb-1">
                      <Utensils className="h-4 w-4 inline mr-1" />
                      Matches your preferences:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {restaurant.matchingItems.map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-800">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dietary Accommodations */}
                {restaurant.accommodatesRestrictions.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-blue-700 mb-1">
                      ✓ Accommodates:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {restaurant.accommodatesRestrictions.map((restriction, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-blue-300 text-blue-700">
                          {restriction}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleDirections(restaurant)}
                    className="flex items-center space-x-1"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Directions</span>
                  </Button>

                  {restaurant.phone && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCall(restaurant.phone!)}
                      className="flex items-center space-x-1"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Call</span>
                    </Button>
                  )}

                  {restaurant.website && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleWebsite(restaurant.website!)}
                      className="flex items-center space-x-1"
                    >
                      <Globe className="h-4 w-4" />
                      <span>Website</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}