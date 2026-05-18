import { GraduationCap } from "lucide-react";

const EDUCATION = [
  {
    school: "National University of Sciences & Technology",
    degree: "MS — Robotics and Artificial Intelligence",
    dates: "Oct 2020 — Oct 2024",
    description:
      "My MS research focused on developing a locomotion framework for quadrupedal robots by combining Reinforcement Learning with Model Predictive Control, enabling adaptive and efficient movement in complex environments.",
    skills: ["Deep Learning", "Machine Learning", "Medical Robotics", "Medical AI", "Mobile Robotics", "SLAM", "ROS"],
  },
  {
    school: "Balochistan University of IT, Engineering & Management Sciences",
    degree: "BS — Electronic Engineering",
    dates: "Oct 2015 — Aug 2019",
    description:
      "For my final year project, I developed a solution that optimized locomotion gaits for quadrupedal robots using a Genetic Algorithm, with a neural network as the robot controller.",
    skills: ["Deep Learning", "Machine Learning", "Electronic Devices", "Power Electronics", "Genetic Algorithm", "Evolutionary Algorithms"],
  },
];

export default function AboutEducation() {
  return (
    <section className="py-8" style={{ borderColor: "var(--border)" }}>
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="w-5 h-5" style={{ color: "var(--accent)" }} />
        <h2
          className="font-serif text-2xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Education
        </h2>
      </div>
      <div className="space-y-8">
        {EDUCATION.map((edu) => (
          <div
            key={edu.school}
            className="pl-4 border-l-2"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-2">
              <div>
                <h3
                  className="font-serif font-bold text-lg"
                  style={{ color: "var(--text-primary)" }}
                >
                  {edu.school}
                </h3>
                <p
                  className="font-mono text-xs uppercase tracking-wider"
                  style={{ color: "var(--accent)" }}
                >
                  {edu.degree}
                </p>
              </div>
              <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                {edu.dates}
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              {edu.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {edu.skills.map((s) => (
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
