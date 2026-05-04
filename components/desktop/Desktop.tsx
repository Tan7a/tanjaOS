"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import apps, { type AppId, type AppRegistryEntry } from "@/lib/apps";
import BlissWallpaper from "./BlissWallpaper";
import DesktopIcon from "./DesktopIcon";
import Window from "@/components/windows/Window";
import Taskbar, { type TaskbarWindow } from "./Taskbar";
import StartMenu from "./StartMenu";
import Screensaver from "./Screensaver";
import TipOfTheDay from "./TipOfTheDay";

interface WindowState {
  id: AppId;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

type Action =
  | { type: "open"; id: AppId; defaultPosition: { x: number; y: number } }
  | { type: "close"; id: AppId }
  | { type: "minimize"; id: AppId }
  | { type: "focus"; id: AppId }
  | { type: "setPosition"; id: AppId; position: { x: number; y: number } }
  | { type: "toggleFromTaskbar"; id: AppId };

const Z_BASE = 100;
const SCREENSAVER_IDLE_MS = 180_000; // 3 minutes

function nextZ(windows: WindowState[]) {
  return windows.length === 0 ? Z_BASE : Math.max(...windows.map((w) => w.zIndex)) + 1;
}

function reducer(state: WindowState[], action: Action): WindowState[] {
  switch (action.type) {
    case "open": {
      const existing = state.find((w) => w.id === action.id);
      const z = nextZ(state);
      if (existing) {
        return state.map((w) =>
          w.id === action.id ? { ...w, isMinimized: false, zIndex: z } : w,
        );
      }
      return [
        ...state,
        {
          id: action.id,
          isMinimized: false,
          zIndex: z,
          position: action.defaultPosition,
        },
      ];
    }
    case "close":
      return state.filter((w) => w.id !== action.id);
    case "minimize":
      return state.map((w) =>
        w.id === action.id ? { ...w, isMinimized: true } : w,
      );
    case "focus": {
      const target = state.find((w) => w.id === action.id);
      if (!target) return state;
      const top = state.reduce((m, w) => (w.zIndex > m ? w.zIndex : m), 0);
      if (target.zIndex === top && !target.isMinimized) return state;
      return state.map((w) =>
        w.id === action.id
          ? { ...w, zIndex: nextZ(state), isMinimized: false }
          : w,
      );
    }
    case "setPosition":
      return state.map((w) =>
        w.id === action.id ? { ...w, position: action.position } : w,
      );
    case "toggleFromTaskbar": {
      // XP behaviour: clicking active window's taskbar btn minimises it;
      // clicking another raises and un-minimises it.
      const target = state.find((w) => w.id === action.id);
      if (!target) return state;
      const top = state.reduce((m, w) => (w.zIndex > m ? w.zIndex : m), 0);
      const isActiveAndVisible = target.zIndex === top && !target.isMinimized;
      if (isActiveAndVisible) {
        return state.map((w) =>
          w.id === action.id ? { ...w, isMinimized: true } : w,
        );
      }
      return state.map((w) =>
        w.id === action.id
          ? { ...w, isMinimized: false, zIndex: nextZ(state) }
          : w,
      );
    }
    default:
      return state;
  }
}

export default function Desktop() {
  const [windows, dispatch] = useReducer(reducer, []);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [screensaverActive, setScreensaverActive] = useState(false);
  const idleTimerRef = useRef<number | null>(null);

  // idle timer for screensaver
  useEffect(() => {
    const reset = () => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
      if (!screensaverActive) {
        idleTimerRef.current = window.setTimeout(() => {
          setScreensaverActive(true);
        }, SCREENSAVER_IDLE_MS);
      }
    };

    const events = ["mousemove", "keydown", "mousedown", "wheel", "touchstart"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();

    return () => {
      events.forEach((e) => window.removeEventListener(e, reset));
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
    };
  }, [screensaverActive]);

  const open = (entry: AppRegistryEntry) =>
    dispatch({
      type: "open",
      id: entry.id,
      defaultPosition: entry.defaultPosition,
    });

  const focusedId =
    windows.length === 0
      ? null
      : windows.reduce((top, w) => (w.zIndex > top.zIndex ? w : top), windows[0]).id;

  const taskbarWindows: TaskbarWindow[] = windows.map((w) => {
    const entry = apps.find((a) => a.id === w.id)!;
    return {
      id: w.id,
      title: entry.title,
      icon: entry.icon(16),
      isMinimized: w.isMinimized,
      isActive: w.id === focusedId,
    };
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
      }}
      onMouseDown={(e) => {
        // clicking empty desktop deselects icons
        if (e.target === e.currentTarget) setSelectedIcon(null);
      }}
    >
      {/* Wallpaper area — bounds for window dragging */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: "var(--xp-taskbar-height)",
          overflow: "hidden",
        }}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) setSelectedIcon(null);
        }}
      >
        <BlissWallpaper />

        {/* Tip of the day widget — sits behind windows */}
        <TipOfTheDay />

        {/* Desktop icons — anchor-positioned, draggable */}
        {apps.map((entry, i) => (
          <DesktopIcon
            key={entry.id}
            title={entry.desktopLabel ?? entry.title}
            icon={entry.icon(32)}
            selected={selectedIcon === entry.id}
            position={
              entry.desktopIcon ?? { anchor: "tl", x: 8, y: 12 + i * 78 }
            }
            onSelect={() => setSelectedIcon(entry.id)}
            onOpen={() => open(entry)}
          />
        ))}

        {/* Open windows */}
        {windows.map((w) => {
          if (w.isMinimized) return null;
          const entry = apps.find((a) => a.id === w.id)!;
          const Body = entry.component;
          return (
            <Window
              key={w.id}
              id={w.id}
              title={entry.title}
              icon={entry.icon(14)}
              initialPosition={w.position}
              initialSize={entry.defaultSize}
              zIndex={w.zIndex}
              isActive={w.id === focusedId}
              onClose={() => dispatch({ type: "close", id: w.id })}
              onMinimize={() => dispatch({ type: "minimize", id: w.id })}
              onFocus={() => dispatch({ type: "focus", id: w.id })}
              onPositionChange={(position) =>
                dispatch({ type: "setPosition", id: w.id, position })
              }
            >
              <Body />
            </Window>
          );
        })}
      </div>

      {/* Start menu */}
      {startOpen && (
        <StartMenu
          onClose={() => setStartOpen(false)}
          onLaunch={(id) => {
            const entry = apps.find((a) => a.id === id);
            if (entry) open(entry);
          }}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        registry={apps}
        windows={taskbarWindows}
        startOpen={startOpen}
        onStartToggle={() => setStartOpen((o) => !o)}
        onTaskbarButtonClick={(id) =>
          dispatch({ type: "toggleFromTaskbar", id })
        }
      />

      {/* Screensaver overlay */}
      {screensaverActive && (
        <Screensaver onDismiss={() => setScreensaverActive(false)} />
      )}
    </div>
  );
}
