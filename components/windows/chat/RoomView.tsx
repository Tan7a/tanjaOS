"use client";

import { useEffect, useRef, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

interface Message {
  id: string;
  username: string;
  message: string;
  created_at: string;
  room_id: string;
}

interface RoomViewProps {
  supabase: SupabaseClient;
  roomId: string;
  roomName: string;
  username: string;
}

const RATE_LIMIT_MS = 2000;

export default function RoomView({
  supabase,
  roomId,
  roomName,
  username,
}: RoomViewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const lastSendRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // load history
  useEffect(() => {
    let cancelled = false;
    setMessages([]);
    setError(null);

    supabase
      .from("chat_messages")
      .select("*")
      .eq("room_id", roomId)
      .order("created_at", { ascending: true })
      .limit(50)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setError(error.message);
          return;
        }
        setMessages((data ?? []) as Message[]);
      });

    return () => {
      cancelled = true;
    };
  }, [supabase, roomId]);

  // realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel(`room:${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          setMessages((prev) => {
            const next = payload.new as Message;
            if (prev.some((m) => m.id === next.id)) return prev;
            return [...prev, next];
          });
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, roomId]);

  // auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const send = async () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    const now = Date.now();
    if (now - lastSendRef.current < RATE_LIMIT_MS) {
      setError("Slow down a sec.");
      return;
    }
    lastSendRef.current = now;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ roomId, username, message: trimmed }),
      });
      const json = await res.json();
      if (!json.ok) {
        if (json.reason === "not_configured") {
          setError("Chat is not configured. Tanja needs to add Supabase env vars.");
        } else if (json.reason === "rate_limited") {
          setError("Slow down a sec.");
        } else {
          setError("Could not send. Try again.");
        }
      } else {
        setDraft("");
        if (json.message) {
          setMessages((prev) => {
            if (prev.some((m) => m.id === json.message.id)) return prev;
            return [...prev, json.message as Message];
          });
        }
      }
    } catch {
      setError("Network error.");
    } finally {
      setSending(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        background: "#FFFFFF",
        fontFamily: "Tahoma, sans-serif",
        fontSize: 11,
      }}
    >
      <div
        style={{
          padding: "5px 10px",
          borderBottom: "1px solid #B8B098",
          background: "linear-gradient(to bottom, #F8F6EC, #DCD6C0)",
          fontWeight: "bold",
        }}
      >
        #{roomName}
      </div>

      <div
        ref={scrollRef}
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          padding: 10,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {messages.length === 0 && (
          <div style={{ color: "#7A7060", fontStyle: "italic" }}>
            No messages yet. Say hi.
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} style={{ lineHeight: 1.4 }}>
            <span style={{ fontWeight: "bold", color: "#1A4FB8" }}>
              {m.username}
            </span>{" "}
            <span style={{ color: "#7A7060", fontSize: 10 }}>
              {formatTime(m.created_at)}
            </span>
            <div
              style={{ wordBreak: "break-word" }}
              dangerouslySetInnerHTML={{ __html: m.message }}
            />
          </div>
        ))}
      </div>

      {error && (
        <div
          style={{
            padding: "4px 10px",
            background: "#FFE574",
            borderTop: "1px solid #B8862E",
            color: "#5A3F00",
            fontSize: 11,
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          borderTop: "1px solid #B8B098",
          padding: 6,
          display: "flex",
          gap: 6,
          background: "var(--xp-window-bg)",
        }}
      >
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onMouseDown={(e) => e.stopPropagation()}
          placeholder={`message #${roomName}`}
          rows={2}
          maxLength={500}
          style={{
            flex: 1,
            fontSize: 11,
            fontFamily: "Tahoma, sans-serif",
            padding: 4,
            border: "1px solid #5A5A5A",
            resize: "none",
          }}
        />
        <button
          onClick={send}
          disabled={sending || draft.trim().length === 0}
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            minWidth: 60,
            fontSize: 11,
            fontFamily: "Tahoma, sans-serif",
            background: "linear-gradient(to bottom, #FCFCFC, #DCE7F8 50%, #C8D8F0)",
            border: "1px solid #1A4FB8",
            borderRadius: 3,
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
