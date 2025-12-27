import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/Ace1.jpg";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-500 font-semibold"
      : "text-gray-800 dark:text-gray-200 hover:text-yellow-500 transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Ace Medformatics Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="font-bold text-lg hidden sm:block text-gray-900 dark:text-white">
            Ace Medformatics
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/team" className={linkClass}>Team</NavLink>
          <NavLink to="/research" className={linkClass}>Research</NavLink>
          <NavLink to="/mentorship" className={linkClass}>Mentorship</NavLink>
          <NavLink to="/collaboration" className={linkClass}>Collaboration</NavLink>
          <NavLink to="/programs" className={linkClass}>Programs</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>

          {/* Theme Toggle (Desktop) */}
          <ThemeToggle />
        </nav>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-gray-900 dark:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-[#1A1A1A] border-t border-gray-200 dark:border-white/10 transition-colors">
          <nav className="flex flex-col px-4 py-6 space-y-4">
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
                    ? "block w-full text-yellow-500 font-semibold py-3 border-b border-gray-200 dark:border-white/10"
                    : "block w-full text-gray-800 dark:text-gray-200 hover:text-yellow-500 py-3 border-b border-gray-200 dark:border-white/10 transition-colors"
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Theme Toggle (Mobile) */}
            <div className="pt-4">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
