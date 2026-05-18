"use client";
import { useState } from "react";

export default function GenauryBrowser({ sketches }) {
  const [selected, setSelected] = useState(sketches[0]);

  return (
    <div
      className="flex w-full"
      style={{ height: "calc(100vh - 6rem)" }}
    >
      {/* Sidebar */}
      <div
        className="w-56 flex-shrink-0 overflow-y-auto"
        style={{
          borderRight: "1px solid var(--border)",
          background: "var(--bg-secondary)",
        }}
      >
        <div
          className="px-4 py-3 border-b sticky top-0"
          style={{
            borderColor: "var(--border)",
            background: "var(--bg-secondary)",
          }}
        >
          <p
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            Genuary 2026
          </p>
        </div>
        {sketches.map((sketch) => (
          <button
            key={sketch.slug}
            onClick={() => setSelected(sketch)}
            className="w-full text-left px-4 py-3 text-sm transition-colors border-b"
            style={{
              borderColor: "var(--border)",
              background:
                selected.slug === sketch.slug
                  ? "var(--bg-surface)"
                  : "transparent",
              color:
                selected.slug === sketch.slug
                  ? "var(--accent)"
                  : "var(--text-secondary)",
            }}
          >
            {sketch.title}
          </button>
        ))}
      </div>

      {/* Main viewer */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 relative" style={{ background: "var(--bg-primary)" }}>
          <iframe
            key={selected.slug}
            src={`/sketches/Genuary26/${selected.slug}/index.html`}
            className="absolute inset-0 w-full h-full border-0"
            scrolling="no"
            sandbox="allow-scripts allow-same-origin"
            title={selected.title}
          />
        </div>

        {(selected.prompt || selected.notes) && (
          <div
            className="border-t p-5 overflow-y-auto"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-secondary)",
              maxHeight: "180px",
            }}
          >
            {selected.prompt && (
              <p
                className="font-mono text-xs uppercase tracking-widest mb-2"
                style={{ color: "var(--accent)" }}
              >
                Prompt: {selected.prompt}
              </p>
            )}
            {selected.notes && (
              <p
                className="font-serif italic text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {selected.notes}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
