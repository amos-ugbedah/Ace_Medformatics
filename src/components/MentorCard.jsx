// src/components/MentorCard.jsx
import { motion } from "framer-motion";

export default function MentorCard({ mentor }) {
  return (
    <motion.div
      className="flex flex-col items-center p-6 text-center transition-shadow duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-xl hover:shadow-2xl font-inter"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.03 }}
    >
      {/* Profile Image */}
      <div className="w-32 h-32 mb-4 overflow-hidden border-4 rounded-full border-acePurple dark:border-aceGreen bg-lime-400">
        <img
          src={mentor.profile_image_url}
          alt={mentor.full_name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Name */}
      <h3 className="text-xl font-semibold text-acePurple dark:text-aceGreen">
        {mentor.full_name}
      </h3>

      {/* Expertise */}
      <p className="mt-1 text-gray-600 dark:text-gray-300">
        {mentor.expertise_area}
      </p>

      {/* Bio */}
      {mentor.bio && (
        <p className="mt-2 text-gray-700 dark:text-gray-200 line-clamp-3">
          {mentor.bio}
        </p>
      )}
    </motion.div>
  );
}
