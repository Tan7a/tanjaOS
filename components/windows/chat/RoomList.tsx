"use client";

import { useState } from "react";
import { sanitizeRoomName } from "@/lib/sanitize";

export interface Room {
  id: string;
  name: string;
  description: string | null;
}

interface RoomListProps {
  rooms: Room[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreate: (name: string, description: string) => Promise<string | null>;
}

export default function RoomList({
  rooms,
  selectedId,
  onSelect,
  onCreate,
}: RoomListProps) {
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    const cleaned = sanitizeRoomName(name);
    if (cleaned.length < 2) {
      setError("Room name needs at least 2 characters.");
      return;
    }
    if (rooms.some((r) => r.name === cleaned)) {
      setError("That room already exists.");
      return;
    }
    setSubmitting(true);
    const err = await onCreate(cleaned, description.slice(0, 100));
    setSubmitting(false);
    if (err) {
      setError(err);
      return;
    }
    setCreating(false);
    setName("");
    setDescription("");
    setError(null);
  };

  return (
    <div
      style={{
        width: 180,
        flexShrink: 0,
        borderRight: "1px solid #B8B098",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Tahoma, sans-serif",
        fontSize: 11,
      }}
    >
      <div
        style={{
          padding: "4px 8px",
          background: "linear-gradient(to bottom, #F8F6EC, #DCD6C0)",
          borderBottom: "1px solid #B8B098",
          fontWeight: "bold",
        }}
      >
        Rooms
      </div>

      <div style={{ flex: 1, minHeight: 0, overflow: "auto" }}>
        {rooms.length === 0 && (
          <div style={{ padding: 8, color: "#7A7060", fontStyle: "italic" }}>
            No rooms yet.
          </div>
        )}
        {rooms.map((r) => {
          const active = r.id === selectedId;
          return (
            <button
              key={r.id}
              onClick={() => onSelect(r.id)}
              onMouseDown={(e) => e.stopPropagation()}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "5px 8px",
                background: active ? "var(--xp-selection)" : "transparent",
                color: active ? "#FFFFFF" : "#1F1F1F",
                border: "none",
                cursor: "pointer",
                fontFamily: "Tahoma, sans-serif",
                fontSize: 11,
              }}
            >
              <div style={{ fontWeight: "bold" }}>#{r.name}</div>
              {r.description && (
                <div
                  style={{
                    fontSize: 10,
                    opacity: 0.85,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.description}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {creating ? (
        <div
          style={{
            padding: 6,
            borderTop: "1px solid #B8B098",
            background: "#F8F6EC",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <input
            value={name}
            onChange={(e) => {
              setError(null);
              setName(e.target.value);
            }}
            placeholder="room-name"
            onMouseDown={(e) => e.stopPropagation()}
            style={inputStyle}
            maxLength={30}
            autoFocus
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="optional description"
            onMouseDown={(e) => e.stopPropagation()}
            style={inputStyle}
            maxLength={100}
          />
          {error && (
            <div style={{ fontSize: 10, color: "#9A2B2B" }}>{error}</div>
          )}
          <div style={{ display: "flex", gap: 4 }}>
            <button
              onClick={submit}
              disabled={submitting}
              onMouseDown={(e) => e.stopPropagation()}
              style={miniBtn}
            >
              Create
            </button>
            <button
              onClick={() => {
                setCreating(false);
                setError(null);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              style={miniBtn}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setCreating(true)}
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            padding: "5px 8px",
            background: "linear-gradient(to bottom, #F8F6EC, #DCD6C0)",
            border: "none",
            borderTop: "1px solid #B8B098",
            cursor: "pointer",
            fontFamily: "Tahoma, sans-serif",
            fontSize: 11,
            textAlign: "left",
          }}
        >
          + New Room
        </button>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  fontSize: 11,
  fontFamily: "Tahoma, sans-serif",
  padding: "3px 4px",
  border: "1px solid #5A5A5A",
  background: "#FFFFFF",
};

const miniBtn: React.CSSProperties = {
  flex: 1,
  fontSize: 11,
  padding: "3px 6px",
  background: "linear-gradient(to bottom, #FCFCFC, #DCD6C0)",
  border: "1px solid #5A5A5A",
  borderRadius: 2,
  cursor: "pointer",
  fontFamily: "Tahoma, sans-serif",
};
