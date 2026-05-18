import sketches from "@/content/craft/genuary26-manifest.json";
import GenauryBrowser from "@/components/craft/GenauryBrowser";

export const metadata = {
  title: "Genuary 2026 | Zain Khan",
  description: "31 days of creative p5.js sketches for Genuary 2026.",
};

export default function Genuary26Page() {
  return <GenauryBrowser sketches={sketches} />;
}
