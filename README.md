# SmartAdmin — AI-Powered Task Management Platform

> Stop Forgetting. Start Achieving.

SmartAdmin is a full-stack productivity web application that combines task management, AI coaching, streak tracking, and real analytics — all in one clean dashboard. Built with React, Node.js, MySQL, and powered by Google Gemini AI.

---

## Features

| Feature | Description |
|---------|-------------|
| Task Manager | Add, edit, complete and delete tasks — saved to MySQL per user |
| Notes & Memos | Personal notepad with title + content, saved to cloud |
| Streak Tracker | Tracks daily task completion streaks with best streak record |
| Daily Planner | Shows all pending tasks for today in one view |
| Analytics | Bar charts, completion stats, avg time, best productive day |
| AI Smart Suggestions | Gemini AI reads your pending tasks and suggests what to focus on |
| Productivity Coach | Chat with AI coach that answers based on your real task data |
| JWT Authentication | Secure login/signup with hashed passwords and token-based auth |

---

## Tech Stack

### Frontend
- React 19 + Vite 8
- Tailwind CSS v4
- Framer Motion
- Recharts
- Lucide React
- React Router DOM v7

### Backend
- Node.js + Express 5
- Sequelize ORM
- MySQL2
- JSON Web Token (JWT)
- bcryptjs
- Google Generative AI SDK

### Database
- MySQL
- MySQL Workbench

### AI
- Google Gemini 1.5 Flash API

---

## Project Structure

```
smartadmin/
├── src/
│   ├── assets/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── signup.jsx
│   │   ├── UserDashboard.jsx
│   │   ├── AddtaskManager.jsx
│   │   ├── Analytics.jsx
│   │   ├── Notes.jsx
│   │   ├── StreakPlanner.jsx
│   │   ├── TaskSuggestions.jsx
│   │   ├── ProductivityCoach.jsx
│   │   ├── Features.jsx
│   │   ├── HowItWorks.jsx
│   │   └── About.jsx
│   ├── App.jsx
│   └── main.jsx
│
└── Backend/
    ├── config/
    │   └── database.js
    ├── middleware/
    │   └── auth.js
    ├── models/
    │   ├── User.js
    │   ├── Task.js
    │   ├── Note.js
    │   └── Streak.js
    ├── routes/
    │   ├── auth.js
    │   ├── tasks.js
    │   ├── notes.js
    │   ├── streak.js
    │   └── ai.js
    └── server.js
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MySQL 8+
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com))

### 1. Clone the repository
```bash
git clone https://github.com/your-username/smartadmin.git
cd smartadmin
```

### 2. Setup the database
Open MySQL Workbench and run:

```sql
CREATE DATABASE smartadmindb;
USE smartadmindb;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    contact_number VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    adhar_number VARCHAR(12) NOT NULL UNIQUE,
    age INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    text VARCHAR(255) NOT NULL,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE streaks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    current_streak INT DEFAULT 0,
    best_streak INT DEFAULT 0,
    last_active DATE NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 3. Configure environment variables
Create `Backend/.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=smartadmindb
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Install dependencies

```bash
# Frontend
cd smartadmin
npm install

# Backend
cd Backend
npm install
```

### 5. Run the application

```bash
# Terminal 1 — Backend
cd smartadmin/Backend
npm run dev

# Terminal 2 — Frontend
cd smartadmin
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks for user |
| POST | `/api/tasks` | Add new task |
| PUT | `/api/tasks/:id/complete` | Mark task as completed |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/tasks/analytics` | Get analytics data |

### Notes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/:id` | Update note |
| DELETE | `/api/notes/:id` | Delete note |

### Streak
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/streak` | Get streak + daily planner data |

### AI
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/suggestions` | Get AI task suggestions |
| POST | `/api/ai/coach` | Ask productivity coach |

---

## Screenshots

> Dashboard, Task Manager, Analytics, AI Coach — coming soon

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Backend server port (default: 5000) |
| `DB_HOST` | MySQL host (default: localhost) |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | Database name |
| `JWT_SECRET` | Secret key for JWT tokens |
| `GEMINI_API_KEY` | Google Gemini API key |

---

## Built By

**Sahil Ahmad** — Frontend Developer
Delhi, India
justsahilforbusiness@gmail.com

---

## License

This project is open source and available under the [MIT License](LICENSE).
