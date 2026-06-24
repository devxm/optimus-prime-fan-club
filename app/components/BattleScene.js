// Detailed, shaded vector illustration of Optimus Prime battling Megatron.
// Uses metallic gradients, glow filters, rim lighting and an energy blast at
// the point of impact to give a more realistic, dramatic look.
export default function BattleScene() {
  return (
    <svg
      className="scene-svg"
      viewBox="0 0 960 540"
      role="img"
      aria-label="Optimus Prime clashing with Megatron amid the ruins of Cybertron"
    >
      <defs>
        {/* sky / atmosphere */}
        <radialGradient id="sky" cx="50%" cy="38%" r="75%">
          <stop offset="0%" stopColor="#3a4f86" />
          <stop offset="45%" stopColor="#1b2748" />
          <stop offset="100%" stopColor="#05070d" />
        </radialGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10131c" />
          <stop offset="100%" stopColor="#02040a" />
        </linearGradient>

        {/* Autobot metallics */}
        <linearGradient id="primeRed" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff5b5b" />
          <stop offset="45%" stopColor="#d11626" />
          <stop offset="100%" stopColor="#7d0a14" />
        </linearGradient>
        <linearGradient id="primeBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5aa0ff" />
          <stop offset="50%" stopColor="#2452c4" />
          <stop offset="100%" stopColor="#122a6b" />
        </linearGradient>
        <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4f8ff" />
          <stop offset="50%" stopColor="#9fb0cc" />
          <stop offset="100%" stopColor="#4a566b" />
        </linearGradient>

        {/* Decepticon metallics */}
        <linearGradient id="megSteel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c7ced8" />
          <stop offset="45%" stopColor="#7b8493" />
          <stop offset="100%" stopColor="#3a4150" />
        </linearGradient>
        <linearGradient id="megPurple" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a85fd6" />
          <stop offset="50%" stopColor="#6a2c91" />
          <stop offset="100%" stopColor="#371450" />
        </linearGradient>

        {/* energy */}
        <radialGradient id="blast" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#fff3b0" />
          <stop offset="55%" stopColor="#ffb347" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ff7b2e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="energon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eaffff" />
          <stop offset="100%" stopColor="#27c6ff" />
        </linearGradient>

        <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* ---------- BACKGROUND ---------- */}
      <rect width="960" height="540" fill="url(#sky)" />

      {/* moon / energon sun */}
      <circle cx="480" cy="190" r="120" fill="#ffae5a" opacity="0.10" filter="url(#softGlow)" />

      {/* distant ruined Cybertron skyline */}
      <g fill="#0c1426" opacity="0.92">
        <polygon points="0,420 70,300 78,420" />
        <rect x="60" y="250" width="46" height="170" />
        <rect x="112" y="300" width="30" height="120" />
        <rect x="150" y="210" width="40" height="210" />
        <rect x="196" y="330" width="26" height="90" />
        <rect x="770" y="280" width="42" height="140" />
        <rect x="818" y="230" width="34" height="190" />
        <rect x="858" y="320" width="30" height="100" />
        <rect x="892" y="270" width="44" height="150" />
        <polygon points="940,420 900,300 960,300 960,420" />
      </g>
      {/* broken towers / debris haze */}
      <rect x="0" y="402" width="960" height="14" fill="#0a1120" opacity="0.6" />

      {/* ground + reflection */}
      <rect x="0" y="416" width="960" height="124" fill="url(#ground)" />
      <ellipse cx="480" cy="232" rx="230" ry="150" fill="url(#blast)" opacity="0.35" filter="url(#softGlow)" />

      {/* ============ OPTIMUS PRIME (left) ============ */}
      <g filter="url(#glow)">
        {/* shadow */}
        <ellipse cx="300" cy="470" rx="86" ry="14" fill="#000" opacity="0.45" />

        {/* far leg */}
        <path d="M300 330 l30 0 l6 96 l-30 6 z" fill="url(#primeBlue)" />
        {/* near leg striding forward */}
        <path d="M250 332 l34 -4 l10 84 l-30 14 z" fill="url(#primeBlue)" />
        {/* feet */}
        <path d="M232 460 l52 -8 l8 18 l-64 6 z" fill="url(#chrome)" />
        <path d="M300 432 l40 -2 l6 18 l-50 4 z" fill="url(#chrome)" />
        {/* knee guards */}
        <rect x="252" y="356" width="30" height="16" rx="4" fill="url(#chrome)" />

        {/* hips */}
        <rect x="248" y="312" width="92" height="34" rx="6" fill="#3a4150" />

        {/* torso (truck cab chest) */}
        <path d="M244 232 l100 0 l8 86 l-116 0 z" fill="url(#primeRed)" />
        {/* windshield chest detail */}
        <path d="M262 244 l64 0 l4 40 l-72 0 z" fill="url(#primeBlue)" opacity="0.9" />
        <path d="M266 248 l26 0 l-2 34 l-26 0 z" fill="#bfe0ff" opacity="0.55" />
        {/* grille / abs vents */}
        <g fill="#2a3040">
          <rect x="258" y="292" width="74" height="6" rx="2" />
          <rect x="258" y="302" width="74" height="6" rx="2" />
        </g>
        {/* shoulder smokestacks */}
        <rect x="232" y="214" width="12" height="48" rx="3" fill="url(#chrome)" />
        <rect x="344" y="214" width="12" height="48" rx="3" fill="url(#chrome)" />

        {/* head */}
        <path d="M276 196 l36 0 l4 36 l-44 0 z" fill="url(#primeBlue)" />
        <rect x="270" y="190" width="6" height="22" rx="2" fill="url(#chrome)" />
        <rect x="312" y="190" width="6" height="22" rx="2" fill="url(#chrome)" />
        <path d="M286 188 l16 0 l6 12 l-28 0 z" fill="url(#chrome)" />
        {/* eyes / visor */}
        <rect x="282" y="210" width="26" height="7" rx="2" fill="#8fe3ff" filter="url(#glow)" />
        {/* mouthplate */}
        <rect x="286" y="220" width="18" height="9" rx="2" fill="url(#chrome)" />

        {/* left arm bracing */}
        <path d="M236 244 l22 -2 l-2 60 l-24 4 z" fill="url(#primeRed)" />
        <rect x="224" y="298" width="26" height="22" rx="5" fill="url(#chrome)" />

        {/* right arm raised with energon sword */}
        <g transform="rotate(28 352 250)">
          <path d="M340 232 l24 0 l4 64 l-26 4 z" fill="url(#primeRed)" />
          <rect x="338" y="290" width="28" height="22" rx="5" fill="url(#chrome)" />
        </g>
      </g>

      {/* energon sword (separate so glow reads cleanly) */}
      <g filter="url(#glow)">
        <polygon points="436,96 452,104 392,250 372,242" fill="url(#energon)" />
        <polygon points="436,96 452,104 444,100" fill="#ffffff" />
        <rect x="372" y="244" width="26" height="10" rx="3" transform="rotate(28 385 249)" fill="url(#chrome)" />
      </g>

      {/* ============ MEGATRON (right) ============ */}
      <g filter="url(#glow)">
        <ellipse cx="660" cy="470" rx="88" ry="14" fill="#000" opacity="0.45" />

        {/* legs */}
        <path d="M628 330 l32 -2 l10 86 l-30 12 z" fill="url(#megSteel)" />
        <path d="M676 332 l30 0 l6 92 l-30 4 z" fill="url(#megSteel)" />
        <path d="M620 460 l54 -6 l6 18 l-64 4 z" fill="url(#chrome)" />
        <path d="M676 424 l42 0 l6 18 l-50 4 z" fill="url(#chrome)" />

        {/* hips */}
        <rect x="620" y="312" width="96" height="34" rx="6" fill="#2c2238" />

        {/* torso */}
        <path d="M616 230 l104 0 l6 88 l-116 0 z" fill="url(#megPurple)" />
        {/* chest plating / cockpit */}
        <path d="M636 244 l64 0 l4 42 l-72 0 z" fill="url(#megSteel)" />
        <path d="M642 250 l26 0 l-2 34 l-26 0 z" fill="#d7deea" opacity="0.5" />
        {/* fusion vents */}
        <g fill="#1d1726">
          <rect x="632" y="292" width="78" height="6" rx="2" />
          <rect x="632" y="302" width="78" height="6" rx="2" />
        </g>

        {/* head + crested helmet */}
        <path d="M648 196 l40 0 l2 36 l-44 0 z" fill="url(#megSteel)" />
        <polygon points="648,196 690,196 669,176" fill="#5a6473" />
        <rect x="654" y="210" width="28" height="7" rx="2" fill="#ff5050" filter="url(#glow)" />
        <rect x="660" y="221" width="18" height="8" rx="2" fill="#3a4150" />

        {/* right arm guarding against the sword */}
        <g transform="rotate(-34 700 250)">
          <path d="M700 232 l24 0 l2 60 l-26 4 z" fill="url(#megPurple)" />
          <rect x="700" y="288" width="28" height="22" rx="5" fill="url(#chrome)" />
        </g>

        {/* left arm with fusion cannon */}
        <path d="M598 248 l22 -2 l-2 54 l-24 2 z" fill="url(#megPurple)" />
        <rect x="556" y="258" width="56" height="30" rx="8" fill="url(#megSteel)" />
        <rect x="566" y="264" width="40" height="18" rx="4" fill="#2c2238" />
        <circle cx="556" cy="273" r="20" fill="#1d1726" />
        <circle cx="556" cy="273" r="11" fill="#ff5050" filter="url(#glow)" />
        <circle cx="556" cy="273" r="5" fill="#ffd7d7" />
      </g>

      {/* ============ CLASH / IMPACT ============ */}
      <circle cx="470" cy="240" r="140" fill="url(#blast)" />
      <g filter="url(#glow)" opacity="0.95">
        <polygon points="470,120 488,222 590,240 488,258 470,360 452,258 350,240 452,222" fill="#fff6c8" />
        <polygon points="470,150 480,232 552,240 480,248 470,330 460,248 388,240 460,232" fill="#fffefc" />
      </g>

      {/* sparks + embers */}
      <g fill="#ffd27d">
        <circle cx="430" cy="170" r="3.5" />
        <circle cx="512" cy="160" r="2.5" />
        <circle cx="448" cy="300" r="3" />
        <circle cx="500" cy="296" r="2.5" />
        <circle cx="406" cy="244" r="2" />
        <circle cx="544" cy="232" r="2.5" />
        <circle cx="470" cy="372" r="3" />
      </g>
      <g stroke="#ffcf87" strokeWidth="2" opacity="0.8" strokeLinecap="round">
        <line x1="470" y1="240" x2="392" y2="150" />
        <line x1="470" y1="240" x2="556" y2="158" />
        <line x1="470" y1="240" x2="420" y2="340" />
        <line x1="470" y1="240" x2="540" y2="332" />
      </g>
    </svg>
  );
}
