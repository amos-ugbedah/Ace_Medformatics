import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

export default function Media() {
  const [media, setMedia] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const ITEMS_PER_PAGE = 12;

  // Fetch media items
  useEffect(() => {
    async function fetchMedia() {
      const { data } = await supabase
        .from("media")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      setMedia(data || []);
    }

    fetchMedia();
  }, []);

  // Paginated items
  const paginatedMedia = media.slice(0, page * ITEMS_PER_PAGE);

  // Load more items
  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setLoadingMore(false);
    }, 300); // simulate loading
  };

  // Close modal when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target.id === "modalOverlay") {
      setSelectedItem(null);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl">
        <h1 className="mb-12 text-3xl font-semibold text-center text-gray-900">
          News, Events & Press
        </h1>

        {/* Grid of media items */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {paginatedMedia.map((item) => (
            <motion.article
              key={item.id}
              layout
              whileHover={{ y: -4 }}
              className="flex flex-col p-4 transition bg-white shadow cursor-pointer rounded-xl hover:shadow-lg"
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="object-cover w-full h-48 mb-4 rounded-lg"
                />
              )}

              <span className="text-xs font-semibold tracking-wide uppercase text-acePurple">
                {item.category || "News"}
              </span>

              <h2 className="mt-2 text-lg font-semibold text-gray-900 line-clamp-2">
                {item.title}
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-gray-700 line-clamp-3">
                {item.excerpt}
              </p>

              <button
                onClick={() => setSelectedItem(item)}
                className="self-start mt-3 text-sm font-medium text-acePurple hover:underline"
              >
                Read full
              </button>
            </motion.article>
          ))}
        </div>

        {/* Load more button */}
        {paginatedMedia.length < media.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="px-6 py-2 text-white transition bg-black rounded-lg hover:bg-gray-900"
            >
              {loadingMore ? "Loading..." : "See more news"}
            </button>
          </div>
        )}

        {/* Modal for full news */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              id="modalOverlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleOutsideClick}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black bg-opacity-50"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative w-full max-w-3xl bg-white shadow-lg rounded-xl"
              >
                {/* Scrollable content container */}
                <div className="flex flex-col max-h-[90vh] overflow-y-auto p-6">
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute text-xl font-bold text-gray-500 top-4 right-4 hover:text-gray-800"
                  >
                    ✕
                  </button>

                  {/* Image */}
                  {selectedItem.image_url && (
                    <div className="relative mb-4">
                      <img
                        src={selectedItem.image_url}
                        alt={selectedItem.title}
                        className="w-full object-contain rounded-lg max-h-[60vh]"
                      />
                      <a
                        href={selectedItem.image_url}
                        download
                        className="absolute px-3 py-1 text-sm font-medium text-white transition bg-black rounded top-2 right-2 hover:bg-gray-800"
                      >
                        Download
                      </a>
                    </div>
                  )}

                  {/* Category */}
                  <span className="text-xs font-semibold tracking-wide uppercase text-acePurple">
                    {selectedItem.category || "News"}
                  </span>

                  {/* Title */}
                  <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                    {selectedItem.title}
                  </h2>

                  {/* Full content */}
                  <p className="mt-4 leading-relaxed text-gray-700 whitespace-pre-line">
                    {selectedItem.content || selectedItem.body || selectedItem.excerpt}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
