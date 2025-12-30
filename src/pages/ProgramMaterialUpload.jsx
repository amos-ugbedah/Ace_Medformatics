import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadToCloudinary } from "../utils/cloudinary";
import { supabase } from "../lib/supabaseClient";

export function ProgramMaterialUpload() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const fileUrl = await uploadToCloudinary(data.file[0], "program_materials");

      if (fileUrl) {
        const { error } = await supabase.from("program_materials").insert([
          {
            program_id: data.program_id,
            title: data.title,
            file_url: fileUrl,
          },
        ]);

        if (error) throw error;
        alert("Program material uploaded successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading material.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md p-6 mx-auto space-y-4 bg-white shadow-md font-inter dark:bg-gray-800 rounded-xl"
    >
      <input
        {...register("title")}
        placeholder="Material Title"
        required
        className="w-full px-4 py-2 text-gray-700 border rounded-md dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-acePurple dark:focus:ring-aceGreen"
      />
      <input
        {...register("program_id")}
        placeholder="Program ID"
        type="number"
        required
        className="w-full px-4 py-2 text-gray-700 border rounded-md dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-acePurple dark:focus:ring-aceGreen"
      />
      <input
        type="file"
        {...register("file")}
        accept="application/pdf"
        required
        className="w-full text-gray-700 dark:text-gray-200"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 font-medium text-white transition-colors duration-300 rounded-md bg-acePurple dark:bg-aceGreen dark:text-aceDark hover:bg-aceGreen dark:hover:bg-acePurple"
      >
        {loading ? "Uploading..." : "Upload Material"}
      </button>
    </form>
  );
}