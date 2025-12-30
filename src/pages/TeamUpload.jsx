// src/pages/TeamUpload.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadToCloudinary } from "../utils/cloudinary";
import { supabase } from "../supabaseClient";

export default function TeamUpload() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const imageUrl = await uploadToCloudinary(data.profile_image[0], "team_members");

      if (imageUrl) {
        const { error } = await supabase.from("team_members").insert([
          {
            full_name: data.full_name,
            position: data.position,
            role: data.role,
            profile_image_url: imageUrl,
          },
        ]);

        if (error) throw error;
        alert("Team member uploaded successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading team member.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md p-6 mx-auto space-y-4 bg-white shadow-md dark:bg-gray-800 rounded-xl font-inter"
    >
      <input
        {...register("full_name")}
        placeholder="Full Name"
        required
        className="w-full px-4 py-2 text-gray-900 transition-colors duration-300 border border-gray-300 rounded-md dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-acePurple dark:focus:ring-aceGreen"
      />
      <input
        {...register("position")}
        placeholder="Position"
        required
        className="w-full px-4 py-2 text-gray-900 transition-colors duration-300 border border-gray-300 rounded-md dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-acePurple dark:focus:ring-aceGreen"
      />
      <textarea
        {...register("role")}
        placeholder="Role Description"
        className="w-full px-4 py-2 text-gray-900 transition-colors duration-300 border border-gray-300 rounded-md dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-acePurple dark:focus:ring-aceGreen"
        rows={4}
      />
      <input
        type="file"
        {...register("profile_image")}
        accept="image/*"
        required
        className="w-full text-gray-900 dark:text-gray-200"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 font-semibold text-white transition-colors duration-300 rounded-md bg-acePurple dark:bg-aceGreen dark:text-aceDark hover:bg-aceGreen dark:hover:bg-acePurple"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
