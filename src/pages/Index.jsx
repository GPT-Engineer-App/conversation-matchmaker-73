import React, { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Maximize2 } from 'lucide-react';
import { useUserMatchmaker, useGetMatchesByUserId, useMatchedUserDetails, useMatchesSubscription } from '@/integrations/supabase';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const [expandedMatchId, setExpandedMatchId] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const userId = '333e05cd-70b9-4455-b15c-928c890bdd02'; // Default to Marius Wilsch's ID
  const { data: user, isLoading: userLoading, error: userError } = useUserMatchmaker(userId);
  const { data: matches, isLoading: matchesLoading, error: matchesError } = useGetMatchesByUserId(userId);

  // Subscribe to matches updates
  useMatchesSubscription();

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
    if (userMatches.length > 0 && !expandedMatchId) {
      setExpandedMatchId(userMatches[0].id);
    }
  }, [userMatches, expandedMatchId]);

  useEffect(() => {
    if (!userLoading && !matchesLoading) {
      setTimeout(() => setIsFirstLoad(false), 1000); // Delay to ensure animations are visible
    }
  }, [userLoading, matchesLoading]);

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
          <span className="text-xl font-bold text-blue-700">MatchMaker</span>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 p-4">
        {/* Left sidebar - User Profile */}
        <motion.div 
          className="w-[30%] mr-4 space-y-4"
          initial={isFirstLoad ? { x: -300, opacity: 0 } : false}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {userLoading ? (
            <div>Loading user profile...</div>
          ) : userError ? (
            <div>Error loading user: {userError.message}</div>
          ) : user ? (
            <>
              <Card className="p-4 shadow-lg bg-white rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105 border border-gray-200 hover:border-gray-300 relative">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 hover:bg-gray-100">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-11/12 max-w-4xl h-[90vh] max-h-[90vh]">
                    <ScrollArea className="h-full pr-4">
                      <div className="p-6">
                        <ExpandedProfileContent user={user} />
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
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
              
              <Card className="p-4 shadow-lg bg-white rounded-lg space-y-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105 border border-gray-200 hover:border-gray-300">
                <div>
                  <p className="font-semibold">Email</p>
                  <p>{user.main_email}</p>
                </div>
                <div>
                  <p className="font-semibold">LinkedIn</p>
                  <a href={user.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Profile</a>
                </div>
              </Card>
              
              <Card className="p-4 shadow-lg bg-white rounded-lg space-y-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105 border border-gray-200 hover:border-gray-300">
                <div>
                  <p className="font-semibold">Website</p>
                  <a href={user.company_website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Veloxforce</a>
                </div>
                <div>
                  <p className="font-semibold">Company LinkedIn</p>
                  <a href={user.company_linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Company Page</a>
                </div>
              </Card>
            </>
          ) : (
            <div>User not found</div>
          )}
        </motion.div>

        {/* Main content area - Matches */}
        <motion.div 
          className="w-[70%]"
          initial={isFirstLoad ? { x: 300, opacity: 0 } : false}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          {matches && matches.length > 0 ? matches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={isFirstLoad ? { y: 50, opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <MatchCard
                match={match}
                isExpanded={match.id === expandedMatchId}
                onExpand={() => handleExpand(match.id)}
              />
            </motion.div>
          )) : (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600">No matches found for this user.</p>
            </div>
          )}
        </motion.div>
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

const MatchCardSkeleton = () => (
  <Card className="mb-4 overflow-hidden border border-gray-200">
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Skeleton className="w-16 h-16 rounded-full mr-4" />
          <div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28 mt-1" />
          </div>
        </div>
        <div className="text-right">
          <Skeleton className="h-8 w-16 mb-1" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24 mt-1" />
        </div>
      </div>
      <div className="mt-4">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  </Card>
);

export default Index;


const FullProfileContent = ({ match, matchedUserDetails }) => {
  const sharedInterests = [
    { label: 'Shared Interests', value: match.shared_interests },
    { label: 'Geographical Synergy', value: match.geographical_synergy },
    { label: 'Experience Level', value: match.experience_level },
    { label: 'Communication Compatibility', value: match.communication_compatibility },
  ];

  const additionalInfo = [
    { label: 'Partnership Potential', value: matchedUserDetails?.partnership_potential },
    { label: 'Networking Preferences', value: matchedUserDetails?.networking_preferences },
    { label: 'Industry', value: matchedUserDetails?.industry },
    { label: 'Funding Status', value: matchedUserDetails?.funding_status },
    { label: 'Team Size', value: matchedUserDetails?.team_size },
    { label: 'Revenue Model', value: matchedUserDetails?.revenue_model },
    { label: 'Target Market', value: matchedUserDetails?.target_market },
    { label: 'Tech Stack', value: matchedUserDetails?.tech_stack },
    { label: 'Data Privacy Approach', value: matchedUserDetails?.data_privacy_approach },
    { label: 'Scalability Strategy', value: matchedUserDetails?.scalability_strategy },
    { label: 'Competitive Advantage', value: matchedUserDetails?.competitive_advantage },
    { label: 'Next Milestones', value: matchedUserDetails?.next_milestones },
    { label: 'Personal Motivation', value: matchedUserDetails?.personal_motivation },
    { label: 'Content Creation', value: matchedUserDetails?.content_creation },
    { label: 'Community Involvement', value: matchedUserDetails?.community_involvement },
    { label: 'Mentoring Interests', value: matchedUserDetails?.mentoring_interests },
    { label: 'Skills to Acquire', value: matchedUserDetails?.skills_to_acquire },
    { label: 'Resources Needed', value: matchedUserDetails?.resources_needed },
    { label: 'Success Metrics', value: matchedUserDetails?.success_metrics },
    { label: 'Long Term Vision', value: matchedUserDetails?.long_term_vision },
    { label: 'Best Practices', value: matchedUserDetails?.best_practices },
  ];

  const renderInfoBox = (title, items) => (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 w-full">
      <h3 className="text-xl font-semibold mb-4 text-blue-700">{title}</h3>
      {items.map(({ label, value }) => {
        if (value && (!Array.isArray(value) || value.length > 0)) {
          return (
            <div key={label} className="mb-3">
              <div className="font-medium">{label}</div>
              <div className="bg-gray-100 rounded-md p-2 mt-1">
                {Array.isArray(value) ? value.join(', ') : value}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">{matchedUserDetails?.name}'s Profile</h2>
      {renderInfoBox('Shared Interests', sharedInterests)}
      {renderInfoBox('Additional Information', additionalInfo)}
    </div>
  );
};

const MatchCard = ({ match, isExpanded, onExpand }) => {
  const [isContentVisible, setIsContentVisible] = React.useState(isExpanded);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const { data: matchedUserDetails, isLoading: isLoadingDetails } = useMatchedUserDetails(match.matched_user_id);

  React.useEffect(() => {
    let timeoutId;
    if (isExpanded) {
      setIsContentVisible(true);
    } else {
      timeoutId = setTimeout(() => setIsContentVisible(false), 300); // Match the transition duration
    }
    return () => clearTimeout(timeoutId);
  }, [isExpanded]);

  React.useEffect(() => {
    if (isLoadingDetails) {
      setIsUpdating(true);
    } else {
      // Simulate a short delay to show the skeleton
      const timer = setTimeout(() => setIsUpdating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoadingDetails]);

  if (isUpdating) {
    return <MatchCardSkeleton />;
  }

  const handleCardClick = (e) => {
    // Prevent the click event from propagating to parent elements
    e.stopPropagation();
    onExpand();
  };

  return (
    <Card key={match.id} className="mb-4 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-102 border border-gray-200 hover:border-gray-300" onClick={handleCardClick}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="w-16 h-16 mr-4">
              <AvatarImage src={matchedUserDetails?.image_url || "/placeholder.svg"} alt={matchedUserDetails?.name} />
              <AvatarFallback>{matchedUserDetails?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{matchedUserDetails?.name}</h2>
              <p className="text-sm text-gray-600">{matchedUserDetails?.current_title}</p>
              <p className="text-sm text-gray-600">{matchedUserDetails?.company_name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-700">{match.matching_score}</p>
            <p className="text-sm text-gray-600">Match Score</p>
            <p className="text-sm text-gray-600">{matchedUserDetails?.location}</p>
          </div>
        </div>
        <div 
          className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {isContentVisible && (
            <>
              {match.potential_collaboration && (
                <>
                  <p className="mb-2 font-semibold">Potential Collaboration</p>
                  <p className="mb-4">{match.potential_collaboration}</p>
                </>
              )}
              {match.explanation && (
                <>
                  <p className="mb-2 font-semibold">Explanation</p>
                  <p className="mb-4">{match.explanation}</p>
                </>
              )}
              {matchedUserDetails?.industry && (
                <>
                  <p className="mb-2 font-semibold">Industry</p>
                  <p className="mb-4">{matchedUserDetails.industry}</p>
                </>
              )}
              {matchedUserDetails?.areas_of_expertise?.length > 0 && (
                <>
                  <p className="mb-2 font-semibold">Areas of Expertise</p>
                  <p className="mb-4">{matchedUserDetails.areas_of_expertise.join(', ')}</p>
                </>
              )}
              {matchedUserDetails?.ai_technologies_used?.length > 0 && (
                <>
                  <p className="mb-2 font-semibold">AI Technologies Used</p>
                  <p className="mb-4">{matchedUserDetails.ai_technologies_used.join(', ')}</p>
                </>
              )}
              <div className="mt-4">
                <hr className="border-t-2 border-gray-300 mb-4" />
                <div className="flex justify-start space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-blue-950 text-white hover:bg-blue-900" onClick={(e) => e.stopPropagation()}>View Full Profile</Button>
                    </DialogTrigger>
                    <DialogContent className="w-11/12 max-w-4xl h-[90vh] max-h-[90vh]">
                      <ScrollArea className="h-full pr-4">
                        <div className="p-6">
                          <FullProfileContent match={match} matchedUserDetails={matchedUserDetails} />
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" className="bg-blue-950 text-white hover:bg-blue-900" onClick={(e) => e.stopPropagation()}>Connect</Button>
                  <Button size="sm" variant="outline" className="border-blue-950 text-blue-950 hover:bg-blue-100" as="a" href={matchedUserDetails?.linkedin_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>LinkedIn Profile</Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

const ExpandedProfileContent = ({ user }) => {
  const additionalInfo = [
    { label: 'Areas of Expertise', value: user.areas_of_expertise },
    { label: 'Skills', value: user.skills },
    { label: 'Key Projects', value: user.key_projects },
    { label: 'AI Technologies Used', value: user.ai_technologies_used },
    { label: 'Business Goals', value: user.business_goals },
    { label: 'Challenges Faced', value: user.challenges_faced },
    { label: 'Interests', value: user.interests },
    { label: 'Networking Notes', value: user.networking_notes },
    { label: 'Partnership Potential', value: user.partnership_potential },
    { label: 'AAA Advice', value: user.aaa_advice },
    { label: 'Follow-up Actions', value: user.follow_up_actions },
    { label: 'Job History', value: user.job_history },
    { label: 'Education', value: user.education },
    { label: 'AI Solution Offerings', value: user.ai_solution_offerings },
    { label: 'Target Market', value: user.target_market },
    { label: 'Revenue Model', value: user.revenue_model },
    { label: 'Team Size', value: user.team_size },
    { label: 'Funding Status', value: user.funding_status },
    { label: 'Tech Stack', value: user.tech_stack },
    { label: 'Data Privacy Approach', value: user.data_privacy_approach },
    { label: 'Scalability Strategy', value: user.scalability_strategy },
    { label: 'Competitive Advantage', value: user.competitive_advantage },
    { label: 'Potential Collaboration Areas', value: user.potential_collaboration_areas },
    { label: 'Next Milestones', value: user.next_milestones },
    { label: 'Personal Motivation', value: user.personal_motivation },
    { label: 'Networking Preferences', value: user.networking_preferences },
    { label: 'Content Creation', value: user.content_creation },
    { label: 'Community Involvement', value: user.community_involvement },
    { label: 'Mentoring Interests', value: user.mentoring_interests },
    { label: 'Skills to Acquire', value: user.skills_to_acquire },
    { label: 'Resources Needed', value: user.resources_needed },
    { label: 'Success Metrics', value: user.success_metrics },
    { label: 'Long Term Vision', value: user.long_term_vision },
    { label: 'Best Practices', value: user.best_practices },
    { label: 'Career Stage', value: user.career_stage },
    { label: 'Preferred Communication', value: user.preferred_communication },
  ];

  const renderInfoBox = (title, items) => (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 w-full">
      <h3 className="text-xl font-semibold mb-4 text-blue-700">{title}</h3>
      {items.map(({ label, value }) => {
        if (value && (!Array.isArray(value) || value.length > 0)) {
          return (
            <div key={label} className="mb-3">
              <div className="font-medium">{label}</div>
              <div className="bg-gray-100 rounded-md p-2 mt-1">
                {Array.isArray(value) ? value.join(', ') : value}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">{user.name}'s Expanded Profile</h2>
      {renderInfoBox('Additional Information', additionalInfo)}
    </div>
  );
};
