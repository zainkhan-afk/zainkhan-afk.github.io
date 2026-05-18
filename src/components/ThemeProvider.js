"use client";
import { useEffect } from "react";

export default function ThemeProvider({ children }) {
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);
  return children;
}
