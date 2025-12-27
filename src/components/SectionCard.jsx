// src/components/SectionCard.jsx
import { motion } from "framer-motion";
import React from "react";

export default function SectionCard({ title, children, className = "" }) {
  return (
    <motion.section
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 mb-10 transition-colors duration-300 font-sans ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-acePurple dark:text-aceGreen mb-4">
        {title}
      </h2>
      <div className="text-gray-900 dark:text-gray-200 leading-relaxed">
        {children}
      </div>
    </motion.section>
  );
}
