# 🎯 TalentFlow — Recruitment System

A full-stack recruitment automation platform with job posting, resume screening, interview scheduling, and candidate tracking.

---

## 📁 Project Structure

```
recruitment-system/
├── frontend/
│   └── index.html          ← Complete frontend (open directly in browser)
└── backend/
    ├── server.js            ← Express REST API
    └── package.json
```

---

## 🚀 Quick Start

### Option A — Frontend Only (Demo Mode)
Just open `frontend/index.html` in your browser. It runs with full in-memory demo data — no server needed.

### Option B — Full Stack (Frontend + Backend)

**1. Start the backend:**
```bash
cd backend
npm install
npm start
# API running at http://localhost:3001
```

**2. Open the frontend:**
```bash
open frontend/index.html
# or serve it:
npx serve frontend
```

To switch from demo mode to live API, set `const DEMO = false;` in `frontend/index.html`.

---

## 🌐 REST API Endpoints

| Method | Endpoint                         | Description                  |
|--------|----------------------------------|------------------------------|
| GET    | /api/dashboard                   | Dashboard stats & pipeline   |
| GET    | /api/jobs                        | List all jobs                |
| POST   | /api/jobs                        | Create new job posting       |
| PUT    | /api/jobs/:id                    | Update job                   |
| DELETE | /api/jobs/:id                    | Delete job                   |
| PATCH  | /api/jobs/:id/status             | Toggle job status            |
| GET    | /api/candidates                  | List all candidates          |
| POST   | /api/candidates                  | Add new candidate            |
| PATCH  | /api/candidates/:id/status       | Update candidate stage       |
| DELETE | /api/candidates/:id              | Remove candidate             |
| GET    | /api/interviews                  | List interviews              |
| POST   | /api/interviews                  | Schedule interview           |
| PATCH  | /api/interviews/:id/status       | Update interview status      |
| DELETE | /api/interviews/:id              | Cancel interview             |
| POST   | /api/screen                      | AI screening score           |
| GET    | /api/analytics                   | Analytics data               |

---

## ✨ Features

- **Dashboard** — Live stats, pipeline overview, recent activity, upcoming interviews
- **Job Postings** — Create, filter, pause/activate, delete job listings
- **Candidates** — Full applicant table with status updates, filters, search
- **Pipeline (Kanban)** — Visual board with one-click stage advancement
- **Interview Scheduling** — Schedule, track, and complete interviews
- **AI Screening** — Automated scoring based on skills/experience match
- **Analytics** — Pipeline donut chart, skill frequency bars, dept breakdown
- **Toast Notifications** — Real-time feedback on all actions

---

## 🛠 Tech Stack

| Layer    | Technology                    |
|----------|-------------------------------|
| Frontend | Vanilla HTML/CSS/JS           |
| Backend  | Node.js + Express             |
| Data     | In-memory (upgradable to DB)  |
| Fonts    | Syne + DM Sans (Google Fonts) |

---

## 🗄 Upgrading to a Real Database

Replace the in-memory `db` object in `server.js` with PostgreSQL or MongoDB:

```bash
npm install pg  # PostgreSQL
# or
npm install mongoose  # MongoDB
```

The API structure is ready — just swap the array operations for DB queries.
