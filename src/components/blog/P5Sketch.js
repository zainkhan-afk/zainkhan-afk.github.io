export default function P5Sketch({ src, height = 400 }) {
  return (
    <iframe
      src={src}
      className="w-full rounded-lg my-4"
      style={{
        height: `${height}px`,
        border: "1px solid var(--border)",
      }}
      sandbox="allow-scripts"
      title="p5.js sketch"
    />
  );
}
