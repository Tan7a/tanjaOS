"use client";

interface AnimatedSheepProps {
  isPlaying: boolean;
  skin: 0 | 1 | 2;
  onClick: () => void;
}

export type SheepSkin = 0 | 1 | 2;

const SKIN_PALETTE: Record<
  SheepSkin,
  { body: string; bodyShadow: string; head: string }
> = {
  0: { body: "#FFFFFF", bodyShadow: "#E0E0E0", head: "#1A1A1A" }, // classic
  1: { body: "#E886B8", bodyShadow: "#C66898", head: "#1A1A1A" }, // pink with shades
  2: { body: "#F5E6B3", bodyShadow: "#D8C68A", head: "#1A1A1A" }, // woolly cream
};

export default function AnimatedSheep({
  isPlaying,
  skin,
  onClick,
}: AnimatedSheepProps) {
  const palette = SKIN_PALETTE[skin];
  const isWoolly = skin === 2;
  const showBow = skin === 0;
  const showShades = skin === 1;

  return (
    <svg
      onClick={onClick}
      viewBox="0 0 480 280"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        cursor: "default",
      }}
    >
      {/* Sky */}
      <rect x="0" y="0" width="480" height="140" fill="#2255CC" />

      {/* Sun */}
      <circle cx="380" cy="60" r="22" fill="#FFE17A" opacity="0.9" />
      <circle cx="380" cy="60" r="14" fill="#FFF5C8" />

      {/* Clouds */}
      <g fill="#FFFFFF" opacity="0.85">
        <ellipse cx="80" cy="40" rx="28" ry="9" />
        <ellipse cx="100" cy="35" rx="20" ry="7" />
        <ellipse cx="220" cy="60" rx="34" ry="10" />
        <ellipse cx="245" cy="54" rx="22" ry="8" />
      </g>

      {/* Grass */}
      <rect x="0" y="140" width="480" height="140" fill="#228B22" />

      {/* darker grass blades */}
      <g fill="#1A6F1A" opacity="0.55">
        <ellipse cx="40" cy="240" rx="3" ry="9" />
        <ellipse cx="90" cy="255" rx="3" ry="8" />
        <ellipse cx="160" cy="245" rx="3" ry="9" />
        <ellipse cx="380" cy="250" rx="3" ry="8" />
        <ellipse cx="430" cy="240" rx="3" ry="9" />
      </g>

      {/* Wooden fence — left side */}
      <g>
        <rect x="22" y="140" width="6" height="80" fill="#8B5A2B" stroke="#5A3A1A" strokeWidth="0.8" />
        <rect x="62" y="140" width="6" height="80" fill="#8B5A2B" stroke="#5A3A1A" strokeWidth="0.8" />
        <rect x="14" y="158" width="62" height="5" fill="#A06A3A" stroke="#5A3A1A" strokeWidth="0.8" />
        <rect x="14" y="190" width="62" height="5" fill="#A06A3A" stroke="#5A3A1A" strokeWidth="0.8" />
      </g>

      {/* SHEEP */}
      <g transform="translate(240, 195)">
        {/* Legs */}
        <line x1="-22" y1="15" x2="-22" y2="50" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
        <line x1="-8" y1="18" x2="-8" y2="52" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
        <line x1="14" y1="18" x2="14" y2="52" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
        <line x1="28" y1="15" x2="28" y2="50" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />

        {/* Body — fluffy overlapping ellipses */}
        <ellipse cx="0" cy="0" rx="50" ry="28" fill={palette.bodyShadow} />
        <ellipse cx="-12" cy="-6" rx="40" ry="24" fill={palette.body} />
        <ellipse cx="14" cy="-4" rx="36" ry="22" fill={palette.body} />
        <ellipse cx="0" cy="-14" rx="28" ry="16" fill={palette.body} />

        {/* Woolly skin: extra fluff bumps */}
        {isWoolly && (
          <g fill={palette.body} stroke={palette.bodyShadow} strokeWidth="0.6">
            <circle cx="-44" cy="-8" r="9" />
            <circle cx="-32" cy="-22" r="10" />
            <circle cx="-8" cy="-26" r="11" />
            <circle cx="20" cy="-24" r="10" />
            <circle cx="42" cy="-12" r="9" />
            <circle cx="46" cy="6" r="8" />
            <circle cx="-46" cy="10" r="8" />
          </g>
        )}

        {/* Head group — bobbing while playing */}
        <g
          className={`sheep-head${isPlaying ? " sheep-head--bobbing" : ""}`}
          transform="translate(38, -10)"
        >
          {/* ear */}
          <ellipse cx="-2" cy="-10" rx="4" ry="6" fill={palette.head} transform="rotate(-25 -2 -10)" />
          {/* head */}
          <ellipse cx="6" cy="0" rx="14" ry="11" fill={palette.head} />
          {/* snout highlight */}
          <ellipse cx="14" cy="3" rx="6" ry="4" fill="#3A3A3A" />

          {/* Eyes */}
          {showShades ? (
            <g>
              {/* sunglasses */}
              <rect x="-2" y="-4" width="7" height="5" rx="1" fill="#000000" />
              <rect x="6" y="-4" width="7" height="5" rx="1" fill="#000000" />
              <line x1="5" y1="-2" x2="6" y2="-2" stroke="#000000" strokeWidth="1.2" />
              {/* lens shine */}
              <line x1="-1" y1="-3" x2="1" y2="-3" stroke="#FFFFFF" strokeWidth="0.6" />
              <line x1="7" y1="-3" x2="9" y2="-3" stroke="#FFFFFF" strokeWidth="0.6" />
            </g>
          ) : (
            <g>
              <circle cx="2" cy="-2" r="1.4" fill="#FFFFFF" />
              <circle cx="9" cy="-2" r="1.4" fill="#FFFFFF" />
              <circle cx="2" cy="-2" r="0.6" fill="#000000" />
              <circle cx="9" cy="-2" r="0.6" fill="#000000" />
            </g>
          )}

          {/* Bow */}
          {showBow && (
            <g transform="translate(2, -14)">
              <path d="M0 0 L-7 -5 L-7 5 Z" fill="#F46AAE" />
              <path d="M0 0 L7 -5 L7 5 Z" fill="#F46AAE" />
              <circle cx="0" cy="0" r="2" fill="#D44A8E" />
            </g>
          )}
        </g>

        {/* tail */}
        <ellipse cx="-50" cy="-4" rx="6" ry="5" fill={palette.body} />
      </g>

      {/* Hint label — bottom-right corner */}
      <text
        x="468"
        y="270"
        fontFamily="Tahoma, Arial, sans-serif"
        fontSize="9"
        fill="#FFFFFF"
        opacity="0.6"
        textAnchor="end"
      >
        click sheep to change skin
      </text>
    </svg>
  );
}
