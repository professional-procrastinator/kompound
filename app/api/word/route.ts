// Endpoint for fetching the day's word
// Returns the word only.
// Even if hints are added later, they must only be returned on subsequent requests made to some other endpoint
import { words } from "../_data/words";

function generateWord() {
  const init = new Date(process.env.INIT_DATE!).getTime();
  const indexFinal =
    Math.floor((new Date().getTime() - init) / (1000 * 60 * 60 * 24)) %
    words.length;
  return words[indexFinal];
}

export async function GET() {
  const wordOfTheDay = generateWord();
  return new Response(JSON.stringify(wordOfTheDay), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
