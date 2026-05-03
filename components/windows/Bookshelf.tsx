"use client";

import { useMemo, useState } from "react";
import { books, type Book } from "@/lib/books";
import IEChrome from "./bookshelf/IEChrome";
import BookSpine from "./bookshelf/BookSpine";
import BookModal from "./bookshelf/BookModal";

type DecoType =
  | "plant"
  | "stack"
  | "lamp"
  | "globe"
  | "succulent"
  | "photo"
  | "pencils";

interface DecoPlacement {
  /** insert this decoration AFTER the book at this index (0-based). -1 means before the first book. */
  after: number;
  type: DecoType;
}

/**
 * Decoration layouts per shelf. The pattern repeats if there are more shelves
 * than entries. Each shelf gets 2-3 decorations placed at varied positions so
 * the shelves don't all look the same.
 */
const SHELF_LAYOUTS: DecoPlacement[][] = [
  [{ after: 5, type: "globe" }, { after: 11, type: "stack" }, { after: 16, type: "succulent" }],
  [{ after: -1, type: "plant" }, { after: 7, type: "photo" }, { after: 14, type: "pencils" }],
  [{ after: 4, type: "lamp" }, { after: 10, type: "stack" }, { after: 15, type: "globe" }],
  [{ after: 6, type: "succulent" }, { after: 12, type: "globe" }, { after: 17, type: "plant" }],
  [{ after: 3, type: "photo" }, { after: 9, type: "stack" }, { after: 14, type: "lamp" }],
  [{ after: -1, type: "pencils" }, { after: 8, type: "globe" }, { after: 15, type: "succulent" }],
  [{ after: 5, type: "stack" }, { after: 11, type: "plant" }, { after: 16, type: "photo" }],
];

export default function Bookshelf() {
  const [openBook, setOpenBook] = useState<Book | null>(null);

  const shelves = useMemo(() => {
    const maxShelf = books.reduce(
      (m, b) => Math.max(m, b.shelf ?? 0),
      0,
    );
    const count = Math.max(maxShelf + 1, 1);
    const buckets: Book[][] = Array.from({ length: count }, () => []);
    for (const b of books) {
      const idx = b.shelf !== undefined ? Math.min(b.shelf, count - 1) : 0;
      buckets[idx].push(b);
    }
    return buckets;
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        position: "relative",
        background: "var(--xp-window-bg)",
      }}
    >
      <IEChrome />

      {/* The "page" itself */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          background: "#FFF8E5",
          backgroundImage:
            "radial-gradient(circle at 12% 8%, #FFFFFF 0%, transparent 28%), radial-gradient(circle at 88% 18%, #FFEFC4 0%, transparent 30%)",
          fontFamily: "'Times New Roman', Times, serif",
          padding: "14px 18px 22px",
        }}
      >
        {/* WordArt-flavoured header */}
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 30,
              fontWeight: 900,
              fontStyle: "italic",
              letterSpacing: 1,
              background:
                "linear-gradient(to bottom, #FF6FB5 0%, #FFD24A 45%, #6FB6FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "1px 1px 0 rgba(0,0,0,0.15)",
              fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
            }}
          >
            ✨ Tanja&apos;s Book Library ✨
          </h1>
          <div
            style={{
              fontSize: 12,
              color: "#3A3A3A",
              marginTop: 2,
              fontFamily: "'Times New Roman', Times, serif",
            }}
          >
            <i>Last updated: April 2026 · Best viewed in 1024×768</i>
          </div>
          <div style={{ marginTop: 6, display: "flex", justifyContent: "center", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#000" }}>Visitors:</span>
            <HitCounter value="000247" />
            <span style={{ fontSize: 18 }} aria-hidden>
              📚
            </span>
          </div>
        </div>

        {/* Welcome blurb */}
        <div
          style={{
            margin: "10px auto 16px",
            maxWidth: 540,
            padding: "8px 12px",
            background: "#FFFCEE",
            border: "1px dashed #B89A4A",
            fontSize: 12,
            color: "#1F1F1F",
            textAlign: "center",
          }}
        >
          Welcome to my online book shelf!! Click any book on the shelf below to read about it.
          This page is under construction, more books coming soon. <span aria-hidden>🚧</span>
        </div>

        {/* The shelves */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {shelves.map((shelfBooks, idx) => (
            <Shelf
              key={idx}
              books={shelfBooks}
              layout={SHELF_LAYOUTS[idx % SHELF_LAYOUTS.length]}
              onPick={(b) => setOpenBook(b)}
            />
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 16,
            textAlign: "center",
            fontSize: 11,
            color: "#3A3A3A",
            fontFamily: "'Times New Roman', Times, serif",
          }}
        >
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{ color: "#1F4D8C", textDecoration: "underline" }}
          >
            Sign my guestbook!
          </a>
          {" · "}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{ color: "#1F4D8C", textDecoration: "underline" }}
          >
            Email me
          </a>
          <div style={{ marginTop: 4 }}>
            Made with Notepad <span style={{ color: "#C81A1A" }}>♥</span> · © Tanja 2003
          </div>
        </div>
      </div>

      {openBook && (
        <BookModal book={openBook} onClose={() => setOpenBook(null)} />
      )}
    </div>
  );
}

interface ShelfProps {
  books: Book[];
  layout: DecoPlacement[];
  onPick: (book: Book) => void;
}

function Shelf({ books, layout, onPick }: ShelfProps) {
  // Build the interleaved sequence of books and decorations.
  const items: Array<
    | { kind: "book"; book: Book }
    | { kind: "deco"; type: DecoType; key: string }
  > = [];

  // Decorations that come "before" the first book (after === -1)
  layout
    .filter((d) => d.after === -1)
    .forEach((d, i) =>
      items.push({ kind: "deco", type: d.type, key: `deco-pre-${i}` }),
    );

  books.forEach((book, idx) => {
    items.push({ kind: "book", book });
    layout
      .filter((d) => d.after === idx)
      .forEach((d, i) =>
        items.push({ kind: "deco", type: d.type, key: `deco-${idx}-${i}` }),
      );
  });

  // Anything placed after the last book (e.g. after = books.length - 1) was
  // already handled in the loop above; tail decorations not matching any
  // index get appended here so they always render.
  const handled = new Set(layout.filter((d) => d.after === -1 || d.after < books.length).map((d) => d));
  layout
    .filter((d) => !handled.has(d))
    .forEach((d, i) =>
      items.push({ kind: "deco", type: d.type, key: `deco-tail-${i}` }),
    );

  return (
    <div style={{ position: "relative" }}>
      {/* Books row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 4,
          padding: "0 14px",
          minHeight: 142,
          flexWrap: "nowrap",
        }}
      >
        {items.map((it) =>
          it.kind === "book" ? (
            <BookSpine
              key={it.book.id}
              book={it.book}
              onClick={() => onPick(it.book)}
            />
          ) : (
            <Decoration key={it.key} type={it.type} />
          ),
        )}
      </div>
      {/* The shelf plank itself */}
      <div
        aria-hidden
        style={{
          height: 14,
          background:
            "linear-gradient(to bottom, #B0824A 0%, #8A5E2C 55%, #5A3A18 100%)",
          borderTop: "1px solid #6B4A28",
          borderBottom: "2px solid #3A2410",
          boxShadow: "0 4px 6px rgba(0,0,0,0.18)",
        }}
      />
    </div>
  );
}

function HitCounter({ value }: { value: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        gap: 1,
        background: "#000000",
        padding: "2px 4px",
        border: "1px solid #555",
      }}
    >
      {value.split("").map((d, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 11,
            textAlign: "center",
            fontFamily: "'Courier New', monospace",
            fontWeight: 700,
            fontSize: 12,
            color: "#FFD24A",
          }}
        >
          {d}
        </span>
      ))}
    </span>
  );
}

function Decoration({ type }: { type: DecoType }) {
  switch (type) {
    case "plant":
      return <PlantDeco />;
    case "stack":
      return <StackDeco />;
    case "lamp":
      return <LampDeco />;
    case "globe":
      return <GlobeDeco />;
    case "succulent":
      return <SucculentDeco />;
    case "photo":
      return <PhotoDeco />;
    case "pencils":
      return <PencilsDeco />;
  }
}

const decoBase = {
  flexShrink: 0,
  alignSelf: "flex-end" as const,
} as const;

function PlantDeco() {
  return (
    <div aria-hidden style={{ ...decoBase, width: 36, height: 78 }}>
      <svg viewBox="0 0 36 78" width="36" height="78">
        <ellipse cx="18" cy="32" rx="14" ry="22" fill="#3F8A4A" />
        <ellipse cx="10" cy="28" rx="6" ry="14" fill="#5DAA5A" transform="rotate(-22 10 28)" />
        <ellipse cx="26" cy="28" rx="6" ry="14" fill="#5DAA5A" transform="rotate(22 26 28)" />
        <ellipse cx="18" cy="22" rx="6" ry="12" fill="#7DCB6A" />
        <path d="M8 56 L28 56 L25 76 L11 76 Z" fill="#C84A2E" stroke="#5A1F10" strokeWidth="1" />
        <rect x="7" y="54" width="22" height="4" fill="#E66A4A" stroke="#5A1F10" strokeWidth="1" />
      </svg>
    </div>
  );
}

function StackDeco() {
  return (
    <div aria-hidden style={{ ...decoBase, width: 56, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          height: 14,
          background: "linear-gradient(to bottom, #6FB6FF, #1F4D8C)",
          border: "1px solid #0A2A5C",
          borderRadius: "2px 2px 0 0",
        }}
      />
      <div
        style={{
          height: 14,
          background: "linear-gradient(to bottom, #FFD24A, #B8862E)",
          border: "1px solid #5A3A0C",
          marginTop: -1,
        }}
      />
      <div
        style={{
          height: 14,
          background: "linear-gradient(to bottom, #E66A8A, #9A2B5C)",
          border: "1px solid #5A0A2C",
          marginTop: -1,
          borderRadius: "0 0 2px 2px",
        }}
      />
    </div>
  );
}

function LampDeco() {
  return (
    <div aria-hidden style={{ ...decoBase, width: 44, height: 110 }}>
      <svg viewBox="0 0 44 110" width="44" height="110">
        <path d="M8 12 L36 12 L30 38 L14 38 Z" fill="#F2C14E" stroke="#8A6420" strokeWidth="1" />
        <ellipse cx="22" cy="38" rx="9" ry="2" fill="#8A6420" />
        <rect x="20" y="38" width="4" height="56" fill="#5A3A18" />
        <ellipse cx="22" cy="44" rx="11" ry="5" fill="#FFE8A0" opacity="0.5" />
        <ellipse cx="22" cy="98" rx="14" ry="4" fill="#3A2410" />
        <path d="M10 94 L34 94 L36 100 L8 100 Z" fill="#5A3A18" stroke="#3A2410" strokeWidth="1" />
      </svg>
    </div>
  );
}

function GlobeDeco() {
  return (
    <div aria-hidden style={{ ...decoBase, width: 48, height: 96 }}>
      <svg viewBox="0 0 48 96" width="48" height="96">
        {/* Stand ring */}
        <path d="M24 16 Q44 48 24 80" fill="none" stroke="#A87A4B" strokeWidth="2.5" strokeLinecap="round" />
        {/* Globe sphere */}
        <circle cx="24" cy="44" r="20" fill="#3F8AC9" stroke="#1A4A78" strokeWidth="1.2" />
        {/* Continents (Africa-ish + Eurasia + Americas) */}
        <path d="M16 36 Q22 30 26 34 Q24 40 22 44 Q18 44 16 40 Z" fill="#5DAA5A" />
        <path d="M28 38 Q34 36 36 42 Q38 48 32 50 Q28 46 28 42 Z" fill="#5DAA5A" />
        <path d="M14 50 Q18 48 22 52 Q24 58 20 62 Q14 58 14 52 Z" fill="#5DAA5A" />
        <path d="M30 52 Q36 54 34 60 Q30 60 28 56 Z" fill="#5DAA5A" />
        {/* Meridian highlights */}
        <ellipse cx="24" cy="44" rx="20" ry="7" fill="none" stroke="#1A4A78" strokeWidth="0.6" opacity="0.5" />
        <ellipse cx="24" cy="44" rx="9" ry="20" fill="none" stroke="#1A4A78" strokeWidth="0.6" opacity="0.5" />
        {/* Sphere highlight */}
        <ellipse cx="18" cy="36" rx="5" ry="3" fill="#FFFFFF" opacity="0.25" />
        {/* Wooden base */}
        <rect x="22" y="80" width="4" height="6" fill="#5A3A18" />
        <ellipse cx="24" cy="88" rx="12" ry="3" fill="#5A3A18" stroke="#3A2410" strokeWidth="0.6" />
      </svg>
    </div>
  );
}

function SucculentDeco() {
  return (
    <div aria-hidden style={{ ...decoBase, width: 36, height: 50 }}>
      <svg viewBox="0 0 36 50" width="36" height="50">
        {/* Leaves rosette */}
        <ellipse cx="18" cy="22" rx="10" ry="8" fill="#5DAA5A" />
        <ellipse cx="11" cy="18" rx="4" ry="7" fill="#7DCB6A" transform="rotate(-30 11 18)" />
        <ellipse cx="25" cy="18" rx="4" ry="7" fill="#7DCB6A" transform="rotate(30 25 18)" />
        <ellipse cx="14" cy="14" rx="3" ry="5" fill="#9DDA8A" transform="rotate(-15 14 14)" />
        <ellipse cx="22" cy="14" rx="3" ry="5" fill="#9DDA8A" transform="rotate(15 22 14)" />
        <circle cx="18" cy="18" r="3" fill="#B8E89A" />
        {/* Pot */}
        <path d="M10 30 L26 30 L24 46 L12 46 Z" fill="#E8B4C4" stroke="#9C2451" strokeWidth="1" />
        <rect x="9" y="28" width="18" height="3" fill="#E89B3F" stroke="#9C2451" strokeWidth="1" />
      </svg>
    </div>
  );
}

function PhotoDeco() {
  return (
    <div aria-hidden style={{ ...decoBase, width: 46, height: 58 }}>
      <svg viewBox="0 0 46 58" width="46" height="58">
        {/* Outer wood frame */}
        <rect x="2" y="2" width="42" height="48" fill="#A87A4B" stroke="#5A3A18" strokeWidth="1.2" />
        {/* Inner mat */}
        <rect x="6" y="6" width="34" height="40" fill="#FFF8E5" />
        {/* The picture: tiny landscape */}
        <rect x="8" y="8" width="30" height="20" fill="#A8D8F8" />
        <circle cx="32" cy="14" r="3" fill="#FFD24A" />
        <path d="M8 28 Q14 22 20 26 Q26 30 32 26 Q36 24 38 28 L38 44 L8 44 Z" fill="#5DAA5A" />
        <path d="M14 40 Q14 36 16 36 L16 44 Z" fill="#3F8A4A" />
        {/* Stand at the back */}
        <rect x="20" y="50" width="3" height="6" fill="#5A3A18" transform="rotate(8 21 53)" />
      </svg>
    </div>
  );
}

function PencilsDeco() {
  return (
    <div aria-hidden style={{ ...decoBase, width: 34, height: 70 }}>
      <svg viewBox="0 0 34 70" width="34" height="70">
        {/* Pencils sticking out (drawn back-to-front) */}
        <g>
          <rect x="9" y="14" width="3" height="22" fill="#F2C14E" stroke="#8A6420" strokeWidth="0.5" />
          <polygon points="9,14 12,14 10.5,10" fill="#5A3A18" />
          <rect x="9" y="10" width="3" height="3" fill="#1A1A1A" />
        </g>
        <g>
          <rect x="13" y="8" width="3" height="28" fill="#D1453B" stroke="#8A2020" strokeWidth="0.5" />
          <polygon points="13,8 16,8 14.5,4" fill="#FFE8A0" />
          <polygon points="13.5,5 15.5,5 14.5,3" fill="#1A1A1A" />
        </g>
        <g>
          <rect x="17" y="11" width="3" height="25" fill="#3F8AC9" stroke="#1A4A78" strokeWidth="0.5" />
          <polygon points="17,11 20,11 18.5,7" fill="#FFE8A0" />
          <polygon points="17.5,8 19.5,8 18.5,6" fill="#1A1A1A" />
        </g>
        <g>
          <rect x="21" y="16" width="3" height="20" fill="#5DAA5A" stroke="#1A4A1A" strokeWidth="0.5" />
          <polygon points="21,16 24,16 22.5,12" fill="#FFE8A0" />
          <polygon points="21.5,13 23.5,13 22.5,11" fill="#1A1A1A" />
        </g>
        {/* Cup */}
        <path d="M5 36 L29 36 L26 66 L8 66 Z" fill="#3F7A8C" stroke="#1A3F4A" strokeWidth="1" />
        <ellipse cx="17" cy="36" rx="12" ry="2.6" fill="#1A3F4A" />
        <ellipse cx="17" cy="36" rx="10" ry="1.6" fill="#0F2A36" />
        {/* Cup label */}
        <rect x="10" y="44" width="14" height="6" fill="#FFFFFF" opacity="0.85" />
        <rect x="11" y="46" width="12" height="0.8" fill="#1A3F4A" />
        <rect x="11" y="48" width="9" height="0.8" fill="#1A3F4A" />
      </svg>
    </div>
  );
}
