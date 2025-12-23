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
  // Add other programs here
};

export default function ProgramDetail() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const materials = programMaterials[programId] || [];

  return (
    <section className="bg-aceLight py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        {/* Back Button */}
        <button
          onClick={() => navigate("/programs")}
          className="mb-8 inline-block bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
        >
          ← Back to Programs
        </button>

        {/* Program Title */}
        <h1 className="text-4xl font-bold text-acePurple mb-8">
          {programId.replace(/-/g, " ")}
        </h1>

        {/* Description */}
        <p className="text-gray-700 mb-12">
          Here are the materials available for this program. Click the buttons below to download.
        </p>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {materials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
            >
              <h3 className="text-lg font-semibold text-acePurple">{item.title}</h3>
              <a
                href={item.link}
                download
                className="mt-4 inline-block bg-aceGreen text-white py-2 px-4 rounded-md hover:bg-acePurple transition"
              >
                Download
              </a>
            </div>
          ))}

          {/* Display a message if no materials are available */}
          {materials.length === 0 && (
            <p className="text-gray-600 col-span-full mt-4">
              No materials are currently available for this program.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
