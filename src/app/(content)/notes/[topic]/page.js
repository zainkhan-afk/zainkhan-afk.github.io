import Link from "next/link";
import { getAllTopics } from "@/lib/notes";
import { getAllChapters, getTopicDetails } from "@/lib/notes";


export async function generateStaticParams() {
  const notesTopics = getAllTopics();
  return notesTopics.map((notesTopic) => ({ topic: notesTopic.topic }));
}

export default async function NotesTopic({ params }) {
    const { topic } = await params;

    const topicData = getTopicDetails(topic);
    const chapters = getAllChapters(topic);
    
    chapters.map((chapter) => (
        console.log(chapter.chapter)
    ));

    return (
        <div className="max-w-5xl w-full mx-auto py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">{topicData.metadata.title}</h1>
            <ul className="space-y-6">
                {chapters.map((chapter) => (
                    <li key={chapter.chapter} className="border-b border-gray-700 pb-4">
                    <Link href={`/notes/${topic}/${chapter.chapter}`}>
                        <h2 className="text-2xl font-semibold hover:underline">
                        {chapter.metadata.title}
                        </h2>
                    </Link>
                    <p className="text-sm text-gray-400">{chapter.metadata.date}</p>
                    <p className="mt-2">{chapter.metadata.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
