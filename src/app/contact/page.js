import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";
export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">Contact Me</h1>

      <div className="w-full max-w-2xl">
        {/* Contact Form */}
        <form
          action="mailto:your-email@example.com"
          method="POST"
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-pink-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-pink-400"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-pink-400"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-pink-400 text-gray-900 font-semibold px-6 py-3 rounded-xl hover:bg-pink-500 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Alternative Contact */}
        <div className="mt-12 text-center text-gray-400">
          <p>Or reach me directly at:</p>
          <a
            href="mailto:zain.9496@gmail.com"
            className="text-pink-400 hover:underline"
          >
            your-email@example.com
          </a>

          <div className="mt-4 flex justify-center gap-6">
             <Link href="https://github.com/zainkhan-afk" target="_blank" className="hover:text-blue-400">
              <FaGithub size={24} />
            </Link>
            <Link href="https://www.linkedin.com/in/zainullah-k" target="_blank" className="hover:text-blue-400">
              <FaLinkedin size={24} />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="hover:text-blue-400">
              <FaTwitter size={24} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
