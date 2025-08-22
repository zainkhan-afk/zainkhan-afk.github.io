import { GraduationCap } from "lucide-react";

export default function AboutEducation() {
    return (
        <div className="pt-6">
            <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-7 h-7 text-blue-400" />
                <h2 className="text-3xl font-semibold">Education</h2>
            </div>
            <section className="w-full bg-gray-800 border border-gray-600 rounded-3xl bg-opacity-10 text-white shadow-md p-6 space-y-6">

                    {/* Education Item */}
                    <div className="border border-gray-600 rounded-3xl p-3">
                    {/* Top row: Company + Dates */}
                    <div className="flex justify-between items-center">
                        <div>
                        <h3 className="text-xl font-semibold">National University of Sciences & Technology</h3>
                        <p className="text-gray-400 text-sm">MS - Robotics and Artificial Intelligence</p>
                        </div>
                        <span className="text-gray-400 text-sm">Oct. 2020 - Oct. 2024</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mt-3">
                        Worked on building scalable AI solutions for healthcare data,
                        optimizing machine learning pipelines, and deploying production-ready
                        models that improved diagnosis accuracy and efficiency.
                    </p>
                    </div>


                    {/* Education Item */}
                    <div className="border border-gray-600 rounded-3xl p-3">
                    {/* Top row: Company + Dates */}
                    <div className="flex justify-between items-center">
                        <div>
                        <h3 className="text-xl font-semibold">Balochistan University of Information Technology, Engineering and Management Sciences</h3>
                        <p className="text-gray-400 text-sm">BS - Electronic Engineering</p>
                        </div>
                        <span className="text-gray-400 text-sm">Oct. 2015 - Aug. 2019</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mt-3">
                        Worked on building scalable AI solutions for healthcare data,
                        optimizing machine learning pipelines, and deploying production-ready
                        models that improved diagnosis accuracy and efficiency.
                    </p>
                    </div>

            </section>
        </div>  
    );
}