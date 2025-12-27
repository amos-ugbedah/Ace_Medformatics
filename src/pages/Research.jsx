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

  // No need for a filtering effect; filter in render

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
    <section className="bg-aceLight dark:bg-gray-900 min-h-screen py-16 px-4 transition-colors duration-300 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-acePurple dark:text-aceGreen">
            Research & Publications
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Advancing Health Information Management through evidence-based
            research, innovation, and policy impact.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between transition-colors duration-300">
          <input
            type="text"
            placeholder="Search by title or author"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-acePurple dark:focus:ring-aceGreen outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 transition-colors duration-300"
          />

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full md:w-1/4 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-aceGreen dark:focus:ring-acePurple outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 transition-colors duration-300"
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
          <p className="text-center text-gray-500 dark:text-gray-400">
            No research publications found.
          </p>
        )}

        {/* Research Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between border-t-4 border-acePurple dark:border-aceGreen transition-colors duration-300"
            >
              <div>
                <h3 className="text-xl font-semibold text-acePurple dark:text-aceGreen">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {item.publication_year} • {item.authors}
                </p>

                <p className="text-gray-700 dark:text-gray-200 mt-4 line-clamp-4">
                  {item.abstract}
                </p>
              </div>

              {item.document_url && (
                <a
                  href={item.document_url}
                  download
                  className="mt-6 inline-block w-max bg-aceGreen text-aceDark font-semibold px-5 py-2 rounded-lg hover:bg-acePurple hover:text-white transition-colors duration-300"
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
