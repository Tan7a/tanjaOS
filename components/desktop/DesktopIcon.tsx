"use client";

import { type ReactNode } from "react";

interface DesktopIconProps {
  title: string;
  icon: ReactNode;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

export default function DesktopIcon({
  title,
  icon,
  selected,
  onSelect,
  onOpen,
}: DesktopIconProps) {
  return (
    <button
      onClick={onSelect}
      onDoubleClick={onOpen}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: 80,
        padding: 4,
        background: "transparent",
        border: selected ? "1px dotted rgba(255, 255, 255, 0.65)" : "1px dotted transparent",
        cursor: "default",
        userSelect: "none",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          filter: selected ? "brightness(0.85) saturate(0.9)" : "none",
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontFamily: "var(--xp-font)",
          fontSize: 11,
          color: "#FFFFFF",
          textAlign: "center",
          padding: selected ? "0 3px" : "0 1px",
          background: selected ? "var(--xp-selection)" : "transparent",
          textShadow: selected ? "none" : "1px 1px 1px rgba(0, 0, 0, 0.85)",
          maxWidth: 76,
          wordBreak: "break-word",
          lineHeight: 1.2,
        }}
      >
        {title}
      </span>
    </button>
  );
}
