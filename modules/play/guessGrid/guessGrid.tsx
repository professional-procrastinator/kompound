import { useGameContext } from "@/context/gameState";
import { FormEvent, useMemo, useState } from "react";

export default function GuessGrid() {
  const data = useGameContext();
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const rows = useMemo(() => Array.from({ length: 6 }), []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!value.trim() || submitting) return;
    setSubmitting(true);
    const accepted = await data.submitGuess(value);
    if (accepted) setValue("");
    setSubmitting(false);
  }

  async function shareResult() {
    if (!data.puzzle) return;
    const score = data.won ? data.guesses.length : "X";
    const marks = data.guesses.map((guess) => (guess.correct ? "🟩" : "⬜")).join("");
    const text = `Kompound #${data.puzzle.number} ${score}/6\n${marks}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: "Kompound", text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      // Closing the native share sheet is not an error the player needs to see.
    }
  }

  return (
    <div className="guess-grid">
      {rows.map((_, rowIndex) => {
        const guess = data.guesses[rowIndex];
        const active = !data.finished && rowIndex === data.guesses.length;

        if (active) {
          return (
            <form className="guess-row active-row" onSubmit={onSubmit} key={rowIndex}>
              <label htmlFor="guess-input">Your guess</label>
              <div className="guess-input-wrap">
                <input
                  id="guess-input"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  placeholder="Type in German…"
                  autoComplete="off"
                  autoCapitalize="none"
                  maxLength={48}
                  autoFocus
                />
                <button type="submit" disabled={!value.trim() || submitting} aria-label="Submit guess">
                  {submitting ? "…" : "→"}
                </button>
              </div>
            </form>
          );
        }

        return (
          <div className={`guess-row ${guess ? (guess.correct ? "correct-row" : "wrong-row") : "empty-row"}`} key={rowIndex}>
            <span>{guess?.value ?? `Attempt ${rowIndex + 1}`}</span>
            <small>{guess ? (guess.correct ? "Richtig" : "Not quite") : ""}</small>
          </div>
        );
      })}

      {data.error ? <p className="form-error" role="alert">{data.error}</p> : null}

      {data.finished ? (
        <div className={`result-card ${data.won ? "win-result" : "loss-result"}`}>
          <p className="eyebrow">{data.won ? "Sehr gut!" : "Aufgelöst"}</p>
          <h2>{data.answer}</h2>
          <p>
            {data.puzzle?.cards.join(" + ")} = {data.puzzle?.actual}
          </p>
          <button className="share-button" onClick={shareResult}>
            {copied ? "Copied!" : "Share result"}
          </button>
          <small>Come back tomorrow for another word.</small>
        </div>
      ) : null}
    </div>
  );
}
