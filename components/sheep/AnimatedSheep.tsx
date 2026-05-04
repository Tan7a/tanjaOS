"use client";

interface AnimatedSheepProps {
  isPlaying: boolean;
  skin: 0 | 1 | 2 | 3;
  onClick: () => void;
}

export type SheepSkin = 0 | 1 | 2 | 3;

const SKIN_PALETTE: Record<
  SheepSkin,
  { body: string; bodyShadow: string; head: string }
> = {
  0: { body: "#FFFFFF", bodyShadow: "#E0E0E0", head: "#1A1A1A" },
  1: { body: "#E886B8", bodyShadow: "#C66898", head: "#1A1A1A" },
  2: { body: "#F5E6B3", bodyShadow: "#D8C68A", head: "#1A1A1A" },
  3: { body: "#FFFFFF", bodyShadow: "#E0E0E0", head: "#1A1A1A" },
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
  const showTopHat = skin === 3;

  const legA = isPlaying
    ? "sheep-leg sheep-leg--a sheep-leg--walking"
    : "sheep-leg sheep-leg--a";
  const legB = isPlaying
    ? "sheep-leg sheep-leg--b sheep-leg--walking"
    : "sheep-leg sheep-leg--b";
  const headClass = isPlaying ? "sheep-head sheep-head--bobbing" : "sheep-head";

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
        {/* Short stubby legs paired diagonally for walking gait */}
        <line className={legA} x1="-22" y1="28" x2="-22" y2="48" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
        <line className={legB} x1="-8" y1="28" x2="-8" y2="48" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
        <line className={legA} x1="14" y1="28" x2="14" y2="48" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
        <line className={legB} x1="28" y1="28" x2="28" y2="48" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />

        {/* Body — single fluffy oval */}
        <ellipse cx="0" cy="-5" rx="55" ry="25" fill={palette.body} />

        {/* Top fluff — cloud bumps blending into a wavy top edge */}
        <g fill={palette.body}>
          <circle cx="-46" cy="-12" r="11" />
          <circle cx="-30" cy="-22" r="13" />
          <circle cx="-10" cy="-26" r="13" />
          <circle cx="12" cy="-25" r="13" />
          <circle cx="32" cy="-20" r="11" />
          <circle cx="48" cy="-10" r="9" />
        </g>

        {/* Bottom fluff */}
        <g fill={palette.body}>
          <circle cx="-40" cy="14" r="9" />
          <circle cx="-22" cy="20" r="10" />
          <circle cx="0" cy="22" r="10" />
          <circle cx="22" cy="20" r="10" />
          <circle cx="42" cy="14" r="9" />
        </g>

        {/* Woolly skin: extra puffs */}
        {isWoolly && (
          <g fill={palette.body}>
            <circle cx="-50" cy="0" r="8" />
            <circle cx="-48" cy="-18" r="9" />
            <circle cx="46" cy="2" r="8" />
            <circle cx="46" cy="-12" r="8" />
          </g>
        )}

        {/* Tail puff */}
        <circle cx="55" cy="-2" r="6" fill={palette.body} />

        {/* HEAD GROUP — face nestled into bottom-left of wool. Outer wraps for bobbing animation. */}
        <g className={headClass}>
          <g transform="translate(-25, 5)">
            {/* Floppy ears — drawn first so face covers their bases */}
            <ellipse cx="-12" cy="-3" rx="3.5" ry="7" fill={palette.head} transform="rotate(50 -12 -3)" />
            <ellipse cx="12" cy="-3" rx="3.5" ry="7" fill={palette.head} transform="rotate(-50 12 -3)" />

            {/* Face — plain rounded black shape, no eyes or mouth */}
            <ellipse cx="0" cy="0" rx="14" ry="10" fill={palette.head} />

            {/* Sunglasses (skin 1) — still drawn so the cool-sheep skin reads */}
            {showShades && (
              <g>
                <ellipse cx="-4" cy="-2" rx="3" ry="2.2" fill="#0A0A0A" stroke="#AAAAAA" strokeWidth="0.7" />
                <ellipse cx="4" cy="-2" rx="3" ry="2.2" fill="#0A0A0A" stroke="#AAAAAA" strokeWidth="0.7" />
                <line x1="-1" y1="-2" x2="1" y2="-2" stroke="#AAAAAA" strokeWidth="0.7" />
                <line x1="-5.5" y1="-3" x2="-3.5" y2="-3" stroke="#FFFFFF" strokeWidth="0.5" strokeLinecap="round" />
                <line x1="3.5" y1="-3" x2="5.5" y2="-3" stroke="#FFFFFF" strokeWidth="0.5" strokeLinecap="round" />
              </g>
            )}

            {/* Bow (skin 0) — small pink bow tucked into the wool above the face */}
            {showBow && (
              <g transform="translate(0, -11)">
                <path d="M0 0 L-5 -3 L-5 3 Z" fill="#F46AAE" />
                <path d="M0 0 L5 -3 L5 3 Z" fill="#F46AAE" />
                <circle cx="0" cy="0" r="1.6" fill="#D44A8E" />
              </g>
            )}

            {/* Top hat (skin 3) */}
            {showTopHat && (
              <g transform="translate(0, -15)">
                <ellipse cx="0" cy="2" rx="9" ry="2" fill="#0A0A0A" />
                <rect x="-5.5" y="-12" width="11" height="14" fill="#0A0A0A" />
                <rect x="-5.5" y="-2" width="11" height="2" fill="#2F2F2F" />
              </g>
            )}
          </g>
        </g>
      </g>

      {/* Hint label */}
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
