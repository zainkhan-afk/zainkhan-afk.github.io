import Image from "next/image";
import { Download } from "lucide-react";
import { SUMMARY } from "@/components/about/ProfessionalSummary";
import { CV_PATH, CV_FILENAME } from "@/lib/cv";

export default function Intro({ showCV }) {
  return (
    <section className="py-12 flex flex-col sm:flex-row items-center sm:items-start gap-8">
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
        <p className="leading-relaxed text-base" style={{ color: "var(--text-secondary)" }}>
          {SUMMARY}
        </p>
        {showCV && (
          <a
            href={CV_PATH}
            download={CV_FILENAME}
            className="inline-flex items-center gap-2 mt-5 font-mono text-xs uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            <Download size={14} /> Download CV
          </a>
        )}
      </div>
    </section>
  );
}
