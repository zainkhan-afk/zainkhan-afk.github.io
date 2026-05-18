"use client";
import GlobalP5Wrapper from "./GlobalP5Wrapper";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <GlobalP5Wrapper />

      {/* Bottom-left gradient anchor */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(17,16,16,0.88) 0%, transparent 65%)",
        }}
      >
        <div className="px-8 pb-12 pt-20">
          <h1
            className="font-serif text-5xl md:text-6xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Zain Khan
          </h1>
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--accent)" }}
          >
            AI Developer · Creative Coder
          </p>
          <p
            className="font-serif italic text-lg md:text-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Making machines that think, and art that computes.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 animate-bounce"
        style={{ color: "var(--text-secondary)" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
