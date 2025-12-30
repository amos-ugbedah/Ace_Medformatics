import { useParams, useNavigate } from "react-router-dom";

// Hardcoded program materials for now
const programMaterials = {
  "monthly-professional-classes": [
    { title: "Class 1: HIM Basics", link: "/downloads/class1.pdf" },
    { title: "Class 2: Data Quality", link: "/downloads/class2.pdf" },
  ],
  "peer-to-peer-training-sessions": [
    { title: "Training Guide", link: "/downloads/training-guide.pdf" },
  ],
};

export default function ProgramDetail() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const materials = programMaterials[programId] || [];

  return (
    <section className="px-4 py-16 transition-colors bg-aceLight">
      <div className="max-w-5xl mx-auto text-center">
        {/* Back Button */}
        <button
          onClick={() => navigate("/programs")}
          className="inline-block px-4 py-2 mb-8 text-sm font-medium text-gray-800 transition bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back to Programs
        </button>

        {/* Program Title */}
        <h1 className="mb-6 text-3xl font-semibold tracking-tight md:text-4xl text-acePurple">
          {programId.replace(/-/g, " ")}
        </h1>

        {/* Description */}
        <p className="max-w-3xl mx-auto mb-12 leading-relaxed text-gray-700">
          Here are the materials available for this program. Click the buttons below to download.
        </p>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {materials.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-6 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-center text-acePurple">
                {item.title}
              </h3>

              <a
                href={item.link}
                download
                className="inline-block px-4 py-2 mt-4 text-sm font-medium text-white transition rounded-md bg-aceGreen hover:bg-acePurple"
              >
                Download
              </a>
            </div>
          ))}

          {/* Empty State */}
          {materials.length === 0 && (
            <p className="mt-4 text-gray-600 col-span-full">
              No materials are currently available for this program.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
