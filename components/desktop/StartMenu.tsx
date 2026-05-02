"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  IEIcon,
  WMPIcon,
  MyDocumentsIcon,
  MyPicturesIcon,
  MyMusicIcon,
  MyComputerIcon,
  UserAvatarIcon,
} from "@/components/icons/AppIcons";
import type { AppId } from "@/lib/apps";

interface StartMenuProps {
  onClose: () => void;
  onLaunch: (id: AppId) => void;
}

export default function StartMenu({ onClose, onLaunch }: StartMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      // ignore the start button itself (it toggles)
      const t = e.target as HTMLElement | null;
      if (t?.closest("[data-startbtn]")) return;
      onClose();
    };
    // defer subscribe so the click that opened the menu doesn't immediately close it
    const id = setTimeout(() => {
      window.addEventListener("mousedown", onMouseDown);
    }, 0);
    return () => {
      clearTimeout(id);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [onClose]);

  const launch = (id: AppId) => {
    onLaunch(id);
    onClose();
  };

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        bottom: "var(--xp-taskbar-height)",
        left: 0,
        width: 380,
        height: 480,
        background: "#FFFFFF",
        border: "2px solid #0A3FB5",
        borderBottom: "none",
        borderTopRightRadius: 8,
        boxShadow: "4px -4px 18px rgba(0, 0, 0, 0.4)",
        display: "flex",
        flexDirection: "column",
        zIndex: 9500,
        fontFamily: "var(--xp-font)",
        fontSize: 11,
        userSelect: "none",
      }}
    >
      {/* Header */}
      <div
        style={{
          height: 56,
          flexShrink: 0,
          background: "linear-gradient(to bottom, #1F70D2 0%, #1A5FBF 50%, #2D7DDC 100%)",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "0 10px",
          borderTopRightRadius: 6,
          borderBottom: "1px solid #FF8A1A",
        }}
      >
        <div style={{ width: 44, height: 44, border: "1px solid #FFFFFF", borderRadius: 2, overflow: "hidden" }}>
          <UserAvatarIcon size={44} />
        </div>
        <span style={{ fontSize: 14, fontWeight: "bold", textShadow: "1px 1px 0 rgba(0,0,0,0.4)" }}>
          Tanja
        </span>
      </div>

      {/* Two columns */}
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Left column — pinned */}
        <div
          style={{
            flex: 1,
            background: "#FFFFFF",
            padding: "8px 4px",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            overflow: "hidden",
          }}
        >
          <MenuItem icon={<IEIcon size={28} />} primary="Internet" secondary="Internet Explorer" onClick={onClose} />
          <MenuItem
            icon={<WMPIcon size={28} />}
            primary="Windows Media Player"
            secondary="Music + Sheep"
            onClick={() => launch("musicPlayer")}
          />

          <Sep />

          <SmallItem icon={<MyDocumentsIcon size={20} />} label="DX-Ball 2" onClick={() => launch("dxball")} />
          <SmallItem icon={<MyPicturesIcon size={20} />} label="My Photos" onClick={() => launch("photos")} />
          <SmallItem icon={<MyMusicIcon size={20} />} label="Screenplay (Word)" onClick={() => launch("screenplay")} />

          <div style={{ flex: 1 }} />

          <div
            style={{
              padding: "6px 8px",
              fontWeight: "bold",
              borderTop: "1px solid #D0D0D0",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            All Programs <span style={{ color: "#1A5FBF" }}>▶</span>
          </div>
        </div>

        {/* Right column — system */}
        <div
          style={{
            width: 170,
            flexShrink: 0,
            background: "#D6E4F8",
            padding: "8px 4px",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            borderLeft: "1px solid #B8C8E8",
          }}
        >
          <SmallItem icon={<MyDocumentsIcon size={20} />} label="My Documents" onClick={onClose} />
          <SmallItem icon={<MyPicturesIcon size={20} />} label="My Pictures" onClick={() => launch("photos")} />
          <SmallItem icon={<MyMusicIcon size={20} />} label="My Music" onClick={() => launch("musicPlayer")} />
          <SmallItem icon={<MyComputerIcon size={20} />} label="My Computer" onClick={onClose} />
          <Sep />
          <SmallItem label="Control Panel" onClick={onClose} />
          <SmallItem label="Help and Support" onClick={onClose} />
          <SmallItem label="Search" onClick={onClose} />
          <SmallItem label="Run..." onClick={onClose} />
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          height: 36,
          flexShrink: 0,
          background: "linear-gradient(to bottom, #1F70D2, #1A5FBF)",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 18,
          padding: "0 12px",
          color: "#FFFFFF",
          borderTop: "1px solid #FF8A1A",
        }}
      >
        <FooterButton glyph="⎋" label="Log Off" onClick={onClose} />
        <FooterButton glyph="⏻" label="Turn Off Computer" onClick={onClose} />
      </div>
    </div>
  );
}

function MenuItem({
  icon,
  primary,
  secondary,
  onClick,
}: {
  icon: ReactNode;
  primary: string;
  secondary?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "4px 8px",
        background: "transparent",
        border: "none",
        textAlign: "left",
        width: "100%",
        cursor: "default",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#316AC5")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span
        style={{
          width: 28,
          height: 28,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <span style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: "bold", color: "inherit" }}>{primary}</span>
        {secondary && <span style={{ fontSize: 10, color: "#5A5A5A" }}>{secondary}</span>}
      </span>
    </button>
  );
}

function SmallItem({
  icon,
  label,
  onClick,
}: {
  icon?: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "3px 8px",
        background: "transparent",
        border: "none",
        textAlign: "left",
        width: "100%",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#316AC5";
        e.currentTarget.style.color = "#FFFFFF";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "inherit";
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}

function Sep() {
  return <div style={{ height: 1, background: "#D0D0D0", margin: "4px 8px" }} />;
}

function FooterButton({
  glyph,
  label,
  onClick,
}: {
  glyph: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "transparent",
        border: "none",
        color: "#FFFFFF",
        fontFamily: "var(--xp-font)",
        fontSize: 11,
        cursor: "default",
        textShadow: "1px 1px 0 rgba(0, 0, 0, 0.3)",
      }}
    >
      <span
        style={{
          width: 22,
          height: 22,
          background: "linear-gradient(to bottom, #5DADE2, #1A5FBF)",
          borderRadius: 4,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
        }}
      >
        {glyph}
      </span>
      {label}
    </button>
  );
}
