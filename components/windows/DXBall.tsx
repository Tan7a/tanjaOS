"use client";

import { useEffect, useRef, useState } from "react";

const CANVAS_W = 480;
const CANVAS_H = 470;
const PADDLE_W = 80;
const PADDLE_H = 12;
const BALL_R = 6;
const BRICK_COLS = 10;
const BRICK_ROWS = 6;
const BRICK_GAP = 3;
const BRICK_TOP = 50;
const BRICK_LEFT = 8;
const BRICK_W = (CANVAS_W - BRICK_LEFT * 2 - BRICK_GAP * (BRICK_COLS - 1)) / BRICK_COLS;
const BRICK_H = 18;
const ROW_COLORS = ["#E64545", "#F0883A", "#F2C636", "#5BC04C", "#3A8FE0", "#9E5BD8"];

type Status = "idle" | "playing" | "gameover" | "won";

interface Brick {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  alive: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
}

interface GameState {
  ball: { x: number; y: number; vx: number; vy: number };
  paddle: { x: number };
  bricks: Brick[];
  particles: Particle[];
  score: number;
  lives: number;
  status: Status;
  level: number;
}

function buildBricks(): Brick[] {
  const bricks: Brick[] = [];
  for (let r = 0; r < BRICK_ROWS; r++) {
    for (let c = 0; c < BRICK_COLS; c++) {
      bricks.push({
        x: BRICK_LEFT + c * (BRICK_W + BRICK_GAP),
        y: BRICK_TOP + r * (BRICK_H + BRICK_GAP),
        w: BRICK_W,
        h: BRICK_H,
        color: ROW_COLORS[r],
        alive: true,
      });
    }
  }
  return bricks;
}

function freshState(level = 1, score = 0): GameState {
  return {
    ball: { x: CANVAS_W / 2, y: CANVAS_H - PADDLE_H - 30, vx: 0, vy: 0 },
    paddle: { x: CANVAS_W / 2 - PADDLE_W / 2 },
    bricks: buildBricks(),
    particles: [],
    score,
    lives: 3,
    status: "idle",
    level,
  };
}

interface Hud {
  score: number;
  lives: number;
  level: number;
}

export default function DXBall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(freshState());
  const [hud, setHud] = useState<Hud>({ score: 0, lives: 3, level: 1 });

  // Main RAF loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let lastHudUpdate = 0;

    const tick = (now: number) => {
      const s = stateRef.current;
      step(s);
      draw(ctx, s);

      // Refresh React HUD ~10fps so score/lives stay in sync
      if (now - lastHudUpdate > 100) {
        lastHudUpdate = now;
        setHud((prev) =>
          prev.score === s.score && prev.lives === s.lives && prev.level === s.level
            ? prev
            : { score: s.score, lives: s.lives, level: s.level },
        );
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, []);

  // Mouse → paddle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const x = (e.clientX - rect.left) * scaleX;
      stateRef.current.paddle.x = clamp(x - PADDLE_W / 2, 0, CANVAS_W - PADDLE_W);
    };
    const onClick = () => {
      const s = stateRef.current;
      if (s.status === "idle") {
        s.status = "playing";
        s.ball.vx = (Math.random() > 0.5 ? 1 : -1) * 2.6;
        s.ball.vy = -4;
      }
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("click", onClick);
    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  // Spacebar → restart on game-over/won
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      const s = stateRef.current;
      if (s.status === "gameover" || s.status === "won") {
        stateRef.current = freshState(s.status === "won" ? s.level + 1 : 1, s.status === "won" ? s.score : 0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        background: "#000011",
      }}
    >
      {/* HUD */}
      <div
        style={{
          height: 30,
          flexShrink: 0,
          background: "#0A0A1F",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          fontFamily: "var(--xp-font)",
          fontSize: 11,
          borderBottom: "1px solid #1A1A4F",
        }}
      >
        <span>Score: {hud.score}</span>
        <span>Level {hud.level}</span>
        <span>
          Lives:{" "}
          <span style={{ color: "#E64545", letterSpacing: 1 }}>
            {"●".repeat(Math.max(0, hud.lives))}
          </span>
        </span>
      </div>

      <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            background: "#000011",
            cursor: "default",
          }}
          onMouseDown={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}

function step(s: GameState) {
  // Particles
  for (const p of s.particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.18;
    p.life -= 1;
  }
  s.particles = s.particles.filter((p) => p.life > 0);

  if (s.status !== "playing") return;

  const b = s.ball;
  b.x += b.vx;
  b.y += b.vy;

  // Walls
  if (b.x - BALL_R < 0) {
    b.x = BALL_R;
    b.vx *= -1;
  }
  if (b.x + BALL_R > CANVAS_W) {
    b.x = CANVAS_W - BALL_R;
    b.vx *= -1;
  }
  if (b.y - BALL_R < 0) {
    b.y = BALL_R;
    b.vy *= -1;
  }

  // Paddle
  const py = CANVAS_H - 24;
  if (
    b.vy > 0 &&
    b.y + BALL_R >= py &&
    b.y - BALL_R <= py + PADDLE_H &&
    b.x >= s.paddle.x &&
    b.x <= s.paddle.x + PADDLE_W
  ) {
    b.y = py - BALL_R;
    b.vy = -Math.abs(b.vy);
    const center = s.paddle.x + PADDLE_W / 2;
    const offset = (b.x - center) / (PADDLE_W / 2);
    b.vx = offset * 4.5;
  }

  // Bricks
  for (const brick of s.bricks) {
    if (!brick.alive) continue;
    if (
      b.x + BALL_R >= brick.x &&
      b.x - BALL_R <= brick.x + brick.w &&
      b.y + BALL_R >= brick.y &&
      b.y - BALL_R <= brick.y + brick.h
    ) {
      brick.alive = false;
      s.score += 10;

      // Determine bounce axis: how far the ball center is from each edge
      const overlapLeft = b.x + BALL_R - brick.x;
      const overlapRight = brick.x + brick.w - (b.x - BALL_R);
      const overlapTop = b.y + BALL_R - brick.y;
      const overlapBottom = brick.y + brick.h - (b.y - BALL_R);
      const minH = Math.min(overlapLeft, overlapRight);
      const minV = Math.min(overlapTop, overlapBottom);
      if (minH < minV) b.vx *= -1;
      else b.vy *= -1;

      // Particles
      for (let i = 0; i < 5; i++) {
        s.particles.push({
          x: brick.x + brick.w / 2,
          y: brick.y + brick.h / 2,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4 - 1,
          color: brick.color,
          life: 22,
        });
      }
      break; // one brick per frame
    }
  }

  // Lose life
  if (b.y - BALL_R > CANVAS_H) {
    s.lives -= 1;
    if (s.lives <= 0) {
      s.status = "gameover";
    } else {
      s.ball = { x: CANVAS_W / 2, y: CANVAS_H - PADDLE_H - 30, vx: 0, vy: 0 };
      s.status = "idle";
    }
  }

  // Win
  if (s.bricks.every((br) => !br.alive)) {
    s.status = "won";
  }
}

function draw(ctx: CanvasRenderingContext2D, s: GameState) {
  // Background
  ctx.fillStyle = "#000011";
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Logo
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 14px Tahoma, Arial, sans-serif";
  ctx.fillText("DX-Ball 2", 8, 22);
  ctx.fillStyle = "#5BC0F8";
  ctx.font = "11px Tahoma, Arial, sans-serif";
  ctx.fillText("click to launch • mouse moves paddle", 88, 22);

  // Bricks
  for (const brick of s.bricks) {
    if (!brick.alive) continue;
    drawBrick(ctx, brick);
  }

  // Particles
  for (const p of s.particles) {
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(0, p.life / 22);
    ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
  }
  ctx.globalAlpha = 1;

  // Paddle
  const py = CANVAS_H - 24;
  const grad = ctx.createLinearGradient(0, py, 0, py + PADDLE_H);
  grad.addColorStop(0, "#7BB6F8");
  grad.addColorStop(0.5, "#3A8FE0");
  grad.addColorStop(1, "#1A5FBF");
  ctx.fillStyle = grad;
  roundRect(ctx, s.paddle.x, py, PADDLE_W, PADDLE_H, 6);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  roundRect(ctx, s.paddle.x + 4, py + 1, PADDLE_W - 8, 3, 2);
  ctx.fill();

  // Ball
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.arc(s.ball.x, s.ball.y, BALL_R, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.beginPath();
  ctx.arc(s.ball.x - 2, s.ball.y - 2, BALL_R / 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Overlays
  if (s.status === "gameover") {
    overlay(ctx, "Game Over", "Press Space to restart");
  } else if (s.status === "won") {
    overlay(ctx, "Level Complete!", "Press Space for next level");
  } else if (s.status === "idle" && s.lives === 3 && s.score === 0) {
    overlay(ctx, "Click to start", "");
  }
}

function drawBrick(ctx: CanvasRenderingContext2D, brick: Brick) {
  // base
  ctx.fillStyle = brick.color;
  roundRect(ctx, brick.x, brick.y, brick.w, brick.h, 3);
  ctx.fill();
  // top highlight
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  roundRect(ctx, brick.x + 2, brick.y + 1, brick.w - 4, 4, 2);
  ctx.fill();
  // bottom shadow
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(brick.x + 2, brick.y + brick.h - 2, brick.w - 4, 1);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function overlay(ctx: CanvasRenderingContext2D, title: string, subtitle: string) {
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.fillRect(0, CANVAS_H / 2 - 60, CANVAS_W, 120);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 28px Tahoma, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(title, CANVAS_W / 2, CANVAS_H / 2);
  if (subtitle) {
    ctx.font = "12px Tahoma, Arial, sans-serif";
    ctx.fillText(subtitle, CANVAS_W / 2, CANVAS_H / 2 + 24);
  }
  ctx.textAlign = "start";
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}
