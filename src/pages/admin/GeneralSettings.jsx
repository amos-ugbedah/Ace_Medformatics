// src/pages/admin/GeneralSettings.jsx
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { FaSave, FaCog } from "react-icons/fa";

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    site_name: "",
    contact_email: "",
    enable_mentorship: true,
    enable_programs: true,
    enable_research: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch current settings from Supabase
  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const { data, error } = await supabase
        .from("admin_settings")
        .select("*")
        .single(); // Assume single row for site settings

      if (error) throw error;
      if (data) setSettings(data);
    } catch (err) {
      console.error("Failed to fetch settings:", err);
    }
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  // Handle toggle switches
  const handleToggle = (name) => {
    setSettings({ ...settings, [name]: !settings[name] });
  };

  // Save settings
  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    try {
      const { error } = await supabase
        .from("admin_settings")
        .upsert([settings]); // Insert or update

      if (error) throw error;
      setMessage("Settings saved successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to save settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl p-6 mx-auto bg-white shadow-md dark:bg-gray-800 rounded-xl">
      <div className="flex items-center gap-2 mb-6">
        <FaCog className="text-2xl text-acePurple" />
        <h2 className="text-2xl font-semibold text-acePurple">General Settings</h2>
      </div>

      <div className="space-y-6">
        {/* Site Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Site Name
          </label>
          <input
            type="text"
            name="site_name"
            value={settings.site_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-acePurple dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Contact Email */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Contact Email
          </label>
          <input
            type="email"
            name="contact_email"
            value={settings.contact_email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-acePurple dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Feature Toggles */}
        <div className="space-y-3">
          {[
            { name: "enable_mentorship", label: "Enable Mentorship Module" },
            { name: "enable_programs", label: "Enable Programs Module" },
            { name: "enable_research", label: "Enable Research Module" },
          ].map((feature) => (
            <div
              key={feature.name}
              className="flex items-center justify-between px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleToggle(feature.name)}
            >
              <span className="text-gray-800 dark:text-gray-200">{feature.label}</span>
              <span
                className={`w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 transition-colors ${
                  settings[feature.name] ? "bg-acePurple" : "bg-gray-300"
                }`}
              >
                <span
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings[feature.name] ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </span>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 text-white rounded-md bg-acePurple hover:opacity-90"
          >
            <FaSave />
            {loading ? "Saving..." : "Save Settings"}
          </button>
          {message && <span className="text-green-600 dark:text-green-400">{message}</span>}
        </div>
      </div>
    </div>
  );
}
