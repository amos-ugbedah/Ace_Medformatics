// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/Ace1.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-400 font-semibold"
      : "text-white hover:text-yellow-400 transition-colors";

  return (
    <header className="bg-[#1A1A1A] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Ace Medformatics Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-white font-bold text-lg hidden sm:block">
            Ace Medformatics
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/team" className={linkClass}>Team</NavLink>
          <NavLink to="/research" className={linkClass}>Research</NavLink>
          <NavLink to="/mentorship" className={linkClass}>Mentorship</NavLink>
          <NavLink to="/collaboration" className={linkClass}>Collaboration</NavLink>
          <NavLink to="/programs" className={linkClass}>Programs</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#1A1A1A] border-t border-white/10">
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
                    ? "block w-full text-yellow-400 font-semibold py-3 border-b border-white/10"
                    : "block w-full text-white hover:text-yellow-400 py-3 border-b border-white/10 transition-colors"
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
