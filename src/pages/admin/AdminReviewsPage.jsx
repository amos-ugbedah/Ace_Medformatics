// src/pages/admin/AdminReviewsPage.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      const { data, error } = await supabase
        .from("program_reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      } else {
        setReviews(data || []);
      }
      setLoading(false);
    }

    fetchReviews();
  }, []);

  const handleStatusChange = async (id, status) => {
    const { error } = await supabase
      .from("program_reviews")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Error updating status:", error);
    } else {
      // Update state locally
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    }
  };

  if (loading) return <p className="py-8 text-center text-gray-600">Loading reviews...</p>;

  return (
    <div className="max-w-5xl px-4 py-8 mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-acePurple">Manage Program Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews found.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col items-start justify-between gap-4 p-4 bg-white shadow-md rounded-xl md:flex-row md:items-center"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{review.full_name}</h3>
                <p className="text-sm text-gray-500">{review.email}</p>
                <p className="mt-2 text-gray-700">{review.content}</p>
                <p className="mt-1 text-sm text-gray-600">Rating: {review.rating || "N/A"}</p>
                <p className="mt-1 text-sm text-gray-600">
                  Status:{" "}
                  <span className={review.status === "approved" ? "text-green-600" : "text-yellow-600"}>
                    {review.status}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                {review.status !== "approved" && (
                  <button
                    onClick={() => handleStatusChange(review.id, "approved")}
                    className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                )}
                {review.status !== "pending" && (
                  <button
                    onClick={() => handleStatusChange(review.id, "pending")}
                    className="px-4 py-2 text-white bg-yellow-600 rounded hover:bg-yellow-700"
                  >
                    Set Pending
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
