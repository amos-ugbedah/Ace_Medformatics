// src/components/EcosystemScroller.jsx
import { motion } from "framer-motion";
import {
  FaHospital,
  FaUniversity,
  FaUsers,
  FaChartLine,
  FaLaptopMedical,
  FaGlobeAfrica,
} from "react-icons/fa";

const ecosystemItems = [
  { id: 1, label: "Hospitals & Health Facilities", icon: FaHospital },
  { id: 2, label: "Universities & Training Institutions", icon: FaUniversity },
  { id: 3, label: "Public Health Programs", icon: FaGlobeAfrica },
  { id: 4, label: "Health Information Professionals", icon: FaUsers },
  { id: 5, label: "Research & Data Analytics", icon: FaChartLine },
  { id: 6, label: "Digital Health & EMR Systems", icon: FaLaptopMedical },
];

export default function EcosystemScroller() {
  return (
    <section className="py-12 overflow-hidden transition-colors duration-300 bg-aceLight dark:bg-gray-900 md:py-16 font-inter">
      <div className="px-4 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center md:mb-12">
          <h2 className="text-2xl font-bold transition-colors duration-300 md:text-3xl text-acePurple dark:text-aceGreen">
            Our Professional Ecosystem
          </h2>
          <p className="max-w-2xl mx-auto mt-3 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300 md:text-base">
            Key sectors and professional spaces where Ace Medformatics delivers
            value through education, research, collaboration, and digital health
            innovation.
          </p>
        </div>

        {/* Scroller */}
        <div className="relative w-full">
          <motion.div
            className="flex items-center gap-10 md:gap-16 w-max"
            animate={{ x: ["0%", "-50%", "0%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {[...ecosystemItems, ...ecosystemItems].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center min-w-[140px] sm:min-w-[160px] md:min-w-[200px]"
                >
                  <div className="flex items-center justify-center transition-colors duration-300 bg-white rounded-full shadow-md w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 dark:bg-gray-800">
                    <Icon className="text-2xl transition-colors duration-300 text-acePurple dark:text-aceGreen sm:text-3xl md:text-4xl" />
                  </div>
                  <p className="px-2 mt-3 text-xs font-semibold leading-tight text-center text-gray-700 transition-colors duration-300 sm:text-sm dark:text-gray-300">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
