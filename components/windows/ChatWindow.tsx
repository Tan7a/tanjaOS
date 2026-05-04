"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useDialUp } from "@/lib/dialup-context";
import UsernameModal from "./chat/UsernameModal";
import RoomList, { type Room } from "./chat/RoomList";
import RoomView from "./chat/RoomView";
import { ChatIcon, ModemIcon } from "@/components/icons/AppIcons";

export default function ChatWindow() {
  const { isConnected } = useDialUp();
  const [username, setUsername] = useState<string | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase || !isConnected) return;
    supabase
      .from("chat_rooms")
      .select("id, name, description")
      .eq("is_active", true)
      .order("name", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          setLoadError(error.message);
          return;
        }
        const list = (data ?? []) as Room[];
        setRooms(list);
        if (list.length > 0 && !selectedRoomId) setSelectedRoomId(list[0].id);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  if (!supabase) {
    return <Placeholder kind="not_configured" />;
  }

  if (!isConnected) {
    return <Placeholder kind="not_connected" />;
  }

  if (!username) {
    return <UsernameModal onSubmit={setUsername} />;
  }

  const selected = rooms.find((r) => r.id === selectedRoomId) ?? null;

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
          padding: "4px 10px",
          background: "linear-gradient(to bottom, #F8F6EC, #DCD6C0)",
          borderBottom: "1px solid #B8B098",
          fontFamily: "Tahoma, sans-serif",
          fontSize: 11,
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        <ChatIcon size={16} />
        <span style={{ fontWeight: "bold" }}>TanjaOS Chat</span>
        <span style={{ color: "#7A7060", marginLeft: "auto" }}>
          signed in as <strong>{username}</strong>
        </span>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: "flex" }}>
        <RoomList
          rooms={rooms}
          selectedId={selectedRoomId}
          onSelect={setSelectedRoomId}
          onCreate={async (name, description) => {
            if (!supabase) return "Not configured.";
            const { data, error } = await supabase
              .from("chat_rooms")
              .insert({ name, description, created_by: username })
              .select("id, name, description")
              .single();
            if (error) return error.message;
            const newRoom = data as Room;
            setRooms((prev) =>
              [...prev, newRoom].sort((a, b) => a.name.localeCompare(b.name)),
            );
            setSelectedRoomId(newRoom.id);
            return null;
          }}
        />
        {selected ? (
          <RoomView
            supabase={supabase}
            roomId={selected.id}
            roomName={selected.name}
            username={username}
          />
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#7A7060",
              fontFamily: "Tahoma, sans-serif",
              fontSize: 12,
              fontStyle: "italic",
            }}
          >
            {loadError ? `Could not load rooms: ${loadError}` : "Pick a room on the left, or make a new one."}
          </div>
        )}
      </div>
    </div>
  );
}

function Placeholder({ kind }: { kind: "not_configured" | "not_connected" }) {
  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
        background: "var(--xp-window-bg)",
        fontFamily: "Tahoma, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 360 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          {kind === "not_connected" ? <ModemIcon size={48} /> : <ChatIcon size={48} />}
        </div>
        <h2 style={{ fontSize: 14, margin: "0 0 6px" }}>
          {kind === "not_connected" ? "You need to dial up first." : "Chat is not online yet."}
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 11,
            color: "#5A5A5A",
            lineHeight: 1.5,
          }}
        >
          {kind === "not_connected"
            ? "Open Connect to Internet and click Dial. Then come back here to say hi."
            : "TanjaNet chat goes live once the server is configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local and reboot."}
        </p>
      </div>
    </div>
  );
}
