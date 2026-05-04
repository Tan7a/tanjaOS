/**
 * Inline SVG icons in the early-2000s XP aesthetic.
 * Bold flat fills + a single highlight per shape; not pixel-perfect.
 */

interface IconProps {
  size?: number;
  className?: string;
}

const defaults = (size = 32) => ({
  width: size,
  height: size,
  viewBox: "0 0 32 32",
  xmlns: "http://www.w3.org/2000/svg",
});

export function MyDocumentsIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...defaults(size)} className={className}>
      <defs>
        <linearGradient id="myDocsBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE17A" />
          <stop offset="100%" stopColor="#E8B833" />
        </linearGradient>
      </defs>
      <path d="M3 9 L13 9 L15 11 L29 11 L29 26 L3 26 Z" fill="url(#myDocsBody)" stroke="#9A7A1A" strokeWidth="0.8" />
      <path d="M3 9 L13 9 L15 11 L29 11 L29 13 L3 13 Z" fill="#FFD850" />
      {/* document corner peek */}
      <rect x="11" y="7" width="14" height="11" rx="1" fill="#FFFFFF" stroke="#9A7A1A" strokeWidth="0.6" />
      <line x1="13" y1="10" x2="22" y2="10" stroke="#5A6B82" strokeWidth="0.6" />
      <line x1="13" y1="12" x2="22" y2="12" stroke="#5A6B82" strokeWidth="0.6" />
      <line x1="13" y1="14" x2="20" y2="14" stroke="#5A6B82" strokeWidth="0.6" />
    </svg>
  );
}

export function MyComputerIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...defaults(size)} className={className}>
      <defs>
        <linearGradient id="monitorBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8E4D8" />
          <stop offset="100%" stopColor="#9D9888" />
        </linearGradient>
        <linearGradient id="monitorScreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5DADE2" />
          <stop offset="100%" stopColor="#1B5FBF" />
        </linearGradient>
      </defs>
      <rect x="3" y="5" width="26" height="18" rx="1" fill="url(#monitorBody)" stroke="#3A3A3A" strokeWidth="0.8" />
      <rect x="5" y="7" width="22" height="13" rx="0.5" fill="url(#monitorScreen)" />
      <path d="M5 7 L22 7 L22 12 Q14 10 5 14 Z" fill="#FFFFFF" opacity="0.18" />
      <rect x="12" y="23" width="8" height="3" fill="#C8C2B0" stroke="#3A3A3A" strokeWidth="0.6" />
      <rect x="9" y="26" width="14" height="2" rx="0.5" fill="#9D9888" stroke="#3A3A3A" strokeWidth="0.6" />
    </svg>
  );
}

export function MusicPlayerIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...defaults(size)} className={className}>
      <defs>
        <radialGradient id="cdSheen" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#C8E0F8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cdRim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9CC8F0" />
          <stop offset="100%" stopColor="#3A6FB5" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="13" fill="url(#cdRim)" stroke="#1A3A6B" strokeWidth="0.8" />
      <circle cx="16" cy="16" r="13" fill="url(#cdSheen)" />
      <circle cx="16" cy="16" r="4" fill="#FFFFFF" stroke="#1A3A6B" strokeWidth="0.6" />
      <circle cx="16" cy="16" r="1.2" fill="#1A3A6B" />
      {/* music note */}
      <path d="M22 10 L22 16 A1.6 1.6 0 1 1 21 14.5 L21 11 L25 10 L25 13 A1.6 1.6 0 1 1 24 11.5 L24 9 Z" fill="#FFFFFF" />
    </svg>
  );
}

export function DXBallIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...defaults(size)} className={className}>
      <defs>
        <linearGradient id="ballGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#C8C8C8" />
        </linearGradient>
      </defs>
      {/* bricks */}
      <rect x="3" y="4" width="6" height="3" fill="#E64545" />
      <rect x="10" y="4" width="6" height="3" fill="#F0883A" />
      <rect x="17" y="4" width="6" height="3" fill="#F2C636" />
      <rect x="24" y="4" width="5" height="3" fill="#5BC04C" />
      <rect x="3" y="8" width="6" height="3" fill="#3A8FE0" />
      <rect x="10" y="8" width="6" height="3" fill="#9E5BD8" />
      <rect x="17" y="8" width="6" height="3" fill="#E64545" />
      <rect x="24" y="8" width="5" height="3" fill="#F0883A" />
      {/* ball */}
      <circle cx="12" cy="20" r="2.5" fill="url(#ballGrad)" stroke="#3A3A3A" strokeWidth="0.5" />
      {/* paddle */}
      <rect x="8" y="26" width="16" height="3" rx="1.5" fill="#3A8FE0" stroke="#1A5FBF" strokeWidth="0.5" />
    </svg>
  );
}

export function PhotoFolderIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...defaults(size)} className={className}>
      <defs>
        <linearGradient id="photoFolderBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE17A" />
          <stop offset="100%" stopColor="#E8B833" />
        </linearGradient>
      </defs>
      <path d="M3 9 L13 9 L15 11 L29 11 L29 26 L3 26 Z" fill="url(#photoFolderBody)" stroke="#9A7A1A" strokeWidth="0.8" />
      {/* photo peeking out */}
      <rect x="9" y="13" width="16" height="11" rx="0.5" fill="#FFFFFF" stroke="#9A7A1A" strokeWidth="0.6" />
      <rect x="10" y="14" width="14" height="9" fill="#5DADE2" />
      <circle cx="14" cy="17" r="1.2" fill="#FFE17A" />
      <path d="M10 22 L14 18 L17 20 L22 16 L24 19 L24 23 L10 23 Z" fill="#3D7A1A" />
    </svg>
  );
}

export function ScreenplayIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...defaults(size)} className={className}>
      <rect x="6" y="3" width="20" height="26" rx="1" fill="#FFFFFF" stroke="#3A3A3A" strokeWidth="0.8" />
      <rect x="6" y="3" width="20" height="4" fill="#3A6FB5" />
      <text x="16" y="6.5" fontFamily="Tahoma, Arial, sans-serif" fontSize="3" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">W</text>
      <line x1="9" y1="11" x2="23" y2="11" stroke="#5A6B82" strokeWidth="0.6" />
      <line x1="9" y1="13.5" x2="23" y2="13.5" stroke="#5A6B82" strokeWidth="0.6" />
      <line x1="9" y1="16" x2="20" y2="16" stroke="#5A6B82" strokeWidth="0.6" />
      <line x1="9" y1="18.5" x2="23" y2="18.5" stroke="#5A6B82" strokeWidth="0.6" />
      <line x1="9" y1="21" x2="22" y2="21" stroke="#5A6B82" strokeWidth="0.6" />
      <line x1="9" y1="23.5" x2="18" y2="23.5" stroke="#5A6B82" strokeWidth="0.6" />
    </svg>
  );
}

export function RecycleBinIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...defaults(size)} className={className}>
      <defs>
        <linearGradient id="binBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A8C8F0" />
          <stop offset="100%" stopColor="#5A8FCB" />
        </linearGradient>
      </defs>
      <path d="M7 9 L25 9 L23 28 L9 28 Z" fill="url(#binBody)" stroke="#1A3A6B" strokeWidth="0.8" />
      <ellipse cx="16" cy="9" rx="9" ry="2" fill="#5A8FCB" stroke="#1A3A6B" strokeWidth="0.8" />
      <ellipse cx="16" cy="9" rx="9" ry="2" fill="#A8C8F0" opacity="0.5" />
      {/* recycle arrows */}
      <path d="M11 16 L13 14 L15 16 M13 14 L13 22 M13 22 L11 20 M13 22 L15 20" stroke="#FFFFFF" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M19 18 L21 16 L23 18" stroke="#FFFFFF" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function IEIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...defaults(size)} className={className}>
      <defs>
        <radialGradient id="ieGlobe" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#A8E8FF" />
          <stop offset="100%" stopColor="#1A5FBF" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="12" fill="url(#ieGlobe)" stroke="#0A2F6B" strokeWidth="0.8" />
      <ellipse cx="16" cy="16" rx="12" ry="5" fill="none" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.7" />
      <ellipse cx="16" cy="16" rx="5" ry="12" fill="none" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.7" />
      <path d="M16 4 Q22 16 16 28 Q10 16 16 4 Z" fill="none" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.7" />
      {/* yellow swirl */}
      <path d="M5 10 Q16 6 27 10 L27 13 Q16 9 5 13 Z" fill="#F2C636" opacity="0.85" />
      <text x="16" y="20" fontFamily="serif" fontSize="11" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">e</text>
    </svg>
  );
}

export function WMPIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...defaults(size)} className={className}>
      <defs>
        <linearGradient id="wmpRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF8A4A" />
          <stop offset="100%" stopColor="#C03020" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="12" fill="url(#wmpRing)" stroke="#7A1A10" strokeWidth="0.8" />
      <circle cx="16" cy="16" r="12" fill="#FFFFFF" opacity="0.18" />
      <path d="M13 10 L23 16 L13 22 Z" fill="#FFFFFF" />
    </svg>
  );
}

export function WindowsFlagIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* the four-color XP flag, slight wave */}
      <path d="M2 3 L8 2 L8 7.5 L2 8.5 Z" fill="#E2453C" />
      <path d="M8 2 L14 1.5 L14 7 L8 7.5 Z" fill="#7BC23E" />
      <path d="M2 8.5 L8 7.5 L8 13 L2 14 Z" fill="#3F8AD9" />
      <path d="M8 7.5 L14 7 L14 12.5 L8 13 Z" fill="#F2C636" />
    </svg>
  );
}

export function VolumeIcon({ size = 14, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M3 6 L6 6 L9 3 L9 13 L6 10 L3 10 Z" fill="#FFFFFF" />
      <path d="M11 5 Q13 8 11 11 M12.5 3.5 Q15.5 8 12.5 12.5" stroke="#FFFFFF" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function NetworkIcon({ size = 14, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="2" y="9" width="5" height="4" rx="0.5" fill="#FFFFFF" stroke="#0A2F6B" strokeWidth="0.4" />
      <rect x="9" y="9" width="5" height="4" rx="0.5" fill="#FFFFFF" stroke="#0A2F6B" strokeWidth="0.4" />
      <line x1="4.5" y1="9" x2="4.5" y2="6" stroke="#FFFFFF" strokeWidth="0.8" />
      <line x1="11.5" y1="9" x2="11.5" y2="6" stroke="#FFFFFF" strokeWidth="0.8" />
      <line x1="4.5" y1="6" x2="11.5" y2="6" stroke="#FFFFFF" strokeWidth="0.8" />
      <circle cx="3.5" cy="11" r="0.5" fill="#7BC23E" />
      <circle cx="10.5" cy="11" r="0.5" fill="#7BC23E" />
    </svg>
  );
}

export function UserAvatarIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="48" height="48" rx="3" fill="#E64545" />
      <rect width="48" height="48" rx="3" fill="#FFFFFF" opacity="0.15" />
      {/* chess-knight-ish silhouette */}
      <path
        d="M14 36 L34 36 L34 33 Q32 30 28 28 Q26 26 26 22 Q30 22 32 18 Q31 14 28 12 Q24 10 20 12 Q16 14 16 18 Q18 22 22 22 Q22 26 18 28 Q14 30 14 33 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function PennyIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...defaults(size)} className={className}>
      {/* head — white base */}
      <ellipse cx="16" cy="17" rx="11" ry="9.5" fill="#FFFFFF" stroke="#3A3A3A" strokeWidth="0.8" />
      {/* black ear (floppy, right) */}
      <path d="M22 9 Q27 9 27 14 Q27 19 23 19 Q21 17 21 13 Z" fill="#1F1F1F" stroke="#3A3A3A" strokeWidth="0.6" />
      {/* white-tipped ear (left, smaller) */}
      <path d="M9 9 Q5 10 5.5 14 Q6 18 10 18 Q11 16 11 13 Z" fill="#1F1F1F" stroke="#3A3A3A" strokeWidth="0.6" />
      {/* black face patch over right eye */}
      <path d="M16 12 Q22 11 23 17 Q21 21 16 20 Q14 17 16 12 Z" fill="#1F1F1F" />
      {/* eyes */}
      <circle cx="12.2" cy="16" r="1.3" fill="#3A2418" />
      <circle cx="11.8" cy="15.6" r="0.4" fill="#FFFFFF" />
      <circle cx="19.5" cy="16" r="1.3" fill="#FFE9C8" />
      <circle cx="19.1" cy="15.6" r="0.4" fill="#FFFFFF" />
      {/* snout / nose */}
      <ellipse cx="16" cy="20.5" rx="2.6" ry="2" fill="#FFFFFF" stroke="#3A3A3A" strokeWidth="0.5" />
      <ellipse cx="16" cy="20" rx="1.1" ry="0.8" fill="#1F1F1F" />
      {/* tongue */}
      <path d="M15 22 Q16 23.5 17 22 L17 23.5 Q16 24.5 15 23.5 Z" fill="#E64585" />
    </svg>
  );
}

export function AboutMeIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...defaults(size)} className={className}>
      <defs>
        <linearGradient id="aboutCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E8E4D8" />
        </linearGradient>
      </defs>
      {/* user-account card */}
      <rect x="3" y="5" width="26" height="22" rx="1.5" fill="url(#aboutCard)" stroke="#3A3A3A" strokeWidth="0.8" />
      {/* red avatar tile */}
      <rect x="6" y="8" width="11" height="11" rx="1" fill="#E64545" />
      <rect x="6" y="8" width="11" height="11" rx="1" fill="#FFFFFF" opacity="0.15" />
      {/* chess-knight silhouette inside the tile */}
      <path
        d="M8.5 17.5 L14.5 17.5 L14.5 16.5 Q14 15.6 12.7 14.9 Q12 14.2 12 12.9 Q13.4 12.9 14 11.7 Q13.7 10.4 12.6 9.8 Q11.5 9.3 10.4 9.8 Q9.3 10.4 9.3 11.7 Q9.9 12.9 11.3 12.9 Q11.3 14.2 10.6 14.9 Q9.3 15.6 8.5 16.5 Z"
        fill="#FFFFFF"
      />
      {/* name + lines */}
      <line x1="19" y1="10" x2="26" y2="10" stroke="#1F4F8B" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="19" y1="13" x2="26" y2="13" stroke="#9D9888" strokeWidth="0.6" />
      <line x1="19" y1="15" x2="25" y2="15" stroke="#9D9888" strokeWidth="0.6" />
      <line x1="19" y1="17" x2="26" y2="17" stroke="#9D9888" strokeWidth="0.6" />
      {/* footer separator + "OK" pip */}
      <line x1="6" y1="22" x2="26" y2="22" stroke="#B8B098" strokeWidth="0.5" />
      <rect x="20" y="23.5" width="6" height="2.5" rx="0.5" fill="#3A6FB5" />
    </svg>
  );
}

export function FolderIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...defaults(size)} className={className}>
      <defs>
        <linearGradient id="genericFolder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE17A" />
          <stop offset="100%" stopColor="#E8B833" />
        </linearGradient>
      </defs>
      <path d="M3 9 L13 9 L15 11 L29 11 L29 26 L3 26 Z" fill="url(#genericFolder)" stroke="#9A7A1A" strokeWidth="0.8" />
      <path d="M3 9 L13 9 L15 11 L29 11 L29 13 L3 13 Z" fill="#FFD850" />
    </svg>
  );
}

export function MyPicturesIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...defaults(size)} className={className}>
      <rect x="4" y="6" width="24" height="20" rx="1" fill="#FFFFFF" stroke="#3A3A3A" strokeWidth="0.8" />
      <rect x="6" y="8" width="20" height="16" fill="#5DADE2" />
      <circle cx="11" cy="13" r="1.6" fill="#F2C636" />
      <path d="M6 24 L13 16 L18 20 L25 13 L26 24 Z" fill="#3D7A1A" />
    </svg>
  );
}

export function MyMusicIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...defaults(size)} className={className}>
      <defs>
        <linearGradient id="myMusicFolder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE17A" />
          <stop offset="100%" stopColor="#E8B833" />
        </linearGradient>
      </defs>
      <path d="M3 9 L13 9 L15 11 L29 11 L29 26 L3 26 Z" fill="url(#myMusicFolder)" stroke="#9A7A1A" strokeWidth="0.8" />
      <path d="M14 14 L14 22 A2 2 0 1 1 12.5 19.5 L12.5 16.5 L20 14.5 L20 19 A2 2 0 1 1 18.5 16.5 L18.5 13.5 Z" fill="#3A3A3A" />
    </svg>
  );
}

/* ─── File-system + drive icons ─────────────────────────────────────────── */

export function HardDriveIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="hdBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8E4D8" />
          <stop offset="100%" stopColor="#9D9888" />
        </linearGradient>
      </defs>
      <rect x="6" y="14" width="36" height="20" rx="2" fill="url(#hdBody)" stroke="#3A3A3A" strokeWidth="0.8" />
      <rect x="8" y="16" width="32" height="11" rx="1" fill="#5A5A5A" />
      <rect x="10" y="18" width="28" height="2" fill="#3A8FE0" />
      <rect x="10" y="22" width="20" height="1" fill="#7BC23E" />
      <circle cx="36" cy="30" r="1.4" fill="#5BC04C" />
      <circle cx="40" cy="30" r="1.4" fill="#E64545" />
    </svg>
  );
}

export function FloppyDiskIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="6" y="6" width="36" height="36" rx="2" fill="#1F4F8B" stroke="#0A2F6B" strokeWidth="0.8" />
      <rect x="11" y="9" width="26" height="14" fill="#FFFFFF" />
      <rect x="14" y="11" width="20" height="2" fill="#3A6FB5" />
      <rect x="14" y="14" width="20" height="1" fill="#3A6FB5" />
      <rect x="14" y="16" width="14" height="1" fill="#3A6FB5" />
      <rect x="11" y="26" width="26" height="14" fill="#C8C2B0" stroke="#3A3A3A" strokeWidth="0.4" />
      <rect x="33" y="9" width="3" height="11" fill="#0A2F6B" />
      <text x="14" y="35" fontFamily="Tahoma, Arial, sans-serif" fontSize="6" fill="#3A3A3A">{"3.5″"}</text>
    </svg>
  );
}

export function CDDriveIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="cdDriveBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8E4D8" />
          <stop offset="100%" stopColor="#9D9888" />
        </linearGradient>
        <radialGradient id="cdDiscShine" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#C8E0F8" />
          <stop offset="100%" stopColor="#3A6FB5" />
        </radialGradient>
      </defs>
      <rect x="4" y="14" width="40" height="20" rx="2" fill="url(#cdDriveBody)" stroke="#3A3A3A" strokeWidth="0.8" />
      <rect x="8" y="20" width="22" height="3" fill="#3A3A3A" />
      <circle cx="38" cy="24" r="1.6" fill="#5BC04C" />
      {/* CD peeking out */}
      <circle cx="20" cy="34" r="10" fill="url(#cdDiscShine)" stroke="#1A3A6B" strokeWidth="0.6" />
      <circle cx="20" cy="34" r="3" fill="#FFFFFF" stroke="#1A3A6B" strokeWidth="0.5" />
      <circle cx="20" cy="34" r="0.8" fill="#1A3A6B" />
    </svg>
  );
}

export function RemovableDiskIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="10" y="8" width="28" height="34" rx="3" fill="#3A3A3A" stroke="#000" strokeWidth="0.8" />
      <rect x="13" y="11" width="22" height="14" fill="#0A2F6B" />
      <text x="24" y="20" fontFamily="Tahoma, Arial, sans-serif" fontSize="5" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">USB</text>
      <rect x="14" y="28" width="20" height="2" fill="#5A5A5A" />
      <rect x="14" y="32" width="14" height="2" fill="#5A5A5A" />
      <circle cx="34" cy="38" r="1.4" fill="#5BC04C" />
    </svg>
  );
}

export function DocFileIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 4 L30 4 L40 14 L40 44 L10 44 Z" fill="#FFFFFF" stroke="#3A3A3A" strokeWidth="0.8" />
      <path d="M30 4 L30 14 L40 14 Z" fill="#C8C2B0" stroke="#3A3A3A" strokeWidth="0.6" />
      <rect x="10" y="20" width="30" height="6" fill="#1F4F8B" />
      <text x="25" y="25" fontFamily="Tahoma, Arial, sans-serif" fontSize="5" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">W</text>
      <line x1="14" y1="30" x2="36" y2="30" stroke="#5A6B82" strokeWidth="0.8" />
      <line x1="14" y1="33" x2="36" y2="33" stroke="#5A6B82" strokeWidth="0.8" />
      <line x1="14" y1="36" x2="30" y2="36" stroke="#5A6B82" strokeWidth="0.8" />
      <line x1="14" y1="39" x2="36" y2="39" stroke="#5A6B82" strokeWidth="0.8" />
    </svg>
  );
}

export function TxtFileIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 4 L30 4 L40 14 L40 44 L10 44 Z" fill="#FFFFFF" stroke="#3A3A3A" strokeWidth="0.8" />
      <path d="M30 4 L30 14 L40 14 Z" fill="#C8C2B0" stroke="#3A3A3A" strokeWidth="0.6" />
      <line x1="14" y1="20" x2="36" y2="20" stroke="#5A6B82" strokeWidth="0.8" />
      <line x1="14" y1="23" x2="36" y2="23" stroke="#5A6B82" strokeWidth="0.8" />
      <line x1="14" y1="26" x2="32" y2="26" stroke="#5A6B82" strokeWidth="0.8" />
      <line x1="14" y1="29" x2="36" y2="29" stroke="#5A6B82" strokeWidth="0.8" />
      <line x1="14" y1="32" x2="28" y2="32" stroke="#5A6B82" strokeWidth="0.8" />
      <line x1="14" y1="35" x2="36" y2="35" stroke="#5A6B82" strokeWidth="0.8" />
    </svg>
  );
}

export function ZipFileIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="zipFolder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE17A" />
          <stop offset="100%" stopColor="#E8B833" />
        </linearGradient>
      </defs>
      <path d="M5 12 L19 12 L22 16 L43 16 L43 40 L5 40 Z" fill="url(#zipFolder)" stroke="#9A7A1A" strokeWidth="0.8" />
      {/* zipper teeth */}
      <rect x="22" y="20" width="4" height="2" fill="#3A3A3A" />
      <rect x="22" y="24" width="4" height="2" fill="#3A3A3A" />
      <rect x="22" y="28" width="4" height="2" fill="#3A3A3A" />
      <rect x="22" y="32" width="4" height="2" fill="#3A3A3A" />
      <rect x="20" y="18" width="8" height="3" fill="#5A5A5A" stroke="#3A3A3A" strokeWidth="0.4" />
    </svg>
  );
}

export function ImageFileIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 4 L30 4 L40 14 L40 44 L10 44 Z" fill="#FFFFFF" stroke="#3A3A3A" strokeWidth="0.8" />
      <path d="M30 4 L30 14 L40 14 Z" fill="#C8C2B0" stroke="#3A3A3A" strokeWidth="0.6" />
      <rect x="13" y="20" width="24" height="20" fill="#5DADE2" />
      <circle cx="18" cy="26" r="2" fill="#F2C636" />
      <path d="M13 40 L20 30 L25 34 L32 24 L37 32 L37 40 Z" fill="#3D7A1A" />
    </svg>
  );
}

export function AudioFileIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 4 L30 4 L40 14 L40 44 L10 44 Z" fill="#FFFFFF" stroke="#3A3A3A" strokeWidth="0.8" />
      <path d="M30 4 L30 14 L40 14 Z" fill="#C8C2B0" stroke="#3A3A3A" strokeWidth="0.6" />
      <path d="M18 22 L18 36 A3 3 0 1 1 15 33 L15 26 L30 22 L30 32 A3 3 0 1 1 27 29 L27 19 Z" fill="#3A6FB5" />
    </svg>
  );
}

export function PdfFileIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 4 L30 4 L40 14 L40 44 L10 44 Z" fill="#FFFFFF" stroke="#3A3A3A" strokeWidth="0.8" />
      <path d="M30 4 L30 14 L40 14 Z" fill="#C8C2B0" stroke="#3A3A3A" strokeWidth="0.6" />
      <rect x="11" y="26" width="28" height="10" fill="#D52A2A" />
      <text x="25" y="33" fontFamily="Tahoma, Arial, sans-serif" fontSize="6" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">PDF</text>
    </svg>
  );
}

export function FullRecycleBinIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...defaults(size)} className={className}>
      <defs>
        <linearGradient id="fullBinBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A8C8F0" />
          <stop offset="100%" stopColor="#5A8FCB" />
        </linearGradient>
      </defs>
      <path d="M7 9 L25 9 L23 28 L9 28 Z" fill="url(#fullBinBody)" stroke="#1A3A6B" strokeWidth="0.8" />
      <ellipse cx="16" cy="9" rx="9" ry="2" fill="#5A8FCB" stroke="#1A3A6B" strokeWidth="0.8" />
      {/* crumpled paper inside */}
      <path d="M10 13 L13 11 L17 13 L21 11 L22 14 L20 18 L14 17 Z" fill="#FFFFFF" stroke="#3A3A3A" strokeWidth="0.4" />
      <path d="M11 18 L14 17 L18 19 L20 18 L21 22 L17 23 L12 22 Z" fill="#FFE17A" stroke="#9A7A1A" strokeWidth="0.4" />
      <path d="M11 16 L14 15 L11 14 Z" fill="#E64545" />
      {/* recycle arrows */}
      <path d="M11 22 L13 20 L15 22" stroke="#FFFFFF" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function BookshelfIcon({ size = 32, className }: IconProps) {
  return (
    <svg {...defaults(size)} className={className}>
      <defs>
        <linearGradient id="bookshelfPlank" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A87A4B" />
          <stop offset="100%" stopColor="#6B4A28" />
        </linearGradient>
        <linearGradient id="bookRed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E64545" />
          <stop offset="100%" stopColor="#9A2B2B" />
        </linearGradient>
        <linearGradient id="bookBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A8BD8" />
          <stop offset="100%" stopColor="#1F4D8C" />
        </linearGradient>
        <linearGradient id="bookGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6BBF6B" />
          <stop offset="100%" stopColor="#2E5E2E" />
        </linearGradient>
        <linearGradient id="bookYellow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2C14E" />
          <stop offset="100%" stopColor="#B8862E" />
        </linearGradient>
      </defs>
      {/* Books standing up */}
      <rect x="5" y="6" width="4" height="20" fill="url(#bookRed)" stroke="#5A1A1A" strokeWidth="0.6" />
      <rect x="9" y="8" width="3" height="18" fill="url(#bookYellow)" stroke="#8A6420" strokeWidth="0.6" />
      <rect x="12" y="5" width="5" height="21" fill="url(#bookBlue)" stroke="#152E5E" strokeWidth="0.6" />
      <rect x="17" y="7" width="4" height="19" fill="url(#bookGreen)" stroke="#1A3F1A" strokeWidth="0.6" />
      <rect x="21" y="9" width="3" height="17" fill="url(#bookRed)" stroke="#5A1A1A" strokeWidth="0.6" />
      {/* Book spine details */}
      <line x1="5" y1="10" x2="9" y2="10" stroke="#FFFFFF" strokeWidth="0.4" opacity="0.6" />
      <line x1="12" y1="9" x2="17" y2="9" stroke="#FFFFFF" strokeWidth="0.4" opacity="0.6" />
      <line x1="17" y1="11" x2="21" y2="11" stroke="#FFFFFF" strokeWidth="0.4" opacity="0.6" />
      {/* Stacked book on right */}
      <rect x="24" y="22" width="5" height="2" fill="#A8743A" stroke="#5A3A18" strokeWidth="0.4" />
      <rect x="24" y="24" width="5" height="2" fill="#7A4A8A" stroke="#3A1A4A" strokeWidth="0.4" />
      {/* Shelf plank */}
      <rect x="3" y="26" width="27" height="2.5" fill="url(#bookshelfPlank)" stroke="#3A2410" strokeWidth="0.5" />
    </svg>
  );
}

export function TerminalIcon({ size = 32, className }: IconProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="termFrame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8E4D4" />
          <stop offset="100%" stopColor="#B8B098" />
        </linearGradient>
        <linearGradient id="termTitle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0058E0" />
          <stop offset="100%" stopColor="#3A93FF" />
        </linearGradient>
      </defs>
      {/* Outer beige window frame */}
      <rect x="2" y="3" width="28" height="26" rx="1.5" fill="url(#termFrame)" stroke="#5A5A5A" strokeWidth="0.6" />
      {/* Title bar */}
      <rect x="2.5" y="3.5" width="27" height="4.5" rx="0.5" fill="url(#termTitle)" />
      <circle cx="27" cy="5.7" r="0.9" fill="#FFFFFF" opacity="0.85" />
      <circle cx="24.5" cy="5.7" r="0.9" fill="#FFFFFF" opacity="0.5" />
      {/* Black screen */}
      <rect x="3.5" y="9" width="25" height="19" fill="#000000" />
      {/* Prompt text */}
      <text x="5" y="16" fontFamily="Consolas, 'Lucida Console', monospace" fontSize="5" fill="#FFFFFF">C:\&gt;</text>
      {/* Blinking caret look */}
      <rect x="14.5" y="12.5" width="2.2" height="4.5" fill="#FFFFFF" />
      {/* Faint scanline shimmer */}
      <line x1="3.5" y1="20" x2="28.5" y2="20" stroke="#FFFFFF" strokeWidth="0.3" opacity="0.08" />
      <line x1="3.5" y1="24" x2="28.5" y2="24" stroke="#FFFFFF" strokeWidth="0.3" opacity="0.08" />
    </svg>
  );
}
