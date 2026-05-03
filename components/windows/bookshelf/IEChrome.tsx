"use client";

const menuItems = [
  { letter: "F", rest: "ile" },
  { letter: "E", rest: "dit" },
  { letter: "V", rest: "iew" },
  { letter: "F", rest: "avorites" },
  { letter: "T", rest: "ools" },
  { letter: "H", rest: "elp" },
];

const toolbarButtons: Array<{ label: string; icon: string; disabled?: boolean }> = [
  { label: "Back", icon: "◀" },
  { label: "Forward", icon: "▶", disabled: true },
  { label: "Stop", icon: "✕" },
  { label: "Refresh", icon: "↻" },
  { label: "Home", icon: "⌂" },
];

export default function IEChrome() {
  return (
    <div
      className="xp-no-select"
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--xp-window-bg)",
        borderBottom: "1px solid #8A8676",
      }}
    >
      {/* Menu bar */}
      <div
        style={{
          display: "flex",
          gap: 14,
          padding: "3px 8px",
          fontSize: 11,
          background: "var(--xp-window-bg)",
        }}
      >
        {menuItems.map((m, i) => (
          <span key={i} style={{ cursor: "default" }}>
            <u>{m.letter}</u>
            {m.rest}
          </span>
        ))}
      </div>

      {/* Toolbar row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: "4px 6px",
          background:
            "linear-gradient(to bottom, #F4F2E5 0%, #E0DCC4 100%)",
          borderTop: "1px solid #FFFFFF",
        }}
      >
        {toolbarButtons.map((btn, i) => (
          <div
            key={i}
            title={btn.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "4px 8px 2px",
              minWidth: 44,
              opacity: btn.disabled ? 0.45 : 1,
              cursor: "default",
            }}
          >
            <span
              style={{
                fontSize: 18,
                lineHeight: "18px",
                color: i === 0 ? "#1A8A1A" : i === 1 ? "#1A8A1A" : i === 2 ? "#C81A1A" : i === 3 ? "#1A5A8A" : "#8A6420",
              }}
            >
              {btn.icon}
            </span>
            <span style={{ fontSize: 10, marginTop: 1 }}>{btn.label}</span>
          </div>
        ))}
        <div
          style={{
            width: 1,
            alignSelf: "stretch",
            background: "#A8A48E",
            margin: "2px 4px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "4px 8px 2px",
            minWidth: 44,
            cursor: "default",
          }}
        >
          <span style={{ fontSize: 18, lineHeight: "18px", color: "#D4A82A" }}>
            {"★"}
          </span>
          <span style={{ fontSize: 10, marginTop: 1 }}>Favorites</span>
        </div>
      </div>

      {/* Address bar row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "3px 6px 5px",
          background: "var(--xp-window-bg)",
          borderTop: "1px solid #FFFFFF",
        }}
      >
        <span style={{ fontSize: 11, color: "#3A3A3A" }}>Address</span>
        <div
          className="xp-sunken"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "#FFFFFF",
            padding: "2px 4px",
            height: 18,
          }}
        >
          <div
            aria-hidden
            style={{
              width: 14,
              height: 14,
              background:
                "radial-gradient(circle at 35% 35%, #A8D8F8 0%, #1F4D8C 70%)",
              borderRadius: 7,
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 11, color: "#000000", whiteSpace: "nowrap", overflow: "hidden" }}>
            http://www.geocities.com/tanjas_books/index.html
          </span>
        </div>
        <button
          type="button"
          style={{
            fontSize: 11,
            padding: "1px 10px",
            background: "linear-gradient(to bottom, #F4F2E5, #C8C2A8)",
            border: "1px solid #6F6B58",
            borderRadius: 2,
            cursor: "default",
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <span style={{ color: "#1A8A1A", fontSize: 12 }}>{"→"}</span>
          Go
        </button>
      </div>
    </div>
  );
}
