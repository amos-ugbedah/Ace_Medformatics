import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadToCloudinary } from "../utils/cloudinary";
import { supabase } from "../supabaseClient";

export default function ResearchUpload() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

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
      if (error) console.error(error);
      else alert("Research uploaded successfully!");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
      <input {...register("title")} placeholder="Title" required className="input" />
      <input {...register("authors")} placeholder="Authors" required className="input" />
      <textarea {...register("abstract")} placeholder="Abstract" className="input" />
      <input {...register("publication_year")} placeholder="Publication Year" type="number" className="input" />
      <input type="file" {...register("document")} accept="application/pdf" required />
      <button type="submit" disabled={loading} className="btn">
        {loading ? "Uploading..." : "Upload PDF"}
      </button>
    </form>
  );
}
