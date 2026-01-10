import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { uploadToCloudinary } from "../../lib/cloudinary";
import {
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

export default function AdminMediaPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [notification, setNotification] = useState(null);

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

  const notify = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  /* ================= FETCH ================= */
  async function fetchMedia() {
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setMedia(data || []);
  }

  useEffect(() => {
    fetchMedia();
  }, []);

  /* ================= SLUG ================= */
  useEffect(() => {
    if (!editingItem && form.title) {
      setForm((p) => ({
        ...p,
        slug: p.title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-"),
      }));
    }
  }, [form.title, editingItem]);

  /* ================= IMAGE ================= */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm({ ...form, imageFile: file });
    setImagePreview(URL.createObjectURL(file));
  };

  /* ================= EDIT ================= */
  const startEditing = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      slug: item.slug,
      summary: item.summary || "",
      content: item.content || "",
      type: item.type,
      featured: item.featured,
      status: item.status,
      imageFile: null,
    });
    setImagePreview(item.image_url);
    setShowForm(true);
  };

  /* ================= SUBMIT ================= */
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let image_url = editingItem?.image_url || null;
      let image_public_id = editingItem?.image_public_id || null;

      if (form.imageFile) {
        setImageUploading(true);
        const upload = await uploadToCloudinary(form.imageFile);
        image_url = upload.secure_url;
        image_public_id = upload.public_id;
        setImageUploading(false);
      }

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        summary: form.summary || null,
        content: form.content || null,
        type: form.type,
        featured: form.featured,
        status: form.status,
        image_url,
        image_public_id,
        updated_at: new Date().toISOString(),
        ...(form.status === "published" && {
          published_at:
            editingItem?.published_at || new Date().toISOString(),
        }),
      };

      let res;
      if (editingItem) {
        res = await supabase
          .from("media")
          .update(payload)
          .eq("id", editingItem.id);
      } else {
        res = await supabase.from("media").insert(payload);
      }

      if (res.error) throw res.error;

      notify("success", editingItem ? "Media updated" : "Media created");
      setShowForm(false);
      setEditingItem(null);
      setForm(initialFormState);
      setImagePreview(null);
      fetchMedia();
    } catch (err) {
      notify("error", err.message);
    } finally {
      setLoading(false);
      setImageUploading(false);
    }
  }

  /* ================= DELETE ================= */
  async function handleDelete(id) {
    await supabase.from("media").delete().eq("id", id);
    fetchMedia();
  }

  /* ================= UI ================= */
  return (
    <div className="p-6 mx-auto max-w-7xl font-inter">
      {notification && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded shadow-lg ${
            notification.type === "error"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Media & Press</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingItem(null);
            setForm(initialFormState);
            setImagePreview(null);
          }}
          className="flex items-center gap-2 px-4 py-2 text-white bg-black rounded"
        >
          <FaPlus />
          Add Media
        </button>
      </div>

      {/* ================= FORM ================= */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 mb-10 space-y-3 bg-white shadow rounded-xl"
        >
          {/* Title */}
          <input
            className="w-full p-3 mb-3 text-black placeholder-black border rounded focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          {/* Slug */}
          <input
            className="w-full p-3 mb-3 text-black placeholder-black border rounded focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            required
          />

          {/* Summary */}
          <textarea
            className="w-full p-3 mb-3 text-black placeholder-black border rounded focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Summary"
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
          />

          {/* Content */}
          <textarea
            className="w-full p-3 mb-3 text-black placeholder-black border rounded focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />

          {/* Type */}
          <select
            className="w-full p-3 mb-3 text-black border rounded focus:outline-none focus:ring-2 focus:ring-black"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="press">Press</option>
            <option value="article">Article</option>
            <option value="news">News</option>
            <option value="mention">Mention</option>
            <option value="event">Event</option>
          </select>

          {/* Status */}
          <select
            className="w-full p-3 mb-3 text-black border rounded focus:outline-none focus:ring-2 focus:ring-black"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="draft">Draft</option>
            <option value="published">Publish</option>
          </select>

          {/* Featured checkbox */}
          <label className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                setForm({ ...form, featured: e.target.checked })
              }
            />
            Mark as Featured
          </label>

          {/* Image */}
          <div className="mb-3">
            <input type="file" onChange={handleImageChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="object-cover w-32 h-32 mt-2 rounded"
              />
            )}
          </div>

          <button
            disabled={loading || imageUploading}
            className="px-6 py-2 mt-4 text-white bg-black rounded"
          >
            {loading || imageUploading ? "Saving..." : "Save Media"}
          </button>
        </form>
      )}

      {/* ================= LIST ================= */}
      <div className="grid gap-4">
        {media.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border rounded"
          >
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500 capitalize">
                {item.type} • {item.status}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEditing(item)}>
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(item.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
