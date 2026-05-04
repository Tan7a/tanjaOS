"use client";

import { useState } from "react";
import { ChatIcon } from "@/components/icons/AppIcons";
import { sanitizeUsername } from "@/lib/sanitize";

interface UsernameModalProps {
  onSubmit: (username: string) => void;
}

export default function UsernameModal({ onSubmit }: UsernameModalProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    const cleaned = sanitizeUsername(value);
    if (cleaned.length < 2) {
      setError("Pick at least 2 characters. Letters, numbers, and underscore only.");
      return;
    }
    onSubmit(cleaned);
  };

  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        background: "var(--xp-window-bg)",
        fontFamily: "Tahoma, sans-serif",
      }}
    >
      <div
        style={{
          width: 320,
          background: "#FFFFFF",
          border: "1px solid #5A5A5A",
          boxShadow: "1px 1px 0 #FFFFFF inset, 0 4px 12px rgba(0,0,0,0.25)",
          padding: 16,
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <ChatIcon size={36} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "bold", fontSize: 12, marginBottom: 4 }}>
              Welcome to TanjaOS Chat
            </div>
            <p style={{ margin: 0, fontSize: 11, color: "#3A3A3A", lineHeight: 1.4 }}>
              Pick a username to drop into the rooms. Letters, numbers, and underscore.
            </p>
          </div>
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => {
            setError(null);
            setValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          placeholder="username"
          style={{
            display: "block",
            width: "100%",
            marginTop: 12,
            fontSize: 12,
            padding: "4px 6px",
            border: "1px solid #5A5A5A",
            background: "#FFFFFF",
            fontFamily: "Tahoma, sans-serif",
          }}
          maxLength={20}
          autoFocus
        />

        {error && (
          <div style={{ marginTop: 6, fontSize: 11, color: "#9A2B2B" }}>
            {error}
          </div>
        )}

        <div
          style={{
            marginTop: 12,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={submit}
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              minWidth: 75,
              height: 23,
              padding: "0 14px",
              fontSize: 11,
              fontFamily: "Tahoma, sans-serif",
              background: "linear-gradient(to bottom, #FCFCFC, #DCE7F8 50%, #C8D8F0)",
              border: "1px solid #1A4FB8",
              borderRadius: 3,
              cursor: "pointer",
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
