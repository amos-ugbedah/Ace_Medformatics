// src/pages/admin/ResearchAdmin.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const initialFormState = {
  title: "",
  authors: "",
  abstract: "",
  publication_year: "",
  document_url: "",
};

export default function ResearchAdmin() {
  const [researchList, setResearchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingResearch, setEditingResearch] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchResearch();
  }, []);

  async function fetchResearch() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("research")
        .select("*")
        .order("publication_year", { ascending: false });

      if (error) throw error;
      setResearchList(data || []);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to fetch research data.");
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setEditingResearch(null);
    setFormData(initialFormState);
    setShowModal(true);
  }

  function openEditModal(item) {
    setEditingResearch(item);
    setFormData({
      title: item.title,
      authors: item.authors,
      abstract: item.abstract,
      publication_year: item.publication_year,
      document_url: item.document_url,
    });
    setShowModal(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      if (editingResearch) {
        const { error } = await supabase
          .from("research")
          .update(formData)
          .eq("id", editingResearch.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("research")
          .insert([{ ...formData }]);
        if (error) throw error;
      }
      setShowModal(false);
      fetchResearch();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to save research.");
    }
  }

  async function deleteResearch(id) {
    if (!confirm("Are you sure you want to delete this research document?")) return;
    try {
      const { error } = await supabase.from("research").delete().eq("id", id);
      if (error) throw error;
      fetchResearch();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to delete research.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-acePurple">Research Management</h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 text-white rounded bg-aceGreen hover:bg-acePurple"
        >
          + Add Research
        </button>
      </div>

      {errorMsg && <p className="text-red-600">{errorMsg}</p>}
      {loading && <p>Loading research data...</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {researchList.map((item) => (
          <div key={item.id} className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <h3 className="text-lg font-semibold text-acePurple">{item.title}</h3>
            <p className="text-sm text-gray-600">Authors: {item.authors}</p>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {item.abstract.length > 100 ? item.abstract.slice(0, 100) + "..." : item.abstract}
            </p>
            <p className="mt-1 text-xs text-gray-500">Published: {item.publication_year}</p>
            <div className="flex gap-2 mt-3">
              <a
                href={item.document_url}
                target="_blank"
                className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                View
              </a>
              <button
                onClick={() => openEditModal(item)}
                className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteResearch(item.id)}
                className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <form
            onSubmit={handleSave}
            className="w-full max-w-lg p-6 bg-white rounded-xl"
          >
            <h2 className="mb-4 text-xl font-semibold">
              {editingResearch ? "Edit Research" : "Add Research"}
            </h2>

            {["title", "authors", "abstract", "publication_year", "document_url"].map((key) => (
              <input
                key={key}
                placeholder={key.replace("_", " ").toUpperCase()}
                value={formData[key]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                className="w-full px-4 py-2 mb-3 border rounded"
                required
              />
            ))}

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 text-white rounded bg-aceGreen">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
