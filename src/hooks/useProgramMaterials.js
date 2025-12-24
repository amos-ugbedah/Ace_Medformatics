import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export function useProgramMaterials(programId) {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!programId) return; // only fetch when programId exists

    let isMounted = true;

    async function fetchMaterials() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("program_materials")
          .select("id, title, file_url, created_at")
          .eq("program_id", programId)
          .order("created_at", { ascending: true });

        if (error) throw error;

        if (isMounted) setMaterials(data || []);
      } catch (error) {
        console.error("Error fetching program materials:", error.message);
        if (isMounted) setMaterials([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchMaterials();

    return () => {
      isMounted = false;
    };
  }, [programId]);

  return { materials, loading };
}
