import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/Ace1.jpg";
import ThemeToggle from "./ThemeToggle";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);

  // Fetch approved testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("full_name, content")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(5); // limit to recent 5 for ticker

      if (!error) setTestimonials(data);
    };

    fetchTestimonials();
  }, []);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-500 font-semibold font-inter"
      : "text-gray-800 dark:text-gray-200 hover:text-yellow-500 transition-colors font-inter";

  return (
    <header className="sticky top-0 z-50">
      {/* Testimonials Ticker */}
      {testimonials.length > 0 && (
        <div className="w-full py-1 overflow-hidden text-sm text-gray-800 bg-yellow-50 dark:bg-yellow-900 dark:text-white whitespace-nowrap">
          <div className="inline-block animate-marquee">
            {testimonials.map((t, i) => (
              <span key={i} className="mx-6">
                "{t.content}" — {t.full_name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-white/10 transition-colors">
        <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">
            <img src={logo} alt="Ace Medformatics Logo" className="object-contain w-10 h-10" />
            <span className="hidden text-lg font-bold text-gray-900 sm:block dark:text-white">
              Ace Medformatics
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="items-center hidden gap-6 md:flex">
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
            className="text-gray-900 md:hidden dark:text-white"
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
                      ? "block w-full text-yellow-500 font-semibold py-3 border-b border-gray-200 dark:border-white/10 font-inter"
                      : "block w-full text-gray-800 dark:text-gray-200 hover:text-yellow-500 py-3 border-b border-gray-200 dark:border-white/10 transition-colors font-inter"
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
      </div>

      {/* Tailwind marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </header>
  );
}
