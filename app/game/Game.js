"use client";

import { useState } from "react";

const MAX_HP = 100;

const MOVES = {
  strike: { label: "⚔️ Energon Blade", min: 12, max: 20, type: "attack" },
  brace: { label: "🛡️ Brace & Repair", min: 6, max: 11, type: "defend" },
  matrix: { label: "✨ Matrix Blast", min: 26, max: 40, type: "special", cooldown: 3 },
};

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function bar(hp) {
  const pct = Math.max(0, Math.round((hp / MAX_HP) * 100));
  return pct;
}

export default function Game() {
  const [optimus, setOptimus] = useState(MAX_HP);
  const [megatron, setMegatron] = useState(MAX_HP);
  const [cooldown, setCooldown] = useState(0); // rounds until Matrix Blast ready
  const [log, setLog] = useState(["Megatron looms across the battlefield. Choose your move, Prime."]);
  const [over, setOver] = useState(null); // null | "optimus" | "megatron"
  const [round, setRound] = useState(1);

  function reset() {
    setOptimus(MAX_HP);
    setMegatron(MAX_HP);
    setCooldown(0);
    setLog(["A new battle begins. Roll out!"]);
    setOver(null);
    setRound(1);
  }

  function enemyMove(defending) {
    // Weighted AI: mostly attacks, sometimes a heavy fusion blast, rarely guards.
    const roll = Math.random();
    if (roll < 0.18) {
      return { text: "Megatron braces behind his armor.", dmg: 0, heal: rand(5, 9) };
    }
    if (roll < 0.42) {
      let dmg = rand(22, 34);
      if (defending) dmg = Math.floor(dmg / 2);
      return { text: `Megatron fires his fusion cannon for ${dmg}!`, dmg };
    }
    let dmg = rand(10, 18);
    if (defending) dmg = Math.floor(dmg / 2);
    return { text: `Megatron swings for ${dmg}.`, dmg };
  }

  function play(moveKey) {
    if (over) return;
    const move = MOVES[moveKey];
    if (moveKey === "matrix" && cooldown > 0) return;

    let oHp = optimus;
    let mHp = megatron;
    let cd = cooldown;
    let defending = false;
    const entries = [`— Round ${round} —`];

    // ----- Optimus' move -----
    if (move.type === "attack") {
      const dmg = rand(move.min, move.max);
      mHp -= dmg;
      entries.push(`Optimus strikes with the Energon Blade for ${dmg}!`);
    } else if (move.type === "defend") {
      const heal = rand(move.min, move.max);
      oHp = Math.min(MAX_HP, oHp + heal);
      defending = true;
      entries.push(`Optimus braces and repairs ${heal} HP.`);
    } else if (move.type === "special") {
      const dmg = rand(move.min, move.max);
      mHp -= dmg;
      cd = move.cooldown + 1; // +1 because we decrement at round end
      entries.push(`Optimus unleashes the MATRIX BLAST for ${dmg}! 💥`);
    }
    mHp = Math.max(0, mHp);

    if (mHp <= 0) {
      entries.push("Megatron falls. Freedom prevails! 🏆");
      setMegatron(0);
      setLog((l) => [...entries.reverse(), ...l]);
      setOver("optimus");
      return;
    }

    // ----- Megatron's move -----
    const enemy = enemyMove(defending);
    if (enemy.heal) {
      mHp = Math.min(MAX_HP, mHp + enemy.heal);
    }
    if (enemy.dmg) {
      oHp -= enemy.dmg;
    }
    oHp = Math.max(0, oHp);
    entries.push(enemy.text);

    if (oHp <= 0) {
      entries.push("Optimus has fallen... The Decepticons advance. 💀");
      setOptimus(0);
      setLog((l) => [...entries.reverse(), ...l]);
      setOver("megatron");
      return;
    }

    // round end
    if (cd > 0) cd -= 1;

    setOptimus(oHp);
    setMegatron(mHp);
    setCooldown(cd);
    setRound((r) => r + 1);
    setLog((l) => [...entries.reverse(), ...l]);
  }

  return (
    <div className="game">
      <div className="arena">
        <div className={`fighter auto ${over === "megatron" ? "defeated" : ""}`}>
          <div className="fighter-face" aria-hidden="true">🤖</div>
          <h3>Optimus Prime</h3>
          <div className="hpbar">
            <span className="hpbar-fill auto-fill" style={{ width: `${bar(optimus)}%` }} />
          </div>
          <span className="hp-num">{optimus} / {MAX_HP}</span>
        </div>

        <div className="versus" aria-hidden="true">VS</div>

        <div className={`fighter decept ${over === "optimus" ? "defeated" : ""}`}>
          <div className="fighter-face" aria-hidden="true">😈</div>
          <h3>Megatron</h3>
          <div className="hpbar">
            <span className="hpbar-fill decept-fill" style={{ width: `${bar(megatron)}%` }} />
          </div>
          <span className="hp-num">{megatron} / {MAX_HP}</span>
        </div>
      </div>

      {!over ? (
        <div className="moves">
          <button className="btn btn-primary" onClick={() => play("strike")}>
            {MOVES.strike.label}
          </button>
          <button className="btn btn-ghost" onClick={() => play("brace")}>
            {MOVES.brace.label}
          </button>
          <button
            className="btn btn-special"
            onClick={() => play("matrix")}
            disabled={cooldown > 0}
          >
            {MOVES.matrix.label}
            {cooldown > 0 ? ` (${cooldown})` : ""}
          </button>
        </div>
      ) : (
        <div className="game-over">
          <h2>{over === "optimus" ? "Victory! 🏆" : "Defeated 💀"}</h2>
          <p>
            {over === "optimus"
              ? "Optimus Prime stands triumphant. Till all are one!"
              : "Megatron has won this battle — but the war is not over."}
          </p>
          <button className="btn btn-primary btn-lg" onClick={reset}>
            Battle Again
          </button>
        </div>
      )}

      <div className="battle-log" aria-live="polite">
        {log.map((line, i) => (
          <p key={`${i}-${line}`} className={i === 0 && !over ? "latest" : ""}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
