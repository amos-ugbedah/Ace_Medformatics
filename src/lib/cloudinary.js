export async function uploadToCloudinary(file) {
  try {
    console.log("📤 Starting Cloudinary upload...");
    
    // Use your actual values - they should load from .env
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dycvjrjys";
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "AC_MEDFORMATICSMEDIA";
    
    console.log("🌤️ Using Cloudinary:", { cloudName, uploadPreset });
    
    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary config missing! Check .env file");
    }
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "acemedformatics/media"); // Optional: organize
    
    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    console.log("🌐 Calling:", apiUrl);
    
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
    console.log("🆔 Public ID:", data.public_id);
    
    return data;
    
  } catch (error) {
    console.error("❌ Upload failed:", error);
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
}