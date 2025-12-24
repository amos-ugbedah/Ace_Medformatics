import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient"; // Adjust the path if your supabase client is elsewhere

export function usePrograms(categoryId = null) {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      let query = supabase
        .from("programs")
        .select("*") // simple fetch, no join
        .order("created_at", { ascending: true });

      if (categoryId) query = query.eq("category_id", categoryId);

      const { data, error } = await query;

      if (error) console.error("Error fetching programs:", error);
      else setPrograms(data);

      setLoading(false);
    };
    fetchPrograms();
  }, [categoryId]);

  return { programs, loading };
}
