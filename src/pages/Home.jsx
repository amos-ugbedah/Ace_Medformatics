// src/pages/Home.jsx
import { motion } from "framer-motion";
import TeamPreview from "../sections/TeamPreview";
import LogoScroller from "../sections/LogoScroller";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-acePurple dark:bg-gray-800 text-white py-24 font-sans transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Advancing Health Information Management
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 max-w-3xl mx-auto text-lg text-gray-100 dark:text-gray-200"
          >
            Ace Medformatics is committed to innovation, education, and
            professional excellence in Health Information Management.
          </motion.p>
        </div>
      </section>

      {/* TEAM PREVIEW */}
      <section className="py-16 bg-aceLight dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          {/* Container with adaptive background */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 transition-colors duration-300">
            <TeamPreview />
          </div>
        </div>
      </section>

      {/* LOGO / IMAGE SCROLLER */}
      <section className="py-16 bg-aceBeige dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm transition-colors duration-300">
            <LogoScroller />
          </div>
        </div>
      </section>
    </>
  );
}
