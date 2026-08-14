import { getDailyWord } from "../_data/daily";

export async function GET() {
  const { actual, cards, category, id, number } = getDailyWord();

  return Response.json({
    actual,
    cards,
    category,
    id,
    number,
  });
}
