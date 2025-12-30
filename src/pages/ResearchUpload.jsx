// src/pages/ResearchUpload.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadToCloudinary } from "../utils/cloudinary";
import { supabase } from "../supabaseClient";

export default function ResearchUpload() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const pdfUrl = await uploadToCloudinary(data.document[0], "research_documents");

      if (pdfUrl) {
        const { error } = await supabase.from("research").insert([
          {
            title: data.title,
            authors: data.authors,
            abstract: data.abstract,
            publication_year: data.publication_year,
            document_url: pdfUrl,
          },
        ]);

        if (error) throw error;
        alert("Research uploaded successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading research.");
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
        {...register("title")}
        placeholder="Title"
        required
        className="w-full px-4 py-2 text-gray-900 transition-colors duration-300 border border-gray-300 rounded-md dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-acePurple dark:focus:ring-aceGreen"
      />
      <input
        {...register("authors")}
        placeholder="Authors"
        required
        className="w-full px-4 py-2 text-gray-900 transition-colors duration-300 border border-gray-300 rounded-md dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-acePurple dark:focus:ring-aceGreen"
      />
      <textarea
        {...register("abstract")}
        placeholder="Abstract"
        className="w-full px-4 py-2 text-gray-900 transition-colors duration-300 border border-gray-300 rounded-md dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-acePurple dark:focus:ring-aceGreen"
        rows={4}
      />
      <input
        {...register("publication_year")}
        placeholder="Publication Year"
        type="number"
        className="w-full px-4 py-2 text-gray-900 transition-colors duration-300 border border-gray-300 rounded-md dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-acePurple dark:focus:ring-aceGreen"
      />
      <input
        type="file"
        {...register("document")}
        accept="application/pdf"
        required
        className="w-full text-gray-900 dark:text-gray-200"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 font-semibold text-white transition-colors duration-300 rounded-md bg-acePurple dark:bg-aceGreen dark:text-aceDark hover:bg-aceGreen dark:hover:bg-acePurple"
      >
        {loading ? "Uploading..." : "Upload PDF"}
      </button>
    </form>
  );
}
