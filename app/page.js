// Force dynamic (per-request) server-side rendering so this page is rendered
// on the SSR runtime for every request rather than statically pre-rendered.
export const dynamic = "force-dynamic";

function BattleScene() {
  return (
    <svg
      className="scene-svg"
      viewBox="0 0 900 480"
      role="img"
      aria-label="Optimus Prime fighting Megatron"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#243b6b" />
          <stop offset="100%" stopColor="#0a0d14" />
        </linearGradient>
        <radialGradient id="clash" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff8c4" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#ffb347" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffb347" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* background */}
      <rect width="900" height="480" fill="url(#sky)" />
      {/* distant ruined city */}
      <g fill="#11192e" opacity="0.8">
        <rect x="40" y="300" width="60" height="180" />
        <rect x="120" y="250" width="50" height="230" />
        <rect x="740" y="270" width="70" height="210" />
        <rect x="820" y="320" width="50" height="160" />
        <rect x="690" y="330" width="40" height="150" />
      </g>
      {/* ground */}
      <rect x="0" y="430" width="900" height="50" fill="#070a10" />

      {/* ===== OPTIMUS PRIME (left, red/blue) ===== */}
      <g>
        <rect x="250" y="330" width="34" height="100" fill="#1d3a8a" rx="4" />
        <rect x="300" y="330" width="34" height="100" fill="#1d3a8a" rx="4" />
        <rect x="248" y="425" width="40" height="14" fill="#5a6473" rx="3" />
        <rect x="298" y="425" width="40" height="14" fill="#5a6473" rx="3" />
        <rect x="248" y="240" width="92" height="100" fill="#c1121f" rx="8" />
        <rect x="262" y="250" width="64" height="40" fill="#9fb0cc" rx="4" />
        <rect x="276" y="200" width="36" height="40" fill="#1d3a8a" rx="6" />
        <rect x="282" y="214" width="24" height="8" fill="#7fd4ff" rx="2" />
        <rect x="272" y="196" width="6" height="16" fill="#9fb0cc" />
        <rect x="310" y="196" width="6" height="16" fill="#9fb0cc" />
        <rect
          x="332"
          y="230"
          width="22"
          height="70"
          fill="#c1121f"
          rx="6"
          transform="rotate(35 343 265)"
        />
        <polygon points="392,120 410,128 372,250 360,244" fill="#7fd4ff" opacity="0.95" />
        <polygon points="392,120 410,128 401,124" fill="#ffffff" />
        <rect x="226" y="250" width="22" height="64" fill="#c1121f" rx="6" />
      </g>

      {/* ===== CLASH FLASH ===== */}
      <circle cx="450" cy="200" r="120" fill="url(#clash)" />
      <polygon
        points="450,90 470,180 560,200 470,220 450,310 430,220 340,200 430,180"
        fill="#fff8c4"
        opacity="0.85"
      />

      {/* ===== MEGATRON (right, purple/steel) ===== */}
      <g>
        <rect x="566" y="330" width="34" height="100" fill="#3d3550" rx="4" />
        <rect x="616" y="330" width="34" height="100" fill="#3d3550" rx="4" />
        <rect x="562" y="425" width="40" height="14" fill="#5a6473" rx="3" />
        <rect x="612" y="425" width="40" height="14" fill="#5a6473" rx="3" />
        <rect x="560" y="240" width="92" height="100" fill="#6a2c91" rx="8" />
        <rect x="574" y="250" width="64" height="40" fill="#8a93a3" rx="4" />
        <rect x="588" y="200" width="36" height="40" fill="#8a93a3" rx="6" />
        <rect x="594" y="214" width="24" height="8" fill="#ff4d4d" rx="2" />
        <polygon points="588,200 624,200 606,184" fill="#5a6473" />
        <rect x="546" y="250" width="22" height="60" fill="#6a2c91" rx="6" />
        <rect x="500" y="262" width="54" height="26" fill="#5a6473" rx="6" />
        <circle cx="500" cy="275" r="16" fill="#3d3550" />
        <circle cx="500" cy="275" r="8" fill="#ff4d4d" />
        <rect
          x="648"
          y="240"
          width="22"
          height="64"
          fill="#6a2c91"
          rx="6"
          transform="rotate(-30 659 272)"
        />
      </g>

      {/* spark debris */}
      <g fill="#ffd27d">
        <circle cx="430" cy="160" r="3" />
        <circle cx="470" cy="150" r="2" />
        <circle cx="455" cy="250" r="2.5" />
        <circle cx="420" cy="240" r="2" />
        <circle cx="490" cy="230" r="3" />
      </g>
    </svg>
  );
}

export default function Home() {
  // Rendered on the server for each request — proves SSR at request time.
  const renderedAt = new Date().toUTCString();

  return (
    <>
      <header>
        <h1>Optimus Prime Fan Club</h1>
        <p>Freedom is the right of all sentient beings.</p>
      </header>

      <div className="scene">
        <BattleScene />
        <p className="caption">
          The eternal clash: Optimus Prime stands against Megatron amid the ruins
          of Cybertron.
        </p>
      </div>

      <main>
        <p className="quote">
          &ldquo;One shall stand, one shall fall.&rdquo;
          <span>&mdash; Optimus Prime</span>
        </p>

        <section>
          <h2>About the Leader of the Autobots</h2>
          <p>
            Optimus Prime is the courageous leader of the Autobots, a faction of
            sentient robotic beings from the planet Cybertron. Wielding the Matrix
            of Leadership and an unbreakable sense of justice, he fights to protect
            both his fellow Autobots and the people of Earth from the tyranny of the
            Decepticons.
          </p>
        </section>

        <section>
          <h2>The Rivalry with Megatron</h2>
          <p>
            Once comrades, now sworn enemies. Megatron leads the Decepticons in a
            relentless quest for power and conquest. The battles between Optimus and
            Megatron are legendary &mdash; clashes that shake worlds and decide the
            fate of entire civilizations. Where Megatron seeks domination, Optimus
            stands for freedom.
          </p>
        </section>

        <section>
          <h2>Why We&rsquo;re Fans</h2>
          <div className="stats">
            <div className="stat">
              <div className="num">&infin;</div>
              <div className="label">Courage</div>
            </div>
            <div className="stat">
              <div className="num">#1</div>
              <div className="label">Leader</div>
            </div>
            <div className="stat">
              <div className="num">1984</div>
              <div className="label">First Appeared</div>
            </div>
            <div className="stat">
              <div className="num">100%</div>
              <div className="label">Heroic</div>
            </div>
          </div>
        </section>

        <p className="ssr-badge">
          Server-rendered at request time: <code>{renderedAt}</code>
        </p>
      </main>

      <footer>
        Optimus Prime Fan Club &bull; A fan-made tribute. Transformers and all
        related characters are property of Hasbro. Not affiliated with or endorsed
        by Hasbro.
      </footer>
    </>
  );
}
