// src/pages/Testimonials.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      setLoading(true);

      const { data, error } = await supabase
        .from("testimonials")
        .select("id, full_name, content, rating, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching testimonials:", error);
      } else {
        setTestimonials(data || []);
      }

      setLoading(false);
    }

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-600 dark:text-gray-300 font-inter">
        Loading testimonials…
      </div>
    );
  }

  return (
    <section className="max-w-5xl px-4 py-16 mx-auto space-y-12 font-inter">
      {/* PAGE HEADER */}
      <header className="max-w-3xl mx-auto space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-acePurple">
          Testimonials
        </h1>
        <p className="leading-relaxed text-center text-gray-600 dark:text-gray-300">
          Real experiences shared by professionals, mentees, collaborators,
          and participants who have engaged with Ace Medformatics across our
          programs, trainings, and initiatives.
        </p>
      </header>

      {/* TESTIMONIALS LIST */}
      {testimonials.length === 0 ? (
        <p className="py-12 text-center text-gray-500">
          No testimonials have been published yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-gray-800 dark:border-white/10"
            >
              <p className="leading-relaxed text-left text-gray-700 dark:text-gray-200">
                “{t.content}”
              </p>

              <div className="flex items-center justify-between pt-4 mt-4 text-sm text-gray-500 border-t border-gray-100 dark:border-white/10">
                <span className="font-medium">{t.full_name}</span>
                {t.rating && <span>{t.rating}/5</span>}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* CALL TO ACTION */}
      <div className="pt-10 text-center border-t border-gray-200 dark:border-white/10">
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Have an experience you would like to share?
        </p>

        <Link
          to="/testimonials/submit"
          className="inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-colors rounded-lg bg-acePurple hover:bg-aceGreen"
        >
          Share Your Testimonial
        </Link>
      </div>
    </section>
  );
}
