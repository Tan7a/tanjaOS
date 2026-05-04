"use client";

import { useEffect, useRef, useState } from "react";

const PROMPT_PREFIX = "C:\\Documents and Settings\\Tanja>";

const BOOT_LINES: string[] = [
  "Microsoft Windows XP [Version 5.1.2600]",
  "(C) Copyright 1985-2001 Microsoft Corp.",
  "",
];

type Line = { text: string; tone?: "dim" };

function runCommand(raw: string, clear: () => void): Line[] {
  const trimmed = raw.trim();
  if (!trimmed) return [];

  const [cmd, ...rest] = trimmed.split(/\s+/);
  const arg = rest.join(" ");

  switch (cmd.toLowerCase()) {
    case "help":
      return [
        { text: "Supported commands:" },
        { text: "  help        Show this list." },
        { text: "  ver         Display the Windows version." },
        { text: "  whoami      Show the current user." },
        { text: "  dir         List the current directory." },
        { text: "  date        Show today's date." },
        { text: "  time        Show the current time." },
        { text: "  echo <x>    Print the rest of the line." },
        { text: "  cls         Clear the screen." },
        { text: "  exit        Pretend to exit." },
        { text: "" },
      ];
    case "ver":
      return [{ text: "" }, { text: "Microsoft Windows XP [Version 5.1.2600]" }, { text: "" }];
    case "whoami":
      return [{ text: "tanja-pc\\tanja" }, { text: "" }];
    case "dir":
      return [
        { text: "" },
        { text: " Volume in drive C is TANJA-PC" },
        { text: " Volume Serial Number is 2003-0420" },
        { text: "" },
        { text: " Directory of " + PROMPT_PREFIX.slice(0, -1) },
        { text: "" },
        { text: "05/04/2026  03:09 PM    <DIR>          ." },
        { text: "05/04/2026  03:09 PM    <DIR>          .." },
        { text: "05/04/2026  03:09 PM    <DIR>          My Documents" },
        { text: "05/04/2026  03:09 PM    <DIR>          Inspiration" },
        { text: "05/04/2026  03:09 PM    <DIR>          Penny" },
        { text: "05/04/2026  03:09 PM           147,392 diary-2003-09-14.doc" },
        { text: "05/04/2026  03:09 PM            89,041 secrets.txt" },
        { text: "               2 File(s)        236,433 bytes" },
        { text: "               5 Dir(s)   3,201,994,752 bytes free" },
        { text: "" },
      ];
    case "date": {
      const d = new Date();
      const fmt = `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d
        .getDate()
        .toString()
        .padStart(2, "0")}/${d.getFullYear()}`;
      return [{ text: `The current date is: ${fmt}` }, { text: "" }];
    }
    case "time": {
      const d = new Date();
      const fmt = d.toLocaleTimeString();
      return [{ text: `The current time is: ${fmt}` }, { text: "" }];
    }
    case "echo":
      return [{ text: arg.length ? arg : "ECHO is on." }, { text: "" }];
    case "cls":
    case "clear":
      clear();
      return [];
    case "exit":
      return [{ text: "(this is a 2003 bedroom, you can't really exit)", tone: "dim" }, { text: "" }];
    default:
      return [
        {
          text: `'${cmd}' is not recognized as an internal or external command,`,
        },
        { text: "operable program or batch file." },
        { text: "" },
      ];
  }
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(BOOT_LINES.map((text) => ({ text })));
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, input]);

  const submit = (raw: string) => {
    const echoed: Line = { text: `${PROMPT_PREFIX}${raw}` };
    if (raw.trim().toLowerCase() === "cls" || raw.trim().toLowerCase() === "clear") {
      setLines([]);
      setHistory((h) => [...h, raw]);
      setHistoryIndex(-1);
      setInput("");
      return;
    }
    const out = runCommand(raw, () => setLines([]));
    setLines((prev) => [...prev, echoed, ...out]);
    if (raw.trim()) {
      setHistory((h) => [...h, raw]);
    }
    setHistoryIndex(-1);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    }
  };

  return (
    <label
      htmlFor="xp-term-input"
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        background: "#000000",
        color: "#FFFFFF",
        fontFamily: "'Lucida Console', 'Consolas', 'Courier New', monospace",
        fontSize: 13,
        lineHeight: 1.35,
        padding: "6px 8px",
        cursor: "text",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              opacity: line.tone === "dim" ? 0.7 : 1,
            }}
          >
            {line.text || " "}
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "baseline", whiteSpace: "pre" }}>
          <span>{PROMPT_PREFIX}</span>
          <span>{input}</span>
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: 8,
              height: "1em",
              marginLeft: 1,
              background: "#FFFFFF",
              animation: "xp-term-blink 1.05s steps(2, start) infinite",
              verticalAlign: "text-bottom",
            }}
          />
        </div>
      </div>

      {/*
        Visible-but-transparent input. Wrapping <label htmlFor> means any click
        inside the body forwards focus here without us managing it manually.
      */}
      <input
        id="xp-term-input"
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        autoFocus
        aria-label="Terminal input"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          color: "transparent",
          caretColor: "transparent",
          background: "transparent",
          border: "none",
          outline: "none",
          padding: "6px 8px",
          font: "inherit",
        }}
      />

      <style>{`@keyframes xp-term-blink { to { visibility: hidden; } }`}</style>
    </label>
  );
}
