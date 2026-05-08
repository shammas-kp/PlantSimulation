# Simulation Engine

NestJS API for running a simple plant growth simulation. The engine evaluates water and sunlight inputs over a number of days and returns a daily timeline of plant growth, health, stress, disease risk, and status.

## Features

- `POST /simulation` endpoint
- Rule-based plant simulation engine
- Water and sunlight levels: `LOW`, `MEDIUM`, `HIGH`
- Daily plant-state history
- Health, stress, and disease-risk clamping between 0 and 100
- Plant status calculation: `Healthy`, `Stressed`, `Diseased`, or `Critical`
- Unit and e2e test setup
- CORS enabled for frontend development

## Tech Stack

- NestJS
- TypeScript
- Jest
- ESLint
- Prettier
- pnpm

## Prerequisites

- Node.js
- pnpm

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the API in development mode:

```bash
pnpm run start:dev
```

The server listens on:

```txt
http://localhost:3000
```

You can override the port with the `PORT` environment variable.

## API

### Run Simulation

```http
POST /simulation
Content-Type: application/json
```

Request body:

```json
{
  "water": "MEDIUM",
  "sunlight": "MEDIUM",
  "days": 12
}
```

Accepted values:

- `water`: `LOW`, `MEDIUM`, `HIGH`
- `sunlight`: `LOW`, `MEDIUM`, `HIGH`
- `days`: number of simulated days

Response:

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

## Simulation Rules

The current rule set lives in `src/simulation/rules/plant.rules.ts`.

| Water | Sunlight | Effects |
| --- | --- | --- |
| `LOW` | `HIGH` | health -20, stress +15, growth -5 |
| `MEDIUM` | `MEDIUM` | health +5, growth +12, stress -5 |
| `HIGH` | `LOW` | diseaseRisk +20, health -10, growth -2 |

When no rule matches a water/sunlight combination, the plant state carries forward for that day.

## Status Logic

The engine derives plant status from the current state:

| Condition | Status |
| --- | --- |
| health <= 30 | `Critical` |
| stress >= 50 | `Stressed` |
| diseaseRisk >= 60 | `Diseased` |
| otherwise | `Healthy` |

## Available Scripts

```bash
pnpm run start
```

Starts the Nest application.

```bash
pnpm run start:dev
```

Starts the Nest application in watch mode.

```bash
pnpm run build
```

Builds the application into `dist/`.

```bash
pnpm run start:prod
```

Runs the compiled production build.

```bash
pnpm run test
```

Runs unit tests.

```bash
pnpm run test:e2e
```

Runs end-to-end tests.

```bash
pnpm run test:cov
```

Runs tests with coverage.

```bash
pnpm run lint
```

Runs ESLint with automatic fixes.

```bash
pnpm run format
```

Formats source and test files with Prettier.

## Project Structure

```txt
src/
  common/
    interfaces/
    responses/
  simulation/
    dto/
    engine/
    interfaces/
    rules/
    types/
    simulation.controller.ts
    simulation.module.ts
    simulation.service.ts
  app.module.ts
  main.ts
test/
  app.e2e-spec.ts
```

## Frontend Pairing

This API is used by the `revin-frontend-simulation` project. Start the backend first, then run the frontend development server.
