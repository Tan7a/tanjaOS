"use client";

import { useState } from "react";
import { PhotoFolderIcon, FolderIcon } from "@/components/icons/AppIcons";

const PHOTOS = [
  { name: "Summer2003.jpg", hue: 35 },
  { name: "Birthday.jpg", hue: 320 },
  { name: "Vacation.jpg", hue: 200 },
  { name: "Friends.jpg", hue: 50 },
  { name: "Camp.jpg", hue: 110 },
  { name: "Cat.jpg", hue: 25 },
  { name: "Beach.jpg", hue: 195 },
  { name: "Sunset.jpg", hue: 15 },
];

// TODO: Phase 2 — replace placeholder thumbnails with real photos.

export default function PhotoFolder() {
  const [selected, setSelected] = useState<string | null>(null);

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
      {/* Menu bar */}
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
        <span><u>F</u>ile</span>
        <span><u>E</u>dit</span>
        <span><u>V</u>iew</span>
        <span>F<u>a</u>vorites</span>
        <span><u>T</u>ools</span>
        <span><u>H</u>elp</span>
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "4px 6px",
          background: "linear-gradient(to bottom, #F8F6EC, #DCD6C0)",
          borderBottom: "1px solid #B8B098",
        }}
      >
        <ToolbarButton label="Back" arrow="◀" />
        <ToolbarButton label="Forward" arrow="▶" disabled />
        <ToolbarButton label="Up" arrow="↑" />
        <span style={{ width: 1, height: 22, background: "#B8B098", margin: "0 4px" }} />
        <span style={{ fontSize: 11 }}>Address</span>
        <div
          style={{
            flex: 1,
            background: "#FFFFFF",
            border: "1px inset #B8B098",
            padding: "2px 4px",
            display: "flex",
            alignItems: "center",
            gap: 4,
            height: 18,
          }}
        >
          <FolderIcon size={14} />
          <span>C:\My Documents\My Photos</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, minHeight: 0, display: "flex" }}>
        {/* Sidebar */}
        <div
          style={{
            width: 180,
            background: "linear-gradient(to bottom, #7AA9E8, #4080CC)",
            color: "#FFFFFF",
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <SidebarSection title="Picture Tasks">
            <SidebarLink>View as a slide show</SidebarLink>
            <SidebarLink>Order prints online</SidebarLink>
            <SidebarLink>Print pictures</SidebarLink>
          </SidebarSection>
          <SidebarSection title="File and Folder Tasks">
            <SidebarLink>Make a new folder</SidebarLink>
            <SidebarLink>Publish this folder to the Web</SidebarLink>
            <SidebarLink>Share this folder</SidebarLink>
          </SidebarSection>
          <SidebarSection title="Other Places">
            <SidebarLink>My Documents</SidebarLink>
            <SidebarLink>My Computer</SidebarLink>
            <SidebarLink>My Network Places</SidebarLink>
          </SidebarSection>
        </div>

        {/* Thumb grid */}
        <div
          style={{
            flex: 1,
            background: "#FFFFFF",
            padding: 12,
            overflow: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
            gap: 12,
            alignContent: "start",
          }}
          onClick={() => setSelected(null)}
        >
          {PHOTOS.map((p) => {
            const isSel = selected === p.name;
            return (
              <button
                key={p.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(p.name);
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  padding: 4,
                  background: isSel ? "#D6E4F8" : "transparent",
                  border: isSel ? "1px dotted #316AC5" : "1px solid transparent",
                }}
              >
                <div
                  style={{
                    width: 100,
                    height: 80,
                    background: `linear-gradient(135deg, hsl(${p.hue}, 60%, 70%), hsl(${(p.hue + 30) % 360}, 50%, 45%))`,
                    border: "1px solid #888",
                    boxShadow: "1px 1px 3px rgba(0,0,0,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PhotoFolderIcon size={28} />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: isSel ? "#FFFFFF" : "#000000",
                    background: isSel ? "var(--xp-selection)" : "transparent",
                    padding: "0 3px",
                    maxWidth: 100,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Status bar */}
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
        }}
      >
        {PHOTOS.length} objects
      </div>
    </div>
  );
}

function ToolbarButton({
  label,
  arrow,
  disabled,
}: {
  label: string;
  arrow: string;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 6px",
        background: "transparent",
        border: "1px solid transparent",
        opacity: disabled ? 0.45 : 1,
        fontSize: 11,
      }}
    >
      <span>{arrow}</span> {label}
    </button>
  );
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 4, overflow: "hidden" }}>
      <div
        style={{
          padding: "4px 8px",
          fontWeight: "bold",
          fontSize: 11,
          background: "linear-gradient(to right, rgba(255,255,255,0.25), transparent)",
        }}
      >
        {title}
      </div>
      <div style={{ padding: "6px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
        {children}
      </div>
    </div>
  );
}

function SidebarLink({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 11, color: "#FFFFFF" }}>
      • {children}
    </span>
  );
}
