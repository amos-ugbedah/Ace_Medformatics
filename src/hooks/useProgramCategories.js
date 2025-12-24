import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useProgramCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("program_categories")
        .select("*")
        .order("created_at", { ascending: true });
      
      if (error) console.error("Error fetching categories:", error);
      else setCategories(data);

      setLoading(false);
    };
    fetchCategories();
  }, []);

  return { categories, loading };
}
