"use client";
import Link from "next/link";
import { useState } from "react";
import GuessGrid from "./guessGrid/guessGrid";
import { useGameContext } from "@/context/gameState";

export default function PlayContent() {
  const data = useGameContext();
  const [showHelp, setShowHelp] = useState(false);

  return (
    <main className="play-shell">
      <header className="site-header play-header">
        <Link className="wordmark" href="/" aria-label="Kompound home">
          K<span>o</span>mpound
        </Link>
        <div className="play-meta">
          {data.puzzle ? <span>Puzzle #{data.puzzle.number}</span> : null}
          <button className="text-button" onClick={() => setShowHelp(true)}>
            How to play
          </button>
        </div>
      </header>

      {data.loading ? (
        <div className="loading-state" role="status">
          <span className="loader" /> Loading today’s word…
        </div>
      ) : data.puzzle ? (
        <div className="game-layout">
          <section className="clue-panel">
            <div>
              <p className="eyebrow">{data.puzzle.category} · English clue</p>
              <h1>{data.puzzle.actual}</h1>
              <p className="clue-prompt">What’s the German word?</p>
            </div>

            <div className="literal-clues" aria-live="polite">
              <p>Literal pieces</p>
              <div className="literal-card-row">
                {data.puzzle.cards.map((card, index) => {
                  const visible = data.finished || data.guesses.length > index;
                  return (
                    <div
                      className={`literal-card ${visible ? "is-visible" : ""}`}
                      key={`${card}-${index}`}
                    >
                      <span>{visible ? card : "?"}</span>
                      <small>{visible ? `Clue ${index + 1}` : "Locked"}</small>
                    </div>
                  );
                })}
              </div>
              {!data.finished && data.guesses.length === 0 ? (
                <small>Miss a guess to unlock the first piece.</small>
              ) : null}
            </div>
          </section>

          <section className="guess-panel" aria-label="Your guesses">
            <div className="attempt-counter">
              <span>Versuche</span>
              <strong>{Math.min(data.guesses.length + (data.finished ? 0 : 1), 6)} / 6</strong>
            </div>
            <GuessGrid />
          </section>
        </div>
      ) : (
        <div className="loading-state error-state" role="alert">
          {data.error ?? "Today’s puzzle is unavailable."}
          <button
            className="secondary-button"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      )}

      {showHelp ? (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() => setShowHelp(false)}
        >
          <section
            className="help-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowHelp(false)}
              aria-label="Close instructions"
            >
              ×
            </button>
            <p className="eyebrow">Spielregeln</p>
            <h2 id="help-title">How to play</h2>
            <p>
              Guess the German word matching the English clue. You have six
              attempts.
            </p>
            <p>
              Wrong guesses reveal the compound’s literal English pieces.
              Umlauts can be typed as ae, oe, or ue; ß can be typed as ss.
            </p>
            <button
              className="primary-button"
              onClick={() => setShowHelp(false)}
            >
              Let’s play
            </button>
          </section>
        </div>
      ) : null}
    </main>
  );
}
