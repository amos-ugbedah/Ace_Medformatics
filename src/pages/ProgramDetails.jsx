import { useParams } from "react-router-dom";
import { useProgramMaterials } from "../hooks/useProgramMaterials";

export default function ProgramDetails() {
  const { slug } = useParams();
  const programId = parseInt(slug.split("-").pop());
  const { materials, loading } = useProgramMaterials(programId);

  if (loading) {
    return (
      <p className="py-16 text-center text-gray-600">
        Loading materials...
      </p>
    );
  }

  return (
    <section className="px-4 py-16 transition-colors bg-aceLight">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <h1 className="mb-8 text-3xl font-semibold tracking-tight text-center md:text-4xl text-acePurple">
          Program Materials
        </h1>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((material) => (
            <div
              key={material.id}
              className="flex flex-col justify-between p-6 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg"
            >
              <div>
                <h3 className="text-lg font-semibold text-acePurple">
                  {material.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Type: {material.material_type}
                </p>
              </div>

              <a
                href={material.material_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 mt-6 text-sm font-medium text-center text-white transition rounded-md bg-aceGreen hover:bg-acePurple"
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
