// src/pages/Contact.jsx
import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";

export default function Contact() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    const { error } = await supabase.from("contact_messages").insert([formData]);

    setSuccess(
      error
        ? "Failed to send message. Please try again later."
        : "Message sent successfully! We will get back to you soon."
    );

    if (!error)
      setFormData({ full_name: "", email: "", subject: "", message: "" });

    setLoading(false);
  };

  return (
    <section className="min-h-screen py-20 transition-colors bg-aceLight dark:bg-gray-900">
      <div className="max-w-4xl px-4 mx-auto">
        {/* Title */}
        <div className="text-center mb-14">
          <h1 className="mb-4 text-4xl font-semibold md:text-5xl text-acePurple">
            Contact Ace Medformatics
          </h1>
          <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-400">
            Reach out for enquiries, collaborations, or program information.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-14">
          {[
            [FaEnvelope, "Email", "acemedformatics20@gmail.com"],
            [FaPhone, "Phone", "+234 703 228 7331\n+234 803 563 1828"],
            [FaWhatsapp, "WhatsApp", "+234 703 228 7331"],
          ].map(([Icon, title, value], i) => (
            <div
              key={i}
              className="flex gap-4 p-6 bg-white shadow-sm dark:bg-gray-800 rounded-xl"
            >
              {Icon && (
                <Icon className="mt-1 text-2xl text-acePurple dark:text-aceGreen" />
              )}
              <div>
                <h3 className="font-medium">{title}</h3>
                <p className="text-gray-600 whitespace-pre-line dark:text-gray-300">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Socials */}
        <div className="flex justify-center gap-6 mb-14">
          {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
            <Icon
              key={i}
              className="text-3xl transition text-acePurple dark:text-aceGreen hover:opacity-80"
            />
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6 bg-white shadow-md dark:bg-gray-800 rounded-xl"
        >
          {success && (
            <p className="text-center text-green-600 dark:text-green-400">
              {success}
            </p>
          )}

          {["full_name", "email", "subject"].map((field) => (
            <div key={field}>
              <label className="block mb-1 text-sm font-medium capitalize">
                {field.replace("_", " ")}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-aceGreen"
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 text-sm font-medium">Message</label>
            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-aceGreen"
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-3 font-medium transition rounded-lg bg-aceGreen text-aceDark hover:bg-acePurple hover:text-white"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
