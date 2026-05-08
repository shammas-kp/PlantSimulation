# Revin Frontend Simulation

React + TypeScript frontend for the Plant Growth Simulation Engine. The app lets users choose water level, sunlight level, and simulation duration, then visualizes the plant's growth, health, stress, and disease-risk timeline.

## Features

- Scenario presets for balanced, drought, low-light, and overwater conditions
- Configurable water and sunlight levels: `LOW`, `MEDIUM`, `HIGH`
- Simulation length slider from 1 to 30 days
- Current plant status summary
- Day-by-day timeline playback
- Growth and health charts powered by Recharts
- Error state when the backend API is unavailable

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Recharts
- pnpm

## Prerequisites

- Node.js
- pnpm
- Running backend API from the `simulation-engine` project

The frontend posts simulation requests to:

```txt
http://localhost:3000/simulation
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm run dev
```

Vite will print the local URL, usually:

```txt
http://localhost:5173
```

## Available Scripts

```bash
pnpm run dev
```

Starts the Vite development server.

```bash
pnpm run build
```

Builds the TypeScript project and production frontend bundle.

```bash
pnpm run preview
```

Serves the production build locally.

```bash
pnpm run lint
```

Runs ESLint across the project.

## Project Structure

```txt
src/
  components/
    PlantStatusCard.tsx
    SimulationChart.tsx
    SimulationForm.tsx
  pages/
    Home.tsx
  services/
    simulation.api.ts
  types/
    simulation.types.ts
  App.tsx
  main.tsx
```

## Backend Contract

The UI sends this payload:

```json
{
  "water": "MEDIUM",
  "sunlight": "MEDIUM",
  "days": 12
}
```

Expected response shape:

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

## Running With The Backend

1. Start the backend in `simulation-engine`:

```bash
pnpm run start:dev
```

2. Start this frontend:

```bash
pnpm run dev
```

3. Open the Vite URL and run a simulation.
