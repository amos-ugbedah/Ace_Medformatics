import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

export default function Research() {
  const [research, setResearch] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchResearch = async () => {
      const { data, error } = await supabase
        .from("research")
        .select(
          "id, title, authors, abstract, publication_year, document_url"
        )
        .order("publication_year", { ascending: false });

      if (!error) {
        setResearch(data);
        setFiltered(data);
      }
    };

    fetchResearch();
  }, []);

  useEffect(() => {
    let result = research;

    if (year) {
      result = result.filter(
        (r) => String(r.publication_year) === year
      );
    }

    if (search) {
      const key = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(key) ||
          r.authors.toLowerCase().includes(key)
      );
    }

    setFiltered(result);
  }, [year, search, research]);

  const years = [
    ...new Set(research.map((r) => r.publication_year)),
  ].sort((a, b) => b - a);

  return (
    <section className="bg-aceLight py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-acePurple">
            Research & Publications
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Advancing Health Information Management through evidence-based
            research, innovation, and policy impact.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search by title or author"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-acePurple outline-none"
          />

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full md:w-1/4 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-aceGreen outline-none"
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
          <p className="text-center text-gray-500">
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
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between border-t-4 border-acePurple"
            >
              <div>
                <h3 className="text-xl font-semibold text-acePurple">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {item.publication_year} • {item.authors}
                </p>

                <p className="text-gray-700 mt-4 line-clamp-4">
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
