// src/pages/Home.jsx
import { motion } from 'framer-motion';
import TeamPreview from "../sections/TeamPreview";
import LogoScroller from "../sections/LogoScroller";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-acePurple text-white py-24">
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
            className="mt-6 max-w-3xl mx-auto text-lg"
          >
            Ace Medformatics is committed to innovation, education, and
            professional excellence in Health Information Management.
          </motion.p>
        </div>
      </section>

      {/* TEAM PREVIEW */}
      <section className="py-16 bg-aceLight">
        <TeamPreview />
      </section>

      {/* LOGO / IMAGE SCROLL */}
      <section className="py-16 bg-aceBeige">
        <LogoScroller />
      </section>
    </>
  );
}
