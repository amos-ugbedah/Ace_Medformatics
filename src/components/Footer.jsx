// src/components/Footer.jsx
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto transition-colors duration-300 bg-aceGreen text-aceDark font-inter">
      <div className="flex flex-col items-center justify-between gap-4 px-4 py-8 mx-auto max-w-7xl md:flex-row">
        {/* Left: Copyright */}
        <p className="font-medium text-center md:text-left">
          © {new Date().getFullYear()} Ace Medformatics
        </p>

        {/* Center: Submit Testimonial Button */}
        <NavLink
          to="/testimonials/submit"
          className="px-4 py-2 font-semibold text-white transition-colors rounded-lg bg-acePurple hover:bg-yellow-500"
        >
          Submit Testimonial
        </NavLink>

        {/* Right: Tagline */}
        <p className="italic text-center text-gray-800 md:text-right dark:text-gray-100">
          A Legacy of Purpose and Impact
        </p>
      </div>
    </footer>
  );
}
