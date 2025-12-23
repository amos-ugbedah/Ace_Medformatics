import { motion } from "framer-motion";

// Reusable SectionCard component
function SectionCard({ title, children }) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-8 mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold text-acePurple mb-4">{title}</h2>
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="bg-aceLight min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">

        {/* Page Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-acePurple mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          About Ace Medformatics
        </motion.h1>

        {/* Intro Paragraph */}
        <motion.p
          className="text-lg text-gray-700 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          The Health Information Management Practice in Nigeria faces many challenges, 
          including a lack of <span className="font-semibold">deserved recognition</span>. 
          Ace Medformatics exists to emphasize the value of Health Information Management 
          by empowering skilled and motivated Health Information Managers.
        </motion.p>

        {/* Vision */}
        <SectionCard title="Vision">
          <p className="text-gray-700">
            To be the leading platform in Nigeria for advancing Health Information Management 
            through innovation, education, and professional excellence.
          </p>
        </SectionCard>

        {/* Mission */}
        <SectionCard title="Mission">
          <p className="text-gray-700">
            To empower Health Information Managers in Nigeria with the right skills, 
            tools, and recognition to transform healthcare through accurate information management.
          </p>
        </SectionCard>

        {/* Core Values */}
        <SectionCard title="Core Values">
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-left">
            <li>Integrity in handling health data</li>
            <li>Professional Excellence</li>
            <li>Innovation and Continuous Learning</li>
            <li>Collaboration and Mentorship</li>
            <li>Empowerment of Health Information Managers</li>
          </ul>
        </SectionCard>

        {/* Problem Statement */}
        <SectionCard title="Problem Statement">
          <p className="text-gray-700">
            Health Information Management in Nigeria is often undervalued, leading to 
            underdeveloped skills and lack of recognition for practitioners. 
            Ace Medformatics addresses this gap by providing a platform for growth, 
            recognition, and professional collaboration.
          </p>
        </SectionCard>

      </div>
    </div>
  );
}
