import { BriefcaseBusiness } from "lucide-react";

export default function AboutWorkExperience() {
  return (
    <div className="pt-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-3">
        <BriefcaseBusiness className="w-7 h-7 text-blue-400" />
        <h2 className="text-2xl sm:text-3xl font-semibold">Work Experience</h2>
      </div>

      <section className="w-full bg-gray-800 border border-gray-600 rounded-3xl bg-opacity-10 text-white shadow-md p-6 space-y-6">
        
        {/* Work Experience Item */}
        <div className="border border-gray-600 rounded-3xl p-4">
          {/* Company + Dates */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold">SiParadigm</h3>
              <p className="text-gray-400 text-sm">Islamabad | AI Developer II</p>
            </div>
            <span className="text-gray-400 text-sm">Jun. 2023 - Present</span>
          </div>

          {/* Description */}
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
            <li>Built healthcare-focused AI pipelines, including Retrieval-Augmented Generation (RAG) systems.</li>
            <li>Automated medical document digitization & redaction tools, reducing manual effort by ~80%.</li>
            <li>Developed computer vision solutions like autofocus and 3D interpolation for microscope imaging.</li>
          </ul>

          {/* Skills */}
          <div className="flex flex-wrap pt-3 gap-2">
            {["Langchain","LangGraph","Milvus","RAG","PyTorch","TensorFlow","scikit-learn","Pandas"].map(skill => (
              <span key={skill} className="px-3 py-1 rounded-full bg-gray-700 text-sm">{skill}</span>
            ))}
          </div>
        </div>

        {/* Fiverr */}
        <div className="border border-gray-600 rounded-3xl p-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold">Fiverr</h3>
              <p className="text-gray-400 text-sm">Remote | Freelancer</p>
            </div>
            <span className="text-gray-400 text-sm">Aug. 2019 - Present</span>
          </div>

          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
            <li>Delivered 400+ projects worldwide in AI, robotics, and automation.</li>
            <li>Built SaaS platforms & creative AI tools, including bots and Twitch-integrated AI agents.</li>
            <li>Specialized in production-ready ML pipelines & real-time automation systems.</li>
          </ul>

          <div className="flex flex-wrap pt-3 gap-2">
            {["Langchain","LangGraph","Milvus","RAG","PyTorch","TensorFlow","scikit-learn","Pandas","ROS","Embedded Systems"].map(skill => (
              <span key={skill} className="px-3 py-1 rounded-full bg-gray-700 text-sm">{skill}</span>
            ))}
          </div>
        </div>

        {/* NCAI */}
        <div className="border border-gray-600 rounded-3xl p-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold">National Center for Artificial Intelligence</h3>
              <p className="text-gray-400 text-sm">Islamabad | Research Associate</p>
            </div>
            <span className="text-gray-400 text-sm">Jun. 2022 - May 2023</span>
          </div>

          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
            <li>Developed an Urdu ASR (Automatic Speech Recognition) system for broadcast media.</li>
            <li>Worked on ad recognition & program classification using multimodal ML models.</li>
            <li>Conducted large-scale sentiment analysis on social media data.</li>
          </ul>

          <div className="flex flex-wrap pt-3 gap-2">
            {["PyTorch","TensorFlow","scikit-learn","Pandas"].map(skill => (
              <span key={skill} className="px-3 py-1 rounded-full bg-gray-700 text-sm">{skill}</span>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
