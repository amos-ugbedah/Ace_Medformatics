import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { uploadToCloudinary } from "../../lib/cloudinary";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function AdminMediaPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const initialFormState = {
    title: "",
    slug: "",
    summary: "",
    content: "",
    type: "press",
    featured: false,
    status: "draft",
    imageFile: null,
  };

  const [form, setForm] = useState(initialFormState);

  // Fetch media from Supabase
  async function fetchMedia() {
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setMedia(data || []);
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchMedia();
    };
    fetchData();
  }, []);

  // Removed useEffect that sets showForm when editingItem changes to avoid cascading renders

  // Set form state when form is shown for editing
  useEffect(() => {
    if (showForm && editingItem) {
      setForm({
        title: editingItem?.title || "",
        slug: editingItem?.slug || "",
        summary: editingItem?.summary || "",
        content: editingItem?.content || "",
        type: editingItem?.type || "press",
        featured: editingItem?.featured || false,
        status: editingItem?.status || "draft",
        imageFile: null,
      });
    }
    if (showForm && !editingItem) {
      setForm(initialFormState);
    }
  }, [showForm, editingItem]);

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let imageUrl = editingItem?.image_url || null;
    let imagePublicId = editingItem?.image_public_id || null;

    if (form.imageFile) {
      const upload = await uploadToCloudinary(form.imageFile);
      imageUrl = upload.secure_url;
      imagePublicId = upload.public_id;
    }

    if (editingItem) {
      await supabase
        .from("media")
        .update({
          title: form.title,
          slug: form.slug,
          summary: form.summary,
          content: form.content,
          type: form.type,
          featured: form.featured,
          status: form.status,
          image_url: imageUrl,
          image_public_id: imagePublicId,
          published_at:
            form.status === "published"
              ? editingItem.published_at || new Date()
              : null,
        })
        .eq("id", editingItem.id);
    } else {
      await supabase.from("media").insert([
        {
          title: form.title,
          slug: form.slug,
          summary: form.summary,
          content: form.content,
          type: form.type,
          featured: form.featured,
          status: form.status,
          image_url: imageUrl,
          image_public_id: imagePublicId,
          published_at: form.status === "published" ? new Date() : null,
        },
      ]);
    }

    setLoading(false);
    setForm(initialFormState);
    setEditingItem(null);
    setShowForm(false);
    fetchMedia();
  }

  // Handle delete
  async function handleDelete(id) {
    if (!confirm("Delete this media item?")) return;
    await supabase.from("media").delete().eq("id", id);
    fetchMedia();
  }

  const displayedMedia = showAll ? media : media.slice(0, 6);

  return (
    <div className="max-w-6xl p-6 mx-auto font-inter">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Media & Press</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingItem(null);
            setForm(initialFormState);
          }}
          className="flex items-center gap-2 px-4 py-2 text-white transition bg-black rounded-lg hover:bg-gray-900"
        >
          <FaPlus /> Add Media
        </button>
      </div>

      {/* ================= FORM MODAL ================= */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 mb-10 space-y-5 text-left text-gray-900 bg-white border shadow-md rounded-xl font-inter"
        >
          <h2 className="text-xl font-semibold text-gray-900">
            {editingItem ? "Edit Media" : "Add New Media"}
          </h2>

          <input
            className="w-full px-4 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-acePurple"
            placeholder="Title"
            value={form.title}
            required
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            className="w-full px-4 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-acePurple"
            placeholder="Slug"
            value={form.slug}
            required
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />

          <textarea
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-acePurple text-gray-900 resize-y min-h-[80px]"
            placeholder="Summary"
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
          />

          <textarea
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-acePurple text-gray-900 resize-y min-h-[120px]"
            placeholder="Full content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />

          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-700"
            onChange={(e) => setForm({ ...form, imageFile: e.target.files[0] })}
          />

          <div className="flex flex-wrap gap-4">
            <select
              className="px-4 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-acePurple"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="press">Press</option>
              <option value="news">News</option>
              <option value="event">Event</option>
              <option value="article">Article</option>
              <option value="mention">Media Mention</option>
            </select>

            <select
              className="px-4 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-acePurple"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-gray-800">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            Feature in Hero
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              disabled={loading}
              className="px-6 py-2 text-white transition bg-black rounded-lg hover:bg-gray-900"
            >
              {loading ? "Saving..." : editingItem ? "Update Media" : "Save Media"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingItem(null);
                setForm(initialFormState);
              }}
              className="px-6 py-2 transition border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* ================= MEDIA LIST ================= */}
      <div className="space-y-4">
        {displayedMedia.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 p-4 bg-white border rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="object-cover w-20 h-16 rounded"
                />
              )}
              <div className="text-gray-900">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">
                  {item.type} · {item.status}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditingItem(item);
                  setShowForm(true);
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {media.length > 6 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm underline hover:text-gray-900"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </div>
  );
}
