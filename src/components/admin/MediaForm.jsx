import { FaTimes } from "react-icons/fa";

export default function MediaForm({ form, setForm, onSubmit, loading, onCancel, editingItem }) {
  return (
    <form
      onSubmit={onSubmit}
      className="p-6 mb-10 space-y-4 bg-white border rounded-xl"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">
          {editingItem ? "Edit Media" : "Add New Media"}
        </h2>
        <button type="button" onClick={onCancel} className="text-red-600">
          <FaTimes />
        </button>
      </div>

      <input
        className="w-full input"
        placeholder="Title"
        value={form.title}
        required
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        className="w-full input"
        placeholder="Slug"
        value={form.slug}
        required
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
      />

      <textarea
        className="w-full textarea"
        placeholder="Summary"
        value={form.summary}
        onChange={(e) => setForm({ ...form, summary: e.target.value })}
      />

      <textarea
        className="w-full h-40 textarea"
        placeholder="Full content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setForm({ ...form, imageFile: e.target.files[0] })}
      />

      <div className="flex gap-4">
        <select
          className="input"
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
          className="input"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => setForm({ ...form, featured: e.target.checked })}
        />
        Feature in Hero
      </label>

      <div className="flex gap-3">
        <button
          disabled={loading}
          className="px-6 py-2 text-white bg-black rounded-lg"
        >
          {loading ? "Saving..." : editingItem ? "Update Media" : "Save Media"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
