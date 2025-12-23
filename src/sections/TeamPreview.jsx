import { motion } from "framer-motion";

// Import images
import team1 from "../assets/team1.jpg";
import team2 from "../assets/team2.jpg";
import team3 from "../assets/team3.jpg";
import team4 from "../assets/team4.jpg";

// Team data
const teamMembers = [
  {
    name: "Akinjide Olamitudun Cecillia",
    role: "Strategic Head",
    image: team2,
  },
  {
    name: "Amos Ugbedah",
    role: "Program Director",
    image: team1,
  },
  {
    name: "Agboola Olaitan",
    role: "Secretary General",
    image: team3,
  },
  {
    name: "Sarah Adams",
    role: "Welfare Officer",
    image: team4,
  },
];

export default function TeamPreview() {
  return (
    <section className="bg-aceLight py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-acePurple mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Meet Our Team
        </motion.h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.04 }}
            >
              {/* Image */}
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-acePurple mb-5">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <h3 className="font-semibold text-lg text-gray-800">
                {member.name}
              </h3>
              <p className="text-gray-600 mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
