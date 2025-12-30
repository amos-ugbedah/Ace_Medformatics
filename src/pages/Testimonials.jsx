// src/pages/Testimonials.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      setLoading(true);
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching testimonials:", error);
      } else {
        setTestimonials(data);
      }
      setLoading(false);
    }

    fetchTestimonials();
  }, []);

  if (loading) return <p className="py-6 text-center">Loading testimonials...</p>;

  if (!testimonials.length)
    return <p className="py-6 text-center">No testimonials yet.</p>;

  return (
    <div className="max-w-4xl p-6 mx-auto space-y-6">
      <h1 className="mb-6 text-3xl font-bold text-center text-acePurple">
        Testimonials
      </h1>

      {testimonials.map((t) => (
        <div
          key={t.id}
          className="p-4 bg-white shadow-sm rounded-xl dark:bg-gray-800"
        >
          <p className="text-gray-700 dark:text-gray-200">{t.content}</p>
          <div className="mt-2 text-sm text-gray-500">
            — {t.full_name}, {t.rating ? `${t.rating}/5` : ""}
          </div>
        </div>
      ))}
    </div>
  );
}
