import { words } from "./words";

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const DEFAULT_START_DATE = "2026-06-10T00:00:00.000Z";

export type DailyWord = (typeof words)[number] & {
  id: string;
  number: number;
};

export function getDailyWord(now = new Date()): DailyWord {
  const configuredStart = Date.parse(
    process.env.INIT_DATE ?? DEFAULT_START_DATE,
  );
  const start = Number.isNaN(configuredStart)
    ? Date.parse(DEFAULT_START_DATE)
    : configuredStart;
  const elapsedDays = Math.max(0, Math.floor((now.getTime() - start) / DAY_IN_MS));
  const word = words[elapsedDays % words.length];

  return {
    ...word,
    id: now.toISOString().slice(0, 10),
    number: elapsedDays + 1,
  };
}

export function normalizeGerman(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("de-DE")
    .replaceAll("ß", "ss")
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replace(/[^a-z0-9]/g, "");
}
