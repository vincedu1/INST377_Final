### INST377-Final-Project README

## TITLE
# Personal Fitness Tracker

## DESCRIPTION
# Many people, including myself, struggle with maintaining a consistent exercise and diet routine when attempting to lose weight. 
# There are fitness apps in the market, however, they often require subscriptions, have too many features that may be hard to use/understand for the average person, or lack the ability to provide personalized recommendations for the user. 
# My project seeks to create a simple yet convenient way to track exercise and monitor progress.
# Fitness Tracker is a comprehensive web-based fitness tracking application designed to help users achieve their health and fitness goals through features like workout logging, progress visualization, and goal setting. 

## TARGET BROWSERS
# My project is designed to work across all modern web browsers, but has been specifically tested on Google Chrome.

### DEVELOPER MANUAL
## INSTALLATION GUIDE

# STEP 1: CLONE REPOSITORY
git clone https://github.com/vincedu1/INST377-Final

# STEP 2: INSTALL DEPENDENCIES
cd backend
npm install

# STEP 3: SET UP SUPABASE
1. **Create a Supabase Account**
   - Go to https://supabase.com
   - Sign up for a free account
   - Create a new project
2. **Run Database Schema**
   Navigate to the SQL Editor in your Supabase dashboard and run:
   
-- Create workouts table
CREATE TABLE workouts (
    id BIGSERIAL PRIMARY KEY,
    exercise TEXT NOT NULL,
    sets INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    weight NUMERIC NOT NULL,
    notes TEXT,
    date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create goals table
CREATE TABLE goals (
    id BIGSERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    target NUMERIC NOT NULL,
    current NUMERIC NOT NULL DEFAULT 0,
    date DATE,
    reminders BOOLEAN DEFAULT false,
    created TIMESTAMPTZ DEFAULT NOW()
);

3. **Get Supabase Credentials**
   - Go to Project Settings → API
   - Copy your **Project URL**
   - Copy your **anon/public key**

# Step 4: Configure Backend
Create .env and add the following code with yourcredentials:
SUPABASE_URL = 'https://your-project-id.supabase.co';
SUPABASE_KEY = 'your-anon-public-key-here';

## RUNNING THE APPLICATION
# Start backend server

1. Navigate to the backend directory:
cd backend

2. Start the server:
npm start

3. You should see:
Server running on http://localhost:3000

# Start frontend
If you have VS Code, install the "Live Server" extension:
1. Right-click on `index.html`
2. Select "Open with Live Server"
3. Browser will open at `http://127.0.0.1:5500`

## BACKEND TESTING
1. **Test Server Status**
GET http://localhost:3000/
Expected: {"message": "FitTrack API is running!"}

2. **Test GET Workouts**
GET http://localhost:3000/api/workouts
Expected: [] (empty array if no data) or array of workout objects

3. **Test POST Workout**
POST http://localhost:3000/api/workouts
Content-Type: application/json
{
  "exercise": "Bench Press",
  "sets": 3,
  "reps": 10,
  "weight": 135,
  "notes": "Felt strong today!"
}
Expected: 201 Created with workout object

4. **Test GET Goals**
GET http://localhost:3000/api/goals
Expected: [] or array of goal objects

5. **Test POST Goal**
POST http://localhost:3000/api/goals
Content-Type: application/json
{
  "description": "Bench press 200 lbs",
  "target": 200,
  "current": 135,
  "date": "2025-12-31",
  "reminders": true
}

## API DOCUMENTATION
# BASE URL
http://localhost:3000/api

# ENDPOINTS
1. Health Check
**GET** `/`
Check if the server is running.

2. Get All Workouts
**GET** `/api/workouts`
Retrieve all workout entries from the database, ordered by date (newest first).

3. Create Workout
**POST** `/api/workouts`
Create a new workout entry in the database.

4. Get All Goals
**GET** `/api/goals`
Retrieve all fitness goals from the database, ordered by creation date (newest first).

5. Create Goal
**POST** `/api/goals`
Create a new fitness goal in the database.

## BUGS & KNOWN ISSUES
1. **Exercise Image Loading**
   - **Issue**: Some exercises from Wger API don't have images
   - **Impact**: Exercise detail modal shows empty image sections

2. **Chart Rendering on Small Screens**
   - **Issue**: Charts may overflow on screens smaller than 320px
   - **Impact**: Visual layout breaks on very small mobile devices
  
3. **No Data Validation on Weight Input**
   - **Issue**: Users can enter negative or extremely large weights
   - **Impact**: Data integrity issues, unrealistic values

## ROADMAP
1. **User Authentification**
   - Add login/signup pages for personal workout/goal data per user

2. **Data Validation**
   - Add min/max values on the frontend for validation, error messages for invalid input
  
3. **Goal Updates**
   - Update goal progress values as relevant data is added, marking goals as complete, automatically removing/archiving completed goals
