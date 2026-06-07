import WordCard from "@/components/wordCard/wordCard";
import { useGameContext } from "@/context/gameState";

export default function GuessGrid() {
  const data = useGameContext();

  if (!data?.guessLength) return null;

  const gridStyle = {
    display: "grid", // Ensures grid properties are explicitly tied together
    gridTemplateColumns: `repeat(${data.guessLength}, minmax(0, 1fr))`,

    // Explicitly sets row and column gaps using standard CSS properties
    columnGap: "0px", // Change this value for horizontal space between columns
    rowGap: "32px", // Change this value for vertical space between rows
  };

  return (
    // Removed all Tailwind gap classes entirely to prevent conflicts
    <div style={gridStyle}>
      {Array.from({ length: 6 * data.guessLength }).map((_, i) => (
        <WordCard key={i} status={0} />
      ))}
    </div>
  );
}
