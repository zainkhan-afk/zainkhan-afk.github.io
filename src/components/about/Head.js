export default function AboutHead() {

    return (
        <>
        <section className="mt-6 p-6 flex items-center gap-6">
            {/* Left side - Picture */}
            <div className="w-32 h-32">
                <img
                    src="favicon.ico"
                    alt="Image"
                    className="w-full h-full rounded-full object-cover border-4 border-gray-600 shadow-md"
                />
            </div>

            {/* Right side - Name & Occupation */}
            <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Name</h1>
                <p className="text-xl text-gray-400">Thing 1 | Thing 2 | Thing 3</p>
            </div>
        </section>
        </>
    );
}