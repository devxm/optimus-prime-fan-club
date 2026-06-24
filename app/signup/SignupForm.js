"use client";

import { useState } from "react";
import { enroll } from "./actions";

const FACTIONS = ["Autobot", "Decepticon (we won't tell)", "Neutral"];

export default function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    faction: FACTIONS[0],
    favorite: "Optimus Prime",
    newsletter: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return setError("Please enter your name, recruit.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      return setError("A valid email is required to receive transmissions.");
    setError("");
    setPending(true);
    // Calls the server action -> emits Runtime Logs on the SSR compute.
    const result = await enroll(form);
    setPending(false);
    if (!result?.ok) {
      setError(result?.error || "Enlistment failed. Try again.");
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="signup-success" role="status">
        <div className="success-mark" aria-hidden="true">✓</div>
        <h2>Welcome to the resistance, {form.name.split(" ")[0]}!</h2>
        <p>
          Your enrollment as a <strong>{form.faction}</strong> ally is confirmed.
          Keep your optics online — your energon badge is on its way.
        </p>
        <button className="btn btn-ghost" onClick={() => setSubmitted(false)}>
          Register another recruit
        </button>
        <p className="fineprint">
          This is a demo form — nothing you enter is stored or sent anywhere.
        </p>
      </div>
    );
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
      <label className="field">
        <span>Name</span>
        <input
          type="text"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Orion Pax"
          autoComplete="name"
        />
      </label>

      <label className="field">
        <span>Email</span>
        <input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@cybertron.io"
          autoComplete="email"
        />
      </label>

      <label className="field">
        <span>Allegiance</span>
        <select
          value={form.faction}
          onChange={(e) => update("faction", e.target.value)}
        >
          {FACTIONS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Favorite Transformer</span>
        <input
          type="text"
          value={form.favorite}
          onChange={(e) => update("favorite", e.target.value)}
          placeholder="Optimus Prime"
        />
      </label>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={form.newsletter}
          onChange={(e) => update("newsletter", e.target.checked)}
        />
        <span>Send me energon-powered news and battle updates</span>
      </label>

      {error && <p className="form-error" role="alert">{error}</p>}

      <button type="submit" className="btn btn-primary btn-lg" disabled={pending}>
        {pending ? "Enlisting…" : "Enlist Now"}
      </button>
    </form>
  );
}
