# Kompound

A daily German compound-word game. Players get an English clue, six attempts,
and progressive hints that unpack the compound into its literal English pieces.

## Game rules

- Guess the German word in six attempts.
- Each wrong guess reveals another literal piece of the compound.
- Umlauts can be entered as `ae`, `oe`, or `ue`; `ß` can be entered as `ss`.
- Progress is saved in the browser for the current daily puzzle.
- The answer is validated on the server and revealed only when the round ends.

## Local development

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

The daily rotation starts on June 10, 2026. Set `INIT_DATE` to another ISO date
to change the start of the rotation.

## Checks

```bash
yarn lint
yarn build
```

Built with Next.js, React, Tailwind CSS, and Motion.
