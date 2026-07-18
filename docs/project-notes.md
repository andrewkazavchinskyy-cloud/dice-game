# Project notes

## Requirements

- Build the Dice game with TypeScript, Next.js, and Material UI.
- Follow the supplied Figma layout.
- Generate a number from 1 to 100 after each play.
- Support strict Under and Over predictions.
- Keep no more than ten games in the history.
- Publish the finished project to GitHub and Vercel.

## Decisions

- The Figma high-resolution preview is the visual reference.
- The interface stays in English to match the design.
- The initial result and history are empty.
- The selected threshold starts at 20 and history is session-only.
- Equality is a loss because both comparisons are strict.
- The project uses local React state and has no backend or environment variables.
