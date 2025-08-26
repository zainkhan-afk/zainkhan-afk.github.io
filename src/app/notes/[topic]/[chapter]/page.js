import Link from "next/link";
import { getAllTopics, getAllChapters } from "@/lib/notes";
import { getTopicDetails, getChapterDetails } from "@/lib/notes";


export async function generateStaticParams() {
  const notesTopics = getAllTopics();
//   console.log("notesTopics", notesTopics);
  const paths = notesTopics.flatMap((notesTopic) => {
      console.log("notesTopic", notesTopic.slug);
    const topicChapters = getAllChapters(notesTopic.slug);
    return topicChapters.map((topicChapter) => ({
      topic: notesTopic.slug,
      chapter: topicChapter.slug,
    }));
  });

  console.log(paths);

  return paths;
}

export default async function NotesChapter({ params }) {
    const { topic, chapter } = await params;
    console.log("topic", topic)
    console.log("chapter", chapter)

    const chapterData = getChapterDetails(topic, chapter)

    return (
        <div className="max-w-5xl w-full mx-auto py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">{chapterData.metadata.title}</h1>
            {/* <ul className="space-y-6">
                {chapters.map((post) => (
                    <li key={post.slug} className="border-b border-gray-700 pb-4">
                    <Link href={`/blog/${post.slug}`}>
                        <h2 className="text-2xl font-semibold hover:underline">
                        {post.metadata.title}
                        </h2>
                    </Link>
                    <p className="text-sm text-gray-400">{post.metadata.date}</p>
                    <p className="mt-2">{post.metadata.description}</p>
                    </li>
                ))}
            </ul> */}
        </div>
    );
}
