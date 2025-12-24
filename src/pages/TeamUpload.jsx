import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadToCloudinary } from "../utils/cloudinary";
import { supabase } from "../supabaseClient";

export default function TeamUpload() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

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
      if (error) console.error(error);
      else alert("Team member uploaded successfully!");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
      <input {...register("full_name")} placeholder="Full Name" required className="input" />
      <input {...register("position")} placeholder="Position" required className="input" />
      <textarea {...register("role")} placeholder="Role Description" className="input" />
      <input type="file" {...register("profile_image")} accept="image/*" required />
      <button type="submit" disabled={loading} className="btn">
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
