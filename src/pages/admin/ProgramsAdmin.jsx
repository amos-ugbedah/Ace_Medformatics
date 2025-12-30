// src/pages/admin/ProgramsAdmin.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ProgramsAdmin() {
  const [programs, setPrograms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [file, setFile] = useState(null);

  const [newProgramTitle, setNewProgramTitle] = useState("");
  const [newProgramDesc, setNewProgramDesc] = useState("");
  const [newProgramCategory, setNewProgramCategory] = useState("");

  const BUCKET_NAME = "research-pdfs";

  useEffect(() => {
    fetchCategories();
    fetchPrograms();
  }, []);

  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from("program_categories")
        .select("*")
        .order("id");
      if (error) throw error;
      setCategories(data || []);
      if (data?.length) setNewProgramCategory(data[0].id);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to fetch categories.");
    }
  }

  async function fetchPrograms() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .order("id");
      if (error) throw error;
      setPrograms(data || []);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to fetch programs.");
    } finally {
      setLoading(false);
    }
  }

  function openMaterialsModal(program) {
    setSelectedProgram(program);
    fetchMaterials(program.id);
  }

  async function fetchMaterials(programId) {
    try {
      const { data, error } = await supabase
        .from("program_materials")
        .select("*")
        .eq("program_id", programId)
        .order("id");
      if (error) throw error;
      setMaterials(data || []);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to fetch materials.");
    }
  }

  async function handleAddProgram(e) {
    e.preventDefault();
    if (!newProgramTitle || !newProgramCategory) return;
    setActionLoading(true);
    setErrorMsg("");

    try {
      const { data: insertedData, error } = await supabase.from("programs").insert([
        {
          title: newProgramTitle,
          description: newProgramDesc,
          categories: newProgramCategory,
          status: "upcoming",
        },
      ]).select();
      if (error) throw error;

      setNewProgramTitle("");
      setNewProgramDesc("");
      fetchPrograms();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to add program.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDeleteProgram(programId) {
    setActionLoading(true);
    setErrorMsg("");
    try {
      const { error } = await supabase.from("programs").delete().eq("id", programId);
      if (error) throw error;
      fetchPrograms();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to delete program.");
    } finally {
      setActionLoading(false);
    }
  }

  // --- UPDATED MATERIAL UPLOAD ---
  async function handleUploadMaterial(e) {
    e.preventDefault();
    if (!file || !selectedProgram) return;

    setActionLoading(true);
    setErrorMsg("");

    try {
      // Ensure folder name based on program ID
      const folderPath = `program-${selectedProgram.id}`;

      // Upload file
      const { data: storageData, error: storageError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(`${folderPath}/${file.name}`, file, { upsert: true });

      if (storageError) throw storageError;

      // Insert into program_materials table
      const { error: insertError } = await supabase.from("program_materials").insert([
        {
          program_id: selectedProgram.id,
          title: file.name,
          file_url: `${folderPath}/${file.name}`,
        },
      ]);

      if (insertError) throw insertError;

      setFile(null);
      fetchMaterials(selectedProgram.id);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to upload material. Check bucket permissions and path.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDeleteMaterial(materialId) {
    setActionLoading(true);
    setErrorMsg("");
    try {
      const { error } = await supabase.from("program_materials").delete().eq("id", materialId);
      if (error) throw error;
      fetchMaterials(selectedProgram.id);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to delete material.");
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-6 font-inter bg-aceLight dark:bg-gray-900">
      <h1 className="mb-6 text-3xl font-semibold text-acePurple">Programs Admin</h1>
      {errorMsg && <p className="mb-4 text-red-600">{errorMsg}</p>}

      {/* Add Program Form */}
      <form onSubmit={handleAddProgram} className="flex flex-col max-w-md gap-2 mb-6">
        <input
          type="text"
          placeholder="Program Title"
          value={newProgramTitle}
          onChange={(e) => setNewProgramTitle(e.target.value)}
          className="px-4 py-2 border rounded"
          required
        />
        <textarea
          placeholder="Program Description"
          value={newProgramDesc}
          onChange={(e) => setNewProgramDesc(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <select
          value={newProgramCategory || ""}
          onChange={(e) => setNewProgramCategory(e.target.value)}
          className="px-4 py-2 border rounded"
          required
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={actionLoading}
          className="px-4 py-2 text-white rounded bg-aceGreen hover:bg-acePurple"
        >
          {actionLoading ? "Adding..." : "Add Program"}
        </button>
      </form>

      {/* Program List */}
      {loading ? (
        <p>Loading programs...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <div key={program.id} className="p-6 bg-white shadow-lg rounded-xl dark:bg-gray-800">
              <h3 className="mb-2 text-xl font-semibold text-acePurple">{program.title}</h3>
              <p className="text-sm text-gray-600">{program.description?.slice(0, 120)}...</p>
              <p className="mt-2 text-sm text-gray-500">Status: {program.status}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => openMaterialsModal(program)}
                  className="px-3 py-1 text-white rounded bg-aceGreen hover:bg-acePurple"
                >
                  Manage Materials
                </button>
                <button
                  onClick={() => handleDeleteProgram(program.id)}
                  disabled={actionLoading}
                  className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Delete Program
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Materials Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto bg-black bg-opacity-50">
          <div className="relative w-full max-w-3xl p-6 bg-white dark:bg-gray-800 rounded-xl">
            <button
              onClick={() => setSelectedProgram(null)}
              className="absolute font-bold text-gray-600 top-4 right-4 hover:text-gray-900 dark:hover:text-white"
            >
              ✕
            </button>
            <h2 className="mb-4 text-2xl font-semibold text-acePurple">
              Materials: {selectedProgram.title}
            </h2>

            <form onSubmit={handleUploadMaterial} className="flex gap-2 mb-4">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full px-2 py-1 border rounded"
              />
              <button
                type="submit"
                disabled={actionLoading}
                className="px-4 py-2 text-white rounded bg-aceGreen hover:bg-acePurple"
              >
                {actionLoading ? "Uploading..." : "Upload"}
              </button>
            </form>

            <ul>
              {materials.map((mat) => {
                const publicUrl = supabase.storage.from(BUCKET_NAME).getPublicUrl(mat.file_url).data.publicUrl;
                return (
                  <li key={mat.id} className="flex items-center justify-between mb-2">
                    <a
                      href={publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {mat.title}
                    </a>
                    <button
                      onClick={() => handleDeleteMaterial(mat.id)}
                      disabled={actionLoading}
                      className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
