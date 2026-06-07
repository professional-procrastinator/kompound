"use client";
import Button from "@/components/button/button";
import { Link } from "next-view-transitions";
import GuessGrid from "./guessGrid/guessGrid";

export default function PlayContent() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col items-center gap-3 w-3/5">
          <div className="text-[#7c756d] font-medium text-xl">
            What's the German word for a..
          </div>
          <div className="text-(--foreground) text-8xl font-dm-serif-display">
            PORCUPINE
          </div>
        </div>
        <div className="flex flex-col gap-4 w-2/5">
          <GuessGrid />
        </div>
      </div>
    </div>
  );
}
