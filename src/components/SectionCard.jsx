// src/components/SectionCard.jsx
import { motion } from "framer-motion";
import React from "react";

export default function SectionCard({ title, children }) {
  return (
    <motion.section
      className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold text-acePurple mb-4">
        {title}
      </h2>
      {children}
    </motion.section>
  );
}
