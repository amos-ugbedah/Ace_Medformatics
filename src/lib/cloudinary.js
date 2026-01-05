// src/lib/cloudinary.js
export async function uploadToCloudinary(file) {
  try {
    console.log("📤 Starting Cloudinary upload...");
    console.log("📁 File details:", {
      name: file.name,
      size: file.size,
      type: file.type
    });
    
    // Debug: Log all environment variables (remove in production)
    console.log("🌤️ Environment check:", {
      VITE_CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      VITE_CLOUDINARY_UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ? "Set" : "Missing",
      MODE: import.meta.env.MODE
    });
    
    // Get values from environment variables
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    
    if (!cloudName || cloudName === "your_cloud_name_here") {
      throw new Error("Cloudinary Cloud Name is not configured. Check your .env file.");
    }
    
    if (!uploadPreset || uploadPreset === "your_upload_preset_here") {
      throw new Error("Cloudinary Upload Preset is not configured. Check your .env file.");
    }
    
    console.log("✅ Cloudinary config loaded:", { cloudName, uploadPreset });
    
    // Create form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "acemedformatics/media");
    
    // Add timestamp to prevent caching issues
    formData.append("timestamp", Date.now());
    
    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    console.log("🌐 API URL:", apiUrl);
    
    // Make the request
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });
    
    console.log("📡 Response status:", response.status, response.statusText);
    
    if (!response.ok) {
      let errorText = "Unknown error";
      try {
        errorText = await response.text();
      } catch (e) {
        errorText = response.statusText;
      }
      
      console.error("❌ Cloudinary API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      
      throw new Error(`Cloudinary upload failed (${response.status}): ${errorText}`);
    }
    
    const data = await response.json();
    
    if (!data.secure_url) {
      throw new Error("Cloudinary response missing secure_url");
    }
    
    console.log("✅ Upload successful!");
    console.log("📸 Image URL:", data.secure_url);
    console.log("🆔 Public ID:", data.public_id);
    console.log("📊 Image info:", {
      format: data.format,
      width: data.width,
      height: data.height,
      bytes: data.bytes
    });
    
    return {
      secure_url: data.secure_url,
      public_id: data.public_id,
      format: data.format,
      bytes: data.bytes,
      width: data.width,
      height: data.height
    };
    
  } catch (error) {
    console.error("❌ Cloudinary upload error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // Provide more helpful error message
    if (error.message.includes("Cloudinary config")) {
      throw error; // Keep original config error
    }
    
    throw new Error(`Failed to upload image: ${error.message}`);
  }
}