export default function GlobalP5Wrapper() {
  return (
    <iframe
      
      src = "https://zainkhan-afk.github.io/Simulations/CollatzConjecture"
      // src = "/simulations/CollatzConjecture/index.html"
      // src = "/simulations/Boids/index.html"
      // src = "/simulations/Planets/index.html"
      // src = "/simulations/Walking/index.html"
      className="absolute inset-0 w-full h-full z-0 border-0"
      style={{ overflow: "hidden" }}
      sandbox="allow-scripts allow-same-origin"
    ></iframe>
  );
}