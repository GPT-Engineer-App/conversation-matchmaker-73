import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### discovery_meetings

| name              | type                     | format                  | required |
|-------------------|--------------------------|-------------------------|----------|
| meeting_id        | uuid                     | uuid                    | true     |
| profile_id        | uuid                     | uuid                    | true     |
| host_user_id      | uuid                     | uuid                    | true     |
| meeting_title     | text                     | string                  | true     |
| guest_email       | text                     | string                  | true     |
| host_email        | text                     | string                  | true     |
| meeting_timezone  | text                     | string                  | true     |
| event_start_time  | timestamp with time zone | string                  | true     |
| event_end_time    | timestamp with time zone | string                  | true     |
| meeting_url       | text                     | string                  | true     |
| reschedule_url    | text                     | string                  | false    |
| cancel_url        | text                     | string                  | false    |
| meeting_status    | text                     | string                  | false    |
| created_at        | timestamp with time zone | string                  | false    |
| updated_at        | timestamp with time zone | string                  | false    |

### aaa_users

| name                         | type                     | format                  | required |
|------------------------------|--------------------------|-------------------------|----------|
| user_id                      | uuid                     | uuid                    | true     |
| linkedin_url                 | text                     | string                  | false    |
| image_url                    | text                     | string                  | false    |
| name                         | text                     | string                  | true     |
| company_name                 | text                     | string                  | false    |
| company_website              | text                     | string                  | false    |
| company_linkedin             | text                     | string                  | false    |
| job_title                    | text                     | string                  | false    |
| current_title                | text                     | string                  | false    |
| main_email                   | text                     | string                  | false    |
| secondary_email              | text                     | string                  | false    |
| phone_number                 | text                     | string                  | false    |
| location                     | text                     | string                  | false    |
| industry                     | text                     | string                  | false    |
| areas_of_expertise           | text[]                   | array of strings        | false    |
| skills                       | text[]                   | array of strings        | false    |
| key_projects                 | text[]                   | array of strings        | false    |
| ai_technologies_used         | text[]                   | array of strings        | false    |
| business_goals               | text[]                   | array of strings        | false    |
| challenges_faced             | text[]                   | array of strings        | false    |
| interests                    | text[]                   | array of strings        | false    |
| networking_notes             | text                     | string                  | false    |
| partnership_potential        | text                     | string                  | false    |
| aaa_advice                   | text                     | string                  | false    |
| follow_up_actions            | text                     | string                  | false    |
| job_history                  | text[]                   | array of strings        | false    |
| education                    | text[]                   | array of strings        | false    |
| ai_solution_offerings        | text                     | string                  | false    |
| target_market                | text                     | string                  | false    |
| revenue_model                | text                     | string                  | false    |
| team_size                    | text                     | string                  | false    |
| funding_status               | text                     | string                  | false    |
| tech_stack                   | text[]                   | array of strings        | false    |
| data_privacy_approach        | text                     | string                  | false    |
| scalability_strategy         | text                     | string                  | false    |
| competitive_advantage        | text                     | string                  | false    |
| potential_collaboration_areas| text[]                   | array of strings        | false    |
| next_milestones              | text                     | string                  | false    |
| personal_motivation          | text                     | string                  | false    |
| networking_preferences       | text                     | string                  | false    |
| content_creation             | text                     | string                  | false    |
| community_involvement        | text                     | string                  | false    |
| mentoring_interests          | text                     | string                  | false    |
| skills_to_acquire            | text[]                   | array of strings        | false    |
| resources_needed             | text                     | string                  | false    |
| success_metrics              | text                     | string                  | false    |
| long_term_vision             | text                     | string                  | false    |
| experienced_roadblocks       | text                     | string                  | false    |
| best_practices               | text                     | string                  | false    |
| career_stage                 | text                     | string                  | false    |
| preferred_communication      | text                     | string                  | false    |
| additional_data              | jsonb                    | json                    | false    |
| created_at                   | timestamp with time zone | string                  | false    |
| updated_at                   | timestamp with time zone | string                  | false    |

### user_matches

| name                        | type                     | format                  | required |
|-----------------------------|--------------------------|-------------------------|----------|
| match_id                    | uuid                     | uuid                    | true     |
| profile_id                  | uuid                     | uuid                    | true     |
| matched_profile_id          | uuid                     | uuid                    | true     |
| matching_score              | numeric                  | number                  | false    |
| explanation                 | text                     | string                  | false    |
| complementary_skills        | text[]                   | array of strings        | false    |
| potential_collaboration     | text                     | string                  | false    |
| shared_interests            | text[]                   | array of strings        | false    |
| geographical_synergy        | text                     | string                  | false    |
| experience_level            | text                     | string                  | false    |
| communication_compatibility | text                     | string                  | false    |
| created_at                  | timestamp with time zone | string                  | false    |
| updated_at                  | timestamp with time zone | string                  | false    |

### matchmaker_profiles

| name                     | type                     | format                  | required |
|--------------------------|--------------------------|-------------------------|----------|
| profile_id               | uuid                     | uuid                    | true     |
| user_id                  | uuid                     | uuid                    | true     |
| name                     | text                     | string                  | true     |
| image_url                | text                     | string                  | false    |
| key_skills               | text[]                   | array of strings        | false    |
| industry                 | text                     | string                  | false    |
| business_goals           | text[]                   | array of strings        | false    |
| interests                | text[]                   | array of strings        | false    |
| location                 | text                     | string                  | false    |
| hobbies                  | text[]                   | array of strings        | false    |
| career_stage             | text                     | string                  | false    |
| preferred_communication  | text                     | string                  | false    |
| created_at               | timestamp with time zone | string                  | false    |
| updated_at               | timestamp with time zone | string                  | false    |

*/

// Discovery Meetings
export const useDiscoveryMeetings = () => useQuery({
    queryKey: ['discovery_meetings'],
    queryFn: () => fromSupabase(supabase.from('discovery_meetings').select('*'))
});

export const useDiscoveryMeeting = (meetingId) => useQuery({
    queryKey: ['discovery_meetings', meetingId],
    queryFn: () => fromSupabase(supabase.from('discovery_meetings').select('*').eq('meeting_id', meetingId).single())
});

export const useAddDiscoveryMeeting = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMeeting) => fromSupabase(supabase.from('discovery_meetings').insert([newMeeting])),
        onSuccess: () => {
            queryClient.invalidateQueries('discovery_meetings');
        },
    });
};

export const useUpdateDiscoveryMeeting = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ meetingId, updates }) => fromSupabase(supabase.from('discovery_meetings').update(updates).eq('meeting_id', meetingId)),
        onSuccess: () => {
            queryClient.invalidateQueries('discovery_meetings');
        },
    });
};

export const useDeleteDiscoveryMeeting = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (meetingId) => fromSupabase(supabase.from('discovery_meetings').delete().eq('meeting_id', meetingId)),
        onSuccess: () => {
            queryClient.invalidateQueries('discovery_meetings');
        },
    });
};

// AAA Users
export const useUserMatchmaker = (userId) => useQuery({
    queryKey: ['user_matchmaker', userId],
    queryFn: () => fromSupabase(supabase.from('aaa_users').select('*').eq('user_id', userId).single())
});

export const useAAAUsers = () => useQuery({
    queryKey: ['aaa_users'],
    queryFn: () => fromSupabase(supabase.from('aaa_users').select('*'))
});

export const useAAAUser = (userId) => useQuery({
    queryKey: ['aaa_users', userId],
    queryFn: () => fromSupabase(supabase.from('aaa_users').select('*').eq('user_id', userId).single())
});

export const useAddAAAUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('aaa_users').insert([newUser])),
        onSuccess: () => {
            queryClient.invalidateQueries('aaa_users');
        },
    });
};

export const useUpdateAAAUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, updates }) => fromSupabase(supabase.from('aaa_users').update(updates).eq('user_id', userId)),
        onSuccess: () => {
            queryClient.invalidateQueries('aaa_users');
        },
    });
};

export const useDeleteAAAUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId) => fromSupabase(supabase.from('aaa_users').delete().eq('user_id', userId)),
        onSuccess: () => {
            queryClient.invalidateQueries('aaa_users');
        },
    });
};

// User Matches
export const useUserMatches = () => useQuery({
    queryKey: ['user_matches'],
    queryFn: () => fromSupabase(supabase.from('user_matches').select('*'))
});

export const useUserMatch = (matchId) => useQuery({
    queryKey: ['user_matches', matchId],
    queryFn: () => fromSupabase(supabase.from('user_matches').select('*').eq('match_id', matchId).single())
});

export const useAddUserMatch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMatch) => fromSupabase(supabase.from('user_matches').insert([newMatch])),
        onSuccess: () => {
            queryClient.invalidateQueries('user_matches');
        },
    });
};

export const useUpdateUserMatch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ matchId, updates }) => fromSupabase(supabase.from('user_matches').update(updates).eq('match_id', matchId)),
        onSuccess: () => {
            queryClient.invalidateQueries('user_matches');
        },
    });
};

export const useDeleteUserMatch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (matchId) => fromSupabase(supabase.from('user_matches').delete().eq('match_id', matchId)),
        onSuccess: () => {
            queryClient.invalidateQueries('user_matches');
        },
    });
};

// Matchmaker Profiles
export const useMatchmakerProfiles = () => useQuery({
    queryKey: ['matchmaker_profiles'],
    queryFn: () => fromSupabase(supabase.from('matchmaker_profiles').select('*'))
});

export const useMatchmakerProfile = (profileId) => useQuery({
    queryKey: ['matchmaker_profiles', profileId],
    queryFn: () => fromSupabase(supabase.from('matchmaker_profiles').select('*').eq('profile_id', profileId).single())
});

export const useAddMatchmakerProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProfile) => fromSupabase(supabase.from('matchmaker_profiles').insert([newProfile])),
        onSuccess: () => {
            queryClient.invalidateQueries('matchmaker_profiles');
        },
    });
};

export const useUpdateMatchmakerProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ profileId, updates }) => fromSupabase(supabase.from('matchmaker_profiles').update(updates).eq('profile_id', profileId)),
        onSuccess: () => {
            queryClient.invalidateQueries('matchmaker_profiles');
        },
    });
};

export const useDeleteMatchmakerProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (profileId) => fromSupabase(supabase.from('matchmaker_profiles').delete().eq('profile_id', profileId)),
        onSuccess: () => {
            queryClient.invalidateQueries('matchmaker_profiles');
        },
    });
};
