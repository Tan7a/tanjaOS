"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import AnimatedSheep, { type SheepSkin } from "@/components/sheep/AnimatedSheep";
import { TRACKS } from "@/lib/tracks";

function shuffleIndices(length: number, firstIndex: number) {
  const rest = Array.from({ length }, (_, i) => i).filter((i) => i !== firstIndex);
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  return [firstIndex, ...rest];
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [skin, setSkin] = useState<SheepSkin>(0);
  const [seconds, setSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(72);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffledOrder, setShuffledOrder] = useState<number[]>(() =>
    Array.from({ length: TRACKS.length }, (_, i) => i)
  );

  const currentTrack = TRACKS[currentIndex];

  const orderPosition = useMemo(() => {
    if (!shuffle) return currentIndex;
    return shuffledOrder.indexOf(currentIndex);
  }, [shuffle, shuffledOrder, currentIndex]);

  const goToIndex = (i: number) => {
    setCurrentIndex(i);
    setSeconds(0);
  };

  const goToNext = () => {
    if (shuffle) {
      const next = shuffledOrder[(orderPosition + 1) % shuffledOrder.length];
      goToIndex(next);
    } else {
      goToIndex((currentIndex + 1) % TRACKS.length);
    }
  };

  const goToPrev = () => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setSeconds(0);
      return;
    }
    if (shuffle) {
      const prevPos = (orderPosition - 1 + shuffledOrder.length) % shuffledOrder.length;
      goToIndex(shuffledOrder[prevPos]);
    } else {
      goToIndex((currentIndex - 1 + TRACKS.length) % TRACKS.length);
    }
  };

  const toggleShuffle = () => {
    setShuffle((prev) => {
      const next = !prev;
      if (next) {
        setShuffledOrder(shuffleIndices(TRACKS.length, currentIndex));
      }
      return next;
    });
  };

  // Sync play/pause with audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      const promise = audio.play();
      if (promise) promise.catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentIndex]);

  // Sync volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume / 100;
  }, [volume]);

  // Sync repeat → audio.loop
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = repeat;
  }, [repeat]);

  const cycleSkin = () =>
    setSkin((s) => (((s + 1) % 4) as SheepSkin));

  const handleSeek = (v: number) => {
    const audio = audioRef.current;
    if (audio && Number.isFinite(audio.duration)) {
      audio.currentTime = v;
    }
    setSeconds(v);
  };

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
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="metadata"
        onTimeUpdate={(e) => setSeconds(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={goToNext}
      />

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
          <strong style={{ color: "#FFFFFF" }}>{currentTrack.artist}</strong>{" "}
          {"—"} {currentTrack.title}
        </span>
        <span style={{ fontFamily: "monospace" }}>
          {format(seconds)} / {format(duration)}
        </span>
      </div>

      {/* Seek bar */}
      <SeekBar
        value={seconds}
        max={duration || 1}
        onChange={handleSeek}
      />

      {/* Transport + volume */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          padding: "6px 8px 8px",
        }}
      >
        <div />

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <TransportButton onClick={toggleShuffle} title="Shuffle" pressed={shuffle}>
            <svg width="14" height="12" viewBox="0 0 14 12">
              <path
                d="M0.5 3 L4 3 L9 9 L13.5 9"
                stroke="#000"
                strokeWidth="1.2"
                fill="none"
              />
              <path
                d="M0.5 9 L4 9 L9 3 L13.5 3"
                stroke="#000"
                strokeWidth="1.2"
                fill="none"
              />
              <path d="M11.5 1.5 L13.8 3 L11.5 4.5 Z" fill="#000" />
              <path d="M11.5 7.5 L13.8 9 L11.5 10.5 Z" fill="#000" />
            </svg>
          </TransportButton>
          <TransportButton onClick={goToPrev} title="Previous">
            <svg width="12" height="12" viewBox="0 0 12 12">
              <rect x="2" y="2" width="1.4" height="8" fill="#000" />
              <path d="M11 2 L11 10 L4 6 Z" fill="#000" />
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
          <TransportButton onClick={goToNext} title="Next">
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path d="M1 2 L1 10 L8 6 Z" fill="#000" />
              <rect x="8.6" y="2" width="1.4" height="8" fill="#000" />
            </svg>
          </TransportButton>
          <TransportButton
            onClick={() => setRepeat((r) => !r)}
            title={repeat ? "Repeat: on" : "Repeat: off"}
            pressed={repeat}
          >
            <svg width="14" height="12" viewBox="0 0 14 12">
              <path
                d="M2.5 4 L2.5 3.2 A1.7 1.7 0 0 1 4.2 1.5 L10 1.5"
                stroke="#000"
                strokeWidth="1.2"
                fill="none"
              />
              <path d="M8.5 0 L10.7 1.5 L8.5 3 Z" fill="#000" />
              <path
                d="M11.5 8 L11.5 8.8 A1.7 1.7 0 0 1 9.8 10.5 L4 10.5"
                stroke="#000"
                strokeWidth="1.2"
                fill="none"
              />
              <path d="M5.5 12 L3.3 10.5 L5.5 9 Z" fill="#000" />
            </svg>
          </TransportButton>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <VolumeSlider value={volume} onChange={setVolume} />
        </div>
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
  pressed,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  large?: boolean;
  pressed?: boolean;
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
        background: pressed
          ? "linear-gradient(to bottom, #B8B098, #D8D0B8)"
          : "linear-gradient(to bottom, #F8F6EC, #C8C0A8)",
        border: pressed ? "1px solid #3A3A3A" : "1px solid #6F7378",
        borderRadius: 2,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: pressed
          ? "inset 1px 1px 2px rgba(0,0,0,0.35)"
          : "inset 0 1px 0 #FFFFFF",
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
    onChangeRef.current(ratio * maxRef.current);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      onChangeRef.current(ratio * maxRef.current);
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

  const pct = max > 0 ? (value / max) * 100 : 0;

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
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const total = Math.floor(s);
  const m = Math.floor(total / 60);
  const ss = total % 60;
  return `${m}:${ss.toString().padStart(2, "0")}`;
}
