// src/components/TeamCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function TeamCard({ name, role, image, bio, socials }) {
  const socialLinks = socials && typeof socials === "object" ? socials : {};

  const handleEmailClick = (email) => {
    if (!email) return;
    window.location.href = `mailto:${email}`;
  };

  return (
    <motion.div
      className="flex flex-col items-center p-6 overflow-hidden text-center transition-colors transition-shadow duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-xl hover:shadow-2xl font-inter"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Profile Image */}
      {image && (
        <img
          src={image}
          alt={name}
          className="object-cover w-32 h-32 mb-4 border-4 rounded-full border-aceGreen"
        />
      )}

      {/* Name & Role */}
      <h3 className="text-xl font-semibold text-acePurple dark:text-aceGreen">
        {name}
      </h3>
      <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">{role}</p>

      {/* Bio */}
      {bio && <p className="mb-4 text-sm text-gray-600 dark:text-gray-200">{bio}</p>}

      {/* Social Links */}
      <div className="flex space-x-4">
        {socialLinks.linkedin && (
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 text-acePurple dark:text-aceGreen hover:text-aceGreen dark:hover:text-acePurple"
            title="LinkedIn Profile"
          >
            <FaLinkedin size={20} />
          </a>
        )}
        {socialLinks.twitter && (
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 text-acePurple dark:text-aceGreen hover:text-aceGreen dark:hover:text-acePurple"
            title="Twitter Profile"
          >
            <FaTwitter size={20} />
          </a>
        )}
        {socialLinks.email && (
          <button
            onClick={() => handleEmailClick(socialLinks.email)}
            className="transition-colors duration-300 text-acePurple dark:text-aceGreen hover:text-aceGreen dark:hover:text-acePurple"
            title={`Send email to ${socialLinks.email}`}
          >
            <FaEnvelope size={20} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
