// src/components/TeamPreview.jsx
import { motion } from "framer-motion";
import { useTeamMembers } from "../hooks/useTeamMembers";
import { Link } from "react-router-dom";

export default function TeamPreview() {
  const { team, loading, error } = useTeamMembers({ limit: 4 });

  if (loading || error) return null;

  return (
    <section className="py-20 transition-colors bg-aceLight dark:bg-gray-900">
      <div className="px-4 mx-auto max-w-7xl">
        {/* Header */}
        <motion.h2
          className="text-3xl font-bold text-center mb-14 md:text-4xl text-acePurple dark:text-aceGreen"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Meet Our Team
        </motion.h2>

        {/* Team Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              className="overflow-hidden text-center transition-shadow bg-white shadow-md dark:bg-gray-800 rounded-xl hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Image container (fixed ratio) */}
              <div className="relative w-full aspect-[4/5] bg-gray-200 dark:bg-gray-700">
                <img
                  src={member.profile_image_url}
                  alt={member.full_name}
                  className="absolute inset-0 object-cover object-center w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {member.full_name}
                </h3>

                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Full Team Button */}
        <div className="text-center mt-14">
          <Link
            to="/team"
            className="inline-block px-8 py-3 text-sm font-semibold text-white transition rounded-full bg-acePurple dark:bg-aceGreen hover:opacity-90"
          >
            View Full Team
          </Link>
        </div>
      </div>
    </section>
  );
}
