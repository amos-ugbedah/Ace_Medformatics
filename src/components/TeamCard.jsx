// src/components/TeamCard.jsx
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function TeamCard({ name, role, bio, image }) {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const bioRef = useRef(null);

  useEffect(() => {
    if (bioRef.current) {
      setCanExpand(
        bioRef.current.scrollHeight > bioRef.current.clientHeight
      );
    }
  }, [bio]);

  return (
    <motion.div
      className="flex flex-col h-full p-6 transition-shadow bg-white shadow-md dark:bg-gray-800 rounded-2xl hover:shadow-xl font-inter"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Image Container */}
      <div className="relative w-full mb-6 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700 aspect-[4/5] flex items-center justify-center">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="object-contain max-w-full max-h-full"
        />
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {name}
      </h3>

      {/* Role */}
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        {role}
      </p>

      {/* Bio */}
      <div className="flex-1">
        <p
          ref={bioRef}
          className={`text-base leading-relaxed text-gray-700 dark:text-gray-300 transition-all duration-300 ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {bio}
        </p>

        {canExpand && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-sm font-medium text-acePurple dark:text-aceGreen hover:underline"
          >
            {expanded ? "See less" : "Read more"}
          </button>
        )}
      </div>
    </motion.div>
  );
}
