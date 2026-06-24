import Link from "next/link";
import BattleScene from "./components/BattleScene";
import { log } from "./lib/logger";

// Per-request server-side rendering on the SSR runtime.
export const dynamic = "force-dynamic";

const CHARACTERS = [
  {
    name: "Optimus Prime",
    faction: "Autobot Leader",
    accent: "auto",
    blurb:
      "Bearer of the Matrix of Leadership. Compassionate, unyielding, and willing to sacrifice everything for freedom.",
    stats: { Strength: 9, Courage: 10, Wisdom: 10 },
  },
  {
    name: "Megatron",
    faction: "Decepticon Lord",
    accent: "decept",
    blurb:
      "A gladiator turned tyrant. Brilliant and ruthless, he wields a fusion cannon and an unquenchable thirst for power.",
    stats: { Strength: 10, Courage: 9, Wisdom: 7 },
  },
];

const QUOTES = [
  ["One shall stand, one shall fall.", "Optimus Prime"],
  ["Till all are one.", "Autobot Creed"],
  ["Peace through tyranny!", "Megatron"],
  ["Freedom is the right of all sentient beings.", "Optimus Prime"],
];

function StatBar({ label, value }) {
  return (
    <div className="statbar">
      <span className="statbar-label">{label}</span>
      <span className="statbar-track">
        <span className="statbar-fill" style={{ width: `${value * 10}%` }} />
      </span>
      <span className="statbar-num">{value}</span>
    </div>
  );
}

export default function Home() {
  const renderedAt = new Date().toUTCString();

  // ---- Runtime Logs (emitted from the SSR compute on every request) ----
  log.info();
  log.debug();

  return (
    <>
      {/* ---------- HERO ---------- */}
      <header className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-inner">
          <p className="eyebrow">Autobots • Roll Out</p>
          <h1>Optimus Prime Fan Club</h1>
          <p className="tagline">
            A tribute to the greatest leader the Autobots have ever known — and
            his eternal war with Megatron for the soul of Cybertron.
          </p>
          <div className="hero-actions">
            <Link href="/signup" className="btn btn-primary">
              Join the Fan Club
            </Link>
            <Link href="#battle" className="btn btn-ghost">
              Witness the Battle
            </Link>
          </div>
          <ul className="hero-badges">
            <li><strong>50K+</strong> members</li>
            <li><strong>1984</strong> est.</li>
            <li><strong>∞</strong> energon</li>
          </ul>
        </div>
      </header>

      {/* ---------- BATTLE ---------- */}
      <section id="battle" className="band">
        <div className="section-head">
          <h2>The Battle for Cybertron</h2>
          <p>Optimus Prime stands against Megatron amid the ruins.</p>
        </div>
        <div className="scene">
          <BattleScene />
          <p className="caption">
            Energon blade meets fusion cannon — the clash that decides the fate of
            worlds.
          </p>
        </div>
      </section>

      {/* ---------- CHARACTERS ---------- */}
      <section id="characters" className="band band-alt">
        <div className="section-head">
          <h2>Know the Combatants</h2>
          <p>Two leaders. One ideology cannot survive the other.</p>
        </div>
        <div className="card-grid">
          {CHARACTERS.map((c) => (
            <article key={c.name} className={`char-card ${c.accent}`}>
              <header className="char-card-head">
                <h3>{c.name}</h3>
                <span className="faction">{c.faction}</span>
              </header>
              <p className="char-blurb">{c.blurb}</p>
              <div className="char-stats">
                {Object.entries(c.stats).map(([k, v]) => (
                  <StatBar key={k} label={k} value={v} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- QUOTES ---------- */}
      <section className="band">
        <div className="section-head">
          <h2>Words That Echo Across the Stars</h2>
        </div>
        <div className="quote-grid">
          {QUOTES.map(([text, who]) => (
            <blockquote key={text} className="quote-card">
              <p>&ldquo;{text}&rdquo;</p>
              <cite>— {who}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ---------- LORE ---------- */}
      <section className="band band-alt">
        <div className="lore">
          <article className="lore-item">
            <h3>The Autobots</h3>
            <p>
              Defenders of freedom, the Autobots fight to protect both Cybertron
              and Earth. Under Optimus Prime they hold the line against tyranny,
              no matter the cost.
            </p>
          </article>
          <article className="lore-item">
            <h3>The Decepticons</h3>
            <p>
              Led by Megatron, the Decepticons seek domination through conquest.
              Their hunger for energon and power has scarred a thousand worlds.
            </p>
          </article>
          <article className="lore-item">
            <h3>The Matrix of Leadership</h3>
            <p>
              An ancient artifact carried by the Primes. &ldquo;Light our darkest
              hour&rdquo; — its power has turned the tide of war more than once.
            </p>
          </article>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="cta-band">
        <h2>Ready to roll out?</h2>
        <p>Become a member and get the official fan-club energon badge.</p>
        <Link href="/signup" className="btn btn-primary btn-lg">
          Sign Up Here
        </Link>
      </section>

      <footer className="site-footer">
        <p className="ssr-badge">
          Server-rendered at request time: <code>{renderedAt}</code>
        </p>
        <p>
          Optimus Prime Fan Club • A fan-made tribute. Transformers and all related
          characters are property of Hasbro. Not affiliated with or endorsed by
          Hasbro.
        </p>
      </footer>
    </>
  );
}
