import { getAllWork } from "@/lib/work";
import ContentCard from "@/components/ContentCard";

export const metadata = {
  title: "Work | Zain Khan",
  description: "Case studies from my work with companies and clients.",
};

// Group by workplace (falls back to company). getAllWork() is newest first, so
// items stay date-sorted within a group and groups are ordered by their latest item.
function groupByWorkplace(work) {
  const groups = [];
  for (const item of work) {
    const name = item.metadata.workplace || item.metadata.company;
    let group = groups.find((g) => g.name === name);
    if (!group) {
      group = { name, items: [] };
      groups.push(group);
    }
    group.items.push(item);
  }
  return groups;
}

export default function Work() {
  const groups = groupByWorkplace(getAllWork());
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      <h1
        className="font-serif text-4xl sm:text-5xl font-bold mb-10 text-center"
        style={{ color: "var(--text-primary)" }}
      >
        Work
      </h1>
      {groups.map((group) => (
        <section key={group.name} className="mb-14">
          <h2
            className="font-serif text-2xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            {group.name}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {group.items.map((item) => (
              <ContentCard
                key={item.slug}
                title={item.metadata.title}
                description={item.metadata.description}
                image={item.metadata.display_graphic}
                diagram={item.diagram}
                eyebrow={`${item.metadata.company} · ${item.metadata.role}`}
                tech={item.metadata.tech}
                href={`/work/${item.slug}`}
                linkLabel="Read case study →"
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
