// src/pages/Research.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

export default function Research() {
  const [research, setResearch] = useState([]);
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchResearch = async () => {
      const { data, error } = await supabase
        .from("research")
        .select("id, title, authors, abstract, publication_year, document_url")
        .order("publication_year", { ascending: false });

      if (!error) {
        setResearch(data);
      }
    };
    fetchResearch();
  }, []);

  const years = [...new Set(research.map((r) => r.publication_year))].sort(
    (a, b) => b - a
  );

  // Filtering logic
  let filtered = research;
  if (year) {
    filtered = filtered.filter((r) => String(r.publication_year) === year);
  }
  if (search) {
    const key = search.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.title.toLowerCase().includes(key) ||
        r.authors.toLowerCase().includes(key)
    );
  }

  return (
    <section className="min-h-screen px-4 py-16 transition-colors duration-300 bg-aceLight dark:bg-gray-900 font-inter">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl font-bold md:text-5xl text-acePurple dark:text-aceGreen">
            Research & Publications
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Advancing Health Information Management through evidence-based
            research, innovation, and policy impact.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col items-center justify-between gap-4 p-4 mb-12 transition-colors duration-300 bg-white shadow-md dark:bg-gray-800 rounded-xl md:p-6 md:flex-row">
          <input
            type="text"
            placeholder="Search by title or author"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 text-gray-900 transition-colors duration-300 border border-gray-300 rounded-lg outline-none md:w-1/2 dark:border-gray-600 focus:ring-2 focus:ring-acePurple dark:focus:ring-aceGreen bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
          />

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full px-4 py-2 text-gray-900 transition-colors duration-300 border border-gray-300 rounded-lg outline-none md:w-1/4 dark:border-gray-600 focus:ring-2 focus:ring-aceGreen dark:focus:ring-acePurple bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <p className="text-lg text-center text-gray-500 dark:text-gray-400">
            No research publications found.
          </p>
        )}

        {/* Research Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col justify-between p-6 transition-colors duration-300 bg-white border-t-4 shadow-lg dark:bg-gray-800 rounded-xl border-acePurple dark:border-aceGreen"
            >
              <div>
                <h3 className="text-xl font-semibold text-acePurple dark:text-aceGreen">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {item.publication_year} • {item.authors}
                </p>

                <p className="mt-4 text-base leading-relaxed text-gray-700 dark:text-gray-200 line-clamp-4">
                  {item.abstract}
                </p>
              </div>

              {item.document_url && (
                <a
                  href={item.document_url}
                  download
                  className="inline-block px-5 py-2 mt-6 font-semibold transition-colors duration-300 rounded-lg w-max bg-aceGreen text-aceDark hover:bg-acePurple hover:text-white"
                >
                  Download Research
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
