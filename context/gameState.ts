// the game state isn't supposed to be global context but yeah easier to manage and everything
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import React from "react";

interface GameContextType {
  wordOfTheDay: string | null;
  guessLength: number;
  guesses: object[];
  setGuesses: React.Dispatch<React.SetStateAction<object[]>>;
  numGuesses: number;
  setNumGuesses: React.Dispatch<React.SetStateAction<number>>;
  finished: boolean;
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameContext = createContext<GameContextType | null>(null);

function GameStateProvider({ children }: { children: React.ReactNode }) {
  const [wordOfTheDay, setWordOfTheDay] = useState<string | null>(null);
  const [guessLength, setGuessLength] = useState(0);
  const [guesses, setGuesses] = useState<object[]>([]);
  const [numGuesses, setNumGuesses] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const loadWord = async () => {
      const res = await fetch("/api/word");
      if (res.status !== 200) return;
      const data = await res.json();
      setWordOfTheDay(data?.actual ?? null);
      setGuessLength(data?.cards.length ?? 0);
    };
    loadWord();
  }, []);

  return React.createElement(
    GameContext.Provider,
    {
      value: {
        wordOfTheDay,
        guessLength,
        guesses,
        setGuesses,
        numGuesses,
        setNumGuesses,
        finished,
        setFinished,
      },
    },
    children,
  );
}
const useGameContext = () => useContext(GameContext);

export { GameStateProvider, useGameContext };
