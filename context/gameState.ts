"use client";
import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Puzzle = {
  actual: string;
  cards: string[];
  category: string;
  id: string;
  number: number;
};

export type Guess = {
  value: string;
  correct: boolean;
};

type SavedGame = {
  guesses: Guess[];
  answer?: string;
};

interface GameContextType {
  puzzle: Puzzle | null;
  guesses: Guess[];
  answer: string | null;
  loading: boolean;
  error: string | null;
  finished: boolean;
  won: boolean;
  submitGuess: (guess: string) => Promise<boolean>;
}

const GameContext = createContext<GameContextType | null>(null);

function GameStateProvider({ children }: { children: React.ReactNode }) {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWord = async () => {
      try {
        const response = await fetch("/api/word");
        if (!response.ok) throw new Error("Could not load today’s word.");
        const nextPuzzle = (await response.json()) as Puzzle;
        const saved = window.localStorage.getItem(`kompound:${nextPuzzle.id}`);
        const parsed = saved ? (JSON.parse(saved) as SavedGame) : null;

        setPuzzle(nextPuzzle);
        setGuesses(Array.isArray(parsed?.guesses) ? parsed.guesses : []);
        setAnswer(parsed?.answer ?? null);
      } catch {
        setError("Today’s word could not be loaded. Check your connection and retry.");
      } finally {
        setLoading(false);
      }
    };
    void loadWord();
  }, []);

  const finished = Boolean(answer) || guesses.some((guess) => guess.correct) || guesses.length >= 6;
  const won = guesses.some((guess) => guess.correct);

  const submitGuess = useCallback(
    async (rawGuess: string) => {
      if (!puzzle || finished) return false;
      setError(null);

      const response = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guess: rawGuess,
          attempt: guesses.length + 1,
          puzzleId: puzzle.id,
        }),
      });
      const result = (await response.json()) as {
        correct?: boolean;
        answer?: string;
        message?: string;
      };

      if (!response.ok || typeof result.correct !== "boolean") {
        setError(result.message ?? "That guess could not be checked. Try again.");
        return false;
      }

      const nextGuesses = [
        ...guesses,
        { value: rawGuess.trim(), correct: result.correct },
      ];
      const nextAnswer = result.answer ?? null;

      setGuesses(nextGuesses);
      setAnswer(nextAnswer);
      window.localStorage.setItem(
        `kompound:${puzzle.id}`,
        JSON.stringify({ guesses: nextGuesses, answer: nextAnswer }),
      );
      return true;
    },
    [finished, guesses, puzzle],
  );

  const value = useMemo(
    () => ({
      puzzle,
      guesses,
      answer,
      loading,
      error,
      finished,
      won,
      submitGuess,
    }),
    [answer, error, finished, guesses, loading, puzzle, submitGuess, won],
  );

  return createElement(GameContext.Provider, { value }, children);
}

const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGameContext must be used inside GameStateProvider");
  return context;
};

export { GameStateProvider, useGameContext };
