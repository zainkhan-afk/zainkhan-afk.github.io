import { CodeIcon } from "lucide-react";

const SKILL_GROUPS = [
  {
    title: "Machine Learning",
    skills: ["TensorFlow", "PyTorch", "scikit-learn", "Pandas", "LangChain", "LangGraph"],
  },
  {
    title: "Creative Coding",
    skills: ["p5.js", "Processing", "Three.js", "ShaderToy", "WebGL"],
  },
  {
    title: "Languages & Tools",
    skills: ["Python", "JavaScript", "C++", "ROS", "Docker", "FastAPI"],
  },
];

export default function AboutSkills() {
  return (
    <section className="py-8 border-b" style={{ borderColor: "var(--border)" }}>
      <div className="flex items-center gap-2 mb-6">
        <CodeIcon className="w-5 h-5" style={{ color: "var(--accent)" }} />
        <h2
          className="font-serif text-2xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Skills
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {SKILL_GROUPS.map((group) => (
          <div key={group.title}>
            <h3
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--accent)" }}
            >
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((s) => (
                <span
                  key={s}
                  className="font-mono text-xs px-2 py-1 rounded"
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
