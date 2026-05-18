export default function GeneralLayout({ children }) {
  return (
    <main
      className="flex-grow min-h-screen pt-24"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      {children}
    </main>
  );
}
