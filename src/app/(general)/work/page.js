import { getAllWork } from "@/lib/work";
import ContentCard from "@/components/ContentCard";

export const metadata = {
  title: "Work | Zain Khan",
  description: "Case studies from my work with companies and clients.",
};

export default function Work() {
  const work = getAllWork();
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      <h1
        className="font-serif text-4xl sm:text-5xl font-bold mb-10 text-center"
        style={{ color: "var(--text-primary)" }}
      >
        Work
      </h1>
      <div className="grid gap-6 md:grid-cols-2">
        {work.map((item) => (
          <ContentCard
            key={item.slug}
            title={item.metadata.title}
            description={item.metadata.description}
            image={item.metadata.display_graphic}
            eyebrow={`${item.metadata.company} · ${item.metadata.role}`}
            tech={item.metadata.tech}
            href={`/work/${item.slug}`}
            linkLabel="Read case study →"
          />
        ))}
      </div>
    </div>
  );
}
