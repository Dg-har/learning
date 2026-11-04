# 🚀 Safal Neupane — Developer Portfolio

A funky, chaotic, creative full-stack developer portfolio.

**Playful on the surface. Technically impressive underneath.**

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite + Tailwind CSS v4 + Framer Motion |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT |
| Icons | Lucide React |

---

## Project Structure

```
Safal-portfolio/
├── frontend/          React + Vite app
│   └── src/
│       ├── components/   Navbar, CustomCursor
│       ├── sections/     Hero, About, CharacterStats, Skills, Projects...
│       ├── pages/        Home, AdminLogin, AdminDashboard
│       ├── animations/   Framer Motion variants
│       ├── data/         Static fallback data
│       ├── hooks/        useMousePosition, useTheme, useSound
│       └── services/     Axios API client
│
└── backend/           Node.js + Express API
    ├── config/         MongoDB connection
    ├── models/         Contact, Project, Admin, Profile
    ├── controllers/    Business logic
    ├── routes/         API routes
    ├── middleware/     Auth, validation, error handling
    └── scripts/        Admin seeder
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Setup Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your values
npm install
npm run seed      # Create admin user + sample projects
npm run dev       # Start backend on :5000
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev       # Start frontend on :5173
```

---

## Environment Variables

### `backend/.env`

```env
MONGODB_URI=mongodb://localhost:27017/safal-portfolio
JWT_SECRET=your_long_random_secret_here
PORT=5000
FRONTEND_URL=http://localhost:5173
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_strong_password
```

---

## API Endpoints

```
GET    /api/projects         Public — list all projects
POST   /api/projects         Admin — create project
PUT    /api/projects/:id     Admin — update project
DELETE /api/projects/:id     Admin — delete project

POST   /api/contact          Public — submit contact form
GET    /api/contact          Admin — list all messages
PATCH  /api/contact/:id/read Admin — mark message read
DELETE /api/contact/:id      Admin — delete message

POST   /api/auth/login       Admin — login, returns JWT
GET    /api/auth/me          Admin — verify token

GET    /api/profile          Public — get profile info
PUT    /api/profile          Admin — update profile
```

---

## Admin Dashboard

Visit: `http://localhost:5173/admin`

Login with your `ADMIN_USERNAME` + `ADMIN_PASSWORD` from `.env`.

Features:
- 📊 Dashboard overview
- 🧪 Projects CRUD
- 📬 View & manage messages
- ⚙️ Edit profile / about text / social links

---

## MongoDB Setup

**Local:**
```bash
# Install MongoDB Community Edition
# Start mongod service
# Connection: mongodb://localhost:27017/safal-portfolio
```

**Atlas (Cloud):**
1. Create account at mongodb.com/atlas
2. Create free cluster
3. Get connection string
4. Set `MONGODB_URI=mongodb+srv://...` in `.env`

---

## Production Build

```bash
# Frontend
cd frontend
npm run build          # Output: frontend/dist/

# Backend — deploy server.js to hosting provider
# Set NODE_ENV=production in env
```

---

## Deployment Options

- **Frontend**: Vercel, Netlify, Cloudflare Pages
- **Backend**: Railway, Render, Fly.io, DigitalOcean
- **Database**: MongoDB Atlas (free tier available)

---

## 🎨 Features

- 🌙 Dark/Light mode with localStorage persistence
- 🖱️ Custom cursor with lag effect (desktop)
- 🎭 Interactive floating stickers in hero
- 💬 Hover-cycling role titles
- 🎮 Character stats RPG panel
- 🧰 Skill toolbox with hover quotes
- 🕹️ Project game-level cards
- 🗺️ Road-trip timeline
- 🏆 Bug hall of fame with achievement clicks
- 💻 Fully functional interactive terminal
- 📬 Contact form → MongoDB storage
- 🔊 Optional sound effects (default off)
- ♿ Reduced-motion support
- 📱 Mobile responsive
- 🔐 Admin dashboard with JWT auth

---

Built with ☕ and too many tabs open by Safal Neupane.
