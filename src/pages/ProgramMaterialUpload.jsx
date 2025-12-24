import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadToCloudinary } from "../utils/cloudinary";
import { supabase } from "../supabaseClient";

export default function ProgramMaterialUpload() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    const fileUrl = await uploadToCloudinary(data.file[0], "program_materials");

    if (fileUrl) {
      const { error } = await supabase.from("program_materials").insert([
        {
          program_id: data.program_id,
          title: data.title,
          file_url: fileUrl,
        },
      ]);
      if (error) console.error(error);
      else alert("Program material uploaded successfully!");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
      <input {...register("title")} placeholder="Material Title" required className="input" />
      <input {...register("program_id")} placeholder="Program ID" type="number" required className="input" />
      <input type="file" {...register("file")} accept="application/pdf" required />
      <button type="submit" disabled={loading} className="btn">
        {loading ? "Uploading..." : "Upload Material"}
      </button>
    </form>
  );
}