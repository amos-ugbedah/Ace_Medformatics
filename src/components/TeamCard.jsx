// src/components/TeamCard.jsx
import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function TeamCard({ name, role, image, bio, socials }) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center text-center p-6 hover:shadow-2xl transition-shadow duration-300"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Profile Image */}
      <img
        src={image}
        alt={name}
        className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-aceGreen"
      />

      {/* Name & Role */}
      <h3 className="text-xl font-semibold text-acePurple">{name}</h3>
      <p className="text-aceDark text-sm mb-3">{role}</p>

      {/* Short Bio */}
      {bio && <p className="text-gray-600 text-sm mb-4">{bio}</p>}

      {/* Social Links */}
      <div className="flex space-x-4">
        {socials?.linkedin && (
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-acePurple hover:text-aceGreen transition-colors duration-300"
          >
            <FaLinkedin size={20} />
          </a>
        )}
        {socials?.twitter && (
          <a
            href={socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-acePurple hover:text-aceGreen transition-colors duration-300"
          >
            <FaTwitter size={20} />
          </a>
        )}
        {socials?.email && (
          <a
            href={`mailto:${socials.email}`}
            className="text-acePurple hover:text-aceGreen transition-colors duration-300"
          >
            <FaEnvelope size={20} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
