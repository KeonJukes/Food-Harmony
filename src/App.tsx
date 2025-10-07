import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { ProfileDashboard } from './components/ProfileDashboard';
import { LocationFinder } from './components/LocationFinder';
import { Utensils, MapPin } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 rounded-lg p-2">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl text-gray-900">Food Harmony</h1>
                <p className="text-sm text-gray-500">Your personalized food companion</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <Utensils className="h-4 w-4" />
              <span>My Profile</span>
            </TabsTrigger>
            <TabsTrigger value="discover" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Discover Places</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileDashboard />
          </TabsContent>

          <TabsContent value="discover">
            <LocationFinder />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}