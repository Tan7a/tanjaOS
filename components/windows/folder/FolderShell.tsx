"use client";

import { useState, type ReactNode } from "react";
import { FolderIcon } from "@/components/icons/AppIcons";

export interface FolderFile {
  name: string;
  icon: ReactNode;
  caption?: string;
}

export interface SidebarGroup {
  title: string;
  links: string[];
}

interface FolderShellProps {
  path: string;
  tasks: SidebarGroup;
  otherTasks?: SidebarGroup;
  otherPlaces: SidebarGroup;
  files: FolderFile[];
  emptyMessage?: string;
  /** Status-bar text shown bottom-left, e.g. "8 objects" */
  itemNoun?: string;
}

export default function FolderShell({
  path,
  tasks,
  otherTasks,
  otherPlaces,
  files,
  emptyMessage,
  itemNoun = "objects",
}: FolderShellProps) {
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
          <span>{path}</span>
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
            overflow: "auto",
          }}
        >
          <SidebarSection title={tasks.title}>
            {tasks.links.map((l) => (
              <SidebarLink key={l}>{l}</SidebarLink>
            ))}
          </SidebarSection>
          {otherTasks && (
            <SidebarSection title={otherTasks.title}>
              {otherTasks.links.map((l) => (
                <SidebarLink key={l}>{l}</SidebarLink>
              ))}
            </SidebarSection>
          )}
          <SidebarSection title={otherPlaces.title}>
            {otherPlaces.links.map((l) => (
              <SidebarLink key={l}>{l}</SidebarLink>
            ))}
          </SidebarSection>
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            background: "#FFFFFF",
            padding: 12,
            overflow: "auto",
            display: files.length === 0 ? "flex" : "grid",
            alignItems: files.length === 0 ? "center" : "start",
            justifyContent: files.length === 0 ? "center" : undefined,
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: 12,
            alignContent: "start",
          }}
          onClick={() => setSelected(null)}
        >
          {files.length === 0 ? (
            <span style={{ color: "#7A7060", fontSize: 11, fontStyle: "italic" }}>
              {emptyMessage ?? "This folder is empty."}
            </span>
          ) : (
            files.map((f) => {
              const isSel = selected === f.name;
              return (
                <button
                  key={f.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(f.name);
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    padding: 4,
                    background: isSel ? "#D6E4F8" : "transparent",
                    border: isSel ? "1px dotted #316AC5" : "1px solid transparent",
                    cursor: "default",
                  }}
                >
                  <span
                    style={{
                      width: 48,
                      height: 48,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {f.icon}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: isSel ? "#FFFFFF" : "#000000",
                      background: isSel ? "var(--xp-selection)" : "transparent",
                      padding: "0 3px",
                      maxWidth: 110,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >
                    {f.name}
                  </span>
                  {f.caption && (
                    <span
                      style={{
                        fontSize: 10,
                        color: isSel ? "#FFFFFF" : "#5A5A5A",
                        maxWidth: 110,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      {f.caption}
                    </span>
                  )}
                </button>
              );
            })
          )}
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
        {files.length} {itemNoun}
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
        cursor: "default",
      }}
    >
      <span>{arrow}</span> {label}
    </button>
  );
}

function SidebarSection({ title, children }: { title: string; children: ReactNode }) {
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

function SidebarLink({ children }: { children: ReactNode }) {
  return <span style={{ fontSize: 11, color: "#FFFFFF" }}>• {children}</span>;
}
