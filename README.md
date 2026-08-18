# Northline Roofing Estimator

Config-driven full-stack roofing cost estimator and owner admin panel for **Northline Roofing & Exteriors**.

## Live Demo

- **Public Estimator:** _(Deploy and add URL here)_
- **Owner Panel:** _(Deploy and add URL here)_ `/admin/login`

## Features

- **Public Estimator:** Multi-step wizard with questions, options, and rates loaded from the API at runtime.
- **Server-side pricing:** All calculations run on the backend; the frontend never hardcodes rates or formulas.
- **Owner Panel:** Authenticated dashboard to edit config, toggle questions, update rates, and view captured leads.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express.js |
| Database | SQLite (via Prisma) — swap to PostgreSQL for production |
| Auth | JWT in httpOnly cookie |

## Project Structure

```
roof-estimator-monorepo/
├── client/          # React frontend
├── server/          # Express API + Prisma
├── DECISIONS.md     # Architecture decisions
├── AI_LOG.md        # AI usage log
└── README.md
```

## Prerequisites

- Node.js v18 or higher
- npm

## Local Setup

1. **Clone and install dependencies**

```bash
git clone <repo-url>
cd roof-estimator-monorepo
npm run install:all
```

2. **Configure environment variables**

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

3. **Initialize and seed the database**

```bash
npm run db:push
npm run db:seed
```

4. **Start development servers**

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Environment Variables

### Server (`server/.env`)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Database connection string |
| `JWT_SECRET` | Secret for signing auth tokens |
| `ADMIN_USERNAME` | Owner panel username |
| `ADMIN_PASSWORD` | Owner panel password |
| `PORT` | API server port (default: 5000) |
| `CLIENT_URL` | Frontend origin for CORS |

### Client (`client/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL |

## Admin Credentials (Development)

- **Username:** `admin`
- **Password:** `roofing2026!`

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/config` | Public | Active config for estimator |
| POST | `/api/estimate` | Public | Submit answers, get estimate, save lead |
| POST | `/api/auth/login` | Public | Owner login |
| POST | `/api/auth/logout` | Public | Owner logout |
| GET | `/api/auth/session` | Public | Check auth status |
| PUT | `/api/admin/config` | Protected | Update config (increments version) |
| GET | `/api/admin/leads` | Protected | List all leads |

## Deployment Notes

- Deploy **server** to Render/Railway with PostgreSQL (update `DATABASE_URL` in Prisma schema to `postgresql`).
- Deploy **client** to Vercel/Netlify with `VITE_API_URL` pointing to your API.
- Set `CLIENT_URL` on the server to your frontend URL for CORS.
- Use strong `JWT_SECRET` and change default admin credentials in production.
