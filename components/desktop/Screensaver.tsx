"use client";

import { useEffect, useMemo, useState } from "react";

interface ScreensaverProps {
  onDismiss: () => void;
}

type FishType = "clown" | "blueTang" | "yellowTang" | "angel" | "butterfly";

interface Fish {
  id: number;
  type: FishType;
  topPct: number;
  durationS: number;
  delayS: number;
  scale: number;
  reverse: boolean;
}

interface Bubble {
  id: number;
  leftPct: number;
  size: number;
  durationS: number;
  delayS: number;
}

const FISH_COUNT = 9;
const BUBBLE_COUNT = 26;

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function pickType(i: number): FishType {
  const types: FishType[] = ["clown", "clown", "blueTang", "yellowTang", "angel", "butterfly"];
  return types[i % types.length];
}

export default function Screensaver({ onDismiss }: ScreensaverProps) {
  const [showHint, setShowHint] = useState(false);
  const [now, setNow] = useState(() => new Date());

  const fish = useMemo<Fish[]>(
    () =>
      Array.from({ length: FISH_COUNT }, (_, i) => ({
        id: i,
        type: pickType(i),
        topPct: rand(10, 70),
        durationS: rand(28, 46),
        delayS: rand(-30, 0),
        scale: rand(0.6, 1.15),
        reverse: Math.random() > 0.5,
      })),
    [],
  );

  const bubbles = useMemo<Bubble[]>(
    () =>
      Array.from({ length: BUBBLE_COUNT }, (_, i) => ({
        id: i,
        leftPct: rand(0, 100),
        size: rand(3, 12),
        durationS: rand(8, 18),
        delayS: rand(-14, 0),
      })),
    [],
  );

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const dismiss = () => onDismiss();
    window.addEventListener("mousedown", dismiss);
    window.addEventListener("keydown", dismiss);
    window.addEventListener("touchstart", dismiss);
    return () => {
      window.removeEventListener("mousedown", dismiss);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("touchstart", dismiss);
    };
  }, [onDismiss]);

  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const hourAngle = (hours + minutes / 60) * 30;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const secondAngle = seconds * 6;
  const digital = formatDigital(now);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background:
          "linear-gradient(to bottom, #021833 0%, #053458 40%, #0A5C8A 80%, #1A89AE 100%)",
        overflow: "hidden",
        cursor: "none",
        animation: "tanja-screensaver-fade 350ms ease-out both",
      }}
    >
      <style>{`
        @keyframes tanja-screensaver-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes tanja-fish-l {
          0% { transform: translateX(110vw) translateY(0px); }
          25% { transform: translateX(80vw) translateY(-8px); }
          50% { transform: translateX(50vw) translateY(4px); }
          75% { transform: translateX(20vw) translateY(-6px); }
          100% { transform: translateX(-30vw) translateY(0px); }
        }
        @keyframes tanja-fish-r {
          0% { transform: translateX(-30vw) translateY(0px) scaleX(-1); }
          25% { transform: translateX(20vw) translateY(-8px) scaleX(-1); }
          50% { transform: translateX(50vw) translateY(4px) scaleX(-1); }
          75% { transform: translateX(80vw) translateY(-6px) scaleX(-1); }
          100% { transform: translateX(110vw) translateY(0px) scaleX(-1); }
        }
        @keyframes tanja-bubble {
          0% { transform: translateY(0); opacity: 0; }
          12% { opacity: 0.8; }
          100% { transform: translateY(-110vh); opacity: 0; }
        }
        @keyframes tanja-anemone-sway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes tanja-caustics {
          0%, 100% { opacity: 0.18; transform: translateX(0); }
          50% { opacity: 0.32; transform: translateX(20px); }
        }
        @keyframes tanja-hint-fade {
          from { opacity: 0; }
          to { opacity: 0.85; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tanja-anim { animation: none !important; }
        }
      `}</style>

      {/* light shafts from above */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 25% -15%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(ellipse at 65% -10%, rgba(255,255,255,0.16), transparent 60%), radial-gradient(ellipse at 90% -8%, rgba(255,255,255,0.10), transparent 55%)",
          pointerEvents: "none",
        }}
      />

      {/* caustics overlay on the floor */}
      <div
        className="tanja-anim"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "55%",
          background:
            "repeating-radial-gradient(circle at 20% 80%, rgba(255,255,255,0.12) 0 6px, transparent 6px 22px), repeating-radial-gradient(circle at 70% 70%, rgba(255,255,255,0.10) 0 5px, transparent 5px 18px), repeating-radial-gradient(circle at 50% 95%, rgba(255,255,255,0.08) 0 4px, transparent 4px 14px)",
          mixBlendMode: "screen",
          pointerEvents: "none",
          animation: "tanja-caustics 9s ease-in-out infinite",
        }}
      />

      {/* fish layer */}
      {fish.map((f) => (
        <div
          key={f.id}
          className="tanja-anim"
          style={{
            position: "absolute",
            top: `${f.topPct}%`,
            left: 0,
            transform: `scale(${f.scale})`,
            animation: `${f.reverse ? "tanja-fish-r" : "tanja-fish-l"} ${f.durationS}s linear ${f.delayS}s infinite`,
            willChange: "transform",
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.35))",
          }}
        >
          <FishSvg type={f.type} />
        </div>
      ))}

      {/* bubbles */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "110vh",
          pointerEvents: "none",
        }}
      >
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="tanja-anim"
            style={{
              position: "absolute",
              left: `${b.leftPct}%`,
              bottom: 0,
              width: b.size,
              height: b.size,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.55)",
              boxShadow: "inset 1px 1px 2px rgba(255,255,255,0.95)",
              animation: `tanja-bubble ${b.durationS}s linear ${b.delayS}s infinite`,
            }}
          />
        ))}
      </div>

      {/* reef foreground */}
      <ReefFloor />

      {/* analog clock with digital read */}
      <div
        style={{
          position: "absolute",
          right: 40,
          top: 40,
          width: 130,
          height: 156,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "#FFFFFF",
          fontFamily: "Tahoma, sans-serif",
          textShadow: "0 1px 4px rgba(0,0,0,0.6)",
          opacity: 0.92,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <defs>
            <radialGradient id="clockFace" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.20)" />
              <stop offset="100%" stopColor="rgba(0,30,60,0.55)" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="56" fill="url(#clockFace)" stroke="rgba(255,255,255,0.65)" strokeWidth="2" />
          <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          {/* hour ticks */}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 - 90) * (Math.PI / 180);
            const x1 = 60 + Math.cos(a) * 50;
            const y1 = 60 + Math.sin(a) * 50;
            const x2 = 60 + Math.cos(a) * 44;
            const y2 = 60 + Math.sin(a) * 44;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#FFFFFF"
                strokeWidth={i % 3 === 0 ? 2.2 : 1.2}
                strokeLinecap="round"
              />
            );
          })}
          {/* hour hand */}
          <line
            x1="60"
            y1="60"
            x2={60 + Math.cos((hourAngle - 90) * (Math.PI / 180)) * 30}
            y2={60 + Math.sin((hourAngle - 90) * (Math.PI / 180)) * 30}
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* minute hand */}
          <line
            x1="60"
            y1="60"
            x2={60 + Math.cos((minuteAngle - 90) * (Math.PI / 180)) * 44}
            y2={60 + Math.sin((minuteAngle - 90) * (Math.PI / 180)) * 44}
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* second hand */}
          <line
            x1="60"
            y1="60"
            x2={60 + Math.cos((secondAngle - 90) * (Math.PI / 180)) * 48}
            y2={60 + Math.sin((secondAngle - 90) * (Math.PI / 180)) * 48}
            stroke="#FFD56B"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="60" cy="60" r="3.5" fill="#FFD56B" />
        </svg>
        <span style={{ fontSize: 13, letterSpacing: 1, fontVariantNumeric: "tabular-nums" }}>
          {digital}
        </span>
      </div>

      {showHint && (
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            color: "#FFFFFF",
            fontFamily: "Tahoma, sans-serif",
            fontSize: 12,
            textShadow: "0 1px 4px rgba(0,0,0,0.6)",
            animation: "tanja-hint-fade 600ms ease-out both",
            opacity: 0.85,
            letterSpacing: 0.5,
          }}
        >
          click to dismiss
        </div>
      )}
    </div>
  );
}

function formatDigital(d: Date) {
  const h = d.getHours().toString().padStart(2, "0");
  const m = d.getMinutes().toString().padStart(2, "0");
  const s = d.getSeconds().toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function FishSvg({ type }: { type: FishType }) {
  switch (type) {
    case "clown":
      return (
        <svg width="78" height="40" viewBox="0 0 78 40">
          <defs>
            <linearGradient id="clownBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFB95A" />
              <stop offset="100%" stopColor="#E0651A" />
            </linearGradient>
          </defs>
          <ellipse cx="34" cy="20" rx="26" ry="11" fill="url(#clownBody)" stroke="#7A2A0A" strokeWidth="0.8" />
          <path d="M60 20 L76 8 L72 20 L76 32 Z" fill="url(#clownBody)" stroke="#7A2A0A" strokeWidth="0.8" />
          {/* white stripes outlined in black */}
          <path d="M22 11 Q24 20 22 29 L18 29 Q20 20 18 11 Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.7" />
          <path d="M40 10 Q43 20 40 30 L36 30 Q39 20 36 10 Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.7" />
          <path d="M53 12 Q55 20 53 28 L49 28 Q51 20 49 12 Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.7" />
          {/* fin */}
          <path d="M30 11 L40 5 L42 13 Z" fill="#E0651A" stroke="#7A2A0A" strokeWidth="0.6" />
          <ellipse cx="14" cy="18" rx="2.5" ry="2.5" fill="#FFFFFF" />
          <circle cx="13.5" cy="18" r="1.2" fill="#0F0F0F" />
        </svg>
      );
    case "blueTang":
      return (
        <svg width="76" height="42" viewBox="0 0 76 42">
          <defs>
            <linearGradient id="tangBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5BC4F0" />
              <stop offset="100%" stopColor="#1F5AA8" />
            </linearGradient>
          </defs>
          <ellipse cx="34" cy="22" rx="26" ry="13" fill="url(#tangBody)" stroke="#0A2F6B" strokeWidth="0.8" />
          {/* black palette pattern */}
          <path d="M14 22 Q22 12 38 14 Q34 22 38 30 Q22 32 14 22 Z" fill="#0F2348" opacity="0.85" />
          {/* yellow tail */}
          <path d="M58 22 L74 10 L70 22 L74 34 Z" fill="#FFD23F" stroke="#7A4A00" strokeWidth="0.7" />
          {/* fins */}
          <path d="M30 12 L36 4 L40 13 Z" fill="#1F5AA8" stroke="#0A2F6B" strokeWidth="0.6" />
          <path d="M30 32 L36 40 L40 32 Z" fill="#1F5AA8" stroke="#0A2F6B" strokeWidth="0.6" />
          <ellipse cx="14" cy="20" rx="2" ry="2" fill="#FFFFFF" />
          <circle cx="13.5" cy="20" r="1" fill="#0F0F0F" />
        </svg>
      );
    case "yellowTang":
      return (
        <svg width="68" height="42" viewBox="0 0 68 42">
          <defs>
            <linearGradient id="ytangBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFE574" />
              <stop offset="100%" stopColor="#E0A82A" />
            </linearGradient>
          </defs>
          <ellipse cx="30" cy="22" rx="22" ry="14" fill="url(#ytangBody)" stroke="#7A5A10" strokeWidth="0.7" />
          {/* pointy snout */}
          <path d="M8 22 L0 22 L8 18 Z" fill="#FFE574" stroke="#7A5A10" strokeWidth="0.6" />
          {/* tail */}
          <path d="M50 22 L66 12 L62 22 L66 32 Z" fill="url(#ytangBody)" stroke="#7A5A10" strokeWidth="0.7" />
          {/* fins */}
          <path d="M26 8 L32 0 L36 12 Z" fill="#E0A82A" stroke="#7A5A10" strokeWidth="0.6" />
          <path d="M26 36 L32 42 L36 32 Z" fill="#E0A82A" stroke="#7A5A10" strokeWidth="0.6" />
          <ellipse cx="14" cy="20" rx="1.6" ry="1.6" fill="#FFFFFF" />
          <circle cx="13.7" cy="20" r="0.9" fill="#0F0F0F" />
        </svg>
      );
    case "angel":
      return (
        <svg width="72" height="56" viewBox="0 0 72 56">
          <defs>
            <linearGradient id="angelBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F8F0DC" />
              <stop offset="100%" stopColor="#A8743A" />
            </linearGradient>
          </defs>
          <ellipse cx="32" cy="28" rx="24" ry="18" fill="url(#angelBody)" stroke="#5A3A18" strokeWidth="0.7" />
          {/* vertical dark stripes */}
          <path d="M22 12 Q22 28 22 44 L18 42 Q19 28 18 14 Z" fill="#5A3A18" opacity="0.55" />
          <path d="M34 10 Q34 28 34 46 L30 44 Q31 28 30 12 Z" fill="#5A3A18" opacity="0.55" />
          <path d="M46 14 Q46 28 46 42 L42 40 Q43 28 42 16 Z" fill="#5A3A18" opacity="0.55" />
          {/* tail */}
          <path d="M54 28 L70 18 L66 28 L70 38 Z" fill="#A8743A" stroke="#5A3A18" strokeWidth="0.7" />
          {/* tall fins */}
          <path d="M26 10 L36 -2 L42 12 Z" fill="#C89A60" stroke="#5A3A18" strokeWidth="0.6" />
          <path d="M26 46 L36 58 L42 44 Z" fill="#C89A60" stroke="#5A3A18" strokeWidth="0.6" />
          <ellipse cx="14" cy="26" rx="2" ry="2" fill="#FFFFFF" />
          <circle cx="13.6" cy="26" r="1.1" fill="#0F0F0F" />
        </svg>
      );
    case "butterfly":
      return (
        <svg width="64" height="42" viewBox="0 0 64 42">
          <defs>
            <linearGradient id="bfBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F2C236" />
            </linearGradient>
          </defs>
          <ellipse cx="28" cy="22" rx="22" ry="13" fill="url(#bfBody)" stroke="#7A5A10" strokeWidth="0.7" />
          {/* diagonal yellow stripes */}
          <path d="M14 12 L24 32" stroke="#F2C236" strokeWidth="2.5" />
          <path d="M22 10 L32 34" stroke="#F2C236" strokeWidth="2.5" />
          <path d="M30 10 L40 34" stroke="#F2C236" strokeWidth="2.5" />
          {/* eye band */}
          <path d="M10 16 Q12 22 10 28" stroke="#1A1A1A" strokeWidth="2.5" fill="none" />
          {/* tail */}
          <path d="M48 22 L62 12 L58 22 L62 32 Z" fill="#F2C236" stroke="#7A5A10" strokeWidth="0.6" />
          {/* fins */}
          <path d="M26 10 L32 2 L36 12 Z" fill="#F2C236" stroke="#7A5A10" strokeWidth="0.5" />
          <path d="M26 34 L32 42 L36 32 Z" fill="#F2C236" stroke="#7A5A10" strokeWidth="0.5" />
          <circle cx="14" cy="22" r="1" fill="#FFFFFF" />
        </svg>
      );
  }
}

function ReefFloor() {
  return (
    <>
      {/* sand */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 70,
          background:
            "linear-gradient(to bottom, #D9B57A 0%, #B8924A 50%, #876530 100%)",
          boxShadow: "inset 0 6px 18px rgba(0,0,0,0.45)",
        }}
      />
      {/* mounds */}
      <div
        style={{
          position: "absolute",
          left: -40,
          right: -40,
          bottom: 50,
          height: 80,
          background:
            "radial-gradient(ellipse at 18% 100%, #A07F38 0 90px, transparent 100px), radial-gradient(ellipse at 50% 100%, #B8924A 0 140px, transparent 150px), radial-gradient(ellipse at 84% 100%, #A07F38 0 110px, transparent 120px)",
          opacity: 0.95,
          pointerEvents: "none",
        }}
      />

      {/* coral / anemone clusters */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 200,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-around",
          pointerEvents: "none",
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <ReefCluster key={i} variant={(i % 5) as 0 | 1 | 2 | 3 | 4} />
        ))}
      </div>
    </>
  );
}

function ReefCluster({ variant }: { variant: 0 | 1 | 2 | 3 | 4 }) {
  if (variant === 0) {
    // purple anemone
    return (
      <div
        className="tanja-anim"
        style={{
          transformOrigin: "bottom center",
          animation: "tanja-anemone-sway 5s ease-in-out infinite",
          marginBottom: 10,
        }}
      >
        <svg width="90" height="120" viewBox="0 0 90 120">
          <ellipse cx="45" cy="115" rx="32" ry="8" fill="#5A2A8B" opacity="0.8" />
          {Array.from({ length: 18 }).map((_, i) => {
            const angle = (i / 17) * 180 - 90;
            const x = 45 + Math.sin((angle * Math.PI) / 180) * 28;
            const sway = Math.cos((angle * Math.PI) / 180) * 4;
            const len = 80 + Math.cos((angle * Math.PI) / 180) * 20;
            return (
              <path
                key={i}
                d={`M${x} 115 Q${x + sway} ${115 - len / 2} ${x + sway * 2} ${115 - len}`}
                stroke={i % 3 === 0 ? "#C84AA8" : "#9E5BD8"}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      </div>
    );
  }
  if (variant === 1) {
    // pink soft coral
    return (
      <div
        className="tanja-anim"
        style={{
          transformOrigin: "bottom center",
          animation: "tanja-anemone-sway 7s ease-in-out infinite",
        }}
      >
        <svg width="80" height="160" viewBox="0 0 80 160">
          <ellipse cx="40" cy="155" rx="28" ry="6" fill="#7A1A40" opacity="0.6" />
          <path d="M40 155 Q34 110 28 70 Q22 30 30 10" stroke="#E64A8A" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M40 155 Q44 120 50 80 Q56 40 50 20" stroke="#FFA0C8" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M40 155 Q42 110 48 70 Q56 30 60 14" stroke="#E64A8A" strokeWidth="4" fill="none" strokeLinecap="round" />
          {Array.from({ length: 14 }).map((_, i) => (
            <circle key={i} cx={20 + Math.random() * 50} cy={20 + i * 9} r="3" fill="#FFC8DC" opacity="0.85" />
          ))}
        </svg>
      </div>
    );
  }
  if (variant === 2) {
    // brain coral
    return (
      <div style={{ marginBottom: 0 }}>
        <svg width="120" height="60" viewBox="0 0 120 60">
          <defs>
            <radialGradient id="brain" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F2C2A6" />
              <stop offset="100%" stopColor="#A06A3A" />
            </radialGradient>
          </defs>
          <ellipse cx="60" cy="55" rx="58" ry="22" fill="url(#brain)" stroke="#5A3A18" strokeWidth="0.6" />
          {Array.from({ length: 10 }).map((_, i) => (
            <path
              key={i}
              d={`M${10 + i * 11} 55 Q${15 + i * 11} ${42 + (i % 2) * 4} ${20 + i * 11} 55`}
              stroke="#5A3A18"
              strokeWidth="0.8"
              fill="none"
            />
          ))}
        </svg>
      </div>
    );
  }
  if (variant === 3) {
    // green seaweed strands
    return (
      <div
        className="tanja-anim"
        style={{
          transformOrigin: "bottom center",
          animation: "tanja-anemone-sway 6s ease-in-out infinite",
        }}
      >
        <svg width="60" height="180" viewBox="0 0 60 180">
          <path d="M30 180 Q14 130 30 90 Q46 50 26 14" stroke="#2E9A4A" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M30 180 Q44 140 30 100 Q14 60 38 22" stroke="#1F7A3A" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M30 180 Q24 130 36 90 Q48 50 30 18" stroke="#3FBA5A" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  // staghorn coral
  return (
    <div style={{ marginBottom: 4 }}>
      <svg width="120" height="140" viewBox="0 0 120 140">
        <path d="M60 140 L60 70" stroke="#D8A878" strokeWidth="9" strokeLinecap="round" />
        <path d="M60 90 L40 60" stroke="#D8A878" strokeWidth="6" strokeLinecap="round" />
        <path d="M60 80 L80 50" stroke="#D8A878" strokeWidth="6" strokeLinecap="round" />
        <path d="M40 60 L30 30" stroke="#D8A878" strokeWidth="5" strokeLinecap="round" />
        <path d="M40 60 L52 35" stroke="#D8A878" strokeWidth="4" strokeLinecap="round" />
        <path d="M80 50 L92 22" stroke="#D8A878" strokeWidth="5" strokeLinecap="round" />
        <path d="M80 50 L70 25" stroke="#D8A878" strokeWidth="4" strokeLinecap="round" />
        <path d="M60 70 L78 80" stroke="#D8A878" strokeWidth="5" strokeLinecap="round" />
        <path d="M60 70 L42 80" stroke="#D8A878" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
