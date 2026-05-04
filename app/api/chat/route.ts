import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sanitizeMessage, sanitizeUsername } from "@/lib/sanitize";

const RATE_LIMIT_MS = 2000;
const lastSeen = new Map<string, number>();

function getServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

export async function POST(request: Request) {
  const client = getServerClient();
  if (!client) {
    return NextResponse.json(
      { ok: false, reason: "not_configured" },
      { status: 503 },
    );
  }

  let body: { roomId?: string; username?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, reason: "bad_json" },
      { status: 400 },
    );
  }

  const username = sanitizeUsername(body.username ?? "");
  const message = sanitizeMessage(body.message ?? "");
  const roomId = (body.roomId ?? "").toString().slice(0, 64);

  if (!username || !message || !roomId) {
    return NextResponse.json(
      { ok: false, reason: "missing_fields" },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const now = Date.now();
  const last = lastSeen.get(ip) ?? 0;
  if (now - last < RATE_LIMIT_MS) {
    return NextResponse.json(
      { ok: false, reason: "rate_limited" },
      { status: 429 },
    );
  }
  lastSeen.set(ip, now);

  const { data, error } = await client
    .from("chat_messages")
    .insert({
      room_id: roomId,
      username,
      message,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, reason: "db_error", detail: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, message: data });
}
