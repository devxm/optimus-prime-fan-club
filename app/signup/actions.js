"use server";

import { log } from "../lib/logger";

// Server action — runs on the SSR runtime when the signup form is submitted,
// so each enrollment produces Runtime Logs (info + debug) for the demo.
export async function enroll(data) {
  const t0 = Date.now();
  log.info("signup.received", {
    faction: data?.faction,
    newsletter: !!data?.newsletter,
    hasEmail: !!data?.email,
  });

  const name = (data?.name || "").trim();
  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data?.email || "");

  if (!name || !emailValid) {
    log.warn("signup.rejected", { reason: !name ? "missing_name" : "invalid_email" });
    return { ok: false, error: "Please provide a valid name and email." };
  }

  // Demo only — no persistence. This is where a DB/queue write would go.
  log.debug("signup.validated", { favorite: data?.favorite });
  log.info("signup.enrolled", { faction: data?.faction, latencyMs: Date.now() - t0 });

  return { ok: true, firstName: name.split(" ")[0], faction: data?.faction };
}
