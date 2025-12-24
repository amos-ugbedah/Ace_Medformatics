import axios from "axios";

// Upload file to Cloudinary (unsigned)
export const uploadToCloudinary = async (file, folder = "ace_medformatics") => {
  if (!file) return null;

  const url = `https://api.cloudinary.com/v1_1/dycvjrjys/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ace_medformatics_unsigned");
  formData.append("folder", folder);

  try {
    const response = await axios.post(url, formData);
    return response.data.secure_url; // URL to save in Supabase
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};
