import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Hero() {
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    async function fetchMedia() {
      const { data } = await supabase
        .from("media")
        .select("id, title, summary, image_url, type")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(6); // Only fetch 6 most recent items

      setMediaItems(data || []);
    }

    fetchMedia();
  }, []);

  return (
    <section className="text-white bg-acePurple dark:bg-gray-800 font-inter">
      <div className="px-4 mx-auto max-w-7xl py-14">
        {/* HERO TEXT */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold tracking-tight md:text-4xl"
          >
            Advancing Health Information Management
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-4 text-base leading-relaxed text-gray-100"
          >
            Championing innovation, education, and professional excellence
            across Health Information Management.
          </motion.p>
        </div>

        {/* SCROLLING MEDIA STRIP */}
        {mediaItems.length > 0 && (
          <div className="relative mt-10 overflow-hidden">
            <motion.div
              className="flex gap-4 w-max"
              animate={{ x: ["0%", "-50%"] }} // scroll left by half of duplicated items
              transition={{
                repeat: Infinity,
                duration: 45, // slow continuous movement
                ease: "linear",
              }}
            >
              {/* Duplicate items for smooth loop */}
              {[...mediaItems, ...mediaItems].map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="min-w-[280px] bg-white text-gray-800 rounded-lg shadow-sm overflow-hidden"
                >
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="object-cover w-full h-24"
                    />
                  )}

                  <div className="p-3">
                    <span className="text-[11px] font-semibold uppercase text-acePurple">
                      {item.type}
                    </span>

                    <h3 className="mt-1 text-sm font-semibold leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    {item.summary && (
                      <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                        {item.summary}
                      </p>
                    )}

                    <Link
                      to="/media"
                      className="inline-block mt-2 text-xs font-medium text-acePurple hover:underline"
                    >
                      View details →
                    </Link>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
