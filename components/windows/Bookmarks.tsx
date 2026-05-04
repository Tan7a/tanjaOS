"use client";

import { useEffect, useMemo, useState } from "react";
import { FavoritesIcon, IEIcon } from "@/components/icons/AppIcons";

interface Bookmark {
  id: number;
  category: string;
  title: string;
  url: string;
}

export default function Bookmarks() {
  const [items, setItems] = useState<Bookmark[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    fetch("/data/bookmarks.json")
      .then((r) => {
        if (!r.ok) throw new Error("network");
        return r.json();
      })
      .then((data: { bookmarks: Bookmark[] }) => setItems(data.bookmarks))
      .catch(() => setError("Could not load bookmarks.json."));
  }, []);

  const grouped = useMemo(() => {
    if (!items) return [] as { category: string; entries: Bookmark[] }[];
    const map = new Map<string, Bookmark[]>();
    for (const b of items) {
      if (!map.has(b.category)) map.set(b.category, []);
      map.get(b.category)!.push(b);
    }
    return Array.from(map.entries()).map(([category, entries]) => ({
      category,
      entries,
    }));
  }, [items]);

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
      {/* Toolbar header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "4px 8px",
          background: "linear-gradient(to bottom, #F8F6EC, #DCD6C0)",
          borderBottom: "1px solid #B8B098",
          fontSize: 11,
          fontFamily: "Tahoma, sans-serif",
        }}
      >
        <IEIcon size={16} />
        <span style={{ fontWeight: "bold" }}>Favorites</span>
        <span style={{ color: "#7A7060", marginLeft: "auto" }}>
          {items ? `${items.length} sites` : ""}
        </span>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          padding: 6,
          background: "#FFFFFF",
          fontFamily: "Tahoma, sans-serif",
          fontSize: 11,
          color: "#1F1F1F",
        }}
      >
        {error && <p style={{ color: "#9A2B2B" }}>{error}</p>}
        {!error && !items && <p style={{ color: "#7A7060" }}>Loading...</p>}

        {grouped.map(({ category, entries }) => {
          const isCollapsed = collapsed[category] ?? false;
          return (
            <div key={category} style={{ marginBottom: 4 }}>
              <button
                onClick={() =>
                  setCollapsed((c) => ({ ...c, [category]: !isCollapsed }))
                }
                onMouseDown={(e) => e.stopPropagation()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "3px 4px",
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  fontSize: 11,
                  fontWeight: "bold",
                  color: "#1F1F1F",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "Tahoma, sans-serif",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 10,
                    fontSize: 9,
                    color: "#5A5A5A",
                  }}
                >
                  {isCollapsed ? "▸" : "▾"}
                </span>
                <span
                  style={{
                    width: 16,
                    height: 16,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FolderGlyph open={!isCollapsed} />
                </span>
                <span>{category}</span>
              </button>

              {!isCollapsed && (
                <div style={{ paddingLeft: 26 }}>
                  {entries.map((b) => (
                    <a
                      key={b.id}
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHovered(b.id)}
                      onMouseLeave={() => setHovered(null)}
                      onMouseDown={(e) => e.stopPropagation()}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "2px 4px",
                        textDecoration: hovered === b.id ? "underline" : "none",
                        color: "#1A4FB8",
                        background:
                          hovered === b.id ? "#F0F4FB" : "transparent",
                      }}
                    >
                      <FavoritesIcon size={14} />
                      <span>{b.title}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {grouped.length === 0 && !error && items && (
          <p style={{ color: "#7A7060", fontStyle: "italic" }}>
            No favorites yet. Edit public/data/bookmarks.json to add some.
          </p>
        )}
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
          fontFamily: "Tahoma, sans-serif",
        }}
      >
        Internet
      </div>
    </div>
  );
}

function FolderGlyph({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14">
      <path
        d={
          open
            ? "M1 4 L5 4 L6 5 L13 5 L12.5 11 L1 11 Z"
            : "M1 4 L5 4 L6 5 L13 5 L13 11 L1 11 Z"
        }
        fill="#FFD850"
        stroke="#9A7A1A"
        strokeWidth="0.6"
      />
    </svg>
  );
}
