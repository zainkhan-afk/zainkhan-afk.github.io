"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); // remove empty segments

  // Build breadcrumb data
  const crumbs = segments.map((segment, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    return {
      name: segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()), // prettify "deep-learning" → "Deep Learning"
      href: idx === segments.length - 1 ? null : href, // last item is current page
    };
  });

  return (
    <nav className="max-w-5xl w-full text-md text-gray-400 py-4">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:underline text-gray-200">
            Home
          </Link>
        </li>
        {crumbs.map((crumb, idx) => (
          <li key={idx} className="flex items-center">
            <span className="mx-1">/</span>
            {crumb.href ? (
              <Link href={crumb.href} className="hover:underline text-gray-200">
                {crumb.name}
              </Link>
            ) : (
              <span className="text-gray-400">{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
