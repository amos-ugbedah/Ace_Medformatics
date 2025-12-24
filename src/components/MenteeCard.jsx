import { motion } from "framer-motion";

export default function MenteeCard({ mentee }) {
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
          src={mentee.profile_image_url}
          alt={mentee.full_name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-acePurple">{mentee.full_name}</h3>
      <p className="text-gray-600 mt-1">{mentee.field_of_interest}</p>
      {mentee.bio && (
        <p className="text-gray-700 mt-2 line-clamp-3">{mentee.bio}</p>
      )}
    </motion.div>
  );
}
