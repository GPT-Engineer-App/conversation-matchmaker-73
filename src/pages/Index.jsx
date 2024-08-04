import React, { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserMatchmaker, useGetMatchesByUserId } from '@/integrations/supabase';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [userId, setUserId] = useState('333e05cd-70b9-4455-b15c-928c890bdd02'); // Default to Marius Wilsch's ID
  const [expandedMatchId, setExpandedMatchId] = useState(null);

  const { data: user, isLoading: userLoading, error: userError } = useUserMatchmaker(userId);
  const { data: matches, isLoading: matchesLoading, error: matchesError } = useGetMatchesByUserId(userId);

  const userMatches = React.useMemo(() => {
    if (matches) {
      return matches.map(match => ({
        ...match,
        matchedUserDetails: match.matched_user,
        matched_user_name: match.matched_user?.name,
        matched_user_image: match.matched_user?.image_url
      }));
    }
    return [];
  }, [matches]);

  useEffect(() => {
    if (matches && matches.length > 0 && !expandedMatchId) {
      setExpandedMatchId(matches[0].id);
    }
  }, [matches, expandedMatchId]);

  const handleExpand = (matchId) => {
    setExpandedMatchId(matchId === expandedMatchId ? null : matchId);
  };

  if (userLoading || matchesLoading) return <div>Loading...</div>;
  if (userError) return <div>Error loading user: {userError.message}</div>;
  if (matchesError) return <div>Error loading matches: {matchesError.message}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">MatchMaker</span>
          <Input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-64"
          />
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 p-4">
        {/* Left sidebar - User Profile */}
        <div className="w-[30%] mr-4 space-y-4">
          {userLoading ? (
            <div>Loading user profile...</div>
          ) : userError ? (
            <div>Error loading user: {userError.message}</div>
          ) : user ? (
            <>
              <Card className="p-4 shadow-lg bg-white rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105 border border-gray-200 hover:border-gray-300">
                <div className="flex flex-col items-center">
                  <Avatar className="w-24 h-24 mb-2">
                    <AvatarImage src={user.image_url || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-sm text-gray-600 text-center mt-2">{user.current_title}</p>
                </div>
              </Card>
              
              <Card className="p-4 shadow-lg bg-white rounded-lg space-y-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105 border border-gray-200 hover:border-gray-300">
                <div>
                  <p className="font-semibold">Company</p>
                  <p>{user.company_name || 'Veloxforce'}</p>
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p>{user.location || 'Munich, Bavaria, Germany'}</p>
                </div>
                <div>
                  <p className="font-semibold">Industry</p>
                  <p>{user.industry || 'AI/Software'}</p>
                </div>
              </Card>
              
              <Card className="p-4 shadow-lg bg-white rounded-lg space-y-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div>
                  <p className="font-semibold">Email</p>
                  <p>{user.main_email}</p>
                </div>
                <div>
                  <p className="font-semibold">LinkedIn</p>
                  <a href={user.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Profile</a>
                </div>
              </Card>
              
              <Card className="p-4 shadow-lg bg-white rounded-lg space-y-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div>
                  <p className="font-semibold">Website</p>
                  <a href={user.company_website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Veloxforce</a>
                </div>
                <div>
                  <p className="font-semibold">Company LinkedIn</p>
                  <a href={user.company_linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Company Page</a>
                </div>
              </Card>
              
              <Button className="w-full bg-indigo-900 text-white hover:bg-indigo-800">Expand Profile</Button>
            </>
          ) : (
            <div>User not found</div>
          )}
        </div>

        {/* Main content area - Matches */}
        <div className="w-[70%]">
          <Tabs defaultValue="list" className="mb-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="tabs">Tabs View</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Match summaries */}
          {matches && matches.length > 0 ? matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              isExpanded={match.id === expandedMatchId}
              onExpand={() => handleExpand(match.id)}
            />
          )) : (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600">No matches found for this user.</p>
            </div>
          )}
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

const FullProfileContent = ({ match }) => {
  const sharedInterests = [
    { label: 'Shared Interests', value: match.shared_interests },
    { label: 'Geographical Synergy', value: match.geographical_synergy },
    { label: 'Experience Level', value: match.experience_level },
    { label: 'Communication Compatibility', value: match.communication_compatibility },
  ];

  const additionalInfo = [
    { label: 'Partnership Potential', value: match.matchedUserDetails?.partnership_potential },
    { label: 'Networking Preferences', value: match.matchedUserDetails?.networking_preferences },
    { label: 'Industry', value: match.matchedUserDetails?.industry },
    { label: 'Funding Status', value: match.matchedUserDetails?.funding_status },
    { label: 'Team Size', value: match.matchedUserDetails?.team_size },
    { label: 'Revenue Model', value: match.matchedUserDetails?.revenue_model },
    { label: 'Target Market', value: match.matchedUserDetails?.target_market },
    { label: 'Tech Stack', value: match.matchedUserDetails?.tech_stack },
    { label: 'Data Privacy Approach', value: match.matchedUserDetails?.data_privacy_approach },
    { label: 'Scalability Strategy', value: match.matchedUserDetails?.scalability_strategy },
    { label: 'Competitive Advantage', value: match.matchedUserDetails?.competitive_advantage },
    { label: 'Next Milestones', value: match.matchedUserDetails?.next_milestones },
    { label: 'Personal Motivation', value: match.matchedUserDetails?.personal_motivation },
    { label: 'Content Creation', value: match.matchedUserDetails?.content_creation },
    { label: 'Community Involvement', value: match.matchedUserDetails?.community_involvement },
    { label: 'Mentoring Interests', value: match.matchedUserDetails?.mentoring_interests },
    { label: 'Skills to Acquire', value: match.matchedUserDetails?.skills_to_acquire },
    { label: 'Resources Needed', value: match.matchedUserDetails?.resources_needed },
    { label: 'Success Metrics', value: match.matchedUserDetails?.success_metrics },
    { label: 'Long Term Vision', value: match.matchedUserDetails?.long_term_vision },
    { label: 'Experienced Roadblocks', value: match.matchedUserDetails?.experienced_roadblocks },
    { label: 'Best Practices', value: match.matchedUserDetails?.best_practices },
  ];

  const renderInfoBox = (title, items) => (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 w-full">
      <h3 className="text-xl font-semibold mb-4 text-blue-600">{title}</h3>
      {items.map(({ label, value }) => 
        value && (
          <div key={label} className="mb-3">
            <div className="font-medium">{label}</div>
            <div className="bg-gray-100 rounded-md p-2 mt-1">
              {Array.isArray(value) ? value.join(', ') : value}
            </div>
          </div>
        )
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">{match.matched_user_name}'s Profile</h2>
      {renderInfoBox('Shared Interests', sharedInterests)}
      {renderInfoBox('Additional Information', additionalInfo)}
    </div>
  );
};

const MatchCard = ({ match, isExpanded, onExpand }) => {
  const [isContentVisible, setIsContentVisible] = React.useState(isExpanded);

  React.useEffect(() => {
    let timeoutId;
    if (isExpanded) {
      setIsContentVisible(true);
    } else {
      timeoutId = setTimeout(() => setIsContentVisible(false), 300); // Match the transition duration
    }
    return () => clearTimeout(timeoutId);
  }, [isExpanded]);

  return (
    <Card key={match.id} className="mb-4 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-102 border border-gray-200 hover:border-gray-300" onClick={onExpand}>
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
          {isContentVisible && (
            <>
              <p className="mb-2 font-semibold">Potential Collaboration</p>
              <p className="mb-4">{match.potential_collaboration}</p>
              <p className="mb-2 font-semibold">Explanation</p>
              <p className="mb-4">{match.explanation}</p>
              <div className="flex justify-end mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="mr-2">View Full Profile</Button>
                  </DialogTrigger>
                  <DialogContent className="w-11/12 max-w-4xl h-[90vh] max-h-[90vh]">
                    <ScrollArea className="h-full pr-4">
                      <div className="p-6">
                        <FullProfileContent match={match} />
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
                <Button size="sm" className="mr-2">Connect</Button>
                <Button size="sm" variant="outline" as="a" href={match.matched_user_linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};
