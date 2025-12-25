import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useCollaborations() {
  const [collaborations, setCollaborations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCollaborations() {
      const { data, error } = await supabase
        .from("collaborations")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) {
        setError(error.message);
      } else {
        setCollaborations(data);
      }

      setLoading(false);
    }

    fetchCollaborations();
  }, []);

  return { collaborations, loading, error };
}
