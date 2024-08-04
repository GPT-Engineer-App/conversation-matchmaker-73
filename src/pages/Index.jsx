import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
          <span className="text-lg font-semibold">Logo here</span>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 p-4">
        {/* Left sidebar */}
        <div className="w-1/4 mr-4">
          <div className="flex flex-col items-center mb-4">
            <Avatar className="w-32 h-32 mb-2">
              <AvatarImage src="/placeholder.svg" alt="Avatar" />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
          </div>
          <Card className="mb-4 p-4">
            <h2 className="font-semibold mb-2">Basic Info</h2>
            <p>User's basic information goes here</p>
          </Card>
          <Card className="mb-4 p-4">
            <h2 className="font-semibold mb-2">Key Skills</h2>
            <p>User's key skills go here</p>
          </Card>
          <Card className="mb-4 p-4">
            <h2 className="font-semibold mb-2">Goals</h2>
            <p>User's goals go here</p>
          </Card>
          <Button className="w-full">Expand Profile</Button>
        </div>

        {/* Main content area */}
        <div className="flex-1">
          <Tabs defaultValue="list" className="mb-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="tabs">Tabs View</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Match summaries */}
          {[1, 2, 3].map((match) => (
            <Card key={match} className="mb-4 p-4">
              <h2 className="text-lg font-semibold mb-2">Match {match} Summary</h2>
              <div className="flex justify-between items-center mb-2">
                <div className="bg-gray-200 flex-grow h-8 mr-2"></div>
                <Button size="sm" className="mr-2">Connect</Button>
                <Button size="sm" variant="outline">More...</Button>
              </div>
              <div className="bg-gray-100 h-24"></div>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white p-4 shadow-sm">
        <div className="text-center text-sm text-gray-600">
          DataSyncIndicator
        </div>
      </footer>
    </div>
  );
};

export default Index;
