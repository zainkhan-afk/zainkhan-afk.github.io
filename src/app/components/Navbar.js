"use client"

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-80 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Name */}
        <h1 className="text-2xl font-bold">Home</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><a href="#about" className="hover:text-pink-400">About</a></li>
          <li><a href="#projects" className="hover:text-pink-400">Projects</a></li>
          <li><a href="#contact" className="hover:text-pink-400">Contact</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 bg-opacity-95 px-4 pb-4">
          <ul className="flex flex-col space-y-4">
            <li><a href="#about" className="hover:text-pink-400" onClick={() => setIsOpen(false)}>About</a></li>
            <li><a href="#projects" className="hover:text-pink-400" onClick={() => setIsOpen(false)}>Projects</a></li>
            <li><a href="#contact" className="hover:text-pink-400" onClick={() => setIsOpen(false)}>Contact</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
