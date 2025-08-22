import Image from "next/image";
export default function AboutHead() {

    return (
        <>
        <section className="mt-6 p-6 flex items-center gap-6">
            {/* Left side - Picture */}
            <div className="w-44 h-44">
                <Image
                    src="/profile/profile.JPG"
                    alt="Image"
                    width = "44"
                    height = "44"
                    className="w-full h-full rounded-full object-cover border-4 border-gray-600 shadow-md"
                />
            </div>

            {/* Right side - Name & Occupation */}
            <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Zainullah Khan</h1>
                <p className="text-xl text-gray-400">AI Developer | Creative Coder</p>
            </div>
        </section>
        </>
    );
}