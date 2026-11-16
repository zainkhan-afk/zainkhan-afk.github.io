import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { notFound } from "next/navigation";
import { getAllTopics, getAllChapters } from "@/lib/notes";
import { getTopicDetails, getChapterDetails } from "@/lib/notes";


export async function generateStaticParams() {
  const notesTopics = getAllTopics();
  const paths = notesTopics.flatMap((notesTopic) => {
    const topicChapters = getAllChapters(notesTopic.topic);
    return topicChapters.map((topicChapter) => ({
      topic: notesTopic.topic,
      chapter: topicChapter.chapter,
    }));
  });

  // `output: export` requires at least one param. When there are no publishable
  // chapters yet (all draft / no chapters), emit a placeholder that 404s.
  return paths.length ? paths : [{ topic: "none", chapter: "none" }];
}

export default async function NotesChapter({ params }) {
    const { topic, chapter } = await params;
    let allChapters;
    let chapterData;
    try{
      allChapters = getAllChapters(topic);
      chapterData = getChapterDetails(topic, chapter)
    }
    catch (err){
      return notFound();
    }

    if (!chapterData) {
      return notFound();
    }

    return (
        <div className="max-w-6xl w-full mx-auto py-12 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

      {/* Sidebar */}
      <aside
        className="md:col-span-1 rounded-xl h-fit p-5 text-sm"
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
      >
        <h2
          className="font-mono text-xs uppercase tracking-wider mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          Chapters
        </h2>
        <ul className="space-y-2">
          {allChapters.map((c) => {
            const active = c.chapter === chapter;
            return (
              <li key={c.chapter}>
                <Link
                  href={`/notes/${topic}/${c.chapter}`}
                  className="hover:underline"
                  style={{
                    color: active ? "var(--accent)" : "var(--text-secondary)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {c.metadata.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Main content */}
      <div className="md:col-span-3">
        <h1
          className="font-serif text-4xl font-bold mb-8"
          style={{ color: "var(--text-primary)" }}
        >
          {chapterData.metadata.title}
        </h1>

        <article className="prose prose-stone dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
          >
            {chapterData.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>

    );
}
