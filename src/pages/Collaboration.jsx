// src/pages/Collaboration.jsx
import { motion } from "framer-motion";
import { useCollaborations } from "../hooks/useCollaborations";

export default function Collaboration() {
  const { collaborations, loading, error } = useCollaborations();

  if (loading)
    return (
      <p className="py-20 text-center text-gray-500 dark:text-gray-400">
        Loading collaborations…
      </p>
    );

  if (error)
    return (
      <p className="py-20 text-center text-red-600">
        Failed to load collaborations.
      </p>
    );

  return (
    <section className="px-4 py-20 transition-colors bg-aceLight dark:bg-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          className="mb-6 text-4xl font-bold md:text-5xl text-acePurple dark:text-aceGreen"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Collaboration
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto leading-relaxed text-gray-700 dark:text-gray-200 mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Strategic partnerships strengthening capacity building, research,
          innovation, and professional recognition in Health Information
          Management.
        </motion.p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {collaborations.map((partner, idx) => (
            <motion.div
              key={partner.id}
              className="flex flex-col p-6 transition-all bg-white shadow-lg dark:bg-gray-800 rounded-xl hover:shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
            >
              {partner.logo_url && (
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="object-contain h-16 mx-auto mb-5"
                />
              )}

              <h3 className="mb-3 text-lg font-semibold text-acePurple dark:text-aceGreen">
                {partner.name}
              </h3>

              <p className="leading-relaxed text-gray-600 dark:text-gray-200">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
