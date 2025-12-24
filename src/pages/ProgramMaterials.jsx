import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { useProgramMaterials } from "../hooks/useProgramMaterials";

export default function ProgramMaterials() {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [loadingProgram, setLoadingProgram] = useState(true);

  // Fetch program details by slug
  useEffect(() => {
    async function fetchProgram() {
      setLoadingProgram(true);
      try {
        const { data, error } = await supabase
          .from("programs")
          .select("id, title")
          .eq("slug", slug)
          .single();

        if (error) throw error;

        setProgram(data);
      } catch (error) {
        console.error("Error fetching program:", error.message);
        setProgram(null);
      } finally {
        setLoadingProgram(false);
      }
    }

    fetchProgram();
  }, [slug]);

  // Fetch materials only when program.id is available
  const { materials, loading: loadingMaterials } = useProgramMaterials(program?.id);

  if (loadingProgram) return <p className="text-center py-10">Loading program...</p>;
  if (!program) return <p className="text-center py-10 text-red-500">Program not found.</p>;
  if (loadingMaterials) return <p className="text-center py-10">Loading materials...</p>;

  return (
    <section className="bg-aceLight py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-acePurple mb-6">{program.title}</h1>

        {materials.length === 0 ? (
          <p className="text-center text-gray-600 py-10">
            No materials uploaded yet for this program.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {materials.map((material) => (
              <motion.div
                key={material.id}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-semibold text-acePurple">{material.title}</h3>
                <a
                  href={material.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-aceGreen text-white py-2 px-4 rounded-md hover:bg-acePurple transition"
                >
                  Download
                </a>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/programs"
            className="inline-block bg-acePurple text-white py-2 px-6 rounded-md hover:bg-aceGreen transition"
          >
            Back to Programs
          </Link>
        </div>
      </div>
    </section>
  );
}
