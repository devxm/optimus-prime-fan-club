// Tiny structured server-side logger used to emit Runtime Logs from the SSR
// compute. Because the home page is `force-dynamic` and the signup uses a
// server action, these calls run on the runtime (not the browser) and show up
// in the runtime log stream.
//
// Levels map to native console methods so log-level filtering works downstream:
//   debug -> console.debug, info -> console.info, warn -> console.warn, error -> console.error

function emit(level, event, fields = {}) {
  const line = {
    level,
    event,
    app: "optimus-prime-fan-club",
    ts: new Date().toISOString(),
    ...fields,
  };
  const json = JSON.stringify(line);
  switch (level) {
    case "debug":
      console.debug(json);
      break;
    case "warn":
      console.warn(json);
      break;
    case "error":
      console.error(json);
      break;
    default:
      console.info(json);
  }
}

export const log = {
  debug: (event, fields) => emit("debug", event, fields),
  info: (event, fields) => emit("info", event, fields),
  warn: (event, fields) => emit("warn", event, fields),
  error: (event, fields) => emit("error", event, fields),
};
