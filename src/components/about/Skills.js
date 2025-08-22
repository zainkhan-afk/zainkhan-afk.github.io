import { CodeIcon } from "lucide-react";

export default function AboutSkills() {
  return (
    <div className="pt-6">
      <div className="flex items-center gap-2 mb-3">
          <CodeIcon className="w-7 h-7 text-blue-400" />
          <h2 className="text-3xl font-semibold">Skills</h2>
      </div>
      <section className="w-full bg-gray-800 border border-gray-600 rounded-3xl bg-opacity-10 text-white shadow-md p-6">
        <div className="flex gap-3 flex-wrap">
          {/* Machine Learning */}
          <div className="border border-gray-600 rounded-3xl flex-1 p-4">
            <h3 className="text-xl font-semibold mb-3">Machine Learning</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">TensorFlow</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">PyTorch</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">scikit-learn</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Pandas</span>
            </div>
          </div>

          {/* Creative Coding */}
          <div className="border border-gray-600 rounded-3xl flex-1 p-4">
            <h3 className="text-xl font-semibold mb-3">Creative Coding</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Three.js</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">Processing</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">p5.js</span>
              <span className="px-3 py-1 rounded-full bg-gray-700 text-sm">ShaderToy</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
