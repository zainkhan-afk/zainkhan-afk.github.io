import Link from "next/link";

export const metadata = {
  title: "Craft | Zain Khan",
  description: "Long-running experiments, series, and creative explorations.",
};

const CRAFTS = [
  {
    slug: "Genuary26",
    title: "Genuary 2026",
    description:
      "31 days of creative code. One p5.js sketch per day, following the official Genuary prompts.",
    dates: "Jan 2026",
  },
];

export default function Craft() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pb-16">
      <h1
        className="font-serif text-4xl sm:text-5xl font-bold mb-3 text-center"
        style={{ color: "var(--text-primary)" }}
      >
        Craft
      </h1>
      <p
        className="font-serif italic text-center mb-12"
        style={{ color: "var(--text-secondary)" }}
      >
        Long-running experiments, series, and creative explorations.
      </p>
      <div className="space-y-4">
        {CRAFTS.map((craft) => (
          <Link key={craft.slug} href={`/craft/${craft.slug}`}>
            <div
              className="flex justify-between items-start p-5 rounded-lg transition-colors"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              <div>
                <h2
                  className="font-serif text-xl font-bold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {craft.title}
                </h2>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {craft.description}
                </p>
              </div>
              <span
                className="font-mono text-xs flex-shrink-0 ml-4 mt-1"
                style={{ color: "var(--accent)" }}
              >
                {craft.dates}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
