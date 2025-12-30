// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/Ace1.jpg";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Active / inactive link styling
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-500 font-semibold font-inter text-lg"
      : "text-gray-800 dark:text-gray-200 hover:text-yellow-500 transition-colors font-inter text-lg";

  return (
    <header className="sticky top-0 z-50 font-inter">
      {/* MAIN NAVBAR */}
      <div className="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-white/10 transition-colors">
        <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
          
          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Ace Medformatics Logo"
              className="object-contain w-12 h-12"
            />
            <span className="hidden text-xl font-bold text-gray-900 sm:block dark:text-white">
              Ace Medformatics
            </span>
          </NavLink>

          {/* DESKTOP NAVIGATION */}
          <nav className="items-center hidden gap-6 md:flex">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
            <NavLink to="/team" className={linkClass}>Team</NavLink>
            <NavLink to="/research" className={linkClass}>Research</NavLink>
            <NavLink to="/mentorship" className={linkClass}>Mentorship</NavLink>
            <NavLink to="/collaboration" className={linkClass}>Collaboration</NavLink>
            <NavLink to="/programs" className={linkClass}>Programs</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>

            {/* THEME TOGGLE */}
            <ThemeToggle />
          </nav>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="text-gray-900 md:hidden dark:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        {open && (
          <div className="md:hidden bg-white dark:bg-[#1A1A1A] border-t border-gray-200 dark:border-white/10 transition-colors">
            <nav className="flex flex-col px-4 py-6 space-y-4 text-lg">
              {[
                ["Home", "/"],
                ["About", "/about"],
                ["Team", "/team"],
                ["Research", "/research"],
                ["Mentorship", "/mentorship"],
                ["Collaboration", "/collaboration"],
                ["Programs", "/programs"],
                ["Contact", "/contact"],
              ].map(([label, path]) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "block w-full text-yellow-500 font-semibold py-3 border-b border-gray-200 dark:border-white/10 font-inter text-lg"
                      : "block w-full text-gray-800 dark:text-gray-200 hover:text-yellow-500 py-3 border-b border-gray-200 dark:border-white/10 transition-colors font-inter text-lg"
                  }
                >
                  {label}
                </NavLink>
              ))}

              {/* THEME TOGGLE (MOBILE) */}
              <div className="pt-4">
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
