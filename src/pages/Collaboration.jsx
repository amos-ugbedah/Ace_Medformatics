import { motion } from "framer-motion";

// Partners data (can be replaced with real logos/images later)
const partners = [
  {
    name: "Hospitals & Health Facilities",
    description: "We collaborate to deliver impactful programs, research, and professional development initiatives.",
  },
  {
    name: "Universities & Training Institutions",
    description: "Supporting HIM education and capacity-building through strategic academic partnerships.",
  },
  {
    name: "Digital Health Hubs",
    description: "Integrating technology and digital innovation to improve health information management practices.",
  },
  {
    name: "Non-Governmental Organizations",
    description: "Collaborating on research, advocacy, and community-focused health programs.",
  },
  {
    name: "Public Health Agencies",
    description: "Strengthening HIM systems for better decision-making and health outcomes.",
  },
];

export default function Collaboration() {
  return (
    <section className="bg-aceLight py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-acePurple mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Collaboration
        </motion.h1>

        <motion.p
          className="text-gray-700 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Strategic partnerships strengthening capacity building, research, innovation,
          and professional recognition in Health Information Management.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {partners.map((partner, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-acePurple mb-3">{partner.name}</h3>
              <p className="text-gray-600">{partner.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
