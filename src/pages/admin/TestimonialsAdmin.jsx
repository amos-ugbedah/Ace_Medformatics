// src/pages/admin/TestimonialsAdmin.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to fetch testimonials.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(id, action) {
    setActionLoading(id);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ status: action })
        .eq("id", id);
      if (error) throw error;

      setSuccessMsg(`Testimonial ${action} successfully!`);
      fetchTestimonials();
    } catch (error) {
      console.error(error);
      setErrorMsg("Action failed. Try again.");
    } finally {
      setActionLoading(null);
    }
  }

  const pendingTestimonials = testimonials.filter((t) => t.status === "pending");
  const approvedTestimonials = testimonials.filter((t) => t.status === "approved");
  const rejectedTestimonials = testimonials.filter((t) => t.status === "rejected");

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold text-acePurple">Testimonials Admin</h1>

      {loading && <p className="text-gray-500">Loading...</p>}
      {errorMsg && <p className="mb-4 text-red-600">{errorMsg}</p>}
      {successMsg && <p className="mb-4 text-green-600">{successMsg}</p>}

      {/* Pending Testimonials */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-acePurple">Pending Testimonials</h2>
        {pendingTestimonials.length === 0 && <p className="text-gray-500">No pending testimonials.</p>}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pendingTestimonials.map((test) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-white shadow-lg rounded-xl dark:bg-gray-800"
            >
              <p className="text-gray-700 dark:text-gray-300">{test.content}</p>
              <p className="mt-2 text-sm text-gray-500">By: {test.author}</p>
              <div className="flex justify-center mt-4 space-x-2">
                <button
                  disabled={actionLoading === test.id}
                  onClick={() => handleAction(test.id, "approved")}
                  className="px-3 py-2 text-white rounded-lg bg-aceGreen hover:bg-acePurple disabled:opacity-50"
                >
                  Approve
                </button>
                <button
                  disabled={actionLoading === test.id}
                  onClick={() => handleAction(test.id, "rejected")}
                  className="px-3 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Approved Testimonials */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-green-600">Approved Testimonials</h2>
        {approvedTestimonials.length === 0 && <p className="text-gray-500">No approved testimonials yet.</p>}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {approvedTestimonials.map((test) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-white border-l-4 border-green-500 shadow-lg rounded-xl dark:bg-gray-800"
            >
              <p className="text-gray-700 dark:text-gray-300">{test.content}</p>
              <p className="mt-2 text-sm text-gray-500">By: {test.author}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Rejected Testimonials */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-red-600">Rejected Testimonials</h2>
        {rejectedTestimonials.length === 0 && <p className="text-gray-500">No rejected testimonials yet.</p>}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rejectedTestimonials.map((test) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-white border-l-4 border-red-500 shadow-lg rounded-xl dark:bg-gray-800"
            >
              <p className="text-gray-700 dark:text-gray-300">{test.content}</p>
              <p className="mt-2 text-sm text-gray-500">By: {test.author}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
