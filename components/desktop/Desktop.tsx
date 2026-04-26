"use client";

import { useState } from "react";
import apps from "@/lib/apps";
import DesktopIcon from "./DesktopIcon";
import Window from "@/components/windows/Window";

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<Record<string, boolean>>({});

  const openWindow = (id: string) =>
    setOpenWindows((prev) => ({ ...prev, [id]: true }));

  const closeWindow = (id: string) =>
    setOpenWindows((prev) => ({ ...prev, [id]: false }));

  return (
    <div className="relative w-full h-screen overflow-hidden desktop-bg">
      {/* SVG landscape background */}
      <DesktopBackground />

      {/* Desktop icons — top-left column */}
      <div className="absolute top-8 left-8 flex flex-col gap-4 z-10">
        {apps.map((app) => (
          <DesktopIcon
            key={app.id}
            title={app.title}
            icon={app.icon}
            onClick={() => openWindow(app.id)}
          />
        ))}
      </div>

      {/* Open windows */}
      {apps.map((app) =>
        openWindows[app.id] ? (
          <Window
            key={app.id}
            title={app.title}
            onClose={() => closeWindow(app.id)}
            defaultPosition={app.defaultPosition}
          >
            <app.component />
          </Window>
        ) : null
      )}
    </div>
  );
}

function DesktopBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Sky gradient */}
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8c9a0" />
          <stop offset="45%" stopColor="#f2b27a" />
          <stop offset="100%" stopColor="#d4855a" />
        </linearGradient>
        <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a9e7e" />
          <stop offset="100%" stopColor="#4e7a52" />
        </linearGradient>
        <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5c8a5e" />
          <stop offset="100%" stopColor="#3a6040" />
        </linearGradient>
        <linearGradient id="hill3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8725a" />
          <stop offset="100%" stopColor="#a0503c" />
        </linearGradient>
        <linearGradient id="hill4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8ab08e" />
          <stop offset="100%" stopColor="#5a8060" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="1440" height="900" fill="url(#sky)" />

      {/* Sun */}
      <circle cx="1100" cy="200" r="70" fill="#f2c894" opacity="0.7" />
      <circle cx="1100" cy="200" r="50" fill="#f0b060" opacity="0.9" />

      {/* Far hills — sage green */}
      <path
        d="M0,600 C200,480 400,420 600,460 C800,500 1000,430 1200,450 C1350,460 1400,480 1440,490 L1440,900 L0,900 Z"
        fill="url(#hill4)"
        opacity="0.85"
      />

      {/* Mid hills — terracotta */}
      <path
        d="M0,680 C150,600 320,560 500,580 C680,600 820,545 1000,560 C1180,575 1320,600 1440,610 L1440,900 L0,900 Z"
        fill="url(#hill3)"
      />

      {/* Foreground hills — deep green */}
      <path
        d="M0,760 C100,720 250,700 400,720 C600,745 750,700 950,715 C1150,730 1300,720 1440,730 L1440,900 L0,900 Z"
        fill="url(#hill1)"
      />

      {/* Ground strip */}
      <path
        d="M0,820 C200,800 500,810 800,805 C1100,800 1300,815 1440,820 L1440,900 L0,900 Z"
        fill="url(#hill2)"
      />

      {/* Organic tree shapes — left */}
      <ellipse cx="80" cy="730" rx="30" ry="50" fill="#3a6040" opacity="0.9" />
      <ellipse cx="110" cy="750" rx="22" ry="38" fill="#4e7a52" opacity="0.8" />

      {/* Tree — right side */}
      <ellipse cx="1360" cy="720" rx="35" ry="55" fill="#3a6040" opacity="0.9" />
      <ellipse cx="1330" cy="745" rx="24" ry="40" fill="#4e7a52" opacity="0.8" />

      {/* Small dots — wildflowers/detail */}
      <circle cx="300" cy="800" r="3" fill="#f2c894" opacity="0.8" />
      <circle cx="340" cy="810" r="2" fill="#f2c894" opacity="0.7" />
      <circle cx="580" cy="795" r="3" fill="#f0e0c0" opacity="0.7" />
      <circle cx="900" cy="808" r="2.5" fill="#f2c894" opacity="0.8" />
      <circle cx="1050" cy="798" r="3" fill="#f0e0c0" opacity="0.7" />

      {/* Faint cloud shapes */}
      <ellipse cx="250" cy="140" rx="90" ry="30" fill="#fdf6ee" opacity="0.25" />
      <ellipse cx="330" cy="130" rx="60" ry="22" fill="#fdf6ee" opacity="0.2" />
      <ellipse cx="800" cy="100" rx="110" ry="32" fill="#fdf6ee" opacity="0.2" />
      <ellipse cx="890" cy="92" rx="70" ry="24" fill="#fdf6ee" opacity="0.15" />
    </svg>
  );
}
