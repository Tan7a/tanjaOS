"use client";

import { useState } from "react";
import type { Book } from "@/lib/books";

interface BookSpineProps {
  book: Book;
  onClick: () => void;
}

const widthMap = { thin: 28, normal: 36, thick: 46 } as const;

export default function BookSpine({ book, onClick }: BookSpineProps) {
  const [hover, setHover] = useState(false);
  const width = widthMap[book.spineWidth ?? "normal"];
  const textColor = book.spineTextColor === "dark" ? "#1A1A1A" : "#FFFFFF";
  const stripeColor =
    book.spineTextColor === "dark"
      ? "rgba(0,0,0,0.18)"
      : "rgba(255,255,255,0.32)";

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={`Open ${book.title} by ${book.author}`}
      style={{
        position: "relative",
        width,
        height: 138,
        flexShrink: 0,
        padding: 0,
        border: "none",
        background: `linear-gradient(to right, ${shade(book.spineColor, -28)} 0%, ${book.spineColor} 18%, ${shade(book.spineColor, 16)} 50%, ${book.spineColor} 82%, ${shade(book.spineColor, -34)} 100%)`,
        boxShadow: hover
          ? "0 8px 12px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.4)"
          : "0 2px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.4)",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 120ms ease-out, box-shadow 120ms ease-out",
        cursor: "pointer",
        outline: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Top stripe */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 8,
          left: 4,
          right: 4,
          height: 4,
          background: stripeColor,
          borderRadius: 1,
        }}
      />
      {/* Bottom stripe */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 8,
          left: 4,
          right: 4,
          height: 4,
          background: stripeColor,
          borderRadius: 1,
        }}
      />
      {/* Vertical title */}
      <span
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          color: textColor,
          fontFamily: "'Times New Roman', Times, serif",
          fontWeight: 700,
          fontSize: width >= 40 ? 12 : 11,
          letterSpacing: 0.4,
          maxHeight: 110,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          textShadow:
            book.spineTextColor === "dark"
              ? "none"
              : "0 1px 1px rgba(0,0,0,0.4)",
        }}
      >
        {book.title}
      </span>
    </button>
  );
}

function shade(hex: string, amount: number): string {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  const r = Math.max(0, Math.min(255, ((num >> 16) & 0xff) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
