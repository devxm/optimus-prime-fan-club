import Link from "next/link";
import Game from "./Game";

export const metadata = {
  title: "Battle Arena • Optimus Prime Fan Club",
  description: "Take control of Optimus Prime in a turn-based duel against Megatron.",
};

export default function GamePage() {
  return (
    <section className="game-page">
      <div className="section-head">
        <p className="eyebrow">Battle Arena</p>
        <h1>Optimus Prime vs. Megatron</h1>
        <p>
          Turn-based duel. Strike with the Energon Blade, brace to repair, or
          charge the Matrix Blast. Reduce Megatron to 0 HP to win.
        </p>
        <p className="back-link">
          <Link href="/">← Back to home</Link>
        </p>
      </div>
      <Game />
    </section>
  );
}
