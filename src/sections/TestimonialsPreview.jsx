// src/sections/TestimonialsPreview.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function TestimonialsPreview() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, full_name, content")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(6);

      if (!error) setTestimonials(data || []);
    }

    fetchTestimonials();
  }, []);

  if (!testimonials.length) return null;

  return (
    <section className="py-16 transition-colors duration-300 bg-white dark:bg-gray-900 font-inter">
      <div className="px-4 mx-auto space-y-8 max-w-7xl">
        {/* Heading */}
        <header className="text-center">
          <h2 className="text-2xl font-semibold text-acePurple">
            Trusted by Professionals & Learners
          </h2>
          <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">
            Real feedback from people impacted by Ace Medformatics
          </p>
        </header>

        {/* Ticker */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            }}
          >
            {[...testimonials, ...testimonials].map((t, index) => (
              <div
                key={`${t.id}-${index}`}
                className="min-w-[320px] max-w-sm p-5 bg-aceLight dark:bg-gray-800 rounded-xl shadow-sm"
              >
                <p className="text-sm leading-relaxed text-left text-gray-700 dark:text-gray-200">
                  “{t.content.length > 140
                    ? `${t.content.slice(0, 140)}…`
                    : t.content}”
                </p>
                <p className="mt-3 text-sm font-medium text-left text-gray-600 dark:text-gray-400">
                  — {t.full_name}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/testimonials"
            className="inline-block px-6 py-2 text-sm font-medium transition border rounded-lg text-acePurple border-acePurple hover:bg-acePurple hover:text-white"
          >
            Read all testimonials
          </Link>
        </div>
      </div>
    </section>
  );
}
