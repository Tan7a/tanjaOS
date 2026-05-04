"use client";

import { useEffect, useState } from "react";

interface Project {
  id: number;
  title: string;
  year: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((r) => {
        if (!r.ok) throw new Error("network");
        return r.json();
      })
      .then((data: { projects: Project[] }) => setProjects(data.projects))
      .catch(() => setError("Could not load projects.json."));
  }, []);

  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        background: "#9C9988",
      }}
    >
      {/* Word toolbar strip */}
      <div
        style={{
          flexShrink: 0,
          padding: "3px 6px",
          background: "linear-gradient(to bottom, #F8F6EC, #DCD6C0)",
          borderBottom: "1px solid #B8B098",
          fontSize: 11,
          fontFamily: "Tahoma, sans-serif",
          color: "#3A3A3A",
          display: "flex",
          gap: 12,
        }}
      >
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Insert</span>
        <span>Format</span>
        <span>Tools</span>
        <span>Table</span>
        <span>Window</span>
        <span>Help</span>
      </div>

      {/* Page area */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          padding: 20,
          background: "#787264",
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            background: "#FFFFFF",
            boxShadow: "2px 2px 6px rgba(0,0,0,0.5)",
            padding: "44px 56px",
            fontFamily: 'Georgia, "Times New Roman", serif',
            color: "#1F1F1F",
          }}
        >
          <h1
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 28,
              fontWeight: "bold",
              margin: "0 0 4px",
              textAlign: "center",
              borderBottom: "2px solid #1F1F1F",
              paddingBottom: 6,
            }}
          >
            portfolio.doc
          </h1>
          <p
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "#5A5A5A",
              fontStyle: "italic",
              margin: "0 0 28px",
            }}
          >
            A short list of work I am proud of, kept like a Word document.
          </p>

          {error && (
            <p style={{ color: "#9A2B2B" }}>{error}</p>
          )}
          {!error && !projects && (
            <p style={{ color: "#5A5A5A" }}>Loading...</p>
          )}

          {projects?.map((p, idx) => (
            <div
              key={p.id}
              style={{
                display: "flex",
                gap: 18,
                padding: "16px 0",
                borderTop: idx === 0 ? "none" : "1px dashed #B8B098",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.title}
                style={{
                  width: 140,
                  height: 100,
                  objectFit: "cover",
                  border: "1px solid #5A5A5A",
                  flexShrink: 0,
                  background: "#ECE9D8",
                }}
                draggable={false}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 12,
                  }}
                >
                  <h2
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      margin: 0,
                      fontFamily: 'Georgia, "Times New Roman", serif',
                    }}
                  >
                    {p.title}
                  </h2>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#5A5A5A",
                      fontStyle: "italic",
                      flexShrink: 0,
                    }}
                  >
                    {p.year}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.5,
                    margin: "6px 0 8px",
                  }}
                >
                  {p.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    marginBottom: 6,
                  }}
                >
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 10,
                        fontFamily: "Tahoma, sans-serif",
                        background: "#FFE574",
                        border: "1px solid #B8862E",
                        padding: "1px 6px",
                        borderRadius: 2,
                        color: "#5A3F00",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 12,
                      color: "#1A4FB8",
                      textDecoration: "underline",
                      fontFamily: "Tahoma, sans-serif",
                    }}
                  >
                    View project &rsaquo;
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: 12,
                      color: "#9D9888",
                      fontFamily: "Tahoma, sans-serif",
                    }}
                  >
                    No link yet.
                  </span>
                )}
              </div>
            </div>
          ))}

          <p
            style={{
              marginTop: 36,
              fontSize: 11,
              color: "#7A7060",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            Page 1 of 1
          </p>
        </div>
      </div>

      {/* status bar */}
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
        Page 1 / 1 &nbsp; Section 1 &nbsp; At 1.0&Prime; &nbsp; Ln 1 &nbsp; Col 1
      </div>
    </div>
  );
}
