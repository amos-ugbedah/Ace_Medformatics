// src/components/Lightbox.jsx
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export default function Lightbox({ images, selectedIndex, setSelectedIndex }) {
  if (selectedIndex === null) return null;

  const closeModal = () => setSelectedIndex(null);
  const showNext = () =>
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const showPrev = () =>
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 font-inter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute text-3xl font-bold text-white top-6 right-6 md:text-4xl"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Previous Button */}
        <button
          onClick={showPrev}
          className="absolute text-4xl font-bold text-white left-4 md:left-10 md:text-5xl"
          aria-label="Previous Image"
        >
          ‹
        </button>

        {/* Image */}
        <motion.img
          src={images[selectedIndex].url}
          alt={images[selectedIndex].alt || `Image ${selectedIndex + 1}`}
          className="max-h-[80vh] max-w-full rounded-lg shadow-xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        />

        {/* Next Button */}
        <button
          onClick={showNext}
          className="absolute text-4xl font-bold text-white right-4 md:right-10 md:text-5xl"
          aria-label="Next Image"
        >
          ›
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

