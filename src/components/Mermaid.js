"use client";
import { useEffect, useId, useRef, useState } from "react";

// Renders a Mermaid diagram (```mermaid blocks in case studies, and card
// thumbnails), using the site's CSS color variables so diagrams follow the
// light/dark theme. The library loads only once the diagram nears the viewport.
// `compact` scales the diagram to fill its (fixed-size) parent, for cards.
export default function Mermaid({ chart, compact = false }) {
  const id = "mermaid-" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { rootMargin: "300px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) { return; }
    let cancelled = false;

    async function render() {
      const mermaid = (await import("mermaid")).default;
      const css = getComputedStyle(document.documentElement);
      const v = (name) => css.getPropertyValue(name).trim();
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        fontFamily: "var(--font-geist-mono), monospace",
        themeVariables: {
          background: v("--bg-primary"),
          primaryColor: v("--bg-secondary"),
          primaryTextColor: v("--text-primary"),
          primaryBorderColor: v("--accent"),
          secondaryColor: v("--bg-surface"),
          tertiaryColor: v("--bg-primary"),
          lineColor: v("--text-secondary"),
          textColor: v("--text-primary"),
          edgeLabelBackground: v("--bg-primary"),
          clusterBkg: v("--bg-primary"),
          clusterBorder: v("--border"),
          xyChart: {
            backgroundColor: v("--bg-primary"),
            titleColor: v("--text-primary"),
            xAxisLabelColor: v("--text-secondary"),
            xAxisTitleColor: v("--text-secondary"),
            xAxisTickColor: v("--border"),
            xAxisLineColor: v("--border"),
            yAxisLabelColor: v("--text-secondary"),
            yAxisTitleColor: v("--text-secondary"),
            yAxisTickColor: v("--border"),
            yAxisLineColor: v("--border"),
            plotColorPalette: v("--accent"),
          },
        },
      });
      try {
        // Cards are wide and short, so lay flowcharts out left-to-right there
        const source = compact ? chart.replace(/^(\s*flowchart)\s+(TD|TB)\b/, "$1 LR") : chart;
        const { svg } = await mermaid.render(id, source);
        if (!cancelled) { setSvg(svg); setFailed(false); }
      } catch {
        if (!cancelled) { setFailed(true); }
      }
    }

    render();
    // Re-render when the theme toggles (the `dark` class on <html>)
    const observer = new MutationObserver(render);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { cancelled = true; observer.disconnect(); };
  }, [chart, compact, id, visible]);

  if (failed && !compact) {
    return <pre><code>{chart}</code></pre>;
  }
  return (
    <div
      ref={ref}
      className={
        compact
          ? "h-full w-full flex items-center justify-center p-4 [&>svg]:h-full [&>svg]:w-full"
          : "not-prose my-8 min-h-px flex justify-center overflow-x-auto"
      }
      aria-hidden={compact || undefined}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
