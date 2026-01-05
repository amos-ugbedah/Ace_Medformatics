export async function uploadToCloudinary(file) {
  try {
    console.log("📤 Cloudinary upload starting...");
    
    // Check if environment variables are set
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    
    console.log("🌤️ Cloudinary Config:", {
      cloudName,
      uploadPreset,
      hasCloudName: !!cloudName,
      hasUploadPreset: !!uploadPreset,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });
    
    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary environment variables not set. Check your .env file.");
    }
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName); // Add cloud_name to form data
    formData.append("folder", "acemedformatics/media"); // Optional: organize files
    
    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    console.log("🌐 API URL:", apiUrl);
    
    const res = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });
    
    console.log("📡 Cloudinary Response Status:", res.status, res.statusText);
    
    if (!res.ok) {
      // Try to get more detailed error info
      let errorText = "Unknown error";
      try {
        const errorData = await res.text();
        console.error("❌ Cloudinary error response:", errorData);
        errorText = errorData;
      } catch (e) {
        errorText = res.statusText;
      }
      
      throw new Error(`Cloudinary upload failed: ${res.status} ${res.statusText} - ${errorText}`);
    }
    
    const data = await res.json();
    console.log("✅ Cloudinary upload successful:", {
      secure_url: data.secure_url,
      public_id: data.public_id,
      format: data.format,
      bytes: data.bytes,
      width: data.width,
      height: data.height
    });
    
    return data;
    
  } catch (error) {
    console.error("❌ Cloudinary upload error details:", error);
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
}