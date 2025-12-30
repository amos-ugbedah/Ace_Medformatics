import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";

export default function MentorshipAdmin() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("mentorship_applications")
        .select("*")
        .eq("is_active", true)
        .order("id", { ascending: true });
      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to fetch applications.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(id, action) {
    setActionLoading(id);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { error: updateError } = await supabase
        .from("mentorship_applications")
        .update({ is_active: action === "approved" })
        .eq("id", id);
      if (updateError) throw updateError;

      if (action === "approved") {
        const app = applications.find((a) => a.id === id);
        const { error: insertError } = await supabase.from("mentees").insert([
          {
            full_name: app.full_name,
            email: app.email,
            phone: app.phone,
            field_of_interest: app.field_of_interest,
            bio: app.bio || "",
            profile_image_url: app.profile_image_url || "",
            cohort_year: new Date().getFullYear(),
            is_active: true,
          },
        ]);
        if (insertError) throw insertError;
      }

      setSuccessMsg(`Application ${action} successfully!`);
      fetchApplications();
    } catch (error) {
      console.error(error);
      setErrorMsg("Action failed. Try again.");
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-aceLight dark:bg-gray-900">
      <h1 className="mb-6 text-3xl font-semibold text-center md:text-4xl text-acePurple">
        Mentorship Applications
      </h1>
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {errorMsg && <p className="mb-4 text-center text-red-600">{errorMsg}</p>}
      {successMsg && <p className="mb-4 text-center text-green-600">{successMsg}</p>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {applications.map((app) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between p-6 bg-white shadow-lg rounded-xl dark:bg-gray-800"
          >
            <div>
              <h3 className="mb-2 text-xl font-semibold text-acePurple">{app.full_name}</h3>
              <p className="text-sm text-gray-600">Email: {app.email}</p>
              {app.phone && <p className="text-sm text-gray-600">Phone: {app.phone}</p>}
              <p className="text-sm text-gray-600">Interest: {app.field_of_interest}</p>
              {app.bio && <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{app.bio.slice(0, 120)}...</p>}
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => handleAction(app.id, "approved")}
                disabled={actionLoading === app.id}
                className="px-3 py-2 text-white rounded-lg bg-aceGreen hover:bg-acePurple disabled:opacity-50"
              >
                {actionLoading === app.id ? "Processing..." : "Approve"}
              </button>
              <button
                onClick={() => handleAction(app.id, "rejected")}
                disabled={actionLoading === app.id}
                className="px-3 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {actionLoading === app.id ? "Processing..." : "Reject"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
