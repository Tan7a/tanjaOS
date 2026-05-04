"use client";

import { useEffect, useRef, useState } from "react";

type Tool = "pencil" | "eraser" | "line" | "rect" | "ellipse";

const PALETTE = [
  "#000000", "#7F7F7F", "#880015", "#ED1C24", "#FF7F27", "#FFF200",
  "#22B14C", "#00A2E8", "#3F48CC", "#A349A4", "#FFFFFF", "#C3C3C3",
  "#B97A57", "#FFAEC9", "#FFC90E", "#EFE4B0", "#B5E61D", "#99D9EA",
  "#7092BE", "#C8BFE7",
];

const SIZES = [1, 3, 6, 10];

export default function Paint() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const undoStackRef = useRef<ImageData[]>([]);
  const previewRef = useRef<ImageData | null>(null);

  const [tool, setTool] = useState<Tool>("pencil");
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#FFFFFF");
  const [size, setSize] = useState(3);

  // initialize canvas to a working size
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    const w = Math.max(400, Math.floor(rect.width - 4));
    const h = Math.max(280, Math.floor(rect.height - 4));
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, w, h);
  }, []);

  const ctxOf = () => canvasRef.current?.getContext("2d") ?? null;

  const snapshot = () => {
    const ctx = ctxOf();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    undoStackRef.current.push(data);
    if (undoStackRef.current.length > 8) undoStackRef.current.shift();
  };

  const undo = () => {
    const ctx = ctxOf();
    if (!ctx) return;
    const last = undoStackRef.current.pop();
    if (last) ctx.putImageData(last, 0, 0);
  };

  const clearAll = () => {
    const ctx = ctxOf();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    snapshot();
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) * canvas.width) / rect.width,
      y: ((e.clientY - rect.top) * canvas.height) / rect.height,
    };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.stopPropagation();
    const ctx = ctxOf();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    snapshot();
    drawingRef.current = true;
    const pos = getPos(e);
    lastPosRef.current = pos;
    startPosRef.current = pos;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      // pointer capture may not be available for synthetic events; ignore
    }

    if (tool === "pencil" || tool === "eraser") {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = size;
      ctx.strokeStyle = tool === "eraser" ? bg : fg;
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(pos.x + 0.001, pos.y + 0.001);
      ctx.stroke();
    } else {
      previewRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const ctx = ctxOf();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    const pos = getPos(e);

    if (tool === "pencil" || tool === "eraser") {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = size;
      ctx.strokeStyle = tool === "eraser" ? bg : fg;
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current!.x, lastPosRef.current!.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      lastPosRef.current = pos;
    } else {
      const start = startPosRef.current!;
      if (previewRef.current) ctx.putImageData(previewRef.current, 0, 0);
      ctx.lineWidth = size;
      ctx.strokeStyle = fg;
      ctx.beginPath();
      if (tool === "line") {
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(pos.x, pos.y);
      } else if (tool === "rect") {
        ctx.rect(start.x, start.y, pos.x - start.x, pos.y - start.y);
      } else if (tool === "ellipse") {
        const cx = (start.x + pos.x) / 2;
        const cy = (start.y + pos.y) / 2;
        const rx = Math.abs(pos.x - start.x) / 2;
        const ry = Math.abs(pos.y - start.y) / 2;
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      }
      ctx.stroke();
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawingRef.current = false;
    lastPosRef.current = null;
    startPosRef.current = null;
    previewRef.current = null;
    try {
      canvasRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        background: "var(--xp-window-bg)",
        fontFamily: "Tahoma, sans-serif",
        fontSize: 11,
      }}
    >
      {/* menu bar */}
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: "3px 8px",
          background: "linear-gradient(to bottom, #F8F6EC, #DCD6C0)",
          borderBottom: "1px solid #B8B098",
        }}
      >
        <MenuItem onClick={clearAll}>File / New</MenuItem>
        <MenuItem onClick={undo}>Edit / Undo</MenuItem>
        <span style={{ marginLeft: "auto", color: "#7A7060" }}>
          Tool: {labelFor(tool)} · Size: {size}px
        </span>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: "flex" }}>
        {/* left rail tools */}
        <div
          style={{
            width: 56,
            flexShrink: 0,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            padding: 4,
            background: "var(--xp-window-bg)",
            borderRight: "1px solid #B8B098",
            alignContent: "flex-start",
          }}
        >
          <ToolBtn label="Pencil" active={tool === "pencil"} onClick={() => setTool("pencil")}>
            ✎
          </ToolBtn>
          <ToolBtn label="Eraser" active={tool === "eraser"} onClick={() => setTool("eraser")}>
            ◰
          </ToolBtn>
          <ToolBtn label="Line" active={tool === "line"} onClick={() => setTool("line")}>
            ／
          </ToolBtn>
          <ToolBtn label="Rect" active={tool === "rect"} onClick={() => setTool("rect")}>
            ▭
          </ToolBtn>
          <ToolBtn label="Ellipse" active={tool === "ellipse"} onClick={() => setTool("ellipse")}>
            ◯
          </ToolBtn>

          <div
            style={{
              gridColumn: "1 / span 2",
              marginTop: 6,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                onMouseDown={(e) => e.stopPropagation()}
                title={`${s}px`}
                style={{
                  width: 40,
                  height: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: size === s ? "1px solid #1A4FB8" : "1px solid #9D9888",
                  background: size === s ? "#FFE574" : "#FFFFFF",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    width: s,
                    height: s,
                    background: "#000000",
                    borderRadius: "50%",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* canvas area */}
        <div
          ref={containerRef}
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            background: "#9D9888",
            padding: 6,
            overflow: "auto",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <canvas
            ref={canvasRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onContextMenu={onContextMenu}
            style={{
              background: "#FFFFFF",
              border: "1px solid #3A3A3A",
              boxShadow: "1px 1px 0 #FFFFFF, inset 1px 1px 0 #DCD6C0",
              cursor: "crosshair",
              touchAction: "none",
            }}
          />
        </div>
      </div>

      {/* color palette */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: 6,
          background: "var(--xp-window-bg)",
          borderTop: "1px solid #B8B098",
        }}
      >
        <div
          title="Foreground / Background"
          style={{
            position: "relative",
            width: 32,
            height: 32,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: 22,
              height: 22,
              background: bg,
              border: "1px solid #5A5A5A",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 22,
              height: 22,
              background: fg,
              border: "1px solid #5A5A5A",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 18px)",
            gap: 2,
          }}
        >
          {PALETTE.map((c) => (
            <button
              key={c}
              title={c}
              onClick={() => setFg(c)}
              onContextMenu={(e) => {
                e.preventDefault();
                setBg(c);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              style={{
                width: 18,
                height: 18,
                background: c,
                border: "1px solid #5A5A5A",
                padding: 0,
                cursor: "pointer",
                boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          height: 22,
          flexShrink: 0,
          background: "var(--xp-window-bg)",
          borderTop: "1px solid #B8B098",
          padding: "2px 8px",
          fontSize: 11,
          display: "flex",
          alignItems: "center",
          color: "#5A5A5A",
        }}
      >
        For Help, click Help Topics on the Help Menu.
      </div>
    </div>
  );
}

function MenuItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        background: "transparent",
        border: "none",
        fontSize: 11,
        fontFamily: "Tahoma, sans-serif",
        cursor: "pointer",
        padding: "2px 4px",
      }}
    >
      {children}
    </button>
  );
}

function ToolBtn({
  children,
  active,
  label,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
      title={label}
      style={{
        width: "100%",
        height: 22,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: active ? "1px solid #1A4FB8" : "1px solid #9D9888",
        background: active
          ? "linear-gradient(to bottom, #FFE574, #F2C636)"
          : "linear-gradient(to bottom, #FCFCFC, #DCD6C0)",
        fontSize: 12,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function labelFor(t: Tool) {
  return t === "pencil"
    ? "Pencil"
    : t === "eraser"
      ? "Eraser"
      : t === "line"
        ? "Line"
        : t === "rect"
          ? "Rectangle"
          : "Ellipse";
}
