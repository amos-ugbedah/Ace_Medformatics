import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function MentorshipApply() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    field_of_interest: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { error } = await supabase
        .from("mentorship_applications")
        .insert([
          {
            full_name: formData.full_name,
            email: formData.email,
            phone: formData.phone,
            field_of_interest: formData.field_of_interest,
            bio: formData.bio,
            profile_image_url: "", // placeholder
            cohort_year: new Date().getFullYear(),
            is_active: true,
          },
        ]);

      if (error) throw error;

      setSuccessMsg(
        "Your application has been submitted successfully! Our admin will review it."
      );

      setFormData({
        full_name: "",
        email: "",
        phone: "",
        field_of_interest: "",
        bio: "",
      });
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-20 bg-aceLight dark:bg-gray-900 font-inter">
      <div className="max-w-3xl p-8 mx-auto bg-white shadow-lg dark:bg-gray-800 rounded-xl">
        <h1 className="mb-6 text-3xl font-semibold text-center md:text-4xl text-acePurple">
          Apply for Mentorship
        </h1>
        <p className="mb-6 text-center text-gray-700 dark:text-gray-300">
          Ready to grow professionally with guidance from experienced mentors? Fill out the form below to submit your application.
        </p>

        {successMsg && <p className="mb-4 text-center text-green-600">{successMsg}</p>}
        {errorMsg && <p className="mb-4 text-center text-red-600">{errorMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-acePurple dark:bg-gray-700 dark:text-gray-200"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-acePurple dark:bg-gray-700 dark:text-gray-200"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone (Optional)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-acePurple dark:bg-gray-700 dark:text-gray-200"
          />

          <input
            type="text"
            name="field_of_interest"
            placeholder="Area of Interest / Expertise"
            value={formData.field_of_interest}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-acePurple dark:bg-gray-700 dark:text-gray-200"
          />

          <textarea
            name="bio"
            placeholder="Short Bio / Motivation"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-acePurple dark:bg-gray-700 dark:text-gray-200"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-medium rounded-lg bg-aceGreen text-aceDark hover:bg-acePurple hover:text-white"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </main>
  );
}
