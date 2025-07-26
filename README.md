# 🏠 NestNavigate Frontend – Gamified Learning Platform
📘 React-based dashboard for first-time homebuyers

This is the frontend dashboard for the NestNavigate, a gamified learning platform for first-time homebuyers. Built using React.

## 🚀 Live Demo

- **Frontend (Vercel)**: [https://nestnavigate-frontend.vercel.app](https://nestnavigate-frontend.vercel.app)
- **Backend (Heroku)**: [https://nestnavigate-backend-fb7e09b71ac1.herokuapp.com](https://nestnavigate-backend-fb7e09b71ac1.herokuapp.com)
- **API Docs**: [https://nestnavigate-backend-fb7e09b71ac1.herokuapp.com/docs](https://nestnavigate-backend-fb7e09b71ac1.herokuapp.com/docs)

## 📝 Overview

NestNavigate helps first-time homebuyers learn through gamified modules. This frontend enables users to:

- View their profile and total coins earned
- Track learning progress across modules
- View recent completed lessons and activity
- Complete lessons and get real-time updates

## Features

### ✅ User Profile Section
- Displays user name and coin count
- Shows total progress across modules

### 📚 Module Progress Grid
- Displays sample modules with visual progress
- Shows lesson completion status

### 🕒 Recent Activity Feed
- Lists recent lessons completed
- Displays coin rewards and timestamps

### 🧠 Interactive Elements
- “Complete Lesson” buttons
- Real-time coin counter and progress bar updates

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/mkawak/nestnavigate_frontend.git
cd nestnavigate_frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables

Modify a `config.js` file in the root with the following:

```
API_BASE_URL = "https://LocalHost or you Backend API";
```

### 4. Run Development Server
```bash
npm start
```

### 5. Build for Production
```bash
npm run build
```

## 🧰 Tech Stack

- **Frontend:** React, React Hooks
- **HTTP Client:** Axios
- **Styling:** CSS3
- **State Management:** React useState/useEffect
- **Hosting:** Vercel


## 🕒 Time Spent

Total time spent on the frontend development: **3-4 hours**
- Initial setup and configuration: 30 minutes
- Component development (Dashboard, Pages, Profile, Modules): 2 hours
- API integration and state management: 1.5 hours
- Styling and responsive adjustments: 30 minutes
