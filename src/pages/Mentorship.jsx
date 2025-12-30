import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

export default function Mentorship() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchMentors() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("mentors")
          .select("id, full_name, expertise_area, bio, profile_image_url")
          .eq("is_active", true)
          .order("id", { ascending: true });
        if (error) throw error;
        setMentors(data || []);
      } catch (error) {
        console.error(error);
        setErrorMsg("Unable to load mentors at this time.");
      } finally {
        setLoading(false);
      }
    }
    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise_area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="font-sans transition-colors bg-aceLight dark:bg-gray-900">
      {/* PAGE INTRO */}
      <section className="max-w-5xl px-4 py-20 mx-auto text-center">
        <h1 className="mb-6 text-4xl font-semibold md:text-5xl text-acePurple">
          Mentorship Program
        </h1>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Our mentorship program connects Health Information Management
          professionals with experienced mentors to support career
          development, leadership growth, and professional excellence.
        </p>
      </section>

      {/* PROGRAM OBJECTIVES */}
      <section className="px-4 py-16 bg-white dark:bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="mb-8 text-3xl font-semibold text-acePurple">
            Program Objectives
          </h2>
          <ul className="space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
            <li>• Support early and mid-career professionals through guidance.</li>
            <li>• Strengthen leadership and digital health competencies.</li>
            <li>• Encourage ethical practice and continuous learning.</li>
            <li>• Build a strong, supportive HIM professional network.</li>
          </ul>
        </div>
      </section>

      {/* MENTORS LIST */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-acePurple">
              Meet Our Mentors
            </h2>
            <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
              Our mentors are seasoned professionals committed to knowledge
              sharing, career development, and impact within the health sector.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="flex justify-center mb-12">
            <input
              type="text"
              placeholder="Search mentors by name or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-3 text-gray-900 transition border border-gray-300 rounded-lg dark:text-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-acePurple dark:focus:ring-aceGreen"
            />
          </div>

          {loading && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Loading mentors...
            </p>
          )}
          {errorMsg && <p className="text-center text-red-600">{errorMsg}</p>}

          {!loading && filteredMentors.length > 0 && (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {filteredMentors.map((mentor, index) => (
                <motion.div
                  key={mentor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 text-center transition-shadow duration-300 bg-white shadow-sm dark:bg-gray-800 rounded-xl hover:shadow-lg"
                >
                  <div className="w-24 h-24 mx-auto mb-4 overflow-hidden border-2 rounded-full border-acePurple dark:border-aceGreen">
                    <img
                      src={mentor.profile_image_url}
                      alt={mentor.full_name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-acePurple">
                    {mentor.full_name}
                  </h3>
                  <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                    {mentor.expertise_area}
                  </p>
                  {mentor.bio && (
                    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      {mentor.bio.length > 100
                        ? mentor.bio.slice(0, 100) + "..."
                        : mentor.bio}
                    </p>
                  )}
                </motion.div>
              ))}
              {filteredMentors.length === 0 && (
                <p className="text-center text-gray-500 col-span-full dark:text-gray-400">
                  No mentors match your search.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 text-center bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-6 text-3xl font-semibold md:text-4xl text-acePurple">
            Apply for Mentorship
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-700 dark:text-gray-300">
            Ready to grow professionally with guidance from experienced mentors? Apply to join our mentorship program today.
          </p>
          <Link
            to="/mentorship/apply"
            className="inline-block px-10 py-3 font-medium transition rounded-lg bg-aceGreen text-aceDark hover:bg-acePurple hover:text-white"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </main>
  );
}
