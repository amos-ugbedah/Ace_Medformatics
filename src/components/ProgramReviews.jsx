import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProgramReviews({ programId, refreshTrigger }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      const { data, error } = await supabase
        .from("program_reviews")
        .select("*")
        .eq("program_id", programId)
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      } else {
        setReviews(data || []);
      }
      setLoading(false);
    }

    if (programId) fetchReviews();
  }, [programId, refreshTrigger]); // refetch when refreshTrigger changes

  if (loading)
    return (
      <p className="py-6 text-center text-gray-600 dark:text-gray-300">
        Loading reviews...
      </p>
    );

  if (!reviews.length)
    return (
      <p className="py-6 text-center text-gray-500 dark:text-gray-400">
        No reviews yet for this program.
      </p>
    );

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={
            i <= rating
              ? "text-yellow-400"
              : "text-gray-300 dark:text-gray-500"
          }
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <section className="px-4 py-12 transition-colors bg-aceLight dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="mb-8 text-2xl font-semibold text-center text-acePurple dark:text-aceGreen">
          Reviews & Feedback
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-6 bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-white/10"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {review.full_name}
                </span>
                <div className="text-sm">{renderStars(review.rating)}</div>
              </div>
              <p className="leading-relaxed text-gray-700 dark:text-gray-200">
                {review.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
