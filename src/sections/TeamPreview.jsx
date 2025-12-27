import { motion } from "framer-motion";
import { useTeamMembers } from "../hooks/useTeamMembers";
import { Link } from "react-router-dom";

export default function TeamPreview() {
  const { team, loading, error } = useTeamMembers({ limit: 4 });

  if (loading) return null;
  if (error) return null;

  return (
    <section className="bg-aceLight dark:bg-gray-900 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-acePurple dark:text-aceGreen mb-12 transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Meet Our Team
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.04 }}
            >
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-acePurple mb-5">
                <img
                  src={member.profile_image_url}
                  alt={member.full_name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-semibold text-lg text-aceDark dark:text-gray-100 transition-colors duration-300">
                {member.full_name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/team"
            className="inline-block bg-acePurple dark:bg-aceGreen text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors duration-300"
          >
            View Full Team
          </Link>
        </div>
      </div>
    </section>
  );
}
