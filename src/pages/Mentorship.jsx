import { motion } from "framer-motion";

// Import images from src/assets
import team1 from "../assets/team1.jpg";
import team2 from "../assets/team2.jpg";
import team3 from "../assets/team3.jpg";
import team4 from "../assets/team4.jpg";

// Dummy data for now
const mentors = [
  {
    name: "Dr. Akinjide Olamitudun Cecillia",
    focus: "Digital Health & Leadership",
    image: team2,
  },
  {
    name: "Amos Ugbedah",
    focus: "Research & Program Coordination",
    image: team1,
  },
];

const mentees = [
  {
    name: "Sarah Adam",
    focus: "Early-career HIM professional",
    image: team4,
  },
  {
    name: "Agboola Olaitan",
    focus: "Student, HIM",
    image: team3,
  },
];

function PersonCard({ person }) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-acePurple">
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-acePurple">{person.name}</h3>
      <p className="text-gray-600 mt-1">{person.focus}</p>
    </motion.div>
  );
}

export default function Mentorship() {
  return (
    <section className="bg-aceLight py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-acePurple mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Mentorship
        </motion.h1>
        <motion.p
          className="text-gray-700 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Structured peer-to-peer mentorship empowering students and
          professionals in Health Information Management.
        </motion.p>

        {/* Mentors Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-acePurple mb-6">Mentors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {mentors.map((mentor, idx) => (
              <PersonCard key={idx} person={mentor} />
            ))}
          </div>
        </div>

        {/* Mentees Grid */}
        <div>
          <h2 className="text-2xl font-semibold text-acePurple mb-6">Mentees</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {mentees.map((mentee, idx) => (
              <PersonCard key={idx} person={mentee} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
