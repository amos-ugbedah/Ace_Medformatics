import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { uploadToCloudinary } from "../../lib/cloudinary";
import { FaEdit, FaTrash, FaPlus, FaImage, FaTimes, FaCheck, FaExternalLinkAlt } from "react-icons/fa";

export default function AdminMediaPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });

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

  // Show notification
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: '', message: '' }), 5000);
  };

  // Fetch media from Supabase
  async function fetchMedia() {
    try {
      const { data, error } = await supabase
        .from("media")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      setMedia(data || []);
    } catch (error) {
      console.error("Error fetching media:", error);
      showNotification('error', `Failed to load media: ${error.message}`);
    }
  }

  useEffect(() => {
    fetchMedia();
  }, []);

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Auto-generate slug when title changes
  useEffect(() => {
    if (form.title && !editingItem) {
      setForm(prev => ({
        ...prev,
        slug: generateSlug(prev.title)
      }));
    }
  }, [form.title, editingItem]);

  // Handle image preview when file is selected
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (limit to 10MB for Cloudinary free tier)
    if (file.size > 10 * 1024 * 1024) {
      showNotification('error', "File size too large. Please select an image under 10MB.");
      e.target.value = "";
      return;
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      showNotification('error', "Please select a valid image file (JPEG, PNG, GIF, WEBP, SVG).");
      e.target.value = "";
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

  // Set form state when editing
  const startEditing = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title || "",
      slug: item.slug || "",
      summary: item.summary || "",
      content: item.content || "",
      type: item.type || "press",
      featured: item.featured || false,
      status: item.status || "draft",
      imageFile: null,
    });
    setImagePreview(item.image_url || null);
    setShowForm(true);
  };

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setImageUploading(false);

    let imageUrl = editingItem?.image_url || null;
    let imagePublicId = editingItem?.image_public_id || null;

    try {
      // Validate required fields
      if (!form.title.trim() || !form.slug.trim()) {
        throw new Error("Title and slug are required");
      }

      // Upload new image if provided
      if (form.imageFile) {
        setImageUploading(true);
        try {
          console.log("Uploading to Cloudinary...");
          const upload = await uploadToCloudinary(form.imageFile);
          
          if (!upload.secure_url) {
            throw new Error("Cloudinary upload failed - no URL returned");
          }
          
          imageUrl = upload.secure_url;
          imagePublicId = upload.public_id;
          console.log("✅ Image uploaded:", imageUrl);
        } catch (uploadError) {
          console.error("Cloudinary error:", uploadError);
          // Ask user if they want to continue without image
          const shouldContinue = window.confirm(
            "Image upload failed. Would you like to save without image?\n\n" +
            "Error: " + uploadError.message
          );
          
          if (!shouldContinue) {
            setLoading(false);
            setImageUploading(false);
            return;
          }
        } finally {
          setImageUploading(false);
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
        updated_at_at: new Date().toISOString(),
      };

      // Add published_at if status is published
      if (form.status === "published" && !editingItem?.published_at) {
        mediaData.published_at = new Date().toISOString();
      } else if (form.status === "published" && editingItem?.published_at) {
        mediaData.published_at = editingItem.published_at;
      }

      let result;
      
      if (editingItem) {
        result = await supabase
          .from("media")
          .update(mediaData)
          .eq("id", editingItem.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from("media")
          .insert([{ ...mediaData, created_at: new Date().toISOString() }])
          .select()
          .single();
      }

      if (result.error) throw result.error;

      // Show success message
      showNotification('success', 
        editingItem ? "✅ Media updated successfully!" : "✅ Media created successfully!"
      );

      // Reset form and close
      resetForm();
      fetchMedia();
      
    } catch (error) {
      console.error("❌ Error saving media:", error);
      showNotification('error', `Save failed: ${error.message}`);
    } finally {
      setLoading(false);
      setImageUploading(false);
    }
  }

  // Reset form
  const resetForm = () => {
    setForm(initialFormState);
    setEditingItem(null);
    setShowForm(false);
    setImagePreview(null);
  };

  // Handle delete
  async function handleDelete(id, title) {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) return;

    try {
      const { error } = await supabase
        .from("media")
        .delete()
        .eq("id", id);

      if (error) throw error;

      showNotification('success', "✅ Media item deleted successfully!");
      fetchMedia();
    } catch (error) {
      console.error("Delete error:", error);
      showNotification('error', `Delete failed: ${error.message}`);
    }
  }

  // Handle status toggle
  async function toggleStatus(id, currentStatus, title) {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    
    try {
      const updateData = { status: newStatus };
      if (newStatus === 'published') {
        updateData.published_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from("media")
        .update(updateData)
        .eq("id", id);

      if (error) throw error;

      showNotification('success', `✅ "${title}" ${newStatus === 'published' ? 'published' : 'unpublished'}!`);
      fetchMedia();
    } catch (error) {
      console.error("Status toggle error:", error);
      showNotification('error', `Failed to update status: ${error.message}`);
    }
  }

  // Handle featured toggle
  async function toggleFeatured(id, currentFeatured, title) {
    const newFeatured = !currentFeatured;
    
    try {
      const { error } = await supabase
        .from("media")
        .update({ featured: newFeatured })
        .eq("id", id);

      if (error) throw error;

      showNotification('success', 
        newFeatured ? `✅ "${title}" added to featured!` : `✅ "${title}" removed from featured!`
      );
      fetchMedia();
    } catch (error) {
      console.error("Featured toggle error:", error);
      showNotification('error', `Failed to update featured status: ${error.message}`);
    }
  }

  const displayedMedia = showAll ? media : media.slice(0, 10);

  return (
    <div className="p-4 mx-auto max-w-7xl md:p-6 font-inter">
      {/* Notification Toast */}
      {notification.message && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 ${
          notification.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
          notification.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
          'bg-blue-100 text-blue-800 border border-blue-200'
        }`}>
          {notification.type === 'error' ? '❌' : notification.type === 'success' ? '✅' : 'ℹ️'}
          <span className="font-medium">{notification.message}</span>
          <button onClick={() => setNotification({ type: '', message: '' })} className="ml-2">
            <FaTimes />
          </button>
        </div>
      )}

      <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">Media & Press</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {media.length} media items • {media.filter(m => m.status === 'published').length} published
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            {showAll ? "Show Less" : `Show All (${media.length})`}
          </button>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-black rounded-lg hover:bg-gray-800"
          >
            <FaPlus /> Add Media
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 bg-white border rounded-lg dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Media</p>
          <p className="text-2xl font-bold">{media.length}</p>
        </div>
        <div className="p-4 bg-white border rounded-lg dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
          <p className="text-2xl font-bold text-green-600">{media.filter(m => m.status === 'published').length}</p>
        </div>
        <div className="p-4 bg-white border rounded-lg dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">Drafts</p>
          <p className="text-2xl font-bold text-yellow-600">{media.filter(m => m.status === 'draft').length}</p>
        </div>
        <div className="p-4 bg-white border rounded-lg dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">Featured</p>
          <p className="text-2xl font-bold text-purple-600">{media.filter(m => m.featured).length}</p>
        </div>
      </div>

      {/* ================= FORM MODAL ================= */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-4xl bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-2xl rounded-xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingItem ? "✏️ Edit Media" : "➕ Add New Media"}
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {editingItem ? "Update existing media item" : "Create a new media item"}
                </p>
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Left Column - Image */}
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                      Image {!editingItem && <span className="text-red-500">*</span>}
                    </label>
                    <div className="p-6 text-center transition-colors border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600">
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="object-cover w-full h-64 rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setForm({ ...form, imageFile: null });
                              setImagePreview(null);
                              const fileInput = document.querySelector('input[type="file"]');
                              if (fileInput) fileInput.value = '';
                            }}
                            className="absolute p-2 text-white bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className="py-12">
                          <FaImage className="mx-auto mb-4 text-4xl text-gray-400" />
                          <p className="mb-2 text-gray-600 dark:text-gray-400">
                            Drag & drop or click to upload
                          </p>
                          <p className="mb-4 text-sm text-gray-500">
                            Supports JPEG, PNG, GIF, WEBP (Max 10MB)
                          </p>
                          <label className="cursor-pointer">
                            <span className="px-4 py-2 text-white bg-gray-900 rounded-lg hover:bg-gray-800">
                              Choose Image
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageChange}
                              required={!editingItem}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                    {imageUploading && (
                      <div className="mt-2 text-sm text-blue-600">
                        ⏳ Uploading image...
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                        Type
                      </label>
                      <select
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                      >
                        <option value="press">Press Release</option>
                        <option value="news">News</option>
                        <option value="event">Event</option>
                        <option value="article">Article</option>
                        <option value="mention">Media Mention</option>
                        <option value="video">Video</option>
                        <option value="podcast">Podcast</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.featured}
                          onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-gray-900 dark:text-white">Feature in Hero</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Column - Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
                      placeholder="Enter media title"
                      value={form.title}
                      required
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                      Slug <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
                      placeholder="unique-slug-name"
                      value={form.slug}
                      required
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      URL-friendly version of title (auto-generated)
                    </p>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                      Summary
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
                      placeholder="Brief summary or excerpt"
                      rows="3"
                      value={form.summary}
                      onChange={(e) => setForm({ ...form, summary: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                      Content
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
                      placeholder="Full content or description"
                      rows="5"
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                        Status
                      </label>
                      <select
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {editingItem ? (
                    <>Last updated: {new Date(editingItem.updated_at || editingItem.created_at).toLocaleDateString()}</>
                  ) : (
                    "New media item"
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    disabled={loading || imageUploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || imageUploading}
                    className="flex items-center gap-2 px-5 py-2 text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                        {editingItem ? "Updating..." : "Saving..."}
                      </>
                    ) : editingItem ? (
                      "Update Media"
                    ) : (
                      "Save Media"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ================= MEDIA LIST ================= */}
      {media.length === 0 ? (
        <div className="py-16 text-center border-2 border-gray-300 border-dashed dark:border-gray-700 rounded-xl">
          <FaImage className="mx-auto mb-4 text-4xl text-gray-400" />
          <h3 className="mb-2 text-xl font-semibold text-gray-600 dark:text-gray-400">
            No media items yet
          </h3>
          <p className="mb-6 text-gray-500 dark:text-gray-500">
            Get started by adding your first media item
          </p>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-800"
          >
            <FaPlus className="inline mr-2" />
            Add Your First Media
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {displayedMedia.map((item) => (
              <div
                key={item.id}
                className="p-4 transition-shadow bg-white border dark:bg-gray-800 dark:border-gray-700 rounded-xl hover:shadow-md"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-24 overflow-hidden bg-gray-100 rounded-lg dark:bg-gray-700">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-size='12' text-anchor='middle' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <FaImage className="text-2xl text-gray-400" />
                        </div>
                      )}
                      {item.featured && (
                        <div className="absolute px-2 py-1 text-xs text-white bg-purple-600 rounded top-2 left-2">
                          ⭐ Featured
                        </div>
                      )}
                      <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded ${
                        item.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status === 'published' ? 'Published' : 'Draft'}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 truncate dark:text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {item.summary || "No summary provided"}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          <span className="px-2 py-1 text-xs bg-gray-100 rounded dark:bg-gray-700">
                            {item.type}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(item.created_at).toLocaleDateString()}
                          </span>
                          {item.published_at && (
                            <span className="text-xs text-gray-500">
                              Published: {new Date(item.published_at).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleStatus(item.id, item.status, item.title)}
                          className={`px-3 py-1.5 text-sm rounded ${
                            item.status === 'published'
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                          title={item.status === 'published' ? 'Unpublish' : 'Publish'}
                        >
                          {item.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        
                        <button
                          onClick={() => toggleFeatured(item.id, item.featured, item.title)}
                          className={`px-3 py-1.5 text-sm rounded ${
                            item.featured
                              ? 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                          title={item.featured ? 'Remove from featured' : 'Add to featured'}
                        >
                          {item.featured ? 'Unfeature' : 'Feature'}
                        </button>
                        
                        <button
                          onClick={() => startEditing(item)}
                          className="px-3 py-1.5 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="px-3 py-1.5 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {media.length > 10 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                {showAll ? (
                  <>
                    <FaTimes className="inline mr-2" />
                    Show Less
                  </>
                ) : (
                  <>
                    <FaExternalLinkAlt className="inline mr-2" />
                    Load More ({media.length - 10} more)
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}