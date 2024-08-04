import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserMatchmaker, useMatches, useUsersMatchmakers } from '@/integrations/supabase';
import { ChevronDown, ChevronUp, ChevronRight, ChevronLeft } from 'lucide-react';

const Index = () => {
  const userId = '333e05cd-70b9-4455-b15c-928c890bdd02'; // Marius Wilsch's ID
  const { data: user, isLoading: userLoading, error: userError } = useUserMatchmaker(userId);
  const { data: matches, isLoading: matchesLoading, error: matchesError } = useMatches();
  const { data: allUsers, isLoading: allUsersLoading, error: allUsersError } = useUsersMatchmakers();

  if (userLoading || matchesLoading || allUsersLoading) return <div>Loading...</div>;
  if (userError) return <div>Error loading user: {userError.message}</div>;
  if (matchesError) return <div>Error loading matches: {matchesError.message}</div>;
  if (allUsersError) return <div>Error loading all users: {allUsersError.message}</div>;
  if (!user) return <div>User not found</div>;

  const userMatches = matches?.filter(match => match.user_id === userId).map(match => {
    const matchedUser = allUsers?.find(u => u.id === match.matched_user_id);
    return { ...match, matchedUserDetails: matchedUser };
  }) || [];
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <span className="text-xl font-bold text-blue-600">MatchMaker</span>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 p-4">
        {/* Left sidebar - User Profile */}
        <div className="w-[25%] mr-4 space-y-4">
          {/* ProfileHeader */}
          <Card className="p-4 shadow-lg bg-white rounded-lg">
            <div className="flex flex-col items-center">
              <Avatar className="w-32 h-32 mb-2">
                <AvatarImage src={user.image_url || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.current_title}</p>
            </div>
          </Card>
          
          {/* CompanyInfo */}
          <Card className="p-4 shadow-lg bg-white rounded-lg">
            <h3 className="font-bold mb-2">Company Information</h3>
            <p><span className="font-semibold">Company:</span> {user.company_name || 'Veloxforce'}</p>
            <p><span className="font-semibold">Website:</span> <a href={user.company_website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Veloxforce</a></p>
            <p><span className="font-semibold">Company LinkedIn:</span> <a href={user.company_linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Company Page</a></p>
          </Card>
          
          {/* ContactDetails */}
          <Card className="p-4 shadow-lg bg-white rounded-lg">
            <h3 className="font-bold mb-2">Contact Details</h3>
            <p><span className="font-semibold">Main Email:</span> {user.main_email}</p>
            <p><span className="font-semibold">Secondary Email:</span> {user.secondary_email}</p>
            <p><span className="font-semibold">Phone:</span> {user.phone_number}</p>
            <p><span className="font-semibold">Location:</span> {user.location}</p>
            <p><span className="font-semibold">LinkedIn:</span> <a href={user.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Profile</a></p>
          </Card>
          
          {/* SkillsDisplay */}
          <Card className="p-4 shadow-lg bg-white rounded-lg">
            <h3 className="font-bold mb-2">Skills & Expertise</h3>
            <div className="mb-2">
              <h4 className="font-semibold">Key Skills:</h4>
              <ul className="list-disc list-inside">
                {user.skills?.slice(0, 5).map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Areas of Expertise:</h4>
              <ul className="list-disc list-inside">
                {user.areas_of_expertise?.slice(0, 5).map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            </div>
          </Card>
          
          <Button className="w-full">Expand Profile</Button>
        </div>

        {/* Main content area - Matches */}
        <div className="w-[75%]">
          <Tabs defaultValue="list" className="mb-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="tabs">Tabs View</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Match summaries */}
          {userMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
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

const MatchCard = ({ match }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card key={match.id} className="mb-4 overflow-hidden">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-[5%] bg-gray-100 flex flex-col items-center justify-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          ) : (
            <ChevronRight className="h-6 w-6 text-gray-600" />
          )}
        </div>

        {/* Main content */}
        <div className="w-[95%] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="w-16 h-16 mr-4">
                <AvatarImage src={match.matched_user_image || "/placeholder.svg"} alt={match.matched_user_name} />
                <AvatarFallback>{match.matched_user_name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">{match.matched_user_name}</h2>
                <p className="text-sm text-gray-600">{match.matchedUserDetails?.current_title}</p>
                <p className="text-sm text-gray-600">{match.matchedUserDetails?.company_name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{match.matching_score}</p>
              <p className="text-sm text-gray-600">Match Score</p>
              <p className="text-sm text-gray-600">{match.matchedUserDetails?.location}</p>
            </div>
          </div>
          {isExpanded && (
            <div className="mt-4">
              <p className="mb-2 font-semibold">Potential Collaboration</p>
              <p className="mb-4">{match.potential_collaboration}</p>
              <p className="mb-2 font-semibold">Explanation</p>
              <p className="mb-4">{match.explanation}</p>
              <div className="flex justify-end mt-4">
                <Button size="sm" className="mr-2">View Full Profile</Button>
                <Button size="sm" className="mr-2">Connect</Button>
                <Button size="sm" variant="outline" as="a" href={match.matched_user_linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
