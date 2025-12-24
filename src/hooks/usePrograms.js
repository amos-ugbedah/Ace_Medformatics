// src/hooks/usePrograms.js
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

// Simple in-memory cache for programs
let programsCache = null;

export function usePrograms() {
  const [programs, setPrograms] = useState(programsCache || []);
  const [loading, setLoading] = useState(!programsCache);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (programsCache) return; // Use cache if available

    let isMounted = true;

    const fetchPrograms = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("programs")
          .select("id, title, slug, description, category_id")
          .order("created_at", { ascending: true });

        if (error) throw error;

        if (!isMounted) return;
        programsCache = data || [];
        setPrograms(data || []);
      } catch (err) {
        console.error("Error fetching programs:", err.message);
        setError(err);
        setPrograms([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPrograms();

    return () => {
      isMounted = false;
    };
  }, []);

  return { programs, loading, error };
}
