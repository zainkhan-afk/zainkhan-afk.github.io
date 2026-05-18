import Link from "next/link";
import { Github, Mail, Linkedin, Twitter } from "lucide-react";

export const metadata = {
  title: "Contact | Zain Khan",
  description: "Get in touch.",
};

const LINKS = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/zainkhan-afk",
    sub: "@zainkhan-afk",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:zain.9496@gmail.com",
    sub: "zain.9496@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zainullah-k",
    sub: "linkedin.com/in/zainullah-k",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    href: "https://twitter.com",
    sub: "@zainkhan",
  },
];

export default function Contact() {
  return (
    <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 py-16 text-center">
      <h1
        className="font-serif text-4xl sm:text-5xl font-bold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Get in touch
      </h1>
      <p
        className="font-serif italic mb-14"
        style={{ color: "var(--text-secondary)" }}
      >
        I'm always open to new projects, collaborations, or just a good conversation.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        {LINKS.map(({ icon: Icon, label, href, sub }) => (
          <Link
            key={label}
            href={href}
            target={href.startsWith("mailto") ? "_self" : "_blank"}
            className="flex items-center gap-4 p-5 rounded-xl transition-colors"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
            }}
          >
            <Icon size={22} style={{ color: "var(--accent)", flexShrink: 0 }} />
            <div>
              <p
                className="font-serif font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {label}
              </p>
              <p className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                {sub}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
