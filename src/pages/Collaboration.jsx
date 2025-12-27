// src/pages/Collaboration.jsx
import { motion } from "framer-motion";
import { useCollaborations } from "../hooks/useCollaborations";

export default function Collaboration() {
  const { collaborations, loading, error } = useCollaborations();

  if (loading)
    return (
      <p className="text-center py-20 text-gray-500 dark:text-gray-400">
        Loading collaborations...
      </p>
    );
  if (error)
    return (
      <p className="text-center py-20 text-red-600">
        Failed to load collaborations.
      </p>
    );

  return (
    <section className="bg-aceLight dark:bg-gray-900 py-16 px-4 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-acePurple dark:text-aceGreen mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Collaboration
        </motion.h1>

        <motion.p
          className="text-gray-700 dark:text-gray-200 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Strategic partnerships strengthening capacity building, research,
          innovation, and professional recognition in Health Information Management.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {collaborations.map((partner, idx) => (
            <motion.div
              key={partner.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col h-full hover:shadow-2xl transition-shadow duration-300 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
            >
              {partner.logo_url && (
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="h-16 mx-auto mb-4 object-contain"
                />
              )}

              <h3 className="text-xl font-semibold text-acePurple dark:text-aceGreen mb-3">
                {partner.name}
              </h3>

              <p className="text-gray-600 dark:text-gray-200">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
