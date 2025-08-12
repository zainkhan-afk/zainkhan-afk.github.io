import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <main className="bg-gray-900">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}
