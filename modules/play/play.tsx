"use client";
import Button from "@/components/button/button";
import { Link } from "next-view-transitions";
import GuessGrid from "./guessGrid/guessGrid";
import { useGameContext } from "@/context/gameState";

export default function PlayContent() {
  const data = useGameContext();

  if (!data?.wordOfTheDay?.[0]) return null;
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <div className="flex flex-row items-center justify-center w-full">
        <div className="flex flex-col items-center gap-3 w-50/100">
          <div className="text-[#7c756d] font-medium text-xl">
            What's the German word for{" "}
            {"AEIOU".includes(data.wordOfTheDay![0].toUpperCase()) ? "an" : "a"}
            ..
          </div>
          <div className="text-(--foreground) text-8xl font-dm-serif-display">
            {data.wordOfTheDay}
          </div>
        </div>
        <div className="flex flex-col w-50/100 justify-center items-center">
          <GuessGrid />
        </div>
      </div>
    </div>
  );
}
