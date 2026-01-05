// src/lib/cloudinary.js
export async function uploadToCloudinary(file) {
  try {
    console.log("📤 Starting Cloudinary upload...", file.name);
    
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    
    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary configuration is missing. Check your environment variables.");
    }
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);
    formData.append("folder", "acemedformatics/media");
    
    // Optional: Add transformations
    formData.append("transformation", "c_fill,g_auto,w_1200,h_630");
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    
    console.log("📡 Cloudinary response status:", response.status);
    
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error?.message || JSON.stringify(errorData);
      } catch {
        const text = await response.text();
        errorMessage = text || errorMessage;
      }
      throw new Error(`Cloudinary upload failed: ${errorMessage}`);
    }
    
    const data = await response.json();
    
    if (!data.secure_url) {
      throw new Error("Cloudinary response missing secure_url");
    }
    
    console.log("✅ Cloudinary upload successful!");
    console.log("📸 URL:", data.secure_url);
    console.log("🆔 Public ID:", data.public_id);
    
    return {
      secure_url: data.secure_url,
      public_id: data.public_id,
      format: data.format,
      bytes: data.bytes,
      width: data.width,
      height: data.height
    };
    
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
}