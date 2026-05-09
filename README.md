# Plant Simulation

Full-stack plant growth simulation project with a React frontend and a NestJS backend. Users can choose water level, sunlight level, and simulation duration, then view how plant growth, health, stress, and disease risk change over time.

## Live Deployment

- Frontend: https://plant-simulation-mu.vercel.app/
- Backend API: https://plantsimulation.onrender.com

## Projects

```txt
revin-frontend-simulation/
  React + TypeScript + Vite frontend

simulation-engine/
  NestJS simulation API
```

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- NestJS
- Jest
- pnpm
- GitHub Actions

## API Overview

The frontend calls the backend endpoint:

```txt
POST /simulation
```

Example request:

```json
{
  "water": "MEDIUM",
  "sunlight": "MEDIUM",
  "days": 12
}
```

Example response:

```json
{
  "success": true,
  "message": "Simulation completed successfully",
  "data": {
    "history": [
      {
        "day": 1,
        "growth": 12,
        "health": 100,
        "stress": 0,
        "diseaseRisk": 0,
        "status": "Healthy"
      }
    ]
  },
  "timestamp": "2026-05-08T00:00:00.000Z"
}
```

## Local Setup

Install dependencies in both projects:

```bash
cd simulation-engine
pnpm install

cd ../revin-frontend-simulation
pnpm install
```

Start the backend:

```bash
cd simulation-engine
pnpm run start:dev
```

The backend runs on:

```txt
http://localhost:3000
```

Start the frontend:

```bash
cd revin-frontend-simulation
pnpm run dev
```

The frontend usually runs on:

```txt
http://localhost:5173
```

## Frontend Environment

The frontend reads the backend URL from:

```env
VITE_API_BASE_URL=http://localhost:3000
```

For production on Vercel, set:

```env
VITE_API_BASE_URL=https://plantsimulation.onrender.com
```

## Scripts

Frontend:

```bash
cd revin-frontend-simulation
pnpm run dev
pnpm run build
pnpm run lint
```

Backend:

```bash
cd simulation-engine
pnpm run start:dev
pnpm run test
pnpm run build
```

## CI

GitHub Actions is configured in:

```txt
.github/workflows/ci.yml
```

The workflow runs separate jobs for:

- Frontend lint and build
- Backend tests and build

## Deployment Notes

- Deploy the frontend folder `revin-frontend-simulation` to Vercel.
- Deploy the backend folder `simulation-engine` to Render.
- Make sure the Vercel environment variable `VITE_API_BASE_URL` points to the Render backend URL.
