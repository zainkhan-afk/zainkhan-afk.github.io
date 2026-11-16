import Hero from "../components/Hero";
import Intro from "@/components/home/Intro";
import TrustStrip from "@/components/home/TrustStrip";
import FeaturedRow from "@/components/home/FeaturedRow";
import Testimonials from "@/components/home/Testimonials";
import ContentCard from "@/components/ContentCard";
import { getAllWork } from "@/lib/work";
import { getAllProjects } from "@/lib/projects";
import { hasCV } from "@/lib/cv";
import experiments from "@/content/lab/experiments.json";

const MAX_FEATURED = 3;

export default function Home() {
  const work = getAllWork().filter((w) => w.metadata.featured).slice(0, MAX_FEATURED);
  const projects = getAllProjects().filter((p) => p.metadata.featured).slice(0, MAX_FEATURED);
  const lab = experiments.filter((e) => e.featured).slice(0, MAX_FEATURED);

  return (
    <>
      <Hero />
      <main style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-8">
          <Intro showCV={hasCV()} />
          <TrustStrip />
          <FeaturedRow title="Featured Work" viewAllHref="/work">
            {work.map((w) => (
              <ContentCard
                key={w.slug}
                title={w.metadata.title}
                description={w.metadata.description}
                image={w.metadata.display_graphic}
                eyebrow={`${w.metadata.company} · ${w.metadata.role}`}
                tech={w.metadata.tech}
                href={`/work/${w.slug}`}
                linkLabel="Read case study →"
              />
            ))}
          </FeaturedRow>
          <FeaturedRow title="Featured Projects" viewAllHref="/projects">
            {projects.map((p) => (
              <ContentCard
                key={p.slug}
                title={p.metadata.title}
                description={p.metadata.description}
                image={p.metadata.display_graphic}
                eyebrow={p.metadata.date}
                tech={p.metadata.tech}
                github={p.metadata.github}
                href={p.metadata.further_reading ? `/projects/${p.slug}` : undefined}
                linkLabel="Read more →"
              />
            ))}
          </FeaturedRow>
          <FeaturedRow title="Lab" viewAllHref="/lab">
            {lab.map((e) => (
              <ContentCard
                key={e.slug}
                title={e.title}
                description={e.description}
                eyebrow={e.dates}
                href={`/lab/${e.slug}`}
                linkLabel="Open →"
              />
            ))}
          </FeaturedRow>
          <Testimonials />
        </div>
      </main>
    </>
  );
}
