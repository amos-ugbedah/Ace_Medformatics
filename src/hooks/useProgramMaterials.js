// src/hooks/useProgramMaterials.js
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export function useProgramMaterials(programId) {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMaterials() {
      if (!programId) return; // only fetch when programId exists
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("program_materials")
          .select("*")
          .eq("program_id", programId)
          .order("created_at", { ascending: true });

        if (error) throw error;
        setMaterials(data);
      } catch (error) {
        console.error("Error fetching program materials:", error.message);
        setMaterials([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMaterials();
  }, [programId]);

  return { materials, loading };
}
