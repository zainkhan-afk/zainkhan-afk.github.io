import Breadcrumbs from "@/components/Breadcrumbs";

export default function ContentLayout({ children }) {
  return (
    <main
      className="flex-grow min-h-screen pt-14"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <Breadcrumbs />
      {children}
    </main>
  );
}
