import { createClient } from "@supabase/supabase-js";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    children
  );
}

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

/* supabase integration types

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

*/

// Matches Matchmaker
export const useMatches = () =>
  useQuery({
    queryKey: ["matches"],
    queryFn: () =>
      fromSupabase(supabase.from("matches_matchmaker").select("*")),
  });

export const useMatch = (matchId) =>
  useQuery({
    queryKey: ["matches", matchId],
    queryFn: () =>
      fromSupabase(
        supabase
          .from("matches_matchmaker")
          .select("*")
          .eq("id", matchId)
          .single()
      ),
  });

export const useAddMatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newMatch) =>
      fromSupabase(supabase.from("matches_matchmaker").insert([newMatch])),
    onSuccess: () => {
      queryClient.invalidateQueries("matches");
    },
  });
};

export const useUpdateMatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ matchId, updates }) =>
      fromSupabase(
        supabase.from("matches_matchmaker").update(updates).eq("id", matchId)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("matches");
    },
  });
};

export const useDeleteMatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (matchId) =>
      fromSupabase(
        supabase.from("matches_matchmaker").delete().eq("id", matchId)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("matches");
    },
  });
};

// Users Matchmakers
export const useUsersMatchmakers = () =>
  useQuery({
    queryKey: ["users_matchmakers"],
    queryFn: () => fromSupabase(supabase.from("users_matchmakers").select("*")),
  });

export const useUserMatchmaker = (userId) =>
  useQuery({
    queryKey: ["users_matchmakers", userId],
    queryFn: () =>
      fromSupabase(
        supabase.from("users_matchmakers").select("*").eq("id", userId).single()
      ),
  });

export const useAddUserMatchmaker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUser) =>
      fromSupabase(supabase.from("users_matchmakers").insert([newUser])),
    onSuccess: () => {
      queryClient.invalidateQueries("users_matchmakers");
    },
  });
};

export const useUpdateUserMatchmaker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, updates }) =>
      fromSupabase(
        supabase.from("users_matchmakers").update(updates).eq("id", userId)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("users_matchmakers");
    },
  });
};

export const useDeleteUserMatchmaker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId) =>
      fromSupabase(
        supabase.from("users_matchmakers").delete().eq("id", userId)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("users_matchmakers");
    },
  });
};

// Additional custom hooks
export const useGetMatchesByUserId = (userId) =>
  useQuery({
    queryKey: ["matches", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("matches_matchmaker")
        .select(
          `
                *,
                matched_user:users_matchmakers!matched_user_id(*)
            `
        )
        .eq("user_id", userId);
      if (error) throw new Error(error.message);
      return data;
    },
  });

export const useMatchedUserDetails = (matchedUserId) =>
  useQuery({
    queryKey: ["matched_user_details", matchedUserId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users_matchmakers")
        .select("*")
        .eq("id", matchedUserId)
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!matchedUserId,
  });
