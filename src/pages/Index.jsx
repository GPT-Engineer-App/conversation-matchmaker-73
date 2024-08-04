import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserMatchmaker } from '@/integrations/supabase';

const Index = () => {
  const userId = '333e05cd-70b9-4455-b15c-928c890bdd02'; // Marius Wilsch's ID
  const { data: user, isLoading, error } = useUserMatchmaker(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>User not found</div>;
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
        <div className="w-[30%] mr-4">
          <div className="flex flex-col items-center mb-4">
            <Avatar className="w-32 h-32 mb-2">
              <AvatarImage src={user.image_url || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.current_title}</p>
          </div>
          <Card className="mb-4 p-4 shadow-lg transform hover:scale-105 transition-transform duration-300 bg-white rounded-lg">
            <h2 className="font-semibold mb-2">Basic Info</h2>
            <p>Company: {user.company_name || 'Veloxforce'}</p>
            <p>Location: {user.location}</p>
            <p>Industry: {user.industry || 'AI/Software'}</p>
          </Card>
          <Card className="mb-4 p-4 shadow-lg transform hover:scale-105 transition-transform duration-300 bg-white rounded-lg">
            <h2 className="font-semibold mb-2">Contact</h2>
            <p>Email: {user.main_email}</p>
            <p>LinkedIn: <a href={user.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Profile</a></p>
          </Card>
          <Card className="mb-4 p-4 shadow-lg transform hover:scale-105 transition-transform duration-300 bg-white rounded-lg">
            <h2 className="font-semibold mb-2">Company</h2>
            <p>Website: <a href={user.company_website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Veloxforce</a></p>
            <p>LinkedIn: <a href={user.company_linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Company Page</a></p>
          </Card>
          <Button className="w-full">Expand Profile</Button>
        </div>

        {/* Main content area */}
        <div className="w-[70%]">
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
