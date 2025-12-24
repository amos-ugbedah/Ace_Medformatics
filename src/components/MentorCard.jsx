import { motion } from "framer-motion";

export default function MentorCard({ mentor }) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-acePurple bg-lime-400">
        <img
          src={mentor.profile_image_url}
          alt={mentor.full_name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-acePurple">{mentor.full_name}</h3>
      <p className="text-gray-600 mt-1">{mentor.expertise_area}</p>
      {mentor.bio && (
        <p className="text-gray-700 mt-2 line-clamp-3">{mentor.bio}</p>
      )}
    </motion.div>
  );
}
