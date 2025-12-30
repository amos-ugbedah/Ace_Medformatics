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

  const { materials, loading: loadingMaterials } = useProgramMaterials(program?.id);

  if (loadingProgram)
    return <p className="py-12 text-center text-gray-600 font-inter">Loading program...</p>;
  if (!program)
    return <p className="py-12 text-center text-red-500 font-inter">Program not found.</p>;
  if (loadingMaterials)
    return <p className="py-12 text-center text-gray-600 font-inter">Loading materials...</p>;

  return (
    <section className="min-h-screen px-4 py-16 transition-colors duration-300 bg-gray-50 dark:bg-gray-900 font-inter">
      <div className="max-w-4xl mx-auto">
        {/* Program Title */}
        <h1 className="mb-10 text-3xl font-bold text-center md:text-4xl text-acePurple dark:text-aceGreen">
          {program.title}
        </h1>

        {/* Materials */}
        {materials.length === 0 ? (
          <p className="py-10 text-lg text-center text-gray-700 dark:text-gray-300">
            No materials uploaded yet for this program.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {materials.map((material) => (
              <motion.div
                key={material.id}
                className="flex flex-col justify-between p-6 transition-shadow duration-300 bg-white shadow-md dark:bg-gray-800 rounded-2xl hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="mb-2 text-xl font-semibold text-acePurple dark:text-aceGreen">
                  {material.title}
                </h3>

                {material.description && (
                  <p className="mt-2 text-base text-gray-700 dark:text-gray-300 line-clamp-4">
                    {material.description}
                  </p>
                )}

                {material.file_url && (
                  <a
                    href={material.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 mt-4 font-medium text-center transition-colors duration-300 rounded-md bg-aceGreen dark:bg-acePurple text-aceDark dark:text-white hover:bg-acePurple dark:hover:bg-aceGreen hover:text-white"
                  >
                    Download
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            to="/programs"
            className="inline-block px-6 py-2 font-medium text-white transition-colors duration-300 rounded-md bg-acePurple dark:bg-aceGreen dark:text-aceDark hover:bg-aceGreen dark:hover:bg-acePurple"
          >
            Back to Programs
          </Link>
        </div>
      </div>
    </section>
  );
}