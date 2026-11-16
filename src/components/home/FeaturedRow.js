import Link from "next/link";
import { Children } from "react";

// Renders nothing when there is nothing to feature
export default function FeaturedRow({ title, viewAllHref, children }) {
  if (Children.count(children) === 0) { return null; }
  return (
    <section className="py-10">
      <div className="flex justify-between items-baseline mb-6">
        <h2 className="font-serif text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          {title}
        </h2>
        <Link
          href={viewAllHref}
          className="font-mono text-xs uppercase tracking-wider"
          style={{ color: "var(--accent)" }}
        >
          View all →
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}
