import Link from "next/link";
import { Github, Mail, Linkedin, Twitter } from "lucide-react";

const SOCIAL = [
  { icon: Github, href: "https://github.com/zainkhan-afk", label: "GitHub" },
  { icon: Mail, href: "mailto:zain.9496@gmail.com", label: "Email" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/zainullah-k", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer
      className="border-t mt-16"
      style={{ borderColor: "var(--border)", background: "var(--bg-primary)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: "var(--text-secondary)" }}
        >
          © {new Date().getFullYear()} Zain Khan
        </p>
        <div className="flex gap-5">
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
    </footer>
  );
}
