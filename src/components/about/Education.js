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

                    <p className="text-gray-300 mt-3">
                        My MS research focused on developing a locomotion framework for quadrupedal robots by combining Reinforcement 
                        Learning with Model Predictive Control, enabling adaptive and efficient movement in complex environments.
                    </p>

                    <div className="flex flex-wrap pt-3 gap-2">
                        <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Deep Learning</span>
                        <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Machine Learning</span>
                        <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Medical Robotics</span>
                        <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Medical AI</span>
                        <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Mobile Robotics</span>
                        <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">SLAM</span>
                        <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">ROS</span>
                    </div>
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

                    <p className="text-gray-300 mt-3">
                        For my final year project, I developed a solution that would optimized locomotion gaits for quadrupedal robots using 
                        a Genetic Algorithm. I used a neural network as the robot controller. 
                    </p>

                    <div className="flex flex-wrap pt-3 gap-2">
                        <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Deep Learning</span>
                        <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Machine Learning</span>
                        <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Electronic Devices</span>
                        <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Power Electronics</span>
                        <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Genetic Algorithm</span>
                        <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Evolutionary Algorithms</span>
                    </div>
                    </div>

            </section>
        </div>  
    );
}