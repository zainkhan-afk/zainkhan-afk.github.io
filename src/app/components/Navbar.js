export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-80 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Portfolio</h1>
        <ul className="flex space-x-6">
          <li><a href="#about" className="hover:text-pink-400">About</a></li>
          <li><a href="#projects" className="hover:text-pink-400">Projects</a></li>
          <li><a href="#contact" className="hover:text-pink-400">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
