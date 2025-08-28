import { GraduationCap } from "lucide-react";

export default function AboutEducation() {
  return (
    <div className="pt-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-3">
        <GraduationCap className="w-7 h-7 text-blue-400" />
        <h2 className="text-2xl sm:text-3xl font-semibold">Education</h2>
      </div>

      <section className="w-full bg-gray-800 border border-gray-600 rounded-3xl bg-opacity-10 text-white shadow-md p-6 space-y-6">

        {/* Education Item */}
        <div className="border border-gray-600 rounded-3xl p-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold">
                National University of Sciences & Technology
              </h3>
              <p className="text-gray-400 text-sm">MS - Robotics and Artificial Intelligence</p>
            </div>
            <span className="text-gray-400 text-sm">Oct. 2020 - Oct. 2024</span>
          </div>

          <p className="text-gray-300 mt-3 leading-relaxed">
            My MS research focused on developing a locomotion framework for quadrupedal
            robots by combining Reinforcement Learning with Model Predictive Control,
            enabling adaptive and efficient movement in complex environments.
          </p>

          <div className="flex flex-wrap pt-3 gap-2">
            {["Deep Learning","Machine Learning","Medical Robotics","Medical AI","Mobile Robotics","SLAM","ROS"].map(skill => (
              <span key={skill} className="px-3 py-1 rounded-full bg-gray-700 text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Education Item */}
        <div className="border border-gray-600 rounded-3xl p-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold">
                Balochistan University of Information Technology, Engineering and Management Sciences
              </h3>
              <p className="text-gray-400 text-sm">BS - Electronic Engineering</p>
            </div>
            <span className="text-gray-400 text-sm">Oct. 2015 - Aug. 2019</span>
          </div>

          <p className="text-gray-300 mt-3 leading-relaxed">
            For my final year project, I developed a solution that optimized locomotion
            gaits for quadrupedal robots using a Genetic Algorithm, with a neural network
            as the robot controller.
          </p>

          <div className="flex flex-wrap pt-3 gap-2">
            {["Deep Learning","Machine Learning","Electronic Devices","Power Electronics","Genetic Algorithm","Evolutionary Algorithms"].map(skill => (
              <span key={skill} className="px-3 py-1 rounded-full bg-gray-700 text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
