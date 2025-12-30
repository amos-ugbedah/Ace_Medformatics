// src/pages/admin/MenteesAdmin.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";

export default function MenteesAdmin() {
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchMentees();
  }, []);

  async function fetchMentees() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("mentees")
        .select("*")
        .order("id", { ascending: true });
      if (error) throw error;
      setMentees(data || []);
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to fetch mentees.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleActive(id, currentStatus) {
    setActionLoading(id);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { error } = await supabase
        .from("mentees")
        .update({ is_active: !currentStatus })
        .eq("id", id);
      if (error) throw error;

      setSuccessMsg("Mentee status updated successfully!");
      fetchMentees();
    } catch (error) {
      console.error(error);
      setErrorMsg("Action failed. Try again.");
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold text-acePurple">Mentees</h1>
      {loading && <p className="text-gray-500">Loading...</p>}
      {errorMsg && <p className="mb-4 text-red-600">{errorMsg}</p>}
      {successMsg && <p className="mb-4 text-green-600">{successMsg}</p>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mentees.map((mentee) => (
          <motion.div
            key={mentee.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between p-6 bg-white shadow-lg rounded-xl dark:bg-gray-800"
          >
            <div>
              <h3 className="mb-2 text-xl font-semibold text-acePurple">{mentee.full_name}</h3>
              <p className="text-sm text-gray-600">Email: {mentee.email}</p>
              {mentee.phone && <p className="text-sm text-gray-600">Phone: {mentee.phone}</p>}
              <p className="text-sm text-gray-600">Field: {mentee.field_of_interest}</p>
              {mentee.bio && <p className="mt-2 text-sm text-gray-700">{mentee.bio.slice(0,120)}...</p>}
            </div>
            <div className="flex justify-center mt-4">
              <button
                disabled={actionLoading === mentee.id}
                onClick={() => toggleActive(mentee.id, mentee.is_active)}
                className="px-3 py-2 text-white rounded-lg bg-aceGreen hover:bg-acePurple disabled:opacity-50"
              >
                {actionLoading === mentee.id ? "Processing..." : mentee.is_active ? "Deactivate" : "Activate"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
