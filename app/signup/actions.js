"use server";

import { log } from "../lib/logger";

// Server action — runs on the SSR runtime when the signup form is submitted,
// so each enrollment produces Runtime Logs for the demo.
export async function enroll(data) {
  log.info("A new recruit is signing up.");

  const name = (data?.name || "").trim();
  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data?.email || "");

  if (!name || !emailValid) {
    log.warn("That recruit's paperwork wasn't quite complete.");
    return { ok: false, error: "Please provide a valid name and email." };
  }

  // Demo only — no persistence.
  log.debug("Stamping the energon badge.");
  log.info("Welcome to the Autobots!");

  return { ok: true, firstName: name.split(" ")[0], faction: data?.faction };
}
