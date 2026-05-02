"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedSheep, { type SheepSkin } from "@/components/sheep/AnimatedSheep";

const TRACK = { artist: "Avril Lavigne", title: "Sk8er Boi" };
const TOTAL_SECONDS = 4 * 60 + 59; // 4:59

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [skin, setSkin] = useState<SheepSkin>(0);
  const [seconds, setSeconds] = useState(53);
  const [volume, setVolume] = useState(72);

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setSeconds((s) => (s + 1 >= TOTAL_SECONDS ? 0 : s + 1));
    }, 1000);
    return () => clearInterval(id);
  }, [isPlaying]);

  const cycleSkin = () =>
    setSkin((s) => (((s + 1) % 3) as SheepSkin));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        background: "var(--xp-window-bg)",
      }}
    >
      {/* Fake menu bar */}
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: "3px 8px",
          fontSize: 11,
          background: "var(--xp-window-bg)",
          borderBottom: "1px solid #B8B098",
        }}
      >
        <FakeMenu label="File" />
        <FakeMenu label="View" />
        <FakeMenu label="Play" />
        <FakeMenu label="Help" />
      </div>

      {/* Sheep visualization */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          margin: 6,
          border: "2px inset #ACA899",
          background: "#000000",
          overflow: "hidden",
        }}
      >
        <AnimatedSheep isPlaying={isPlaying} skin={skin} onClick={cycleSkin} />
      </div>

      {/* Track info */}
      <div
        style={{
          padding: "4px 8px",
          background: "#1A2A4A",
          color: "#C8E0F8",
          fontSize: 11,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 6px",
        }}
      >
        <span>
          <strong style={{ color: "#FFFFFF" }}>{TRACK.artist}</strong> — {TRACK.title}
        </span>
        <span style={{ fontFamily: "monospace" }}>
          {format(seconds)} / {format(TOTAL_SECONDS)}
        </span>
      </div>

      {/* Seek bar */}
      <SeekBar
        value={seconds}
        max={TOTAL_SECONDS}
        onChange={(v) => setSeconds(v)}
      />

      {/* Transport + volume */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "6px 8px 8px",
          gap: 4,
        }}
      >
        <TransportButton onClick={() => setSeconds(0)} title="Previous">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect x="2" y="2" width="1.4" height="8" fill="#000" />
            <path d="M11 2 L11 10 L4 6 Z" fill="#000" />
          </svg>
        </TransportButton>
        <TransportButton onClick={() => setSeconds((s) => Math.max(0, s - 5))} title="Rewind">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M6 2 L6 10 L1 6 Z" fill="#000" />
            <path d="M11 2 L11 10 L6 6 Z" fill="#000" />
          </svg>
        </TransportButton>
        <TransportButton
          onClick={() => setIsPlaying((p) => !p)}
          title={isPlaying ? "Pause" : "Play"}
          large
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 12 12">
              <rect x="2.5" y="2" width="2.5" height="8" fill="#000" />
              <rect x="7" y="2" width="2.5" height="8" fill="#000" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 12 12">
              <path d="M3 2 L3 10 L10 6 Z" fill="#000" />
            </svg>
          )}
        </TransportButton>
        <TransportButton onClick={() => setIsPlaying(false)} title="Stop">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect x="2.5" y="2.5" width="7" height="7" fill="#000" />
          </svg>
        </TransportButton>
        <TransportButton
          onClick={() => setSeconds((s) => Math.min(TOTAL_SECONDS, s + 5))}
          title="Fast forward"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M1 2 L1 10 L6 6 Z" fill="#000" />
            <path d="M6 2 L6 10 L11 6 Z" fill="#000" />
          </svg>
        </TransportButton>
        <TransportButton onClick={() => setSeconds(0)} title="Next">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M1 2 L1 10 L8 6 Z" fill="#000" />
            <rect x="8.6" y="2" width="1.4" height="8" fill="#000" />
          </svg>
        </TransportButton>

        <div style={{ flex: 1 }} />

        <VolumeSlider value={volume} onChange={setVolume} />
      </div>
    </div>
  );
}

function FakeMenu({ label }: { label: string }) {
  return (
    <span
      style={{
        padding: "1px 6px",
        cursor: "default",
        userSelect: "none",
      }}
    >
      <u>{label.charAt(0)}</u>
      {label.slice(1)}
    </span>
  );
}

function TransportButton({
  children,
  onClick,
  title,
  large,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  large?: boolean;
}) {
  const size = large ? 28 : 24;
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        width: size,
        height: size,
        padding: 0,
        background: "linear-gradient(to bottom, #F8F6EC, #C8C0A8)",
        border: "1px solid #6F7378",
        borderRadius: 2,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "inset 0 1px 0 #FFFFFF",
      }}
    >
      {children}
    </button>
  );
}

function SeekBar({
  value,
  max,
  onChange,
}: {
  value: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const onChangeRef = useRef(onChange);
  const maxRef = useRef(max);

  useEffect(() => {
    onChangeRef.current = onChange;
    maxRef.current = max;
  });

  const updateFromEvent = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    onChangeRef.current(Math.round(ratio * maxRef.current));
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      onChangeRef.current(Math.round(ratio * maxRef.current));
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const pct = (value / max) * 100;

  return (
    <div
      ref={trackRef}
      onMouseDown={(e) => {
        e.stopPropagation();
        draggingRef.current = true;
        updateFromEvent(e.clientX);
      }}
      style={{
        position: "relative",
        height: 14,
        margin: "4px 8px",
        background: "#FFFFFF",
        border: "1px inset #B8B098",
        cursor: "default",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: `${pct}%`,
          background: "var(--xp-selection)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -2,
          left: `calc(${pct}% - 4px)`,
          width: 8,
          height: 18,
          background: "linear-gradient(to bottom, #F8F6EC, #B8B098)",
          border: "1px solid #3A3A3A",
        }}
      />
    </div>
  );
}

function VolumeSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  });

  const updateFromEvent = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    onChangeRef.current(Math.round(ratio * 100));
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      onChangeRef.current(Math.round(ratio * 100));
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const fillColor =
    value > 50 ? "#3DA53D" : value > 20 ? "#E0B83A" : "#D85A4A";

  return (
    <div
      ref={trackRef}
      onMouseDown={(e) => {
        e.stopPropagation();
        draggingRef.current = true;
        updateFromEvent(e.clientX);
      }}
      title={`Volume ${value}%`}
      style={{
        position: "relative",
        width: 80,
        height: 14,
        background: "#FFFFFF",
        border: "1px inset #B8B098",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: `${value}%`,
          background: fillColor,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -2,
          left: `calc(${value}% - 3px)`,
          width: 6,
          height: 18,
          background: "linear-gradient(to bottom, #F8F6EC, #B8B098)",
          border: "1px solid #3A3A3A",
        }}
      />
    </div>
  );
}

function format(s: number) {
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${m}:${ss.toString().padStart(2, "0")}`;
}
