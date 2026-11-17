"use client";
import { useEffect, useId, useState } from "react";

// Renders a ```mermaid code block from case-study Markdown, using the site's
// CSS color variables so diagrams follow the light/dark theme.
export default function Mermaid({ chart }) {
  const id = "mermaid-" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
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
        const { svg } = await mermaid.render(id, chart);
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
  }, [chart, id]);

  if (failed) {
    return <pre><code>{chart}</code></pre>;
  }
  return (
    <div
      className="not-prose my-8 flex justify-center overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
