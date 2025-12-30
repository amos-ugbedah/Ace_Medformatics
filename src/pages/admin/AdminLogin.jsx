import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if user exists in admins table
      const { data: adminData, error: adminError } = await supabase
        .from("admins")
        .select("*")
        .eq("email", email)
        .single();

      if (adminError || !adminData) {
        setErrorMsg("You are not authorized as admin.");
        await supabase.auth.signOut();
        return;
      }

      // Successful login
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-4 font-inter bg-aceLight dark:bg-gray-900">
      <div className="w-full max-w-md p-8 mx-auto bg-white shadow-lg rounded-xl dark:bg-gray-800">
        <h1 className="mb-6 text-3xl font-semibold text-center text-acePurple">
          Admin Login
        </h1>
        {errorMsg && <p className="mb-4 text-center text-red-600">{errorMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-acePurple dark:focus:ring-aceGreen"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-acePurple dark:focus:ring-aceGreen"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-medium rounded-lg text-aceDark bg-aceGreen hover:bg-acePurple hover:text-white"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
