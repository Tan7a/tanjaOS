"use client";

import Draggable from "react-draggable";
import { useRef, type ReactNode, type CSSProperties } from "react";
import type { DesktopIconPosition } from "@/lib/apps";

interface DesktopIconProps {
  title: string;
  icon: ReactNode;
  selected: boolean;
  /** Anchor-positioned, draggable mode (desktop). Required when layout is "anchored". */
  position?: DesktopIconPosition;
  /** "anchored" (default, desktop) or "grid" (mobile, no abs positioning, no drag). */
  layout?: "anchored" | "grid";
  onSelect: () => void;
  onOpen: () => void;
}

function anchorToCss(pos: DesktopIconPosition): CSSProperties {
  const anchor = pos.anchor ?? "tl";
  const css: CSSProperties = { position: "absolute" };
  if (anchor[0] === "t") css.top = pos.y;
  else css.bottom = pos.y;
  if (anchor[1] === "l") css.left = pos.x;
  else css.right = pos.x;
  return css;
}

export default function DesktopIcon({
  title,
  icon,
  selected,
  position,
  layout = "anchored",
  onSelect,
  onOpen,
}: DesktopIconProps) {
  const nodeRef = useRef<HTMLDivElement>(null!);

  const inner = (
    <button
      onClick={onSelect}
      onDoubleClick={onOpen}
      onTouchEnd={(e) => {
        if (layout === "grid") {
          e.preventDefault();
          onOpen();
        }
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "100%",
        padding: 4,
        background: "transparent",
        border: selected
          ? "1px dotted rgba(255, 255, 255, 0.65)"
          : "1px dotted transparent",
        cursor: "default",
        userSelect: "none",
        touchAction: "manipulation",
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
          maxWidth: "100%",
          wordBreak: "break-word",
          lineHeight: 1.2,
        }}
      >
        {title}
      </span>
    </button>
  );

  if (layout === "grid") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {inner}
      </div>
    );
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={{ x: 0, y: 0 }}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        style={{
          ...(position ? anchorToCss(position) : { position: "absolute" }),
          zIndex: 10,
          width: 80,
        }}
      >
        {inner}
      </div>
    </Draggable>
  );
}
