// src/pages/admin/TeamAdmin.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";

const initialFormState = {
  full_name: "",
  role: "",
  bio: "",
  profile_image_url: "",
  display_order: 0,
  socials: {
    twitter: "",
    linkedin: "",
    instagram: "",
    facebook: "",
  },
};

export default function TeamAdmin() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  async function fetchTeamMembers() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setMembers(data || []);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to fetch team members.");
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setEditingMember(null);
    setFormData(initialFormState);
    setShowModal(true);
  }

  function openEditModal(member) {
    setEditingMember(member);
    setFormData({
      full_name: member.full_name,
      role: member.role,
      bio: member.bio || "",
      profile_image_url: member.profile_image_url || "",
      display_order: member.display_order || 0,
      socials: {
        twitter: member.socials?.twitter || "",
        linkedin: member.socials?.linkedin || "",
        instagram: member.socials?.instagram || "",
        facebook: member.socials?.facebook || "",
      },
    });
    setShowModal(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setActionLoading(true);
    setErrorMsg("");

    try {
      if (editingMember) {
        const { error } = await supabase
          .from("team_members")
          .update(formData)
          .eq("id", editingMember.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("team_members").insert([
          {
            ...formData,
            is_active: true,
          },
        ]);
        if (error) throw error;
      }

      setShowModal(false);
      fetchTeamMembers();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to save team member.");
    } finally {
      setActionLoading(false);
    }
  }

  // Soft delete (recommended)
  async function deactivateMember(id) {
    if (!confirm("Deactivate this team member?")) return;
    await supabase.from("team_members").update({ is_active: false }).eq("id", id);
    fetchTeamMembers();
  }

  // Hard delete (danger)
  async function permanentlyDeleteMember(id) {
    if (!confirm("THIS WILL PERMANENTLY DELETE THIS RECORD. Continue?")) return;
    await supabase.from("team_members").delete().eq("id", id);
    fetchTeamMembers();
  }

  return (
    <div className="min-h-screen p-6 bg-aceLight dark:bg-gray-900">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-acePurple">Team Admin</h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 text-white rounded bg-aceGreen hover:bg-acePurple"
        >
          + Add Team Member
        </button>
      </div>

      {errorMsg && <p className="mb-4 text-red-600">{errorMsg}</p>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <motion.div
            key={member.id}
            className={`p-6 bg-white rounded-xl shadow-lg ${
              !member.is_active && "opacity-50"
            }`}
          >
            <img
              src={member.profile_image_url || "https://via.placeholder.com/150"}
              className="object-cover w-24 h-24 mx-auto mb-4 rounded-full"
            />
            <h3 className="text-xl font-semibold text-center text-acePurple">
              {member.full_name}
            </h3>
            <p className="text-sm text-center text-gray-700">{member.role}</p>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <button
                onClick={() => openEditModal(member)}
                className="px-3 py-1 text-sm text-white bg-blue-600 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deactivateMember(member.id)}
                className="px-3 py-1 text-sm text-white bg-yellow-600 rounded"
              >
                Deactivate
              </button>
              <button
                onClick={() => permanentlyDeleteMember(member.id)}
                className="px-3 py-1 text-sm text-white bg-red-700 rounded"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <form
            onSubmit={handleSave}
            className="w-full max-w-lg p-6 text-gray-900 bg-white rounded-xl"
          >
            <h2 className="mb-4 text-xl font-semibold">
              {editingMember ? "Edit Team Member" : "Add Team Member"}
            </h2>

            {["full_name", "role", "profile_image_url", "display_order"].map(
              (field) => (
                <input
                  key={field}
                  placeholder={field.replace("_", " ").toUpperCase()}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="w-full px-4 py-2 mb-3 text-gray-900 bg-white border rounded"
                />
              )
            )}

            <textarea
              placeholder="Bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full px-4 py-2 mb-3 border rounded"
            />

            {Object.keys(formData.socials).map((key) => (
              <input
                key={key}
                placeholder={`${key} link`}
                value={formData.socials[key]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socials: { ...formData.socials, [key]: e.target.value },
                  })
                }
                className="w-full px-4 py-2 mb-2 border rounded"
              />
            ))}

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white rounded bg-aceGreen"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
