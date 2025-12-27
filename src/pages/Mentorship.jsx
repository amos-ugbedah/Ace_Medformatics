// src/pages/Mentorship.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

// Generic PersonCard for both mentors and mentees
function PersonCard({ person, type }) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-acePurple dark:border-aceGreen">
        <img
          src={person.profile_image_url}
          alt={person.full_name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-acePurple dark:text-aceGreen">
        {person.full_name}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mt-1">
        {type === "mentor" ? person.expertise_area : person.field_of_interest}
      </p>
      {person.bio && (
        <p className="text-gray-700 dark:text-gray-200 mt-2 line-clamp-3">
          {person.bio}
        </p>
      )}
    </motion.div>
  );
}

export default function Mentorship() {
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [mentorSearch, setMentorSearch] = useState("");
  const [menteeSearch, setMenteeSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data: mentorsData, error: mentorsError } = await supabase
          .from("mentors")
          .select("id, full_name, expertise_area, bio, profile_image_url")
          .eq("is_active", true)
          .order("id", { ascending: true });

        if (mentorsError) throw mentorsError;

        const { data: menteesData, error: menteesError } = await supabase
          .from("mentees")
          .select("id, full_name, field_of_interest, bio, profile_image_url, cohort_year")
          .eq("is_active", true)
          .order("id", { ascending: true });

        if (menteesError) throw menteesError;

        setMentors(mentorsData || []);
        setMentees(menteesData || []);
      } catch (error) {
        console.error("Error fetching mentorship data:", error);
        setErrorMsg("Unable to load mentors and mentees.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredMentors = mentors.filter(
    (m) =>
      m.full_name.toLowerCase().includes(mentorSearch.toLowerCase()) ||
      m.expertise_area.toLowerCase().includes(mentorSearch.toLowerCase())
  );

  const filteredMentees = mentees.filter(
    (m) =>
      m.full_name.toLowerCase().includes(menteeSearch.toLowerCase()) ||
      m.field_of_interest.toLowerCase().includes(menteeSearch.toLowerCase())
  );

  return (
    <section className="bg-aceLight dark:bg-gray-900 py-16 px-4 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-acePurple dark:text-aceGreen mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Mentorship
        </motion.h1>
        <motion.p
          className="text-gray-700 dark:text-gray-200 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Structured peer-to-peer mentorship empowering students and professionals in Health Information Management.
        </motion.p>

        {loading && <p className="text-gray-500 dark:text-gray-400">Loading mentors and mentees...</p>}
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}

        {/* Mentors Section */}
        {!loading && mentors.length > 0 && (
          <div className="mb-12 text-left">
            <h2 className="text-2xl font-semibold text-acePurple dark:text-aceGreen mb-4">Mentors</h2>
            <input
              type="text"
              placeholder="Search mentors by name or expertise..."
              value={mentorSearch}
              onChange={(e) => setMentorSearch(e.target.value)}
              className="w-full md:w-1/2 mb-6 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-acePurple dark:focus:ring-aceGreen bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 transition-colors duration-300"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredMentors.length > 0 ? (
                filteredMentors.map((mentor) => (
                  <PersonCard key={mentor.id} person={mentor} type="mentor" />
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 col-span-full">
                  No mentors match your search.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Mentees Section */}
        {!loading && mentees.length > 0 && (
          <div className="text-left">
            <h2 className="text-2xl font-semibold text-acePurple dark:text-aceGreen mb-4">Mentees</h2>
            <input
              type="text"
              placeholder="Search mentees by name or interest..."
              value={menteeSearch}
              onChange={(e) => setMenteeSearch(e.target.value)}
              className="w-full md:w-1/2 mb-6 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-acePurple dark:focus:ring-aceGreen bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 transition-colors duration-300"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredMentees.length > 0 ? (
                filteredMentees.map((mentee) => (
                  <PersonCard key={mentee.id} person={mentee} type="mentee" />
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 col-span-full">
                  No mentees match your search.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
