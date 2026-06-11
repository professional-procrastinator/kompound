import FloatingInput from "@/components/floatingInput/floatingInput";
import WordCard from "@/components/wordCard/wordCard";
import { useGameContext } from "@/context/gameState";
import { useState } from "react";
import React from "react";

export default function GuessGrid() {
  const data = useGameContext();
  const [currentGuessValue, setCurrentGuessValue] = useState<string>("");

  if (!data?.guessLength) return null;

  const wrapperStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  };

  const rowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${data.guessLength}, minmax(0, 1fr))`,
    columnGap: "15px",
    position: "relative",
  };

  return (
    <div style={wrapperStyle}>
      {Array.from({ length: 6 }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            ...rowStyle,
            zIndex: rowIndex === data.numGuesses ? 50 : 1,
          }}
        >
          {Array.from({ length: data.guessLength }).map((_, colIndex) => (
            <div key={colIndex} style={{ minWidth: "100%" }}>
              <WordCard status={0} />
            </div>
          ))}

          {rowIndex === data.numGuesses ? (
            <div style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
              <FloatingInput
                placeholder="Start typing to guess.."
                value={currentGuessValue}
                setValue={setCurrentGuessValue}
              />
            </div>
          ) : null}
        </div>
      ))}

      {/* Your test button */}
      <div
        onClick={() => {
          data.setNumGuesses(data.numGuesses + 1);
        }}
      >
        Badhao
      </div>
    </div>
  );
}
