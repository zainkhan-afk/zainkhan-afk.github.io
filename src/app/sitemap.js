import { getAllWork } from "@/lib/work";
import { getAllProjects } from "@/lib/projects";
import experiments from "@/content/lab/experiments.json";

// Generated at build time from the content, so new case studies, projects and
// Lab entries are listed automatically. Blog and notes are deliberately left out.
export const dynamic = "force-static";

const BASE_URL = "https://zainkhan-afk.github.io";

export default function sitemap() {
  const paths = [
    "/",
    "/about",
    "/work",
    "/projects",
    "/lab",
    "/contact",
    ...getAllWork().map((w) => `/work/${w.slug}`),
    ...getAllProjects().map((p) => `/projects/${p.slug}`),
    ...experiments.map((e) => `/lab/${e.slug}`),
  ];
  return paths.map((path) => ({ url: `${BASE_URL}${path}` }));
}
