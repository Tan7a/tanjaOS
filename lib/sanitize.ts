export function sanitizeMessage(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim()
    .slice(0, 500);
}

export function sanitizeUsername(input: string): string {
  return input.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 20);
}

export function sanitizeRoomName(input: string): string {
  return input.replace(/[^a-zA-Z0-9-]/g, "").slice(0, 30).toLowerCase();
}
