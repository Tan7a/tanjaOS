"use client";

import { useEffect, useRef, useState } from "react";
import { useDialUp } from "@/lib/dialup-context";

interface ImageViewerProps {
  src: string;
  name: string;
  caption?: string;
  parentLabel: string;
  onBack: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  position?: { current: number; total: number };
}

const REVEAL_MS = 9000;

export default function ImageViewer({
  src,
  name,
  caption,
  parentLabel,
  onBack,
  onPrev,
  onNext,
  position,
}: ImageViewerProps) {
  const { isConnected } = useDialUp();
  const reducedMotion = usePrefersReducedMotion();
  const slowLoad = isConnected && !reducedMotion;

  // keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "Escape") onBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onPrev, onNext, onBack]);

  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        background: "var(--xp-window-bg)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "4px 8px",
          background: "linear-gradient(to bottom, #F8F6EC, #DCD6C0)",
          borderBottom: "1px solid #B8B098",
          fontSize: 11,
        }}
      >
        <ToolbarButton onClick={onBack}>
          <span>◀</span> Back to {parentLabel}
        </ToolbarButton>
        <span style={{ color: "#7A7060" }}>·</span>
        <ToolbarButton onClick={onPrev} disabled={!onPrev} title="Previous (←)">
          <span style={{ fontSize: 13 }}>‹</span> Previous
        </ToolbarButton>
        <ToolbarButton onClick={onNext} disabled={!onNext} title="Next (→)">
          Next <span style={{ fontSize: 13 }}>›</span>
        </ToolbarButton>
        <span style={{ color: "#7A7060" }}>·</span>
        <span style={{ fontWeight: "bold" }}>{name}</span>
        {caption && (
          <>
            <span style={{ color: "#7A7060" }}>·</span>
            <span style={{ fontStyle: "italic", color: "#5A5A5A" }}>
              {caption}
            </span>
          </>
        )}
        {position && (
          <span style={{ marginLeft: "auto", color: "#5A5A5A" }}>
            {position.current} of {position.total}
          </span>
        )}
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          background: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 12,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {slowLoad ? (
          <SlowLoadImage src={src} alt={caption ?? name} name={name} />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={caption ?? name}
            draggable={false}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              boxShadow: "0 0 0 1px #FFFFFF, 0 4px 20px rgba(0,0,0,0.5)",
            }}
          />
        )}
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
        {slowLoad ? "Downloading via TanjaNet (56k)" : "Image preview"}
      </div>
    </div>
  );
}

function SlowLoadImage({
  src,
  alt,
  name,
}: {
  src: string;
  alt: string;
  name: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [naturalSize, setNaturalSize] = useState<{
    w: number;
    h: number;
  } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startedAtRef = useRef<number>(0);

  // simulated file size, weighted by image area
  const fakeSize = naturalSize
    ? Math.max(0.6, Math.min(8, (naturalSize.w * naturalSize.h) / 600000))
    : 2.4;

  useEffect(() => {
    setLoaded(false);
    setProgress(0);

    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgRef.current = img;
      setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
      startedAtRef.current = performance.now();
      const animate = () => {
        const elapsed = performance.now() - startedAtRef.current;
        const pct = Math.min(100, (elapsed / REVEAL_MS) * 100);
        setProgress(pct);
        drawTo(pct);
        if (pct >= 100) {
          setLoaded(true);
          return;
        }
        rafRef.current = requestAnimationFrame(animate);
      };
      animate();
    };

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const drawTo = (pct: number) => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (pct === 0) {
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, w, h);
    }

    const visibleHeight = Math.max(1, Math.floor((h * pct) / 100));
    ctx.drawImage(
      img,
      0,
      0,
      w,
      visibleHeight,
      0,
      0,
      w,
      visibleHeight,
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          width: "min(80%, 480px)",
          background: "rgba(0,0,0,0.55)",
          padding: "8px 12px",
          color: "#FFFFFF",
          fontFamily: "Tahoma, sans-serif",
          fontSize: 11,
          border: "1px solid #FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          <span>
            Downloading {name}... {Math.round(progress)}%
          </span>
          <span>{fakeSize.toFixed(1)} MB</span>
        </div>
        <div
          style={{
            height: 12,
            border: "1px solid #5A5A5A",
            background: "#FFFFFF",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background:
                "linear-gradient(to right, #5BC04C 0%, #7BD27B 50%, #5BC04C 100%)",
              transition: "width 80ms linear",
            }}
          />
        </div>
      </div>

      <div
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {loaded ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={alt}
            draggable={false}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              boxShadow: "0 0 0 1px #FFFFFF, 0 4px 20px rgba(0,0,0,0.5)",
            }}
          />
        ) : (
          <canvas
            ref={canvasRef}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              boxShadow: "0 0 0 1px #FFFFFF, 0 4px 20px rgba(0,0,0,0.5)",
              background: "#0a0a0a",
            }}
          />
        )}
      </div>
    </div>
  );
}

function ToolbarButton({
  children,
  onClick,
  disabled,
  title,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
      disabled={disabled}
      title={title}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 8px",
        background: "transparent",
        border: "1px solid transparent",
        fontSize: 11,
        cursor: disabled ? "default" : "pointer",
        color: disabled ? "#9D9888" : "#1F1F1F",
      }}
    >
      {children}
    </button>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}
