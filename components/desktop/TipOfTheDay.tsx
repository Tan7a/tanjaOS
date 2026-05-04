"use client";

import { useEffect, useState } from "react";
import { BulbIcon } from "@/components/icons/AppIcons";

const TIPS = [
  'Did you know? Double-click "Connect to Internet" to dial up to TanjaNet.',
  "Tip: drag a window by its blue title bar.",
  "Welcome to TanjaOS. Make yourself at home.",
  "Try opening My Photos and waiting a moment. The 56k experience is worth it.",
  'Double-click "DX-Ball 2" if you want to lose ten minutes of your life.',
  "Inspiration is a real folder, not a metaphor. Open it.",
];

const ROTATE_MS = 30000;
const FADE_MS = 400;

export default function TipOfTheDay() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % TIPS.length);
        setVisible(true);
      }, FADE_MS);
    }, ROTATE_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        right: 14,
        bottom: 100,
        width: 280,
        zIndex: 1,
        background: "linear-gradient(to bottom, rgba(255,250,225,0.95), rgba(255,235,170,0.92))",
        border: "1px solid #B8862E",
        boxShadow: "1px 1px 0 #FFFFFF inset, 0 2px 6px rgba(0,0,0,0.25)",
        padding: "8px 10px",
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        fontFamily: "Tahoma, sans-serif",
        fontSize: 11,
        color: "#3A2A0A",
        pointerEvents: "none",
        userSelect: "none",
        transition: `opacity ${FADE_MS}ms ease-in-out`,
        opacity: visible ? 1 : 0,
      }}
    >
      <span style={{ flexShrink: 0 }}>
        <BulbIcon size={26} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: "bold", fontSize: 11, marginBottom: 2 }}>
          Tip of the day
        </div>
        <div style={{ lineHeight: 1.4 }}>{TIPS[index]}</div>
      </div>
    </div>
  );
}
