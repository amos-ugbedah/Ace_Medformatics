// src/pages/Team.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TeamCard from "../components/TeamCard";
import { supabase } from "../lib/supabaseClient";

export default function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      const { data, error } = await supabase
        .from("team_members")
        .select("id, full_name, role, bio, profile_image_url, socials")
        .order("display_order", { ascending: true });

      if (!error) setTeam(data || []);
      setLoading(false);
    }

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <p className="py-20 text-center text-gray-600 dark:text-gray-300 font-inter">
        Loading team…
      </p>
    );
  }

  return (
    <section className="min-h-screen px-4 py-20 bg-aceLight dark:bg-gray-900 font-inter">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          className="mb-16 text-4xl font-bold md:text-5xl text-acePurple dark:text-aceGreen"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Leadership & Team
        </motion.h1>

        <motion.div
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {team.map((member) => (
            <TeamCard
              key={member.id}
              name={member.full_name}
              role={member.role}
              bio={member.bio}
              image={member.profile_image_url}
              socials={member.socials}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
