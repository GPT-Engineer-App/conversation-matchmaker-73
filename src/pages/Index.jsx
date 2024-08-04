import React, { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserMatchmaker, useMatches, useUsersMatchmakers } from '@/integrations/supabase';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const Index = () => {
  const userId = '333e05cd-70b9-4455-b15c-928c890bdd02'; // Marius Wilsch's ID
  const { data: user, isLoading: userLoading, error: userError } = useUserMatchmaker(userId);
  const { data: matches, isLoading: matchesLoading, error: matchesError } = useMatches();
  const { data: allUsers, isLoading: allUsersLoading, error: allUsersError } = useUsersMatchmakers();
  const [expandedMatchId, setExpandedMatchId] = useState(null);

  useEffect(() => {
    if (matches && matches.length > 0 && !expandedMatchId) {
      setExpandedMatchId(matches[0].id);
    }
  }, [matches, expandedMatchId]);

  if (userLoading || matchesLoading || allUsersLoading) return <div>Loading...</div>;
  if (userError) return <div>Error loading user: {userError.message}</div>;
  if (matchesError) return <div>Error loading matches: {matchesError.message}</div>;
  if (allUsersError) return <div>Error loading all users: {allUsersError.message}</div>;
  if (!user) return <div>User not found</div>;

  const userMatches = matches?.filter(match => match.user_id === userId).map(match => {
    const matchedUser = allUsers?.find(u => u.id === match.matched_user_id);
    return { ...match, matchedUserDetails: matchedUser };
  }) || [];

  const handleExpand = (matchId) => {
    setExpandedMatchId(matchId === expandedMatchId ? null : matchId);
  };
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
        <div className="w-full space-y-4">
          {/* User Profile Card */}
          <Card 
            className="p-4 shadow-lg bg-white rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            onClick={() => setExpandedMatchId(expandedMatchId ? null : 'profile')}
          >
            <div className="flex items-center">
              <Avatar className="w-24 h-24 mr-4">
                <AvatarImage src={user.image_url || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.current_title}</p>
                <p className="text-sm text-gray-600">{user.company_name || 'Veloxforce'}</p>
              </div>
            </div>
            {expandedMatchId === 'profile' && (
              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-semibold">Location</p>
                  <p>{user.location || 'Munich, Bavaria, Germany'}</p>
                </div>
                <div>
                  <p className="font-semibold">Industry</p>
                  <p>{user.industry || 'AI/Software'}</p>
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p>{user.main_email}</p>
                </div>
                <div>
                  <p className="font-semibold">LinkedIn</p>
                  <a href={user.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Profile</a>
                </div>
                <div>
                  <p className="font-semibold">Website</p>
                  <a href={user.company_website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Veloxforce</a>
                </div>
                <div>
                  <p className="font-semibold">Company LinkedIn</p>
                  <a href={user.company_linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Company Page</a>
                </div>
              </div>
            )}
          </Card>

          {/* Matches */}
          <Tabs defaultValue="list" className="mb-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="tabs">Tabs View</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Match summaries */}
          {userMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              isExpanded={match.id === expandedMatchId}
              onExpand={() => handleExpand(match.id)}
            />
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

const MatchCard = ({ match, isExpanded, onExpand }) => {
  return (
    <Card 
      key={match.id} 
      className="mb-4 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={onExpand}
    >
      <div className="p-4">
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
          <div 
            className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
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
        </div>
      </div>
    </Card>
  );
};
