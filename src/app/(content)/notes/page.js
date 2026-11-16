import Link from "next/link";
import { getAllTopics } from "@/lib/notes";

export const metadata = {
  title: "Notes | Zain Khan",
  description: "Structured notes and study series on physics, robotics, and creative coding.",
};

export default function NotesPage() {
  const topics = getAllTopics();

  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-12">
      <h1
        className="font-serif text-4xl sm:text-5xl font-bold mb-2 text-center"
        style={{ color: "var(--text-primary)" }}
      >
        Notes
      </h1>
      <p
        className="font-serif italic text-center mb-12"
        style={{ color: "var(--text-secondary)" }}
      >
        Structured notes and study series.
      </p>
      <ul>
        {topics.map((topic) => (
          <li
            key={topic.topic}
            className="border-b py-6"
            style={{ borderColor: "var(--border)" }}
          >
            <Link href={`/notes/${topic.topic}`} className="group block">
              <h2
                className="font-serif italic text-lg font-semibold mb-1 group-hover:underline"
                style={{ color: "var(--text-primary)" }}
              >
                {topic.metadata.title}
              </h2>
              <p
                className="font-mono text-xs uppercase tracking-wider mb-2"
                style={{ color: "var(--accent)" }}
              >
                {topic.metadata.date}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {topic.metadata.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
