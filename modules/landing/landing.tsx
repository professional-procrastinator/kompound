"use client";
import { motion } from "motion/react";
import Link from "next/link";

export default function LandingContent() {
  return (
    <main className="landing-shell">
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Kompound home">
          K<span>o</span>mpound
        </Link>
        <Link className="header-link" href="#how-to-play">
          How to play
        </Link>
      </header>

      <section className="hero">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="eyebrow">A tiny daily German word game</p>
          <h1>Some words are better in pieces.</h1>
          <p className="hero-intro">
            Guess one German compound in six tries. Every miss unlocks a
            literal clue—and a small window into how German builds meaning.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/play">
              Play today’s word <span aria-hidden="true">→</span>
            </Link>
            <span>New puzzle every day</span>
          </div>
        </motion.div>

        <motion.div
          className="compound-demo"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.55 }}
          aria-label="Hand plus shoe makes Handschuh, the German word for glove"
        >
          <div className="demo-label">A word, unpacked</div>
          <div className="demo-cards">
            <div className="demo-card demo-card-yellow">
              <small>Hand</small>
              <strong>HAND</strong>
            </div>
            <span className="join-mark" aria-hidden="true">+</span>
            <div className="demo-card demo-card-red">
              <small>Shoe</small>
              <strong>SCHUH</strong>
            </div>
          </div>
          <div className="demo-result">
            <span>Handschuh</span>
            <strong>glove</strong>
          </div>
        </motion.div>
      </section>

      <section className="how-to" id="how-to-play">
        <div>
          <p className="eyebrow">How to play</p>
          <h2>Six guesses. Two useful clues. One satisfying word.</h2>
        </div>
        <ol>
          <li><span>01</span><p>Read the English meaning and type the German word.</p></li>
          <li><span>02</span><p>Each wrong answer reveals a literal piece of the compound.</p></li>
          <li><span>03</span><p>Find the word in six tries, then share your result.</p></li>
        </ol>
      </section>

      <footer className="site-footer">
        <span>Built for curious people, not perfect German speakers.</span>
        <span>Viel Glück!</span>
      </footer>
    </main>
  );
}
