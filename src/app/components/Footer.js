import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Call to Action */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Let’s Work Together</h3>
          <p className="text-gray-400 mb-4">
            Got a project in mind? Let’s bring it to life.
          </p>
          <a
            href="/contact"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
          >
            Contact Me
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/projects" className="hover:text-white">Projects</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Me</h3>
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" className="hover:text-blue-400">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-blue-400">
              <FaLinkedin size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" className="hover:text-blue-400">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
          <p className="text-gray-400">Email: your.email@example.com</p>
          <p className="text-gray-400">Phone: +123 456 789</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-500">
        © {new Date().getFullYear()} My Site. All rights reserved.
      </div>
    </footer>
  );
}
