// src/components/SectionCard.jsx
import { motion } from "framer-motion";

export default function SectionCard({ title, children, className = "" }) {
  return (
    <motion.section
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 mb-12 transition-colors duration-300 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {title && (
        <h2 className="mb-5 text-2xl font-semibold md:text-3xl text-acePurple dark:text-aceGreen">
          {title}
        </h2>
      )}

      <div className="space-y-4 leading-relaxed text-gray-700 dark:text-gray-200">
        {children}
      </div>
    </motion.section>
  );
}
