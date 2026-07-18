# Dice Game

A small prediction game built with Next.js, TypeScript, and Material UI. Choose
whether the next number will be under or over your threshold, then press Play to
see the result.

Live demo: _the production link will be added after the first deployment._

## Features

- Random result from 1 to 100
- Strict Under and Over predictions
- Accessible slider with a 0–100 threshold
- Win and loss feedback
- History of the ten most recent games
- Responsive layout based on the
  [Figma design](https://www.figma.com/design/JmoRMC9MEDMIAzESih1x4N/Test-Task-DICE?node-id=0-1)

## Tech stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Material UI 9 with Emotion
- Vitest and React Testing Library
- Playwright

## Getting started

Node.js 20.9 or newer is required.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful commands

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

## Game rules

- Under wins when the result is strictly lower than the selected threshold.
- Over wins when the result is strictly higher than the selected threshold.
- An equal result is a loss.
- Game history is stored in memory and resets when the page is refreshed.
