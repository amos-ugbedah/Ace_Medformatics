import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useTeamMembers({ limit } = {}) {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTeam() {
      setLoading(true);

      let query = supabase
        .from("team_members")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        setError(error.message);
      } else {
        setTeam(data);
      }

      setLoading(false);
    }

    fetchTeam();
  }, [limit]);

  return { team, loading, error };
}
