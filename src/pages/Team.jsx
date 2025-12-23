import { motion } from "framer-motion";
import TeamCard from "../components/TeamCard";

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
    socials: {},
  },
  {
    name: "Amos Ugbedah",
    role: "Program Coordinator",
    image: team1,
    socials: {},
  },
  {
    name: "Agboola Olaitan",
    role: "Secretary General",
    image: team3,
    socials: {},
  },
  {
    name: "Sarah Adam",
    role: "Welfare Officer",
    image: team4,
    socials: {},
  },
];

export default function Team() {
  return (
    <section className="bg-aceLight min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-acePurple mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Leadership & Team
        </motion.h1>

        {/* Grid Container with staggered animation */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {teamMembers.map((member, idx) => (
            <TeamCard
              key={idx}
              name={member.name}
              role={member.role}
              image={member.image}
              socials={member.socials}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
