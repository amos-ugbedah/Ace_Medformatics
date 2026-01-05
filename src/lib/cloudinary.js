// /lib/cloudinary.js
export const uploadToCloudinary = async (file) => {
  try {
    console.log("Starting Cloudinary upload...", file);
    
    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'your_upload_preset');
    formData.append('cloud_name', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'your_cloud_name');
    formData.append('folder', 'acemedformatics/media'); // Optional: organize in folder
    
    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'your_cloud_name'}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Cloudinary API error:", errorData);
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.secure_url) {
      throw new Error('No secure_url returned from Cloudinary');
    }
    
    console.log("Cloudinary upload success:", {
      secure_url: data.secure_url,
      public_id: data.public_id,
      format: data.format,
      bytes: data.bytes
    });
    
    return {
      secure_url: data.secure_url,
      public_id: data.public_id,
      format: data.format,
      bytes: data.bytes
    };
    
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};