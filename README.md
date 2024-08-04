# Welcome to your GPT Engineer project

## Project info

**Project**: conversation-matchmaker 

**URL**: https://run.gptengineer.app/projects/REPLACE_WITH_PROJECT_ID/improve

**Description**: I'm building a tool with this ocre functionality. Use this as inspriation when desiging the tool.

"""
# AAA Matchmaker Dashboard: Core Functionality and Features

## Core Functionality

The AAA Matchmaker Dashboard aims to transform meetings between AAA community members into valuable insights, focusing on finding matches between members based on AI-analyzed conversations. The core functionality can be summarized as follows:

### Primary Problem Solved

- Identify potential collaborations between AAA members based on AI-analyzed meeting insights
- Make it clear which members should connect and why, based on mutual benefits

### Main Purpose

To provide recommendations on who to connect with and why, leveraging AI-analyzed conversations to uncover opportunities that might otherwise go unnoticed.

### Primary Users and Their Needs

- AAA community members who consent to participate
- Critical need: Discover valuable connections within the community
- Foster a flywheel effect where increased participation leads to more insights and better matches

### Key Tasks for Users

1. Review and refine AI's understanding of the user
    - Confirm or update information derived from past conversations
    - Ensure accurate representation for better matching
2. Explore AI-generated match recommendations
    - Understand the rationale behind suggested collaborations
    - Identify mutually beneficial opportunities

### Essential Features for Minimal Version

- Display AI's understanding of the user
- Show AI's analysis of mutually beneficial matches
- Provide real-time updates as new insights are gained

### Success Measurement

- Accuracy of AI's understanding of users
- Relevance of match recommendations
- User feedback on matches and AI understanding
- User engagement with the feedback system
"""

For additional understanding here's a high level overview of what I'm trying to achieve.

"""
# AAA Matchmaker Dashboard: High-Level Components

## Frontend Components

### User Profile Display
- ProfileHeader (name, image_url, job_title)
- CompanyInfo (company_name, company_website, company_linkedin)
- ContactDetails (main_email, secondary_email, phone_number, location)
- SkillsDisplay (skills, areas_of_expertise)
- ProjectsDisplay (key_projects, ai_technologies_used)
- GoalsAndInterests (business_goals, interests)
- CareerInfo (job_history, education)
- AdditionalInfo (partnership_potential, networking_preferences, industry, funding_status, team_size, revenue_model, target_market, tech_stack, data_privacy_approach, scalability_strategy, competitive_advantage, next_milestones, personal_motivation, content_creation, community_involvement, mentoring_interests, skills_to_acquire, resources_needed, success_metrics, long_term_vision, experienced_roadblocks, best_practices)

### Match Recommendations
- MatchList (list of matched_user_id from matches table)
- MatchCard (matched_user_id to fetch user details, matching_score)
- MatchScore (matching_score)
- MatchExplanation (explanation)
- CollaborationPotential (potential_collaboration, complementary_skills)
- SharedInterests (shared_interests, geographical_synergy, experience_level, communication_compatibility)

### Real-time Updates
- UpdateNotification (notification for new data in users or matches table)
- DataSyncIndicator (shows sync status of users and matches data)

## High-Level Components

### User Profile Display
- Profile UI Components
- Data Fetching from Supabase (single API call to users table)
- Profile Data Formatting and Parsing
- Error Handling for Failed Requests

### Match Recommendations
- Match List UI Components
- Match Data Fetching from Supabase (API calls to matches and users tables)
- Match Sorting and Filtering (client-side)
- Match Detail Display

### Real-time Updates
- Supabase Real-time Subscription Setup (for users and matches tables)
- Update Notification UI
- Client-side Data Sync Management
- UI Update Triggers

### Shared Components
- Supabase Client Configuration
- Authentication Integration (if required)
- Loading States and Spinners
- Error Boundary and Error Messages
- Responsive Layout Components

## Notes on Implementation
- Utilize Supabase's real-time features for live updates
- Implement efficient data fetching strategies (e.g., pagination for MatchList)
- Consider lazy loading for detailed user information in MatchCard
- Ensure responsive design for various screen sizes
- Implement proper error handling and loading states for smooth user experience
"""

I'm uploading a screenshot. Please recreate the layout you can find tin the screenshot
 

## Who is the owner of this repository?
By default, GPT Engineer projects are created with public GitHub repositories.

However, you can easily transfer the repository to your own GitHub account by navigating to your [GPT Engineer project](https://run.gptengineer.app/projects/REPLACE_WITH_PROJECT_ID/improve) and selecting Settings -> GitHub. 

## How can I edit this code?
There are several ways of editing your application.

**Use GPT Engineer**

Simply visit the GPT Engineer project at [GPT Engineer](https://run.gptengineer.app/projects/REPLACE_WITH_PROJECT_ID/improve) and start prompting.

Changes made via gptengineer.app will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in the GPT Engineer UI.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps: 

```sh
git clone https://github.com/GPT-Engineer-App/conversation-matchmaker.git
cd conversation-matchmaker
npm i

# This will run a dev server with auto reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

All GPT Engineer projects can be deployed directly via the GPT Engineer app. 

Simply visit your project at [GPT Engineer](https://run.gptengineer.app/projects/REPLACE_WITH_PROJECT_ID/improve) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain, then we recommend GitHub Pages.

To use GitHub Pages you will need to follow these steps: 
- Deploy your project using GitHub Pages - instructions [here](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#creating-your-site)
- Configure a custom domain for your GitHub Pages site - instructions [here](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)