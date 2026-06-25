// Server-side logger for Runtime Logs. The runtime platform already wraps each
// line with timestamp, level, requestId, endpointName and region — so we just
// emit a plain human-readable message (no nested JSON, no technical fields).
//
// Messages are intentionally light/flavorful rather than technical.

const INFO_LINES = [
  "Autobots, roll out!",
  "Optimus Prime has entered the arena.",
  "Energon levels are looking great today.",
  "Transform and roll out!",
  "The Matrix of Leadership is glowing.",
  "Freedom is the right of all sentient beings.",
  "Another fan just rolled in.",
  "Till all are one.",
  "Rolling down the highway.",
  "The Ark is back online.",
  "Bumblebee is revving the engine.",
  "A wild visitor appears!",
];

const DEBUG_LINES = [
  "Polishing the chrome.",
  "Recalibrating the optic sensors.",
  "Warming up the energon blade.",
  "Scanning the horizon for Decepticons.",
  "Spinning up the wheels.",
  "Topping off the energon tank.",
  "Stretching the servos.",
  "Checking the rear-view mirrors.",
  "Tightening a few bolts.",
  "Humming the Transformers theme.",
];

const WARN_LINES = [
  "Decepticons spotted on the radar.",
  "Energon running a little low.",
  "Megatron is grumbling again.",
  "Soundwave might be listening.",
];

const pick = (lines) => lines[Math.floor(Math.random() * lines.length)];

export const log = {
  // Call with no argument to emit a random fun line, or pass your own string.
  info: (msg) => console.info(msg ?? pick(INFO_LINES)),
  debug: (msg) => console.debug(msg ?? pick(DEBUG_LINES)),
  warn: (msg) => console.warn(msg ?? pick(WARN_LINES)),

  // Emit a burst of several random lines across levels — handy for generating
  // plenty of Runtime Logs on each request.
  burst: (count = 6) => {
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      if (r < 0.15) console.warn(pick(WARN_LINES));
      else if (r < 0.55) console.info(pick(INFO_LINES));
      else console.debug(pick(DEBUG_LINES));
    }
  },
};
