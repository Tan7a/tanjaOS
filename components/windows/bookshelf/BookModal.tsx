"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import type { Book } from "@/lib/books";
import { coverUrl } from "@/lib/books";

interface BookModalProps {
  book: Book;
  onClose: () => void;
}

type FetchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; text: string | null };

export default function BookModal({ book, onClose }: BookModalProps) {
  const [mounted, setMounted] = useState(false);
  const [coverFailed, setCoverFailed] = useState(false);
  const [official, setOfficial] = useState<FetchState>({ status: "idle" });
  const url = coverUrl(book);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const controller = new AbortController();
    setOfficial({ status: "loading" });
    fetchOfficialDescription(book, controller.signal).then((text) => {
      if (controller.signal.aborted) return;
      setOfficial({ status: "done", text });
    });
    return () => {
      controller.abort();
    };
  }, [book]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute",
        inset: 0,
        background: mounted ? "rgba(20, 36, 78, 0.55)" : "rgba(20, 36, 78, 0)",
        transition: "background 180ms ease-out",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={book.title}
        style={{
          width: 760,
          height: 540,
          maxWidth: "92%",
          maxHeight: "92%",
          display: "flex",
          flexDirection: "column",
          background: "var(--xp-window-bg)",
          border: "1px solid #0A246A",
          boxShadow: "2px 2px 8px rgba(0,0,0,0.5)",
          transform: mounted ? "scale(1)" : "scale(0.4)",
          opacity: mounted ? 1 : 0,
          transition:
            "transform 180ms cubic-bezier(0.2, 0.8, 0.4, 1.4), opacity 160ms ease-out",
          fontFamily: "var(--xp-font)",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "3px 4px 3px 6px",
            background:
              "linear-gradient(to bottom, var(--xp-title-active-start), var(--xp-title-active-end))",
            color: "var(--xp-text-on-title)",
            fontWeight: 700,
            fontSize: 11,
          }}
        >
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 14,
              height: 14,
              marginRight: 5,
              background: book.spineColor,
              border: "1px solid rgba(0,0,0,0.4)",
              flexShrink: 0,
            }}
          />
          <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {book.title} - Microsoft Internet Explorer
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 22,
              height: 20,
              marginLeft: 6,
              background:
                "linear-gradient(to bottom, #F38787 0%, #C42020 50%, #A41010 100%)",
              border: "1px solid #5C0808",
              color: "#FFFFFF",
              fontSize: 12,
              fontWeight: 700,
              lineHeight: "16px",
              cursor: "pointer",
              padding: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            display: "flex",
            gap: 20,
            padding: 20,
            background: "#FFFFFF",
            overflowY: "auto",
            flex: 1,
            minHeight: 0,
          }}
        >
          {/* Cover */}
          <div
            style={{
              width: 220,
              height: 330,
              flexShrink: 0,
              border: "1px solid #6F6B58",
              boxShadow: "3px 3px 6px rgba(0,0,0,0.35)",
              background: book.spineColor,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {url && !coverFailed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={url}
                alt={`${book.title} cover`}
                onError={() => setCoverFailed(true)}
                onLoad={(e) => {
                  const img = e.currentTarget;
                  // Open Library returns a blank ~1px image when the cover is missing.
                  if (img.naturalWidth < 50 || img.naturalHeight < 50) {
                    setCoverFailed(true);
                  }
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <FallbackCover book={book} />
            )}
          </div>

          {/* Details */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: 22,
                fontWeight: 700,
                color: "#1F1F1F",
                lineHeight: 1.2,
              }}
            >
              {book.title}
            </div>
            <div style={{ fontSize: 13, color: "#3A3A3A", fontStyle: "italic" }}>
              by {book.author}
            </div>
            {book.rating !== undefined && (
              <div style={{ fontSize: 18, color: "#D4A82A", letterSpacing: 2 }}>
                {"★".repeat(book.rating)}
                <span style={{ color: "#C8C2A8" }}>{"★".repeat(5 - book.rating)}</span>
              </div>
            )}

            <Section label="Tanja's notes">
              <p style={notesPStyle}>{book.description}</p>
            </Section>

            {(official.status === "loading" ||
              (official.status === "done" && official.text)) && (
              <Section label="About the book">
                {official.status === "loading" ? (
                  <p style={{ ...notesPStyle, color: "#7A7A7A", fontStyle: "italic" }}>
                    Loading...
                  </p>
                ) : (
                  <p style={notesPStyle}>{official.text}</p>
                )}
              </Section>
            )}

            {book.isbn && (
              <div style={{ fontSize: 10, color: "#7A7A7A", marginTop: "auto", paddingTop: 4 }}>
                ISBN: {book.isbn}
              </div>
            )}
          </div>
        </div>

        {/* Status bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "2px 8px",
            background: "var(--xp-window-bg)",
            borderTop: "1px solid #B8B098",
            fontSize: 10,
            color: "#3A3A3A",
          }}
        >
          <span>Done</span>
          <span>{"🌐 Internet"}</span>
        </div>
      </div>
    </div>
  );
}

async function fetchOfficialDescription(
  book: Book,
  signal: AbortSignal,
): Promise<string | null> {
  // Try ISBN lookup first (most precise), fall back to title+author search.
  let workKey: string | null = null;
  if (book.isbn) {
    workKey = await lookupWorkByIsbn(book.isbn, signal);
  }
  if (!workKey) {
    workKey = await lookupWorkByTitleAuthor(book.title, book.author, signal);
  }
  if (!workKey) return null;
  return await fetchWorkDescription(workKey, signal);
}

async function lookupWorkByIsbn(
  isbn: string,
  signal: AbortSignal,
): Promise<string | null> {
  try {
    const res = await fetch(`https://openlibrary.org/isbn/${isbn}.json`, {
      signal,
    });
    if (!res.ok) return null;
    const edition = await res.json();
    return edition?.works?.[0]?.key ?? null;
  } catch {
    return null;
  }
}

async function lookupWorkByTitleAuthor(
  title: string,
  author: string,
  signal: AbortSignal,
): Promise<string | null> {
  try {
    const url = new URL("https://openlibrary.org/search.json");
    url.searchParams.set("title", title);
    url.searchParams.set("author", author);
    url.searchParams.set("limit", "1");
    const res = await fetch(url.toString(), { signal });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.docs?.[0]?.key ?? null;
  } catch {
    return null;
  }
}

async function fetchWorkDescription(
  workKey: string,
  signal: AbortSignal,
): Promise<string | null> {
  try {
    const res = await fetch(`https://openlibrary.org${workKey}.json`, {
      signal,
    });
    if (!res.ok) return null;
    const work = await res.json();
    const raw =
      typeof work?.description === "string"
        ? work.description
        : work?.description?.value;
    if (!raw || typeof raw !== "string") return null;
    const cleaned = raw
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\n-{3,}[\s\S]*$/m, "")
      .replace(/\s+/g, " ")
      .trim();
    if (!cleaned) return null;
    return cleaned.length > 520
      ? cleaned.slice(0, 517).trimEnd() + "..."
      : cleaned;
  } catch {
    return null;
  }
}

const notesPStyle: CSSProperties = {
  fontSize: 12.5,
  color: "#000000",
  lineHeight: 1.5,
  margin: 0,
};

function Section({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#1F4D8C",
          textTransform: "uppercase",
          letterSpacing: 0.8,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function FallbackCover({ book }: { book: Book }) {
  const textColor = book.spineTextColor === "dark" ? "#1A1A1A" : "#FFFFFF";
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 12,
        boxSizing: "border-box",
        color: textColor,
        textShadow:
          book.spineTextColor === "dark" ? "none" : "0 1px 2px rgba(0,0,0,0.4)",
        fontFamily: "'Times New Roman', Times, serif",
      }}
    >
      <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.15 }}>
        {book.title}
      </div>
      <div style={{ fontSize: 11, fontStyle: "italic", opacity: 0.9 }}>
        {book.author}
      </div>
    </div>
  );
}
