import { useState } from "react";
import {
  FaUsers,
  FaEnvelope,
  FaFlask,
  FaCog,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaClipboardList,
  FaStar,
  FaNewspaper,
} from "react-icons/fa";

import TeamAdmin from "./TeamAdmin";
import ContactMessagesAdmin from "./ContactMessagesAdmin";
import ResearchAdmin from "./ResearchAdmin";
import GeneralSettings from "./GeneralSettings";
import ProgramsAdmin from "./ProgramsAdmin";
import MenteesAdmin from "./MenteesAdmin";
import TestimonialsAdmin from "./TestimonialsAdmin";
import MentorshipAdmin from "./MentorshipAdmin";
import AdminReviewsPage from "./AdminReviewsPage";
import AdminMediaPage from "./AdminMediaPage"; // ✅ NEW

export default function DashboardAdmin() {
  const [activeModule, setActiveModule] = useState("mentorship");

  const modules = [
    { id: "mentorship", label: "Mentorship", icon: <FaChalkboardTeacher /> },
    { id: "mentees", label: "Mentees", icon: <FaGraduationCap /> },
    { id: "programs", label: "Programs", icon: <FaClipboardList /> },
    { id: "reviews", label: "Reviews", icon: <FaStar /> },

    // 🔥 MEDIA MODULE
    { id: "media", label: "Media & Press", icon: <FaNewspaper /> },

    { id: "team", label: "Team", icon: <FaUsers /> },
    { id: "messages", label: "Messages", icon: <FaEnvelope /> },
    { id: "testimonials", label: "Testimonials", icon: <FaStar /> },
    { id: "research", label: "Research", icon: <FaFlask /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 font-inter">
      {/* ICON NAVIGATION */}
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setActiveModule(mod.id)}
            className={`flex flex-col items-center justify-center w-28 h-24 rounded-xl transition-all
              ${
                activeModule === mod.id
                  ? "bg-acePurple text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }
              hover:bg-acePurple hover:text-white`}
          >
            <div className="mb-2 text-2xl">{mod.icon}</div>
            <span className="text-sm font-medium text-center">
              {mod.label}
            </span>
          </button>
        ))}
      </div>

      {/* MODULE CONTENT */}
      <div className="mt-6">
        {activeModule === "mentorship" && <MentorshipAdmin />}
        {activeModule === "mentees" && <MenteesAdmin />}
        {activeModule === "programs" && <ProgramsAdmin />}
        {activeModule === "reviews" && <AdminReviewsPage />}
        {activeModule === "media" && <AdminMediaPage />} {/* ✅ NEW */}
        {activeModule === "team" && <TeamAdmin />}
        {activeModule === "messages" && <ContactMessagesAdmin />}
        {activeModule === "testimonials" && <TestimonialsAdmin />}
        {activeModule === "research" && <ResearchAdmin />}
        {activeModule === "settings" && <GeneralSettings />}
      </div>
    </div>
  );
}
