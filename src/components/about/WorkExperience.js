import { BriefcaseBusiness } from "lucide-react";

const JOBS = [
  {
    company: "SiParadigm",
    location: "Islamabad",
    role: "AI Developer II",
    dates: "Jun 2023 — Present",
    bullets: [
      "Built healthcare-focused AI pipelines, including Retrieval-Augmented Generation (RAG) systems.",
      "Automated medical document digitization & redaction tools, reducing manual effort by ~80%.",
      "Developed computer vision solutions like autofocus and 3D interpolation for microscope imaging.",
    ],
    skills: ["Langchain", "LangGraph", "Milvus", "RAG", "PyTorch", "TensorFlow", "scikit-learn", "Pandas"],
  },
  {
    company: "Fiverr",
    location: "Remote",
    role: "Freelancer",
    dates: "Aug 2019 — Dec 2024",
    bullets: [
      "Delivered 400+ projects worldwide in AI, robotics, and automation.",
      "Built SaaS platforms & creative AI tools, including bots and Twitch-integrated AI agents.",
      "Specialized in production-ready ML pipelines & real-time automation systems.",
    ],
    skills: ["Langchain", "LangGraph", "Milvus", "RAG", "PyTorch", "TensorFlow", "scikit-learn", "Pandas", "ROS", "Embedded Systems"],
  },
  {
    company: "National Center for Artificial Intelligence",
    location: "Islamabad",
    role: "Research Associate",
    dates: "Jun 2022 — May 2023",
    bullets: [
      "Developed an Urdu ASR (Automatic Speech Recognition) system for broadcast media.",
      "Worked on ad recognition & program classification using multimodal ML models.",
      "Conducted large-scale sentiment analysis on social media data.",
    ],
    skills: ["PyTorch", "TensorFlow", "scikit-learn", "Pandas"],
  },
];

export default function AboutWorkExperience() {
  return (
    <section className="py-8 border-b" style={{ borderColor: "var(--border)" }}>
      <div className="flex items-center gap-2 mb-6">
        <BriefcaseBusiness className="w-5 h-5" style={{ color: "var(--accent)" }} />
        <h2
          className="font-serif text-2xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Work Experience
        </h2>
      </div>
      <div className="space-y-8">
        {JOBS.map((job) => (
          <div
            key={job.company}
            className="pl-4 border-l-2"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-2">
              <div>
                <h3
                  className="font-serif font-bold text-lg"
                  style={{ color: "var(--text-primary)" }}
                >
                  {job.company}
                </h3>
                <p
                  className="font-mono text-xs uppercase tracking-wider"
                  style={{ color: "var(--accent)" }}
                >
                  {job.location} · {job.role}
                </p>
              </div>
              <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                {job.dates}
              </span>
            </div>
            <ul className="space-y-1 mb-3">
              {job.bullets.map((b, i) => (
                <li
                  key={i}
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  — {b}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((s) => (
                <span
                  key={s}
                  className="font-mono text-xs px-2 py-0.5 rounded"
                  style={{
                    background: "var(--bg-surface)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
