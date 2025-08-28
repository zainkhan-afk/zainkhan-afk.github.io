import Image from "next/image";

export default function AboutHead() {
  return (
    <section className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
      {/* Left side - Picture */}
      <div className="w-32 h-32 sm:w-44 sm:h-44">
        <Image
          src="/profile/profile.JPG"
          alt="Profile picture"
          width={176}
          height={176}
          className="w-full h-full rounded-full object-cover border-4 border-gray-600 shadow-md"
        />
      </div>

      {/* Right side - Name & Occupation */}
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
          Zainullah Khan
        </h1>
        <p className="text-lg sm:text-xl text-gray-400">
          AI Developer | Creative Coder
        </p>
      </div>
    </section>
  );
}
