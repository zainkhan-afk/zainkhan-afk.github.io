import Image from "next/image";
import Link from "next/link";
import { Github, Mail, Linkedin } from "lucide-react";

const SOCIAL = [
  { icon: Github, href: "https://github.com/zainkhan-afk", label: "GitHub" },
  { icon: Mail, href: "mailto:zain.9496@gmail.com", label: "Email" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/zainullah-k", label: "LinkedIn" },
];

export default function AboutHead() {
  return (
    <section
      className="py-8 flex flex-col sm:flex-row items-center sm:items-start gap-8 border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0">
        <Image
          src="/profile/profile.JPG"
          alt="Zainullah Khan"
          width={144}
          height={144}
          className="w-full h-full rounded-full object-cover"
          style={{ border: "2px solid var(--border)" }}
        />
      </div>
      <div>
        <h1
          className="font-serif text-4xl sm:text-5xl font-bold mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          Zainullah Khan
        </h1>
        <p
          className="font-mono text-xs uppercase tracking-widest mb-4"
          style={{ color: "var(--accent)" }}
        >
          AI Developer · Creative Coder
        </p>
        <div className="flex gap-4">
          {SOCIAL.map(({ icon: Icon, href, label }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("mailto") ? "_self" : "_blank"}
              aria-label={label}
              className="transition-colors hover:text-accent"
              style={{ color: "var(--text-secondary)" }}
            >
              <Icon size={18} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
