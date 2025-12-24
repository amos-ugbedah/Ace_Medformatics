import { useState } from "react";
import { FaEnvelope, FaPhone, FaWhatsapp, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient"; // ensure this points to your Supabase client

export default function Contact() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert([
          {
            full_name: formData.full_name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
        ]);

      if (error) {
        console.error("Error submitting contact message:", error);
        setSuccess("Failed to send message. Please try again later.");
      } else {
        setSuccess("Message sent successfully! We will get back to you soon.");
        setFormData({ full_name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setSuccess("Something went wrong. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <section className="bg-aceLight py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-acePurple mb-3">
            Contact Ace Medformatics
          </h1>
          <p className="text-gray-600">
            Send us a message for enquiries, collaborations, or programs.
          </p>
        </div>

        {/* Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 text-left">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <FaEnvelope className="text-acePurple text-2xl mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800">Email</h3>
              <p>acemedformatics20@gmail.com</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <FaPhone className="text-acePurple text-2xl mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800">Phone</h3>
              <p>+234 703 228 7331</p>
              <p>+234 803 563 1828</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <FaWhatsapp className="text-acePurple text-2xl mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800">WhatsApp</h3>
              <a
                href="https://wa.me/2347032287331"
                target="_blank"
                rel="noopener noreferrer"
                className="text-aceGreen hover:underline"
              >
                Chat with Admin
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <FaFacebook className="text-acePurple text-2xl mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800">Facebook</h3>
              <a
                href="https://facebook.com/Ace_Medformatics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-aceGreen hover:underline"
              >
                Ace_Medformatics
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <FaTwitter className="text-acePurple text-2xl mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800">X / Twitter</h3>
              <a
                href="https://twitter.com/Ace_Medformatics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-aceGreen hover:underline"
              >
                @Ace_Medformatics
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <FaInstagram className="text-acePurple text-2xl mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800">Instagram</h3>
              <a
                href="https://instagram.com/Ace_Medformatics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-aceGreen hover:underline"
              >
                @Ace_Medformatics
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 space-y-6"
        >
          {success && <p className="text-center text-green-600">{success}</p>}

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-aceDark mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-aceGreen"
              placeholder="Your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-aceDark mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-aceGreen"
              placeholder="you@example.com"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-aceDark mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-aceGreen"
              placeholder="What is this about?"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-aceDark mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-aceGreen"
              placeholder="Type your message here..."
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-semibold py-3 rounded-md border-2 border-aceGreen transition-colors duration-300 ${
                loading
                  ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                  : "bg-aceGreen text-aceDark hover:bg-acePurple hover:text-white"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
