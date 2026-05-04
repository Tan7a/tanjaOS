"use client";

interface ImageViewerProps {
  src: string;
  name: string;
  caption?: string;
  parentLabel: string;
  onBack: () => void;
}

export default function ImageViewer({
  src,
  name,
  caption,
  parentLabel,
  onBack,
}: ImageViewerProps) {
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "4px 8px",
          background: "linear-gradient(to bottom, #F8F6EC, #DCD6C0)",
          borderBottom: "1px solid #B8B098",
          fontSize: 11,
        }}
      >
        <button
          onClick={onBack}
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "2px 8px",
            background: "transparent",
            border: "1px solid transparent",
            fontSize: 11,
            cursor: "pointer",
          }}
        >
          <span>◀</span> Back to {parentLabel}
        </button>
        <span style={{ color: "#7A7060" }}>·</span>
        <span style={{ fontWeight: "bold" }}>{name}</span>
        {caption && (
          <>
            <span style={{ color: "#7A7060" }}>·</span>
            <span style={{ fontStyle: "italic", color: "#5A5A5A" }}>{caption}</span>
          </>
        )}
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          background: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 12,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={caption ?? name}
          draggable={false}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            boxShadow: "0 0 0 1px #FFFFFF, 0 4px 20px rgba(0,0,0,0.5)",
          }}
        />
      </div>

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
          color: "#5A5A5A",
        }}
      >
        Image preview
      </div>
    </div>
  );
}
