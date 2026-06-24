"use client";

import { useEffect, useRef, useState } from "react";

// ---- World constants (internal canvas coordinates) ----
const W = 900;
const H = 440;
const GROUND = H - 56; // y of the floor (feet rest here)
const GRAVITY = 2100;
const MOVE = 280;
const JUMP_V = -760;
const BOT_W = 64;
const BOT_H = 118;
const MAX_HP = 100;

const MELEE = { range: 56, dur: 0.22, cd: 0.4, dmg: 8, knock: 220 };
const SHOT = { speed: 560, dmg: 13, cd: 1.0, w: 26, h: 10 };

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const aabb = (a, b) =>
  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

function makeBot(x, facing) {
  return {
    x,
    y: GROUND - BOT_H,
    vx: 0,
    vy: 0,
    w: BOT_W,
    h: BOT_H,
    hp: MAX_HP,
    facing, // 1 = right, -1 = left
    onGround: true,
    atkTimer: 0, // >0 while swinging
    atkCd: 0,
    shotCd: 0,
    hitFlash: 0,
    aiTimer: 0,
    aiMode: "advance",
  };
}

function initState() {
  return {
    status: "ready", // ready | playing | over
    result: null, // "win" | "lose"
    player: makeBot(160, 1),
    enemy: makeBot(W - 160 - BOT_W, -1),
    shots: [],
    keys: { left: false, right: false, jump: false, attack: false, special: false },
    last: 0,
  };
}

export default function Game() {
  const canvasRef = useRef(null);
  const gameRef = useRef(initState());
  const rafRef = useRef(0);
  const [, force] = useState(0); // re-render overlay on status change
  const statusRef = useRef("ready");

  function syncStatus(s, result) {
    const g = gameRef.current;
    g.status = s;
    if (result !== undefined) g.result = result;
    statusRef.current = s;
    force((n) => n + 1);
  }

  function start() {
    gameRef.current = initState();
    syncStatus("playing", null);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // ---------- input ----------
    const setKey = (code, down, repeat) => {
      const g = gameRef.current;
      const k = g.keys;
      switch (code) {
        case "ArrowLeft":
        case "KeyA":
          k.left = down;
          break;
        case "ArrowRight":
        case "KeyD":
          k.right = down;
          break;
        case "ArrowUp":
        case "KeyW":
        case "Space":
          if (down && !repeat) k.jump = true;
          break;
        case "KeyF":
        case "KeyJ":
          if (down && !repeat) k.attack = true;
          break;
        case "KeyG":
        case "KeyK":
          if (down && !repeat) k.special = true;
          break;
        default:
          break;
      }
    };
    const onDown = (e) => {
      if (
        ["ArrowLeft", "ArrowRight", "ArrowUp", "Space", "KeyW", "KeyA", "KeyD"].includes(
          e.code
        )
      )
        e.preventDefault();
      setKey(e.code, true, e.repeat);
    };
    const onUp = (e) => setKey(e.code, false, false);
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);

    // ---------- helpers ----------
    function startSwing(bot) {
      if (bot.atkCd <= 0) {
        bot.atkTimer = MELEE.dur;
        bot.atkCd = MELEE.cd;
        bot.hitDone = false;
      }
    }
    function fireShot(bot, owner) {
      if (bot.shotCd <= 0) {
        bot.shotCd = SHOT.cd;
        const y = bot.y + 38;
        const x = bot.facing > 0 ? bot.x + bot.w : bot.x - SHOT.w;
        gameRef.current.shots.push({
          x,
          y,
          w: SHOT.w,
          h: SHOT.h,
          vx: SHOT.speed * bot.facing,
          owner,
        });
      }
    }
    function meleeHitbox(bot) {
      const x = bot.facing > 0 ? bot.x + bot.w : bot.x - MELEE.range;
      return { x, y: bot.y + 24, w: MELEE.range, h: 50 };
    }
    function hurt(bot, dmg, dir) {
      bot.hp = clamp(bot.hp - dmg, 0, MAX_HP);
      bot.hitFlash = 0.15;
      bot.vx += dir * MELEE.knock;
    }

    // ---------- update ----------
    function update(dt) {
      const g = gameRef.current;
      if (g.status !== "playing") return;
      const p = g.player;
      const e = g.enemy;

      // --- player control ---
      p.vx = 0;
      if (g.keys.left) {
        p.vx = -MOVE;
        p.facing = -1;
      }
      if (g.keys.right) {
        p.vx = MOVE;
        p.facing = 1;
      }
      if (g.keys.jump && p.onGround) {
        p.vy = JUMP_V;
        p.onGround = false;
      }
      g.keys.jump = false;
      if (g.keys.attack) startSwing(p);
      g.keys.attack = false;
      if (g.keys.special) fireShot(p, "player");
      g.keys.special = false;

      // --- enemy AI ---
      e.aiTimer -= dt;
      const dist = p.x - e.x;
      const adist = Math.abs(dist);
      e.facing = dist >= 0 ? 1 : -1;
      if (e.aiTimer <= 0) {
        e.aiTimer = 0.25 + Math.random() * 0.3;
        if (adist > 260) e.aiMode = Math.random() < 0.5 ? "advance" : "shoot";
        else if (adist > 90) e.aiMode = Math.random() < 0.7 ? "advance" : "shoot";
        else e.aiMode = Math.random() < 0.7 ? "melee" : "retreat";
        if (e.onGround && Math.random() < 0.15) {
          e.vy = JUMP_V * 0.85;
          e.onGround = false;
        }
      }
      e.vx = 0;
      if (e.aiMode === "advance") e.vx = e.facing * MOVE * 0.78;
      else if (e.aiMode === "retreat") e.vx = -e.facing * MOVE * 0.6;
      else if (e.aiMode === "shoot") fireShot(e, "enemy");
      else if (e.aiMode === "melee") {
        if (adist < MELEE.range + BOT_W) startSwing(e);
      }

      // --- physics for both ---
      for (const bot of [p, e]) {
        bot.vy += GRAVITY * dt;
        bot.x = clamp(bot.x + bot.vx * dt, 0, W - bot.w);
        bot.y += bot.vy * dt;
        if (bot.y + bot.h >= GROUND) {
          bot.y = GROUND - bot.h;
          bot.vy = 0;
          bot.onGround = true;
        }
        if (bot.atkTimer > 0) bot.atkTimer -= dt;
        if (bot.atkCd > 0) bot.atkCd -= dt;
        if (bot.shotCd > 0) bot.shotCd -= dt;
        if (bot.hitFlash > 0) bot.hitFlash -= dt;
      }

      // --- melee resolution ---
      if (p.atkTimer > 0 && !p.hitDone && aabb(meleeHitbox(p), e)) {
        hurt(e, MELEE.dmg, p.facing);
        p.hitDone = true;
      }
      if (e.atkTimer > 0 && !e.hitDone && aabb(meleeHitbox(e), p)) {
        hurt(p, MELEE.dmg - 1, e.facing);
        e.hitDone = true;
      }

      // --- projectiles ---
      for (const s of g.shots) s.x += s.vx * dt;
      g.shots = g.shots.filter((s) => {
        if (s.x < -40 || s.x > W + 40) return false;
        const target = s.owner === "player" ? e : p;
        if (aabb(s, target)) {
          hurt(target, SHOT.dmg, Math.sign(s.vx));
          return false;
        }
        return true;
      });

      // --- win / lose ---
      if (p.hp <= 0 || e.hp <= 0) {
        syncStatus("over", e.hp <= 0 && p.hp > 0 ? "win" : "lose");
      }
    }

    // ---------- draw ----------
    function drawBot(bot, kind) {
      const f = bot.facing;
      const cx = bot.x;
      const cy = bot.y;
      const flash = bot.hitFlash > 0;
      const palette =
        kind === "player"
          ? { body: "#c1121f", trim: "#2452c4", limb: "#1d3a8a", eye: "#8fe3ff" }
          : { body: "#6a2c91", trim: "#7b8493", limb: "#3a4150", eye: "#ff5050" };

      ctx.save();
      if (flash) ctx.globalAlpha = 0.6;

      // legs
      ctx.fillStyle = palette.limb;
      ctx.fillRect(cx + 10, cy + 78, 16, 40);
      ctx.fillRect(cx + bot.w - 26, cy + 78, 16, 40);
      // torso
      ctx.fillStyle = palette.body;
      ctx.fillRect(cx + 6, cy + 30, bot.w - 12, 52);
      // chest trim
      ctx.fillStyle = palette.trim;
      ctx.fillRect(cx + 16, cy + 38, bot.w - 32, 22);
      // head
      ctx.fillStyle = palette.limb;
      ctx.fillRect(cx + bot.w / 2 - 14, cy + 4, 28, 26);
      // eye visor (facing)
      ctx.fillStyle = palette.eye;
      const ex = f > 0 ? cx + bot.w / 2 - 2 : cx + bot.w / 2 - 12;
      ctx.fillRect(ex, cy + 12, 14, 5);

      // arm / energon blade when swinging
      ctx.fillStyle = palette.trim;
      const armY = cy + 40;
      if (bot.atkTimer > 0) {
        ctx.fillStyle = kind === "player" ? "#8fe3ff" : "#ff8a8a";
        const bx = f > 0 ? cx + bot.w : cx - MELEE.range;
        ctx.fillRect(bx, armY, MELEE.range, 12);
      } else {
        const bx = f > 0 ? cx + bot.w - 6 : cx - 12;
        ctx.fillRect(bx, armY, 18, 12);
      }
      ctx.restore();
    }

    function drawHealth() {
      const pad = 20;
      const bw = 300;
      const bh = 18;
      const g = gameRef.current;
      // player (left)
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(pad, pad, bw, bh);
      ctx.fillStyle = "#2452c4";
      ctx.fillRect(pad, pad, (g.player.hp / MAX_HP) * bw, bh);
      // enemy (right)
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(W - pad - bw, pad, bw, bh);
      ctx.fillStyle = "#a85fd6";
      const ew = (g.enemy.hp / MAX_HP) * bw;
      ctx.fillRect(W - pad - ew, pad, ew, bh);

      ctx.fillStyle = "#e9edf6";
      ctx.font = "bold 14px Segoe UI, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("OPTIMUS PRIME", pad, pad + bh + 16);
      ctx.textAlign = "right";
      ctx.fillText("MEGATRON", W - pad, pad + bh + 16);
      ctx.textAlign = "left";
    }

    function draw() {
      const g = gameRef.current;
      // sky
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, "#243b6b");
      sky.addColorStop(1, "#0a0d14");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);
      // distant towers
      ctx.fillStyle = "rgba(12,20,38,0.9)";
      for (let i = 0; i < 10; i++) {
        const tx = 40 + i * 92;
        const th = 70 + ((i * 53) % 120);
        ctx.fillRect(tx, GROUND - th, 40, th);
      }
      // ground
      ctx.fillStyle = "#05070d";
      ctx.fillRect(0, GROUND, W, H - GROUND);
      ctx.strokeStyle = "rgba(143,227,255,0.25)";
      ctx.beginPath();
      ctx.moveTo(0, GROUND);
      ctx.lineTo(W, GROUND);
      ctx.stroke();

      // projectiles
      for (const s of g.shots) {
        ctx.fillStyle = s.owner === "player" ? "#8fe3ff" : "#ff5050";
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 12;
        ctx.fillRect(s.x, s.y, s.w, s.h);
        ctx.shadowBlur = 0;
      }

      drawBot(g.enemy, "enemy");
      drawBot(g.player, "player");
      drawHealth();
    }

    // ---------- loop ----------
    function frame(t) {
      const g = gameRef.current;
      if (!g.last) g.last = t;
      const dt = clamp((t - g.last) / 1000, 0, 0.033);
      g.last = t;
      update(dt);
      draw();
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  // ---- touch / on-screen controls ----
  const hold = (key) => ({
    onPointerDown: (e) => {
      e.preventDefault();
      gameRef.current.keys[key] = true;
    },
    onPointerUp: (e) => {
      e.preventDefault();
      if (key === "left" || key === "right") gameRef.current.keys[key] = false;
    },
    onPointerLeave: () => {
      if (key === "left" || key === "right") gameRef.current.keys[key] = false;
    },
  });

  const status = statusRef.current;
  const result = gameRef.current.result;

  return (
    <div className="fight">
      <div className="fight-stage">
        <canvas ref={canvasRef} width={W} height={H} className="fight-canvas" />

        {status !== "playing" && (
          <div className="fight-overlay">
            {status === "ready" ? (
              <>
                <h2>Optimus Prime vs. Megatron</h2>
                <p>Defeat Megatron in real-time combat.</p>
                <button className="btn btn-primary btn-lg" onClick={start}>
                  Start Battle
                </button>
              </>
            ) : (
              <>
                <h2>{result === "win" ? "Victory! 🏆" : "Defeated 💀"}</h2>
                <p>
                  {result === "win"
                    ? "Optimus Prime stands triumphant. Till all are one!"
                    : "Megatron has won this round — the war continues."}
                </p>
                <button className="btn btn-primary btn-lg" onClick={start}>
                  Battle Again
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="fight-help">
        <span><kbd>A</kbd>/<kbd>D</kbd> or <kbd>←</kbd>/<kbd>→</kbd> move</span>
        <span><kbd>W</kbd>/<kbd>Space</kbd> jump</span>
        <span><kbd>F</kbd> blade</span>
        <span><kbd>G</kbd> energon blast</span>
      </div>

      {/* on-screen controls for touch devices */}
      <div className="touch-controls" aria-hidden="true">
        <div className="pad">
          <button className="tbtn" {...hold("left")}>◀</button>
          <button className="tbtn" {...hold("right")}>▶</button>
        </div>
        <div className="pad">
          <button className="tbtn" {...hold("jump")}>⤒</button>
          <button className="tbtn atk" {...hold("attack")}>⚔️</button>
          <button className="tbtn spc" {...hold("special")}>✦</button>
        </div>
      </div>
    </div>
  );
}
