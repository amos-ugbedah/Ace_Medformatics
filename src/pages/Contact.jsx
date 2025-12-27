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

    if (error) {
      setSuccess("Failed to send message. Please try again later.");
    } else {
      setSuccess("Message sent successfully! We will get back to you soon.");
      setFormData({ full_name: "", email: "", subject: "", message: "" });
    }
    setLoading(false);
  };

  return (
    <section className="min-h-screen py-16 text-gray-900 dark:text-gray-200 transition-colors font-sans">
      <div className="max-w-4xl mx-auto px-4">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-acePurple mb-3">
            Contact Ace Medformatics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Send us a message for enquiries, collaborations, or programs.
          </p>
        </div>

        {/* Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {[
            [FaEnvelope, "Email", "acemedformatics20@gmail.com"],
            [FaPhone, "Phone", `+234 703 228 7331\n+234 803 563 1828`],
            [FaWhatsapp, "WhatsApp", "+2347032287331"],
          ].map(([Icon, title, value], i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md flex items-start space-x-4"
            >
              <span className="text-acePurple text-2xl mt-1">
                {Icon && <Icon />}
              </span>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="whitespace-pre-line">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-12">
          {[
            [FaFacebook, "https://www.facebook.com/yourpage"],
            [FaTwitter, "https://twitter.com/yourhandle"],
            [FaInstagram, "https://www.instagram.com/yourhandle"],
            [FaLinkedin, "https://www.linkedin.com/in/yourhandle"],
          ].map(([Icon, url], i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-acePurple dark:text-aceGreen text-3xl hover:text-aceGreen dark:hover:text-acePurple transition-colors"
            >
              <Icon />
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 space-y-6"
        >
          {success && (
            <p className="text-center text-green-600 dark:text-green-400">
              {success}
            </p>
          )}

          {["full_name", "email", "subject"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {field.replace("_", " ")}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-md px-4 py-2 focus:ring-2 focus:ring-aceGreen"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-md px-4 py-2 focus:ring-2 focus:ring-aceGreen"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold rounded-md border-2 border-aceGreen transition-colors
                       bg-aceGreen text-aceDark hover:bg-acePurple hover:text-white"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
