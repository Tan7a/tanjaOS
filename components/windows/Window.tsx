"use client";

import Draggable, { type DraggableEventHandler } from "react-draggable";
import { useRef, type ReactNode } from "react";

interface WindowProps {
  id: string;
  title: string;
  icon?: ReactNode;
  initialPosition: { x: number; y: number };
  initialSize: { width: number; height: number };
  zIndex: number;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onPositionChange?: (pos: { x: number; y: number }) => void;
  children: ReactNode;
}

export default function Window({
  title,
  icon,
  initialPosition,
  initialSize,
  zIndex,
  isActive,
  onClose,
  onMinimize,
  onFocus,
  onPositionChange,
  children,
}: WindowProps) {
  const nodeRef = useRef<HTMLDivElement>(null!);

  const handleStop: DraggableEventHandler = (_e, data) => {
    onPositionChange?.({ x: data.x, y: data.y });
  };

  const titleBarBg = isActive
    ? "linear-gradient(to right, var(--xp-title-active-start), var(--xp-title-active-end))"
    : "linear-gradient(to right, var(--xp-title-inactive-start), var(--xp-title-inactive-end))";

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={initialPosition}
      handle=".xp-titlebar"
      bounds="parent"
      onStop={handleStop}
      onStart={onFocus}
    >
      <div
        ref={nodeRef}
        onMouseDown={onFocus}
        className="absolute xp-no-select"
        style={{
          width: initialSize.width,
          height: initialSize.height,
          zIndex,
          background: "var(--xp-window-bg)",
          border: "3px solid var(--xp-window-border)",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          boxShadow:
            "inset 0 0 0 1px #80B0FF, 2px 2px 8px rgba(0, 0, 0, 0.4)",
          fontFamily: "var(--xp-font)",
          fontSize: "var(--xp-font-size)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Title bar */}
        <div
          className="xp-titlebar"
          style={{
            height: 28,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            paddingLeft: 4,
            paddingRight: 4,
            gap: 6,
            background: titleBarBg,
            color: "var(--xp-text-on-title)",
            cursor: "default",
            borderBottom: "1px solid #1A4FB8",
          }}
        >
          {icon ? (
            <span
              style={{
                width: 16,
                height: 16,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {icon}
            </span>
          ) : null}
          <span
            style={{
              flex: 1,
              fontWeight: "bold",
              fontSize: 11,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              textShadow: "1px 1px 0 rgba(0, 0, 0, 0.4)",
            }}
          >
            {title}
          </span>

          <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
            <TitleButton
              type="minimize"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
            />
            <TitleButton type="maximize" onClick={(e) => e.stopPropagation()} />
            <TitleButton
              type="close"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            background: "var(--xp-window-bg)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          {children}
        </div>
      </div>
    </Draggable>
  );
}

function TitleButton({
  type,
  onClick,
}: {
  type: "minimize" | "maximize" | "close";
  onClick: (e: React.MouseEvent) => void;
}) {
  const palette: Record<typeof type, { base: string; border: string }> = {
    minimize: { base: "#3A6FB5", border: "#1A3A6B" },
    maximize: { base: "#3A6FB5", border: "#1A3A6B" },
    close: { base: "#D85A4A", border: "#7A1A10" },
  };

  const colors = palette[type];

  return (
    <button
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
      aria-label={type}
      style={{
        width: 22,
        height: 22,
        padding: 0,
        borderRadius: 3,
        border: `1px solid ${colors.border}`,
        background: `linear-gradient(to bottom, ${lighten(colors.base, 0.3)} 0%, ${colors.base} 45%, ${darken(colors.base, 0.15)} 100%)`,
        color: "#FFFFFF",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.4)",
      }}
    >
      <ButtonGlyph type={type} />
      {/* top highlight */}
      <span
        style={{
          position: "absolute",
          top: 1,
          left: 2,
          right: 2,
          height: 6,
          background: "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0))",
          borderRadius: 2,
          pointerEvents: "none",
        }}
      />
    </button>
  );
}

function ButtonGlyph({ type }: { type: "minimize" | "maximize" | "close" }) {
  if (type === "close") {
    return (
      <svg width="10" height="10" viewBox="0 0 10 10">
        <path
          d="M2 2 L8 8 M8 2 L2 8"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (type === "maximize") {
    return (
      <svg width="10" height="10" viewBox="0 0 10 10">
        <rect x="1.5" y="1.5" width="7" height="7" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
        <line x1="1.5" y1="3" x2="8.5" y2="3" stroke="#FFFFFF" strokeWidth="1.2" />
      </svg>
    );
  }
  // minimize
  return (
    <svg width="10" height="10" viewBox="0 0 10 10">
      <line x1="2" y1="7.5" x2="8" y2="7.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// crude colour helpers — fine for our 2-3 button palette
function lighten(hex: string, amt: number) {
  return mix(hex, "#FFFFFF", amt);
}
function darken(hex: string, amt: number) {
  return mix(hex, "#000000", amt);
}
function mix(a: string, b: string, t: number) {
  const pa = parse(a);
  const pb = parse(b);
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}
function parse(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}
