import { getDailyWord, normalizeGerman } from "../_data/daily";

type GuessPayload = {
  guess?: unknown;
  attempt?: unknown;
  puzzleId?: unknown;
};

export async function POST(request: Request) {
  let body: GuessPayload;

  try {
    body = (await request.json()) as GuessPayload;
  } catch {
    return Response.json({ message: "Send a guess as JSON." }, { status: 400 });
  }

  const puzzle = getDailyWord();
  const guess = typeof body.guess === "string" ? body.guess : "";
  const attempt = typeof body.attempt === "number" ? body.attempt : 0;

  if (body.puzzleId !== puzzle.id) {
    return Response.json(
      { message: "A new daily word is ready. Refresh to play it." },
      { status: 409 },
    );
  }

  if (!guess.trim() || guess.length > 48 || attempt < 1 || attempt > 6) {
    return Response.json(
      { message: "Enter one German word before submitting." },
      { status: 400 },
    );
  }

  const correct = normalizeGerman(guess) === normalizeGerman(puzzle.german);
  const finished = correct || attempt === 6;

  return Response.json({
    correct,
    ...(finished ? { answer: puzzle.german } : {}),
  });
}
