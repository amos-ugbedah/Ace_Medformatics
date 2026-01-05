// src/lib/cloudinary.js - UPDATED WITH BETTER DEBUGGING
export async function uploadToCloudinary(file) {
  try {
    console.log("📤 Starting Cloudinary upload...");
    
    // DEBUG: Show ALL environment variables
    console.log("🔍 ALL ENV VARIABLES:", Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));
    
    // Try different ways to access env vars
    const env = import.meta.env;
    console.log("🔍 Specific env check:", {
      VITE_CLOUDINARY_CLOUD_NAME: env.VITE_CLOUDINARY_CLOUD_NAME,
      VITE_CLOUDINARY_UPLOAD_PRESET: env.VITE_CLOUDINARY_UPLOAD_PRESET,
      MODE: env.MODE,
      DEV: env.DEV,
      PROD: env.PROD
    });
    
    // Try to get values with fallbacks
    const cloudName = env.VITE_CLOUDINARY_CLOUD_NAME || "dycvjrjys";
    const uploadPreset = env.VITE_CLOUDINARY_UPLOAD_PRESET || "AC_MEDFORMATICSMEDIA";
    
    console.log("🌤️ Final Cloudinary config:", { cloudName, uploadPreset });
    
    // Create form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "acemedformatics/media");
    
    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    console.log("🌐 API URL:", apiUrl);
    
    const res = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });
    
    console.log("📡 Response status:", res.status, res.statusText);
    
    if (!res.ok) {
      let errorText = await res.text();
      console.error("❌ Cloudinary error:", errorText);
      throw new Error(`Upload failed: ${res.status} - ${errorText}`);
    }
    
    const data = await res.json();
    console.log("✅ Upload success! URL:", data.secure_url);
    
    return data;
    
  } catch (error) {
    console.error("❌ Upload failed:", error);
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
}