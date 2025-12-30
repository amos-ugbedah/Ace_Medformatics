// src/components/TeamPreview.jsx
import { motion } from "framer-motion";
import { useTeamMembers } from "../hooks/useTeamMembers";
import { Link } from "react-router-dom";

export default function TeamPreview() {
  const { team, loading, error } = useTeamMembers({ limit: 4 });

  if (loading) return null;
  if (error) return null;

  return (
    <section className="py-16 transition-colors duration-300 bg-aceLight dark:bg-gray-900 font-inter">
      <div className="px-4 mx-auto max-w-7xl">
        {/* Header */}
        <motion.h2
          className="mb-12 text-3xl font-bold text-center transition-colors duration-300 md:text-4xl text-acePurple dark:text-aceGreen"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Meet Our Team
        </motion.h2>

        {/* Team Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              className="p-6 text-center transition-colors duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.04 }}
            >
              <div className="mx-auto mb-5 overflow-hidden border-4 rounded-full w-28 h-28 border-acePurple">
                <img
                  src={member.profile_image_url}
                  alt={member.full_name}
                  className="object-cover w-full h-full"
                />
              </div>

              <h3 className="text-lg font-semibold transition-colors duration-300 text-aceDark dark:text-gray-100">
                {member.full_name}
              </h3>
              <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>

        {/* View Full Team Button */}
        <div className="mt-12 text-center">
          <Link
            to="/team"
            className="inline-block px-6 py-3 text-white transition-colors duration-300 rounded-full bg-acePurple dark:bg-aceGreen hover:bg-opacity-90 font-inter"
          >
            View Full Team
          </Link>
        </div>
      </div>
    </section>
  );
}
