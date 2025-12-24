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
      try {
        const { data, error } = await supabase
          .from("team_members")
          .select("id, full_name, role, bio, profile_image_url, socials")
          .order("display_order", { ascending: true });

        if (error) {
          console.error("Error fetching team:", error);
        } else {
          setTeam(data);
        }
      } catch (err) {
        console.error("Unexpected error fetching team:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTeam();
  }, []);

  if (loading) return <p className="text-center py-20">Loading team...</p>;

  return (
    <section className="bg-aceLight min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-acePurple mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Leadership & Team
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
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
