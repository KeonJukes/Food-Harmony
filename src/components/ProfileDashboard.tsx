import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { CategoryManager } from './CategoryManager';
import { RestrictionsManager } from './RestrictionsManager';
import { Badge } from './ui/badge';
import { Utensils, Coffee, Cookie, AlertTriangle } from 'lucide-react';

export interface FoodItem {
  id: string;
  name: string;
  tags: string[];
  notes?: string;
  preparationStyle?: string;
}

export interface Restriction {
  id: string;
  name: string;
  type: 'allergy' | 'dietary' | 'preference';
  severity?: 'mild' | 'moderate' | 'severe';
}

export function ProfileDashboard() {
  const [foods, setFoods] = useState<FoodItem[]>([
    { id: '1', name: 'Salmon', tags: ['protein', 'omega-3'], notes: 'Prefer grilled', preparationStyle: 'grilled' },
    { id: '2', name: 'Quinoa', tags: ['grain', 'protein', 'gluten-free'], notes: 'Great for salads' }
  ]);

  const [drinks, setDrinks] = useState<FoodItem[]>([
    { id: '1', name: 'Green Tea', tags: ['antioxidants', 'caffeine'], notes: 'Jasmine preferred' },
    { id: '2', name: 'Kombucha', tags: ['probiotic', 'fermented'], notes: 'Ginger flavor' }
  ]);

  const [desserts, setDesserts] = useState<FoodItem[]>([
    { id: '1', name: 'Dark Chocolate', tags: ['antioxidants', 'mood'], notes: '70% cacao minimum' },
    { id: '2', name: 'Fresh Berries', tags: ['antioxidants', 'vitamins'], notes: 'Seasonal varieties' }
  ]);

  const [restrictions, setRestrictions] = useState<Restriction[]>([
    { id: '1', name: 'Shellfish', type: 'allergy', severity: 'severe' },
    { id: '2', name: 'Gluten', type: 'dietary', severity: 'moderate' },
    { id: '3', name: 'Very Spicy Food', type: 'preference', severity: 'mild' }
  ]);

  const totalItems = foods.length + drinks.length + desserts.length;

  return (
    <div className="space-y-8">
      {/* Profile Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Foods</CardTitle>
            <Utensils className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{foods.length}</div>
            <p className="text-xs text-muted-foreground">favorite foods</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Drinks</CardTitle>
            <Coffee className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{drinks.length}</div>
            <p className="text-xs text-muted-foreground">preferred drinks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Desserts</CardTitle>
            <Cookie className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{desserts.length}</div>
            <p className="text-xs text-muted-foreground">sweet treats</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Restrictions</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{restrictions.length}</div>
            <p className="text-xs text-muted-foreground">dietary needs</p>
          </CardContent>
        </Card>
      </div>

      {/* Your Harmony Plate */}
      <Card>
        <CardHeader>
          <CardTitle>Your Harmony Plate</CardTitle>
          <CardDescription>
            A quick overview of your favorite items and dietary preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm mb-2 text-muted-foreground">Top Foods</h4>
              <div className="flex flex-wrap gap-2">
                {foods.slice(0, 6).map((food) => (
                  <Badge key={food.id} variant="secondary" className="bg-green-100 text-green-800">
                    {food.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm mb-2 text-muted-foreground">Dietary Restrictions</h4>
              <div className="flex flex-wrap gap-2">
                {restrictions.map((restriction) => (
                  <Badge 
                    key={restriction.id} 
                    variant="outline"
                    className={`${
                      restriction.severity === 'severe' ? 'border-red-300 text-red-700' :
                      restriction.severity === 'moderate' ? 'border-orange-300 text-orange-700' :
                      'border-yellow-300 text-yellow-700'
                    }`}
                  >
                    {restriction.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Food Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <CategoryManager
            title="Foods"
            icon={<Utensils className="h-5 w-5" />}
            items={foods}
            onItemsChange={setFoods}
            placeholder="Add a favorite food..."
          />

          <CategoryManager
            title="Drinks"
            icon={<Coffee className="h-5 w-5" />}
            items={drinks}
            onItemsChange={setDrinks}
            placeholder="Add a favorite drink..."
          />
        </div>

        <div className="space-y-6">
          <CategoryManager
            title="Desserts"
            icon={<Cookie className="h-5 w-5" />}
            items={desserts}
            onItemsChange={setDesserts}
            placeholder="Add a favorite dessert..."
          />

          <RestrictionsManager
            restrictions={restrictions}
            onRestrictionsChange={setRestrictions}
          />
        </div>
      </div>
    </div>
  );
}