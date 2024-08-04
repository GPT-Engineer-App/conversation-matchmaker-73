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

### threads

| name                       | type                     | format                  | required |
|----------------------------|--------------------------|-------------------------|----------|
| thread_id                  | text                     | string                  | true     |
| created_at                 | timestamp with time zone | string                  | false    |
| name                       | text                     | string                  | false    |
| user_id                    | uuid                     | string                  | false    |
| status                     | text                     | string                  | false    |
| meeting_booked             | boolean                  | boolean                 | false    |
| meeting_date               | timestamp with time zone | string                  | false    |
| user_feedback              | text                     | string                  | false    |
| conversation               | jsonb                    | object                  | false    |
| costs                      | double precision         | number                  | false    |
| time_spent_in_conversation | double precision         | number                  | false    |

### matches_matchmaker

| name                         | type     | format | required |
|------------------------------|----------|--------|----------|
| id                           | uuid     | string | true     |
| user_id                      | uuid     | string | false    |
| matched_user_id              | uuid     | string | false    |
| matching_score               | numeric  | number | false    |
| explanation                  | text     | string | false    |
| complementary_skills         | text[]   | array  | false    |
| potential_collaboration      | text     | string | false    |
| shared_interests             | text[]   | array  | false    |
| geographical_synergy         | text     | string | false    |
| experience_level             | text     | string | false    |
| communication_compatibility  | text     | string | false    |

### filters

| name                     | type                     | format  | required |
|--------------------------|--------------------------|---------|----------|
| filter_id                | uuid                     | string  | true     |
| name                     | text                     | string  | false    |
| created_at               | timestamp with time zone | string  | false    |
| user_id                  | uuid                     | string  | false    |
| thread_id                | text                     | string  | false    |
| budget_from              | integer                  | number  | false    |
| budget_to                | integer                  | number  | false    |
| commercial_type          | text                     | string  | false    |
| property_type            | text                     | string  | false    |
| size_from                | integer                  | number  | false    |
| size_to                  | integer                  | number  | false    |
| bedrooms_from            | integer                  | number  | false    |
| bedrooms_to              | integer                  | number  | false    |
| bathrooms_from           | integer                  | number  | false    |
| bathrooms_to             | integer                  | number  | false    |
| floor_from               | integer                  | number  | false    |
| floor_to                 | integer                  | number  | false    |
| total_floors             | integer                  | number  | false    |
| balcony_size_from        | integer                  | number  | false    |
| balcony_size_to          | integer                  | number  | false    |
| furnishing               | text                     | string  | false    |
| parking                  | boolean                  | boolean | false    |
| year_of_completion_from  | integer                  | number  | false    |
| year_of_completion_to    | integer                  | number  | false    |
| location                 | text                     | string  | false    |
| amenities                | text[]                   | array   | false    |
| other_wishes             | text[]                   | array   | false    |

### users_matchmakers

| name                          | type   | format | required |
|-------------------------------|--------|--------|----------|
| id                            | uuid   | string | true     |
| linkedin_url                  | text   | string | false    |
| image_url                     | text   | string | false    |
| name                          | text   | string | false    |
| company_name                  | text   | string | false    |
| company_website               | text   | string | false    |
| company_linkedin              | text   | string | false    |
| job_title                     | text   | string | false    |
| current_title                 | text   | string | false    |
| main_email                    | text   | string | false    |
| secondary_email               | text   | string | false    |
| phone_number                  | text   | string | false    |
| location                      | text   | string | false    |
| industry                      | text   | string | false    |
| areas_of_expertise            | text[] | array  | false    |
| skills                        | text[] | array  | false    |
| key_projects                  | text[] | array  | false    |
| ai_technologies_used          | text[] | array  | false    |
| business_goals                | text[] | array  | false    |
| challenges_faced              | text[] | array  | false    |
| interests                     | text[] | array  | false    |
| networking_notes              | text   | string | false    |
| partnership_potential         | text   | string | false    |
| aaa_advice                    | text   | string | false    |
| follow_up_actions             | text   | string | false    |
| job_history                   | text[] | array  | false    |
| education                     | text[] | array  | false    |
| ai_solution_offerings         | text   | string | false    |
| target_market                 | text   | string | false    |
| revenue_model                 | text   | string | false    |
| team_size                     | text   | string | false    |
| funding_status                | text   | string | false    |
| tech_stack                    | text[] | array  | false    |
| data_privacy_approach         | text   | string | false    |
| scalability_strategy          | text   | string | false    |
| competitive_advantage         | text   | string | false    |
| potential_collaboration_areas | text[] | array  | false    |
| next_milestones               | text   | string | false    |
| personal_motivation           | text   | string | false    |
| networking_preferences        | text   | string | false    |
| content_creation              | text   | string | false    |
| community_involvement         | text   | string | false    |
| mentoring_interests           | text   | string | false    |
| skills_to_acquire             | text[] | array  | false    |
| resources_needed              | text   | string | false    |
| success_metrics               | text   | string | false    |
| long_term_vision              | text   | string | false    |
| best_practices                | text   | string | false    |
| career_stage                  | text   | string | false    |
| preferred_communication       | text   | string | false    |

### users

| name                        | type                     | format  | required |
|-----------------------------|--------------------------|---------|----------|
| user_id                     | uuid                     | string  | true     |
| created_at                  | timestamp with time zone | string  | false    |
| name                        | text                     | string  | false    |
| login                       | text                     | string  | false    |
| phone_number                | text                     | string  | false    |
| email                       | text                     | string  | false    |
| social_media                | text                     | string  | false    |
| social_media_name           | text                     | string  | false    |
| communication_channel       | text                     | string  | false    |
| communication_channel_name  | text                     | string  | false    |
| last_contacted              | timestamp with time zone | string  | false    |
| campain_id                  | smallint                 | number  | false    |

*/

// Threads
export const useThreads = () => useQuery({
    queryKey: ['threads'],
    queryFn: () => fromSupabase(supabase.from('threads').select('*'))
});

export const useThread = (threadId) => useQuery({
    queryKey: ['threads', threadId],
    queryFn: () => fromSupabase(supabase.from('threads').select('*').eq('thread_id', threadId).single())
});

export const useAddThread = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newThread) => fromSupabase(supabase.from('threads').insert([newThread])),
        onSuccess: () => {
            queryClient.invalidateQueries('threads');
        },
    });
};

export const useUpdateThread = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ threadId, updates }) => fromSupabase(supabase.from('threads').update(updates).eq('thread_id', threadId)),
        onSuccess: () => {
            queryClient.invalidateQueries('threads');
        },
    });
};

export const useDeleteThread = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (threadId) => fromSupabase(supabase.from('threads').delete().eq('thread_id', threadId)),
        onSuccess: () => {
            queryClient.invalidateQueries('threads');
        },
    });
};

// Matches Matchmaker
export const useMatches = () => useQuery({
    queryKey: ['matches'],
    queryFn: () => fromSupabase(supabase.from('matches_matchmaker').select('*'))
});

export const useMatch = (matchId) => useQuery({
    queryKey: ['matches', matchId],
    queryFn: () => fromSupabase(supabase.from('matches_matchmaker').select('*').eq('id', matchId).single())
});

export const useAddMatch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMatch) => fromSupabase(supabase.from('matches_matchmaker').insert([newMatch])),
        onSuccess: () => {
            queryClient.invalidateQueries('matches');
        },
    });
};

export const useUpdateMatch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ matchId, updates }) => fromSupabase(supabase.from('matches_matchmaker').update(updates).eq('id', matchId)),
        onSuccess: () => {
            queryClient.invalidateQueries('matches');
        },
    });
};

export const useDeleteMatch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (matchId) => fromSupabase(supabase.from('matches_matchmaker').delete().eq('id', matchId)),
        onSuccess: () => {
            queryClient.invalidateQueries('matches');
        },
    });
};

// Filters
export const useFilters = () => useQuery({
    queryKey: ['filters'],
    queryFn: () => fromSupabase(supabase.from('filters').select('*'))
});

export const useFilter = (filterId) => useQuery({
    queryKey: ['filters', filterId],
    queryFn: () => fromSupabase(supabase.from('filters').select('*').eq('filter_id', filterId).single())
});

export const useAddFilter = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFilter) => fromSupabase(supabase.from('filters').insert([newFilter])),
        onSuccess: () => {
            queryClient.invalidateQueries('filters');
        },
    });
};

export const useUpdateFilter = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ filterId, updates }) => fromSupabase(supabase.from('filters').update(updates).eq('filter_id', filterId)),
        onSuccess: () => {
            queryClient.invalidateQueries('filters');
        },
    });
};

export const useDeleteFilter = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (filterId) => fromSupabase(supabase.from('filters').delete().eq('filter_id', filterId)),
        onSuccess: () => {
            queryClient.invalidateQueries('filters');
        },
    });
};

// Users Matchmakers
export const useUsersMatchmakers = () => useQuery({
    queryKey: ['users_matchmakers'],
    queryFn: () => fromSupabase(supabase.from('users_matchmakers').select('*'))
});

export const useUserMatchmaker = (userId) => useQuery({
    queryKey: ['users_matchmakers', userId],
    queryFn: () => fromSupabase(supabase.from('users_matchmakers').select('*').eq('id', userId).single())
});

export const useAddUserMatchmaker = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('users_matchmakers').insert([newUser])),
        onSuccess: () => {
            queryClient.invalidateQueries('users_matchmakers');
        },
    });
};

export const useUpdateUserMatchmaker = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, updates }) => fromSupabase(supabase.from('users_matchmakers').update(updates).eq('id', userId)),
        onSuccess: () => {
            queryClient.invalidateQueries('users_matchmakers');
        },
    });
};

export const useDeleteUserMatchmaker = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId) => fromSupabase(supabase.from('users_matchmakers').delete().eq('id', userId)),
        onSuccess: () => {
            queryClient.invalidateQueries('users_matchmakers');
        },
    });
};

// Users
export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => fromSupabase(supabase.from('users').select('*'))
});

export const useUser = (userId) => useQuery({
    queryKey: ['users', userId],
    queryFn: () => fromSupabase(supabase.from('users').select('*').eq('user_id', userId).single())
});

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('users').insert([newUser])),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, updates }) => fromSupabase(supabase.from('users').update(updates).eq('user_id', userId)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId) => fromSupabase(supabase.from('users').delete().eq('user_id', userId)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

// Additional custom hooks
export const useGetMatchesByUserId = (userId) => useQuery({
    queryKey: ['matches', userId],
    queryFn: () => fromSupabase(supabase.from('matches_matchmaker').select('*').eq('user_id', userId))
});