// src/pages/Home.jsx
import { motion } from "framer-motion";
import TeamPreview from "../sections/TeamPreview";
import LogoScroller from "../sections/LogoScroller";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="py-24 text-white transition-colors duration-300 bg-acePurple dark:bg-gray-800">
        <div className="px-4 mx-auto text-center max-w-7xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-semibold tracking-tight md:text-5xl"
          >
            Advancing Health Information Management
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-3xl mx-auto mt-6 text-lg leading-relaxed text-gray-100 dark:text-gray-200"
          >
            Ace Medformatics is committed to innovation, education, and
            professional excellence in Health Information Management.
          </motion.p>
        </div>
      </section>

      {/* TEAM PREVIEW */}
      <section className="py-16 transition-colors duration-300 bg-aceLight dark:bg-gray-900">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="p-6 transition-colors duration-300 bg-white dark:bg-gray-800 rounded-xl">
            <TeamPreview />
          </div>
        </div>
      </section>

      {/* LOGO / IMAGE SCROLLER */}
      <section className="py-16 transition-colors duration-300 bg-aceBeige dark:bg-gray-900">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="p-6 transition-colors duration-300 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
            <LogoScroller />
          </div>
        </div>
      </section>
    </>
  );
}
