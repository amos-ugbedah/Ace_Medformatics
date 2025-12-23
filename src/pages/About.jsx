import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Images
import about1 from "../assets/about1.jpg";
import about2 from "../assets/about2.jpg";
import about3 from "../assets/about3.jpg";
import about4 from "../assets/about4.jpg";
import about5 from "../assets/about5.jpg";
import about6 from "../assets/about6.jpg";
import about7 from "../assets/about7.jpg";
import about8 from "../assets/about8.jpg";

const storyImages = [
  about1,
  about2,
  about3,
  about4,
  about5,
  about6,
  about7,
  about8,
];

// Reusable animated section card
function SectionCard({ title, children }) {
  return (
    <motion.section
      className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold text-acePurple mb-4">
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

export default function About() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const closeModal = () => setSelectedIndex(null);

  const showNext = () =>
    setSelectedIndex((prev) =>
      prev === storyImages.length - 1 ? 0 : prev + 1
    );

  const showPrev = () =>
    setSelectedIndex((prev) =>
      prev === 0 ? storyImages.length - 1 : prev - 1
    );

  return (
    <div className="bg-aceLight min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Page Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-acePurple mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          About Ace Medformatics
        </motion.h1>

        {/* Introduction */}
        <SectionCard title="Introduction">
          <p className="text-gray-700 leading-relaxed">
            On June 8, 2020, a visionary leader responded to a long-standing
            call—rooted in passion and professional insight by founding
            <span className="font-semibold"> ACE MEDFORMATICS</span>.
            What had been nurtured in thought for years finally became a
            movement to reshape Health Information Management (HIM) in Nigeria.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            The organization was born out of a desire to empower professionals,
            create platforms for growth, and address systemic gaps in the
            recognition and value of HIM practitioners.
          </p>
        </SectionCard>

        {/* The Challenge */}
        <SectionCard title="The Challenge">
          <p className="text-gray-700 leading-relaxed">
            Health Information Management in Nigeria is plagued by limited
            visibility, inadequate professional development opportunities,
            and underappreciation of the critical roles HIM professionals play
            in healthcare delivery.
          </p>
        </SectionCard>

        {/* Vision */}
        <SectionCard title="Our Vision">
          <p className="text-gray-700 leading-relaxed">
            To be the leading force in transforming Health Information
            Management through innovation, education, and leadership.
          </p>
        </SectionCard>

        {/* Mission */}
        <SectionCard title="Our Mission">
          <p className="text-gray-700 leading-relaxed">
            To empower HIM professionals and students through training,
            mentorship, advocacy, and digital upskilling, creating a new
            generation of recognized healthcare data leaders.
          </p> 
        </SectionCard>

        {/* Aims */}
        <SectionCard title="Our Aims">
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Promote HIM value and recognition in Nigeria.</li>
            <li>Foster professional development.</li>
            <li>Provide mentorship and leadership opportunities.</li>
            <li>Serve as a hub for innovation and collaboration.</li>
          </ul>
        </SectionCard>

        {/* Achievements */}
        <SectionCard title="Our Achievements">
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>500+ online training sessions</li>
            <li>50+ professional webinars</li>
            <li>Mentorship & coaching programs</li>
            <li>LUTH awards (2023 & 2024)</li>
            <li>HIP Week 2023 Data Analytics Training</li>
            <li>Writing & Clinical Coding Bootcamps</li>
          </ul>
        </SectionCard>

         <SectionCard title="Looking Ahead">
          <p className="text-gray-700 leading-relaxed">
            ACE MEDFORMATICS is committed to shaping the future of Health
            Information Management by bridging gaps in knowledge, advocacy, and
            leadership.
          </p> <br />
          <p>
            We will continue to expand our reach, deepen our impact, and ensure every
            Health Information Manager in Nigeria is equipped, recognized, and inspired to
            lead.
          </p>
        </SectionCard>

        {/* Image Gallery */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold text-acePurple mb-8 text-center">
            Our Journey in Pictures
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {storyImages.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`Ace Medformatics ${index + 1}`}
                loading="lazy"
                onClick={() => setSelectedIndex(index)}
                className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 text-white text-3xl"
              >
                &times;
              </button>

              {/* Previous */}
              <button
                onClick={showPrev}
                className="absolute left-4 md:left-10 text-white text-4xl"
              >
                ‹
              </button>

              {/* Image */}
              <motion.img
                src={storyImages[selectedIndex]}
                className="max-h-[80vh] max-w-full rounded-lg shadow-xl"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              />

              {/* Next */}
              <button
                onClick={showNext}
                className="absolute right-4 md:right-10 text-white text-4xl"
              >
                ›
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
