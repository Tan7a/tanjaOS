"use client";

import { useEffect, useRef, useState } from "react";
import { ModemIcon } from "@/components/icons/AppIcons";
import { useDialUp } from "@/lib/dialup-context";

type View = "auth" | "dialing" | "connected";

interface Stage {
  label: string;
  from: number;
  to: number;
}

const STAGES: Stage[] = [
  { label: "Dialing...", from: 0, to: 20 },
  { label: "Verifying username and password...", from: 20, to: 50 },
  { label: "Registering your computer on the network...", from: 50, to: 85 },
  { label: "Connected!", from: 85, to: 100 },
];

const TOTAL_MS = 7000;

export default function DialUp() {
  const { isConnected, connect, disconnect } = useDialUp();
  const [view, setView] = useState<View>(isConnected ? "connected" : "auth");
  const [progress, setProgress] = useState(0);
  const [username, setUsername] = useState("tanja");
  const [password, setPassword] = useState("password");
  const [saveCreds, setSaveCreds] = useState(true);
  const [saveScope, setSaveScope] = useState<"me" | "anyone">("me");
  const [dialNumber, setDialNumber] = useState("555 8265 7267");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startedAtRef = useRef<number>(0);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (isConnected) setView("connected");
  }, [isConnected]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const stage =
    STAGES.find((s) => progress >= s.from && progress <= s.to) ??
    STAGES[STAGES.length - 1];

  const startDial = () => {
    setView("dialing");
    finishedRef.current = false;
    setProgress(0);
    startedAtRef.current = performance.now();

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    const tick = () => {
      const elapsed = performance.now() - startedAtRef.current;
      const pct = Math.min(100, (elapsed / TOTAL_MS) * 100);
      setProgress(pct);
      if (pct >= 100) {
        if (!finishedRef.current) {
          finishedRef.current = true;
          connect();
          if (audioRef.current) {
            audioRef.current.pause();
          }
          setView("connected");
        }
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const cancelDialing = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setProgress(0);
    setView("auth");
  };

  const handleDisconnect = () => {
    disconnect();
    setProgress(0);
    setView("auth");
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
      <audio ref={audioRef} src="/audio/dialup.mp3" preload="auto" />

      {view === "auth" && (
        <AuthView
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          saveCreds={saveCreds}
          setSaveCreds={setSaveCreds}
          saveScope={saveScope}
          setSaveScope={setSaveScope}
          dialNumber={dialNumber}
          setDialNumber={setDialNumber}
          onDial={startDial}
        />
      )}

      {view === "dialing" && (
        <DialingView
          progress={progress}
          stage={stage.label}
          onCancel={cancelDialing}
        />
      )}

      {view === "connected" && (
        <ConnectedView onDisconnect={handleDisconnect} />
      )}
    </div>
  );
}

function AuthView({
  username,
  setUsername,
  password,
  setPassword,
  saveCreds,
  setSaveCreds,
  saveScope,
  setSaveScope,
  dialNumber,
  setDialNumber,
  onDial,
}: {
  username: string;
  setUsername: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  saveCreds: boolean;
  setSaveCreds: (v: boolean) => void;
  saveScope: "me" | "anyone";
  setSaveScope: (v: "me" | "anyone") => void;
  dialNumber: string;
  setDialNumber: (v: string) => void;
  onDial: () => void;
}) {
  const stopDrag = (e: React.MouseEvent | React.PointerEvent) =>
    e.stopPropagation();

  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ConnectionBanner />

      <div style={{ padding: "14px 18px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <FieldRow label="User name:">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onMouseDown={stopDrag}
            style={inputStyle}
          />
        </FieldRow>
        <FieldRow label="Password:">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onMouseDown={stopDrag}
            style={inputStyle}
          />
        </FieldRow>

        <div style={{ marginTop: 6, borderTop: "1px solid #B8B098", paddingTop: 10 }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={saveCreds}
              onChange={(e) => setSaveCreds(e.target.checked)}
              onMouseDown={stopDrag}
            />
            Save this user name and password for the following users:
          </label>
          <div
            style={{
              marginLeft: 22,
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              opacity: saveCreds ? 1 : 0.5,
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, cursor: "pointer" }}>
              <input
                type="radio"
                name="saveScope"
                checked={saveScope === "me"}
                disabled={!saveCreds}
                onChange={() => setSaveScope("me")}
                onMouseDown={stopDrag}
              />
              Me only
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, cursor: "pointer" }}>
              <input
                type="radio"
                name="saveScope"
                checked={saveScope === "anyone"}
                disabled={!saveCreds}
                onChange={() => setSaveScope("anyone")}
                onMouseDown={stopDrag}
              />
              Anyone who uses this computer
            </label>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #B8B098", paddingTop: 10 }}>
          <FieldRow label="Dial:">
            <div style={{ position: "relative", flex: 1 }}>
              <input
                type="text"
                value={dialNumber}
                onChange={(e) => setDialNumber(e.target.value)}
                onMouseDown={stopDrag}
                style={{ ...inputStyle, paddingRight: 22 }}
              />
              <span
                style={{
                  position: "absolute",
                  right: 1,
                  top: 1,
                  bottom: 1,
                  width: 18,
                  background: "linear-gradient(to bottom, #FCFCFC, #DCD6C0)",
                  borderLeft: "1px solid #9D9888",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 8,
                  color: "#3A3A3A",
                  pointerEvents: "none",
                }}
              >
                ▼
              </span>
            </div>
          </FieldRow>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 6,
          padding: "10px 18px 14px",
          borderTop: "1px solid #B8B098",
          background: "var(--xp-window-bg)",
        }}
      >
        <XpButton onClick={onDial} primary>
          Dial
        </XpButton>
        <XpButton onClick={() => {}}>Cancel</XpButton>
        <XpButton onClick={() => {}}>Properties</XpButton>
        <XpButton onClick={() => {}}>Help</XpButton>
      </div>
    </div>
  );
}

function DialingView({
  progress,
  stage,
  onCancel,
}: {
  progress: number;
  stage: string;
  onCancel: () => void;
}) {
  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "20px 24px 16px",
          display: "flex",
          gap: 16,
          alignItems: "flex-start",
        }}
      >
        <ModemIcon size={48} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ margin: 0, fontSize: 13, fontWeight: "bold" }}>
            Connecting to TanjaNet...
          </h2>
          <p style={{ margin: "6px 0 0", fontSize: 11, color: "#3A3A3A", lineHeight: 1.4 }}>
            {stage}
          </p>
        </div>
      </div>

      <div
        style={{
          margin: "0 24px",
          padding: 12,
          background: "#FFFFFF",
          border: "1px solid #B8B098",
          boxShadow: "inset 1px 1px 0 #FFFFFF, inset -1px -1px 0 #DCD6C0",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span>
            <strong>Status:</strong> {stage}
          </span>
          <span>
            <strong>Speed:</strong> 56k
          </span>
        </div>
        <ProgressBar progress={progress} />
        <div
          style={{
            marginTop: 6,
            fontSize: 11,
            color: "#5A5A5A",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{Math.round(progress)}%</span>
          <span>
            {Math.max(0, Math.round((TOTAL_MS - (progress / 100) * TOTAL_MS) / 1000))}s
            remaining
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          padding: "16px 24px",
        }}
      >
        <XpButton onClick={onCancel}>Cancel</XpButton>
      </div>

      <div style={{ flex: 1 }} />
    </div>
  );
}

function ConnectedView({ onDisconnect }: { onDisconnect: () => void }) {
  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "20px 24px",
          display: "flex",
          gap: 16,
          alignItems: "flex-start",
        }}
      >
        <ModemIcon size={48} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ margin: 0, fontSize: 13, fontWeight: "bold" }}>
            You are online.
          </h2>
          <p style={{ margin: "6px 0 0", fontSize: 11, color: "#3A3A3A", lineHeight: 1.5 }}>
            TanjaNet is up and running. Open an image from Inspiration to feel
            the dial up speeds. Open Chat to drop a line.
          </p>
        </div>
      </div>

      <div
        style={{
          margin: "0 24px",
          padding: 12,
          background: "#FFFFFF",
          border: "1px solid #B8B098",
          fontSize: 11,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span><strong>Status:</strong> Connected</span>
          <span><strong>Duration:</strong> session active</span>
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 11,
            color: "#3A3A3A",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Speed: 56k</span>
          <span>Activity: idle</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          padding: "16px 24px",
        }}
      >
        <XpButton onClick={onDisconnect}>Disconnect</XpButton>
      </div>

      <div style={{ flex: 1 }} />
    </div>
  );
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 80, flexShrink: 0, fontSize: 11 }}>{label}</span>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontSize: 11,
  fontFamily: "Tahoma, sans-serif",
  padding: "3px 6px",
  border: "1px solid #5A5A5A",
  background: "#FFFFFF",
  boxShadow: "inset 1px 1px 0 #B8B098",
};

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div
      style={{
        height: 18,
        border: "1px solid #5A5A5A",
        background: "#FFFFFF",
        boxShadow: "inset 1px 1px 0 #B8B098",
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
          backgroundSize: "16px 16px",
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.3) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.3) 75%, transparent 75%, transparent)",
        }}
      />
    </div>
  );
}

function XpButton({
  children,
  onClick,
  primary,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        minWidth: 75,
        height: 23,
        padding: "0 12px",
        fontSize: 11,
        fontFamily: "Tahoma, sans-serif",
        background: primary
          ? "linear-gradient(to bottom, #FCFCFC 0%, #DCE7F8 50%, #C8D8F0 100%)"
          : "linear-gradient(to bottom, #FCFCFC 0%, #ECE9D8 50%, #D8D2BC 100%)",
        border: "1px solid #5A5A5A",
        borderRadius: 3,
        boxShadow: primary
          ? "inset 0 0 0 1px #6BA2EE, 0 0 0 1px #1A4FB8"
          : "inset 0 0 0 1px #FFFFFF",
        color: "#1F1F1F",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function ConnectionBanner() {
  return (
    <div
      style={{
        height: 110,
        flexShrink: 0,
        background:
          "linear-gradient(135deg, #6BA2EE 0%, #4A7FD0 45%, #2A5BB0 100%)",
        borderBottom: "1px solid #1A3A6B",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 320 110"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      >
        <defs>
          <radialGradient id="dialupGlobe" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#A8E0FF" />
            <stop offset="55%" stopColor="#3A8FE0" />
            <stop offset="100%" stopColor="#1A4FB8" />
          </radialGradient>
          <linearGradient id="dialupLaptop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8E4D8" />
            <stop offset="100%" stopColor="#9D9888" />
          </linearGradient>
          <linearGradient id="dialupScreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5A8FCB" />
            <stop offset="100%" stopColor="#1A3A6B" />
          </linearGradient>
          <linearGradient id="dialupArc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8BD278" />
            <stop offset="50%" stopColor="#3FAA3F" />
            <stop offset="100%" stopColor="#8BD278" />
          </linearGradient>
        </defs>

        {/* shine in background */}
        <path d="M0 0 L320 0 L320 30 Q160 70 0 30 Z" fill="#FFFFFF" opacity="0.12" />

        {/* left laptop */}
        <g transform="translate(40 32)">
          <path d="M-22 38 L52 38 L48 50 L-26 50 Z" fill="#7A7466" />
          <path d="M-18 8 L48 8 L52 38 L-22 38 Z" fill="url(#dialupLaptop)" stroke="#3A3A3A" strokeWidth="0.6" />
          <rect x="-12" y="13" width="56" height="20" fill="url(#dialupScreen)" stroke="#0A2F6B" strokeWidth="0.5" />
          <path d="M-10 14 L42 14 L42 22 Q16 19 -10 26 Z" fill="#FFFFFF" opacity="0.18" />
        </g>

        {/* right laptop */}
        <g transform="translate(280 32)">
          <path d="M-52 38 L22 38 L26 50 L-48 50 Z" fill="#7A7466" />
          <path d="M-48 8 L18 8 L22 38 L-52 38 Z" fill="url(#dialupLaptop)" stroke="#3A3A3A" strokeWidth="0.6" />
          <rect x="-44" y="13" width="56" height="20" fill="url(#dialupScreen)" stroke="#0A2F6B" strokeWidth="0.5" />
          <path d="M-42 14 L10 14 L10 22 Q-14 19 -42 26 Z" fill="#FFFFFF" opacity="0.18" />
        </g>

        {/* center globe */}
        <g transform="translate(160 50)">
          <circle r="22" fill="url(#dialupGlobe)" stroke="#0A2F6B" strokeWidth="0.6" />
          <ellipse rx="22" ry="9" fill="none" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.6" />
          <ellipse rx="9" ry="22" fill="none" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.6" />
          {/* simple continents */}
          <path d="M-14 -6 Q-8 -12 -2 -8 Q4 -4 8 -10 Q12 -6 6 0 Q0 4 -4 0 Q-10 -2 -14 -6 Z" fill="#3D7A1A" opacity="0.85" />
          <path d="M-6 6 Q0 4 6 8 Q10 12 4 14 Q-2 12 -6 6 Z" fill="#3D7A1A" opacity="0.85" />
          <path d="M-18 2 Q-22 -2 -16 -2 Q-12 0 -16 4 Z" fill="#3D7A1A" opacity="0.7" />
        </g>

        {/* connection arc */}
        <path
          d="M70 48 Q160 -8 250 48"
          stroke="url(#dialupArc)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M70 48 Q160 -8 250 48"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
