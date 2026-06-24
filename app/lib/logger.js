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
];

const DEBUG_LINES = [
  "Polishing the chrome.",
  "Recalibrating the optic sensors.",
  "Warming up the energon blade.",
  "Scanning the horizon for Decepticons.",
  "Spinning up the wheels.",
  "Topping off the energon tank.",
  "Stretching the servos.",
];

function pick(lines) {
  return lines[Math.floor(Math.random() * lines.length)];
}

export const log = {
  // Call with no argument to emit a random fun line, or pass your own string.
  info: (msg) => console.info(msg ?? pick(INFO_LINES)),
  debug: (msg) => console.debug(msg ?? pick(DEBUG_LINES)),
  warn: (msg) => console.warn(msg ?? "Hmm, that wasn't quite right."),
};
