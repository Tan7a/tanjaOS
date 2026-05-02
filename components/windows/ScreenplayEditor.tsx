"use client";

const PLACEHOLDER = `FADE IN:

INT. BEDROOM - DAY

A messy desk. Stacks of CD cases. A Windows XP
loading screen reflected in thick-rimmed glasses.

[Your text here...]
`;

export default function ScreenplayEditor() {
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
        <span><u>I</u>nsert</span>
        <span>F<u>o</u>rmat</span>
        <span><u>T</u>ools</span>
        <span>T<u>a</u>ble</span>
        <span><u>W</u>indow</span>
        <span><u>H</u>elp</span>
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          padding: "3px 6px",
          background: "linear-gradient(to bottom, #F8F6EC, #DCD6C0)",
          borderBottom: "1px solid #B8B098",
          fontSize: 11,
        }}
      >
        <ToolBtn>
          <FileSheet />
        </ToolBtn>
        <ToolBtn>
          <FolderOpen />
        </ToolBtn>
        <ToolBtn>
          <Floppy />
        </ToolBtn>
        <ToolBtn>
          <Printer />
        </ToolBtn>
        <Sep />
        <ToolBtn label="B" bold />
        <ToolBtn label="I" italic />
        <ToolBtn label="U" underline />
        <Sep />
        <div
          style={{
            background: "#FFFFFF",
            border: "1px inset #B8B098",
            padding: "1px 6px",
            minWidth: 110,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 11,
          }}
        >
          <span style={{ fontFamily: "'Courier New', monospace" }}>Courier New</span>
          <span>▼</span>
        </div>
        <div
          style={{
            background: "#FFFFFF",
            border: "1px inset #B8B098",
            padding: "1px 6px",
            width: 32,
            textAlign: "center",
            fontSize: 11,
          }}
        >
          12
        </div>
      </div>

      {/* Page canvas */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          background: "#808080",
          overflow: "auto",
          padding: 24,
        }}
      >
        <div
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            background: "#FFFFFF",
            color: "#000000",
            maxWidth: 600,
            margin: "0 auto",
            minHeight: 720,
            padding: "72px 72px 96px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
            fontFamily: "'Courier New', monospace",
            fontSize: 12,
            lineHeight: 1.5,
            whiteSpace: "pre-wrap",
            outline: "none",
            cursor: "text",
          }}
        >
          {PLACEHOLDER}
        </div>
      </div>
    </div>
  );
}

function ToolBtn({
  children,
  label,
  bold,
  italic,
  underline,
}: {
  children?: React.ReactNode;
  label?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}) {
  return (
    <button
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        width: 22,
        height: 22,
        background: "transparent",
        border: "1px solid transparent",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: bold ? "bold" : "normal",
        fontStyle: italic ? "italic" : "normal",
        textDecoration: underline ? "underline" : "none",
        color: "#000000",
      }}
    >
      {children ?? label}
    </button>
  );
}

function Sep() {
  return <span style={{ width: 1, height: 18, background: "#B8B098", margin: "0 3px" }} />;
}

function FileSheet() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14">
      <path d="M2 1 L9 1 L12 4 L12 13 L2 13 Z" fill="#FFFFFF" stroke="#3A3A3A" strokeWidth="0.6" />
      <path d="M9 1 L9 4 L12 4 Z" fill="#C8C2B0" stroke="#3A3A3A" strokeWidth="0.4" />
      <line x1="4" y1="6.5" x2="10" y2="6.5" stroke="#5A6B82" strokeWidth="0.5" />
      <line x1="4" y1="8.5" x2="10" y2="8.5" stroke="#5A6B82" strokeWidth="0.5" />
      <line x1="4" y1="10.5" x2="8" y2="10.5" stroke="#5A6B82" strokeWidth="0.5" />
    </svg>
  );
}

function FolderOpen() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14">
      <path d="M1 4 L5 4 L6 5 L13 5 L13 12 L1 12 Z" fill="#FFE17A" stroke="#9A7A1A" strokeWidth="0.5" />
      <path d="M2 12 L4 7 L13 7 L11 12 Z" fill="#FFD455" stroke="#9A7A1A" strokeWidth="0.5" />
    </svg>
  );
}

function Floppy() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14">
      <rect x="1" y="1" width="12" height="12" fill="#3A6FB5" stroke="#1A3A6B" strokeWidth="0.5" />
      <rect x="3" y="2" width="8" height="4" fill="#FFFFFF" />
      <rect x="3" y="8" width="8" height="4" fill="#C8C2B0" />
      <rect x="9" y="2" width="1.5" height="4" fill="#1A3A6B" />
    </svg>
  );
}

function Printer() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14">
      <rect x="3" y="2" width="8" height="4" fill="#FFFFFF" stroke="#3A3A3A" strokeWidth="0.5" />
      <rect x="1" y="6" width="12" height="5" fill="#C8C2B0" stroke="#3A3A3A" strokeWidth="0.5" />
      <rect x="3" y="9" width="8" height="4" fill="#FFFFFF" stroke="#3A3A3A" strokeWidth="0.5" />
      <circle cx="11" cy="8" r="0.6" fill="#5BC04C" />
    </svg>
  );
}
