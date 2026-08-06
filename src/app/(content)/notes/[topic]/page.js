import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTopics } from "@/lib/notes";
import { getAllChapters, getTopicDetails } from "@/lib/notes";


export async function generateStaticParams() {
  const notesTopics = getAllTopics();
  const params = notesTopics.map((notesTopic) => ({ topic: notesTopic.topic }));
  // `output: export` requires at least one param. When there are no publishable
  // topics yet (all draft / no chapters), emit a placeholder that 404s.
  return params.length ? params : [{ topic: "none" }];
}

export default async function NotesTopic({ params }) {
    const { topic } = await params;

    const topicData = getTopicDetails(topic);
    if (!topicData) {
      return notFound();
    }
    const chapters = getAllChapters(topic);

    return (
        <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-12">
            <h1
              className="font-serif text-4xl sm:text-5xl font-bold mb-2 text-center"
              style={{ color: "var(--text-primary)" }}
            >
              {topicData.metadata.title}
            </h1>
            {topicData.metadata.description && (
              <p
                className="font-serif italic text-center mb-12"
                style={{ color: "var(--text-secondary)" }}
              >
                {topicData.metadata.description}
              </p>
            )}
            <ul>
                {chapters.map((chapter) => (
                    <li
                      key={chapter.chapter}
                      className="border-b py-6"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <Link href={`/notes/${topic}/${chapter.chapter}`} className="group block">
                        <h2
                          className="font-serif italic text-lg font-semibold mb-1 group-hover:underline"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {chapter.metadata.title}
                        </h2>
                        <p
                          className="font-mono text-xs uppercase tracking-wider mb-2"
                          style={{ color: "var(--accent)" }}
                        >
                          {chapter.metadata.date}
                        </p>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {chapter.metadata.description}
                        </p>
                      </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
