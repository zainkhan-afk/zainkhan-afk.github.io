const TESTIMONIALS = [
  {
    quote:
      "Great seller who took the trouble to research around the topic and spend extra time making sure the project worked well.",
    label: "Robot localization system · Client, UK",
  },
  {
    quote:
      "Helped out step by step to understand the unique programs I was using, go through issues with the code, and set me up on my end to have it all work! Will definitely be returning for any and all of my coding needs!",
    label: "AI voice assistant for Twitch · Client, US",
  },
  {
    quote:
      "Zain has done a great job for us in all aspects, he is a great professional committed to his clients and has delivered excellent work for us.",
    label: "SaaS data recovery · Client, Spain",
  },
];

export default function Testimonials() {
  return (
    <section className="py-10">
      <h2 className="font-serif text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
        What clients say
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map(({ quote, label }) => (
          <figure
            key={label}
            className="rounded-xl p-5 flex flex-col justify-between"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
          >
            <blockquote
              className="font-serif italic leading-relaxed mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              &ldquo;{quote}&rdquo;
            </blockquote>
            <figcaption
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: "var(--accent)" }}
            >
              {label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
