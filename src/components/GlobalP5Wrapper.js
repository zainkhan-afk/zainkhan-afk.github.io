export default function GlobalP5Wrapper() {
  return (
    <iframe
      // src="https://zainkhan-afk.github.io/Simulations/Boids/index.html"
      src="https://zainkhan-afk.github.io/Simulations/Planets/index.html"
      className="absolute inset-0 w-full h-full z-0 border-0"
      style={{ overflow: "hidden" }}
    ></iframe>
  );
}