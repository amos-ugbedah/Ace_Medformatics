import { useParams } from "react-router-dom";
import { useProgramMaterials } from "../hooks/useProgramMaterials";

export default function ProgramDetails() {
  const { slug } = useParams();
  const programId = parseInt(slug.split("-").pop()); // Assuming slug ends with id
  const { materials, loading } = useProgramMaterials(programId);

  if (loading) return <p className="text-center py-10">Loading materials...</p>;

  return (
    <section className="py-16 px-4 bg-aceLight">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-acePurple mb-8">Program Materials</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div
              key={material.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition flex flex-col justify-between"
            >
              <h3 className="text-lg font-semibold text-acePurple">{material.title}</h3>
              <p className="text-gray-600 mt-2">Type: {material.material_type}</p>
              <a
                href={material.material_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-aceGreen text-white py-2 px-4 rounded-md hover:bg-acePurple transition"
              >
                Open Material
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
