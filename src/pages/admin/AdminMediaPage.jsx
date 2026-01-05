import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { uploadToCloudinary } from "../../lib/cloudinary";
import { FaEdit, FaTrash, FaPlus, FaImage } from "react-icons/fa";

export default function AdminMediaPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

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
    try {
      const { data, error } = await supabase
        .from("media")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching media:", error);
        alert(`Failed to load media: ${error.message}`);
        return;
      }
      
      setMedia(data || []);
    } catch (error) {
      console.error("Unexpected error fetching media:", error);
    }
  }

  useEffect(() => {
    fetchMedia();
  }, []);

  // Handle image preview when file is selected
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size too large. Please select an image under 5MB.");
      e.target.value = ""; // Clear the input
      return;
    }

    // Check file type
    if (!file.type.match('image.*')) {
      alert("Please select an image file (JPEG, PNG, etc.).");
      e.target.value = ""; // Clear the input
      return;
    }

    // Update form
    setForm({ ...form, imageFile: file });

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Reset image preview when editing or clearing form
  useEffect(() => {
    if (showForm && editingItem) {
      // Show existing image when editing
      setImagePreview(editingItem.image_url || null);
    } else if (showForm && !editingItem) {
      // Clear preview when adding new
      setImagePreview(null);
    }
  }, [showForm, editingItem]);

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
      setImagePreview(editingItem.image_url || null);
    }
    if (showForm && !editingItem) {
      setForm(initialFormState);
      setImagePreview(null);
    }
  }, [showForm, editingItem]);

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setUploadProgress(0);

    let imageUrl = editingItem?.image_url || null;
    let imagePublicId = editingItem?.image_public_id || null;

    try {
      // Upload new image if provided
      if (form.imageFile) {
        console.log("Uploading image to Cloudinary...");
        
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return prev;
            }
            return prev + 10;
          });
        }, 200);
        
        try {
          const upload = await uploadToCloudinary(form.imageFile);
          clearInterval(progressInterval);
          setUploadProgress(100);
          
          if (!upload.secure_url || !upload.public_id) {
            throw new Error("Cloudinary upload failed - no URL or public ID returned");
          }
          
          imageUrl = upload.secure_url;
          imagePublicId = upload.public_id;
          console.log("✅ Image uploaded successfully:", imageUrl);
        } catch (uploadError) {
          clearInterval(progressInterval);
          console.error("❌ Cloudinary upload error:", uploadError);
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }
      }

      // Prepare data for Supabase
      const mediaData = {
        title: form.title.trim(),
        slug: form.slug.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        summary: form.summary.trim(),
        content: form.content.trim(),
        type: form.type,
        featured: form.featured,
        status: form.status,
        image_url: imageUrl,
        image_public_id: imagePublicId,
      };

      // Add published_at if status is published
      if (form.status === "published") {
        mediaData.published_at = editingItem?.published_at || new Date().toISOString();
      }

      console.log("📝 Saving to Supabase:", mediaData);
      
      let result;
      
      if (editingItem) {
        result = await supabase
          .from("media")
          .update(mediaData)
          .eq("id", editingItem.id)
          .select();
      } else {
        result = await supabase
          .from("media")
          .insert([mediaData])
          .select();
      }

      if (result.error) {
        console.error("❌ Supabase error:", result.error);
        throw new Error(`Database error: ${result.error.message}`);
      }

      console.log("✅ Save successful:", result.data);
      
      // Reset form and state
      setForm(initialFormState);
      setEditingItem(null);
      setShowForm(false);
      setImagePreview(null);
      setUploadProgress(0);
      
      // Refresh media list
      await fetchMedia();
      
      alert(editingItem ? "✅ Media updated successfully!" : "✅ Media created successfully!");
      
    } catch (error) {
      console.error("❌ Error saving media:", error);
      alert(`❌ Save failed: ${error.message}`);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  }

  // Handle delete
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this media item? This action cannot be undone.")) return;

    try {
      const { error } = await supabase
        .from("media")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Delete error:", error);
        alert(`Delete failed: ${error.message}`);
        return;
      }

      console.log("Item deleted successfully");
      fetchMedia();
      alert("✅ Media item deleted successfully!");
    } catch (error) {
      console.error("Unexpected delete error:", error);
      alert("❌ An unexpected error occurred while deleting.");
    }
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
            setImagePreview(null);
          }}
          className="flex items-center gap-2 px-4 py-2 text-white transition bg-black rounded-lg hover:bg-gray-900"
        >
          <FaPlus /> Add Media
        </button>
      </div>

      {/* ================= FORM MODAL ================= */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl p-6 space-y-5 text-left text-gray-900 bg-white border shadow-xl rounded-xl font-inter max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingItem ? "✏️ Edit Media" : "➕ Add New Media"}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                  setForm(initialFormState);
                  setImagePreview(null);
                  setUploadProgress(0);
                }}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Image Preview */}
            <div className="flex flex-col items-center gap-4">
              {imagePreview ? (
                <>
                  <div className="relative w-full max-w-xs">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="object-cover w-full h-48 rounded-lg"
                    />
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                        <div className="text-white">Uploading: {uploadProgress}%</div>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setForm({ ...form, imageFile: null });
                      setImagePreview(null);
                      // Clear file input
                      const fileInput = document.querySelector('input[type="file"]');
                      if (fileInput) fileInput.value = '';
                    }}
                    className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
                  >
                    Remove Image
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-48 max-w-xs p-8 border-2 border-dashed rounded-lg">
                  <FaImage className="w-12 h-12 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">No image selected</p>
                </div>
              )}
            </div>

            <div className="grid gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Image {!editingItem && "*"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-700 border rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-acePurple"
                  onChange={handleImageChange}
                  required={!editingItem}
                />
                <p className="mt-1 text-xs text-gray-500">
                  {editingItem ? "Select a new image to replace existing one" : "Select an image for this media (max 5MB)"}
                </p>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Title *
                </label>
                <input
                  className="w-full px-4 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-acePurple"
                  placeholder="Enter media title"
                  value={form.title}
                  required
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Slug *
                </label>
                <input
                  className="w-full px-4 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-acePurple"
                  placeholder="unique-slug-name"
                  value={form.slug}
                  required
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Use lowercase with hyphens (e.g., "my-media-article")
                </p>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Summary
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-acePurple text-gray-900 resize-y min-h-[80px]"
                  placeholder="Brief summary"
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-acePurple text-gray-900 resize-y min-h-[120px]"
                  placeholder="Full content or description"
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    className="w-full px-4 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-acePurple"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="press">Press</option>
                    <option value="news">News</option>
                    <option value="event">Event</option>
                    <option value="article">Article</option>
                    <option value="mention">Media Mention</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    className="w-full px-4 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-acePurple"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <label className="flex items-center gap-2 text-gray-800">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium">Feature in Hero Section</span>
              </label>
            </div>

            {/* Upload Progress Bar */}
            {uploadProgress > 0 && (
              <div className="pt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-center text-gray-500">
                  {uploadProgress < 100 ? "Uploading image..." : "Image uploaded!"}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-4 border-t">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 text-white transition bg-black rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
                    {editingItem ? "Updating..." : "Saving..."}
                  </span>
                ) : editingItem ? (
                  "Update Media"
                ) : (
                  "Save Media"
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                  setForm(initialFormState);
                  setImagePreview(null);
                  setUploadProgress(0);
                }}
                className="px-6 py-2 transition border rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= MEDIA LIST ================= */}
      {media.length === 0 ? (
        <div className="p-8 text-center bg-white border rounded-lg">
          <p className="text-gray-500">No media items found. Add your first media item!</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {displayedMedia.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 p-4 bg-white border rounded-lg shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="object-cover w-20 h-16 rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/80x64?text=No+Image";
                          e.target.className = "object-cover w-20 h-16 bg-gray-100 rounded";
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-20 h-16 bg-gray-100 rounded">
                        <FaImage className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="text-gray-900">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      {item.type} · {item.status}
                      {item.featured && " · ⭐ Featured"}
                    </p>
                    <p className="text-xs text-gray-400">
                      Created: {new Date(item.created_at).toLocaleDateString()}
                    </p>
                    {item.image_url && (
                      <p className="max-w-xs text-xs text-blue-500 truncate" title={item.image_url}>
                        Image: {item.image_url.substring(0, 50)}...
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setShowForm(true);
                    }}
                    className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                    title="Edit"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-2 px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
                    title="Delete"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {media.length > 6 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-4 py-2 text-sm underline hover:text-gray-900"
              >
                {showAll ? "Show Less" : `View All (${media.length})`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}