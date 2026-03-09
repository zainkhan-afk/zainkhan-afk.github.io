import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Genuary26 | Zain Khan",
  description: "Genuary26.",
};

export default function Genuary26() {
  return (
    // <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
    <>
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">Genuary 26</h1>

      <div className="flex flex-1 w-full h-full max-w-6xl bg-blue-700">
        <div className="flex flex-1 flex-col h-full bg-red-700">
          <h3>ToC</h3>
        </div>
        <div className="flex flex-2 flex-row h-full bg-green-700">
          <h3>Content</h3>
        </div>
      </div>
    </>
  );
}
