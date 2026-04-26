"use client";

interface DesktopIconProps {
  title: string;
  icon: string;
  onClick: () => void;
}

export default function DesktopIcon({ title, icon, onClick }: DesktopIconProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-3 rounded-xl group select-none transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 group-active:scale-95"
        style={{ background: "#c8725a" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt={title} className="w-9 h-9" />
      </div>
      <span
        className="font-body text-xs font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] text-center leading-tight max-w-[80px]"
      >
        {title}
      </span>
    </button>
  );
}
