"use client";

import Draggable from "react-draggable";
import { useRef } from "react";

interface WindowProps {
  title: string;
  onClose: () => void;
  defaultPosition?: { x: number; y: number };
  children: React.ReactNode;
}

export default function Window({
  title,
  onClose,
  defaultPosition = { x: 80, y: 60 },
  children,
}: WindowProps) {
  const nodeRef = useRef<HTMLDivElement>(null!);

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={defaultPosition}
      handle=".window-titlebar"
      bounds="parent"
    >
      <div
        ref={nodeRef}
        className="absolute z-10 rounded-2xl shadow-2xl shadow-stone-400/30 overflow-hidden min-w-[280px]"
        style={{ background: "#fdf6ee" }}
      >
        {/* Title bar */}
        <div
          className="window-titlebar flex items-center gap-2 px-4 py-3 cursor-grab active:cursor-grabbing select-none"
          style={{ background: "#c8725a" }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close window"
            className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold transition-opacity hover:opacity-80"
            style={{ background: "#f2c894", color: "#7a3a25" }}
          >
            ×
          </button>

          <span
            className="font-display text-sm tracking-wide flex-1 text-center pr-4"
            style={{ color: "#fdf6ee" }}
          >
            {title}
          </span>
        </div>

        {/* Content */}
        <div className="window-content">{children}</div>
      </div>
    </Draggable>
  );
}
