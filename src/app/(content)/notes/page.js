import Link from "next/link";
import { getAllTopics } from "@/lib/notes";

export default function NotesPage() {
  const topics = getAllTopics();

  return (
    <div className="max-w-5xl w-full mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Notes</h1>
      <ul className="space-y-6">
        {topics.map((topic) => (
          <li key={topic.topic} className="border-b border-gray-700 pb-4">
            <Link href={`/notes/${topic.topic}`}>
              <h2 className="text-2xl font-semibold hover:underline">
                {topic.metadata.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-400">{topic.metadata.date}</p>
            <p className="mt-2">{topic.metadata.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
