"use client";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = ["About", "Projects", "Craft", "Blog", "Contact"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    setIsDark(stored !== "light");
  }, []);

  function toggleTheme() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all"
      style={{
        background: isHome ? "rgba(17,16,16,0.6)" : "var(--bg-primary)",
        backdropFilter: isHome ? "blur(14px)" : "none",
        WebkitBackdropFilter: isHome ? "blur(14px)" : "none",
        borderBottom: isHome ? "1px solid rgba(255,255,255,0.1)" : "1px solid var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="font-serif italic text-lg font-semibold"
          style={{ color: isHome ? "#e8e0d5" : "var(--text-primary)" }}
        >
          Zain Khan
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((label) => (
            <Link
              key={label}
              href={`/${label.toLowerCase()}`}
              className="font-mono text-xs uppercase tracking-widest transition-colors hover:text-accent"
              style={{ color: isHome ? "rgba(232,224,213,0.75)" : "var(--text-secondary)" }}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="transition-colors hover:text-accent"
            style={{ color: isHome ? "rgba(232,224,213,0.75)" : "var(--text-secondary)" }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{ color: isHome ? "rgba(232,224,213,0.75)" : "var(--text-secondary)" }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: isHome ? "rgba(232,224,213,0.75)" : "var(--text-secondary)" }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          className="md:hidden"
          style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}
        >
          <ul className="flex flex-col px-6 py-4 gap-4">
            {NAV_LINKS.map((label) => (
              <li key={label}>
                <Link
                  href={`/${label.toLowerCase()}`}
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: "var(--text-secondary)" }}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
