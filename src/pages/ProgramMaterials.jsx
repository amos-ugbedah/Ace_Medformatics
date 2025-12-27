// src/pages/ProgramMaterials.jsx
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

  if (loadingProgram) return <p className="text-center py-10 font-sans">Loading program...</p>;
  if (!program) return <p className="text-center py-10 text-red-500 font-sans">Program not found.</p>;
  if (loadingMaterials) return <p className="text-center py-10 font-sans">Loading materials...</p>;

  return (
    <section className="bg-aceLight dark:bg-gray-900 min-h-screen py-16 px-4 font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Program Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-acePurple dark:text-aceGreen mb-8 text-center">
          {program.title}
        </h1>

        {/* Materials */}
        {materials.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300 py-10">
            No materials uploaded yet for this program.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {materials.map((material) => (
              <motion.div
                key={material.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg flex flex-col justify-between transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-semibold text-acePurple dark:text-aceGreen">
                  {material.title}
                </h3>

                {material.description && (
                  <p className="text-gray-700 dark:text-gray-300 mt-2 line-clamp-4">
                    {material.description}
                  </p>
                )}

                {material.file_url && (
                  <a
                    href={material.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-aceGreen dark:bg-acePurple text-aceDark dark:text-white font-medium px-4 py-2 rounded-md hover:bg-acePurple dark:hover:bg-aceGreen hover:text-white transition-colors duration-300"
                  >
                    Download
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-10 text-center">
          <Link
            to="/programs"
            className="inline-block bg-acePurple dark:bg-aceGreen text-white dark:text-aceDark font-medium py-2 px-6 rounded-md hover:bg-aceGreen dark:hover:bg-acePurple transition-colors duration-300"
          >
            Back to Programs
          </Link>
        </div>
      </div>
    </section>
  );
}
