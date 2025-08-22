import { BriefcaseBusiness } from "lucide-react";

export default function AboutWorkExperience() {
  return (
    <div className="pt-6">
        <div className="flex items-center gap-2 mb-3">
            <BriefcaseBusiness className="w-7 h-7 text-blue-400" />
            <h2 className="text-3xl font-semibold">Work Experience</h2>
        </div>
      <section className="w-full bg-gray-800 border border-gray-600 rounded-3xl bg-opacity-10 text-white shadow-md p-6 space-y-6">

        {/* Work Experience Item */}
        <div className="border border-gray-600 rounded-3xl p-3">
          {/* Top row: Company + Dates */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">SiParadigm</h3>
              <p className="text-gray-400 text-sm">Islamabad | AI Developer II</p>
            </div>
            <span className="text-gray-400 text-sm">Jun. 2023 - Present</span>
          </div>

          {/* Description */}
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
            <li>Built healthcare-focused AI pipelines, including Retrieval-Augmented Generation (RAG) systems, boosting patient data extraction accuracy.</li>
            <li>Automated medical document digitization and redaction tools, cutting manual effort by ~80% while ensuring HIPAA compliance.</li>
            <li>Developed computer vision solutions like an autofocus system and 3D interpolation for microscope imaging, improving lab efficiency.</li>
          </ul>

          <div className="flex flex-wrap pt-3 gap-2">
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Langchain</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">LangGraph</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Milvus</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">RAG</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">PyTorch</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">TensorFlow</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">scikit-learn</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Pandas</span>
          </div>
        </div>

        {/* Work Experience Item */}
        <div className="border border-gray-600 rounded-3xl p-3">
          {/* Top row: Company + Dates */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">Fiverr</h3>
              <p className="text-gray-400 text-sm">Remote | Freelancer</p>
            </div>
            <span className="text-gray-400 text-sm">Aug. 2019 - Present</span>
          </div>

            {/* Description */}
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
            <li>Delivered 400+ projects worldwide in AI, robotics, computer vision, backend, and automation.</li>
            <li>Built SaaS platforms and creative AI tools, including a social media post scheduler, trading summary bots, and Twitch-integrated AI agents.</li>
            <li>Specialized in delivering production-ready ML pipelines and real-time automation systems, earning consistent 5⭐ client reviews.</li>
          </ul>          

          <div className="flex flex-wrap pt-3 gap-2">
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Langchain</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">LangGraph</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Milvus</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">RAG</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">PyTorch</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">TensorFlow</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">scikit-learn</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Pandas</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">ROS</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Embedded Systems</span>
          </div>
        </div>


        {/* Work Experience Item */}
        <div className="border border-gray-600 rounded-3xl p-3">
          {/* Top row: Company + Dates */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">National Center for Artificial Intelligence</h3>
              <p className="text-gray-400 text-sm">Islamabad | Research Associate</p>
            </div>
            <span className="text-gray-400 text-sm">Jun. 2022 - May 2023</span>
          </div>

           {/* Description */}
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
            <li>Developed an Urdu ASR (Automatic Speech Recognition) system for broadcast media.</li>
            <li>Worked on ad recognition and program classification using multimodal ML models.</li>
            <li>Conducted large-scale sentiment analysis on social media data for trend insights.</li>
          </ul>   

          <div className="flex flex-wrap pt-3 gap-2">
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">PyTorch</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">TensorFlow</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">scikit-learn</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Pandas</span>
          </div>
        </div>
        

      </section>
    </div>
  );
}
