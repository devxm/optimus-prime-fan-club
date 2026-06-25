import Link from "next/link";
import Game from "./Game";
import { log } from "../lib/logger";

// Server-render per request so each visit emits Runtime Logs from the compute.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Battle Arena • Optimus Prime Fan Club",
  description: "Take control of Optimus Prime in a real-time duel against Megatron.",
};

export default function GamePage() {
  log.info("A challenger enters the Battle Arena.");
  log.burst(5);
  return (
    <section className="game-page">
      <div className="section-head">
        <p className="eyebrow">Battle Arena</p>
        <h1>Optimus Prime vs. Megatron</h1>
        <p>
          Real-time 2D combat. Move and jump around the arena, slash with the
          energon blade, and fire energon blasts to take Megatron down.
        </p>
        <p className="back-link">
          <Link href="/">← Back to home</Link>
        </p>
      </div>
      <Game />
    </section>
  );
}
