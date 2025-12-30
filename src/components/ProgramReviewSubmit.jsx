import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProgramReviewSubmit({ programId, onSubmitSuccess }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!consent) {
      setError("You must consent to have your review displayed publicly.");
      return;
    }

    setLoading(true);

    const { error: insertError } = await supabase.from("program_reviews").insert([
      {
        program_id: programId,
        full_name: fullName,
        email: email || null,
        content,
        rating: rating ? parseInt(rating) : null,
        status: "pending",
        consent: true,
      },
    ]);

    if (insertError) {
      console.error(insertError);
      setError("Failed to submit review. Please try again.");
    } else {
      setMessage("Thank you! Your review is submitted for approval.");
      setFullName("");
      setEmail("");
      setContent("");
      setRating("");
      setConsent(false);

      if (onSubmitSuccess) onSubmitSuccess();
    }

    setLoading(false);
  };

  return (
    <div className="w-full px-4 py-12">
      <div className="max-w-full p-8 mx-auto bg-white shadow-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl dark:bg-gray-800 rounded-xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-acePurple">
          Submit a Review
        </h2>

        {message && <p className="mb-4 text-center text-green-600">{message}</p>}
        {error && <p className="mb-4 text-center text-red-600">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-acePurple dark:bg-gray-700 dark:text-gray-200"
          />

          <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-acePurple dark:bg-gray-700 dark:text-gray-200"
          />

          <textarea
            placeholder="Your review"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg resize-none focus:ring-2 focus:ring-acePurple dark:bg-gray-700 dark:text-gray-200"
            rows={5}
          />

          <input
            type="number"
            placeholder="Rating (1-5)"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-acePurple dark:bg-gray-700 dark:text-gray-200"
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-4 h-4 border-gray-300 rounded text-acePurple focus:ring-2 focus:ring-acePurple"
            />
            <label htmlFor="consent" className="text-sm text-gray-700 dark:text-gray-200">
              I consent to having my review displayed publicly.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white rounded-lg bg-acePurple hover:bg-aceGreen disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
