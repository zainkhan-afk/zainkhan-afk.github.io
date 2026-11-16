"use client";
import { useEffect, useRef } from "react";

export default function GlobalP5Wrapper() {
  const ref = useRef(null);

  function sendTheme() {
    const theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    ref.current?.contentWindow?.postMessage({ type: "theme", theme }, "*");
  }

  useEffect(() => {
    const observer = new MutationObserver(sendTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <iframe
      ref={ref}
      onLoad={sendTheme}
      // src="https://zainkhan-afk.github.io/Simulations/Planets/index.html"
      src="https://zainkhan-afk.github.io/Simulations/Boids/index.html"
      // src="https://zainkhan-afk.github.io/Simulations/Faces/index.html"
      className="absolute inset-0 w-full h-full z-0 border-0"
      style={{ overflow: "hidden" }}
      scrolling="no"
      sandbox="allow-scripts allow-same-origin"
      title="Hero sketch"
    />
  );
}
