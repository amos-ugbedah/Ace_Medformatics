import { motion } from "framer-motion";
import {
  FaHospital,
  FaUniversity,
  FaUsers,
  FaChartLine,
  FaLaptopMedical,
  FaGlobeAfrica,
} from "react-icons/fa";

/**
 * DATA-DRIVEN ECOSYSTEM ITEMS
 * Swap icons for real logos later without touching UI logic
 */
const ecosystemItems = [
  {
    id: 1,
    label: "Hospitals & Health Facilities",
    icon: FaHospital,
  },
  {
    id: 2,
    label: "Universities & Training Institutions",
    icon: FaUniversity,
  },
  {
    id: 3,
    label: "Public Health Programs",
    icon: FaGlobeAfrica,
  },
  {
    id: 4,
    label: "Health Information Professionals",
    icon: FaUsers,
  },
  {
    id: 5,
    label: "Research & Data Analytics",
    icon: FaChartLine,
  },
  {
    id: 6,
    label: "Digital Health & EMR Systems",
    icon: FaLaptopMedical,
  },
];

export default function EcosystemScroller() {
  return (
    <section className="bg-white py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-acePurple">
            Our Professional Ecosystem
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            Key sectors and professional spaces where Ace Medformatics delivers
            value through education, research, collaboration, and digital health
            innovation.
          </p>
        </div>

        {/* Scrolling Track */}
        <div className="relative w-full">
          <motion.div
            className="flex items-center gap-10 md:gap-16 w-max"
            animate={{ x: ["0%", "-50%", "0%"] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
          >
            {[...ecosystemItems, ...ecosystemItems].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center min-w-[140px] sm:min-w-[160px] md:min-w-[200px]"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-aceLight flex items-center justify-center shadow-md">
                    <Icon className="text-acePurple text-2xl sm:text-3xl md:text-4xl" />
                  </div>

                  {/* Label */}
                  <p className="mt-3 text-xs sm:text-sm font-semibold text-gray-700 text-center leading-tight px-2">
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
