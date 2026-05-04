"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  WindowsFlagIcon,
  VolumeIcon,
  NetworkIcon,
  ConnectedNetworkIcon,
} from "@/components/icons/AppIcons";
import type { AppRegistryEntry, AppId } from "@/lib/apps";
import { useDialUp } from "@/lib/dialup-context";

export interface TaskbarWindow {
  id: AppId;
  title: string;
  icon: ReactNode;
  isMinimized: boolean;
  isActive: boolean;
}

interface TaskbarProps {
  registry: AppRegistryEntry[];
  windows: TaskbarWindow[];
  startOpen: boolean;
  onStartToggle: () => void;
  onTaskbarButtonClick: (id: AppId) => void;
}

export default function Taskbar({
  windows,
  startOpen,
  onStartToggle,
  onTaskbarButtonClick,
}: TaskbarProps) {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        height: "var(--xp-taskbar-height)",
        background: "var(--xp-taskbar-bg)",
        display: "flex",
        alignItems: "stretch",
        zIndex: 9000,
        boxShadow: "0 -1px 0 #4080DC, 0 -2px 0 #1A4FB8 inset",
        userSelect: "none",
      }}
    >
      <StartButton open={startOpen} onClick={onStartToggle} />

      {/* Open window buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: "0 4px",
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {windows.map((w) => (
          <TaskbarButton
            key={w.id}
            window={w}
            onClick={() => onTaskbarButtonClick(w.id)}
          />
        ))}
      </div>

      <SystemTray />
    </div>
  );
}

function StartButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
      data-startbtn="true"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        height: "100%",
        padding: "0 18px 2px 8px",
        background: open
          ? "linear-gradient(to bottom, #2A6F2A 0%, #1A5520 60%, #3FAA3F 100%)"
          : "linear-gradient(to bottom, #4DAA4D 0%, var(--xp-start-green) 50%, #1F5D1F 100%)",
        color: "#FFFFFF",
        border: "none",
        borderTopRightRadius: 14,
        borderBottomRightRadius: 14,
        boxShadow: open
          ? "inset 0 1px 0 #1A5520, inset 0 -1px 0 #5BBF5B"
          : "inset 0 1px 0 #7BD27B, inset 0 -1px 0 #1A5520",
        fontFamily: "var(--xp-font)",
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "italic",
        textShadow: "1px 1px 0 rgba(0, 0, 0, 0.4)",
        cursor: "default",
      }}
    >
      <WindowsFlagIcon size={18} />
      <span>start</span>
    </button>
  );
}

function TaskbarButton({
  window: w,
  onClick,
}: {
  window: TaskbarWindow;
  onClick: () => void;
}) {
  const active = w.isActive && !w.isMinimized;
  return (
    <button
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        height: 22,
        padding: "0 10px",
        minWidth: 140,
        maxWidth: 180,
        background: active
          ? "linear-gradient(to bottom, #1042A3, #2769D6 50%, #1042A3)"
          : "linear-gradient(to bottom, #3C81F3, #1E5FCF)",
        color: "#FFFFFF",
        border: "1px solid #0A2F6B",
        borderRadius: 3,
        boxShadow: active
          ? "inset 1px 1px 2px rgba(0, 0, 0, 0.5)"
          : "inset 0 1px 0 rgba(255, 255, 255, 0.4)",
        fontFamily: "var(--xp-font)",
        fontSize: 11,
        fontWeight: active ? "bold" : "normal",
        textShadow: "1px 1px 0 rgba(0, 0, 0, 0.3)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      <span
        style={{
          width: 16,
          height: 16,
          flexShrink: 0,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {w.icon}
      </span>
      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
        {w.title}
      </span>
    </button>
  );
}

function SystemTray() {
  const [time, setTime] = useState<string>(() => formatNow());
  const { isConnected } = useDialUp();

  useEffect(() => {
    const tick = () => setTime(formatNow());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "0 10px",
        minWidth: 110,
        background: "linear-gradient(to bottom, #0F4FB5, #1957C8 50%, #0F4FB5)",
        borderLeft: "1px solid #0A2F6B",
        boxShadow: "inset 1px 0 0 rgba(255,255,255,0.18)",
        color: "#FFFFFF",
        fontFamily: "var(--xp-font)",
        fontSize: 11,
        textShadow: "1px 1px 0 rgba(0, 0, 0, 0.3)",
      }}
    >
      <VolumeIcon size={14} />
      {isConnected ? (
        <span title="Connected to TanjaNet">
          <ConnectedNetworkIcon size={14} />
        </span>
      ) : (
        <span title="Not connected">
          <NetworkIcon size={14} />
        </span>
      )}
      <span>{time}</span>
    </div>
  );
}

function formatNow() {
  const d = new Date();
  const h = d.getHours() % 12 === 0 ? 12 : d.getHours() % 12;
  const m = d.getMinutes().toString().padStart(2, "0");
  const meridiem = d.getHours() < 12 ? "AM" : "PM";
  return `${h}:${m} ${meridiem}`;
}
